import moment from "moment";
import {
  RawTaskData,
  Task,
  DateRange,
  Lane,
  taskComparator
} from "./taskSchedulerUtils";
import SortedList from "../sorted-list/SortedList";
import { DATE_FORMAT } from "../../utils/dateConstants";
import {
  getOneDayAfter,
  getDateRangeInclusiveDayCount
} from "../../utils/dateUtils";

const STARTING_TASK_ID = 1;

/**
 * as tasks are spliced in and out of their array, they
 * can become out of sync with their sort indices.
 * @param tasks
 */
function updateSortIndices(tasks: Task[]): Task[] {
  return tasks.map(
    (task, i): Task => {
      const updatedTask = { ...task };

      updatedTask.sortIndex = i;

      return updatedTask;
    }
  );
}

/**
 * populate the date indices for a task, compared to the
 * earliest start date of any existing task.
 * @param tasks
 * @param earliestStartDate the beginning of the timeline
 */
function updateDateIndices(
  tasks: Task[],
  earliestStartDate: moment.Moment
): Task[] {
  return tasks.map(task => {
    const updatedTask = { ...task };
    const { startDate, endDate } = updatedTask;

    updatedTask.startDateIndex = startDate.diff(earliestStartDate, "days");
    // tasks end at the end of their last day, not the beginning
    updatedTask.endDateIndex = 1 + endDate.diff(earliestStartDate, "days");

    return updatedTask;
  });
}

/**
 * task scheduler converts raw task data into tasks, and schedules
 * those tasks in as few lanes as possible.
 *
 * it uses a sorted list of tasks to keep the tasks always sorted,
 * which is important for making scheduling the tasks predictably.
 */
export default class TaskScheduler {
  private sortedTaskList: SortedList<Task>;

  private nextTaskId: number;

  private scheduledTasks: Task[];

  private scheduledDateRange: DateRange;

  private scheduledLanes: Lane[];

  constructor(startingTasksData?: RawTaskData[]) {
    this.sortedTaskList = new SortedList<Task>(taskComparator);
    this.nextTaskId = STARTING_TASK_ID;
    this.scheduledTasks = [];
    this.scheduledDateRange = {
      startDate: undefined,
      endDate: undefined,
      totalDays: undefined
    };
    this.scheduledLanes = [];

    if (startingTasksData) {
      this.processStartingTasks(startingTasksData);
    }
  }

  /**
   * every time a task is created, use the next sequential
   * integer as its id.
   */
  private getNextTaskId = (): number => {
    const { nextTaskId } = this;

    this.nextTaskId += 1;

    return nextTaskId;
  };

  /**
   * process the raw data for a task into a task which has all the
   * fields which will be needed to schedule and eventually render it.
   * (in a real app with a backend this would likely be an API call.)
   * @param rawTask the name, start date and end date
   */
  private generateTask = (rawTask: RawTaskData): Task => {
    const { name, start, end } = rawTask;
    const id = this.getNextTaskId();

    return {
      id,
      name,
      startDate: moment(start, DATE_FORMAT),
      endDate: moment(end, DATE_FORMAT),
      // all the below fields will be updated as part of scheduling
      startDateIndex: 0,
      endDateIndex: 0,
      sortIndex: 0,
      laneIndex: 0
    };
  };

  /**
   * find the first lane which has a free slot where at the `targetDate` or later.
   * if no lanes have available slots, return -1 (so one can be created).
   * @param targetDate
   */
  private getNextAvailableLaneIndex = (targetDate: moment.Moment): number => {
    if (!this.scheduledLanes) {
      return -1;
    }

    return this.scheduledLanes.findIndex(lane => {
      const { nextFreeSlot } = lane;

      return targetDate.isSameOrAfter(nextFreeSlot);
    });
  };

  /**
   * add a test to an existing lane, if it has the startDate open.
   * if not, add a new lane. update the lane's `nextFreeSlot` to
   * let future tasks be scheduled right after this one.
   * @param task
   */
  private scheduleTask = (task: Task): Task => {
    const { startDate, endDate } = task;
    const newNextFreeSlot = getOneDayAfter(endDate);

    let nextAvailableLaneIndex = this.getNextAvailableLaneIndex(startDate);

    if (nextAvailableLaneIndex !== -1) {
      this.scheduledLanes[
        nextAvailableLaneIndex
      ].nextFreeSlot = newNextFreeSlot;
    } else {
      this.scheduledLanes.push({ nextFreeSlot: newNextFreeSlot });

      nextAvailableLaneIndex = this.scheduledLanes.length - 1;
    }

    const scheduledTask = { ...task };

    scheduledTask.laneIndex = nextAvailableLaneIndex;

    return scheduledTask;
  };

  /**
   * update the scheduled tasks, date range, and lanes.
   */
  // todo refactor this function to be less ugly
  private updateSchedule = (): void => {
    // prevent new lanes from being appended to old lanes
    this.scheduledLanes = [];

    const tasks = this.sortedTaskList.items;

    // allow the schedule to update when the last item has just been removed
    if (tasks.length === 0) {
      this.scheduledTasks = [];
      this.scheduledDateRange = {
        startDate: undefined,
        endDate: undefined,
        totalDays: undefined
      };

      return;
    }

    // as tasks were spliced into the list, their sortIndices were not updated
    const sortedTasks = updateSortIndices(tasks);
    // the first task will always have the earliest startDate.
    // we need this index immediately to assign tasks' date indexes.
    // this will ultimately be what defines the grid column range for each task.
    const earliestStartDate = sortedTasks[0].startDate.clone();
    const indexedTasks: Task[] = updateDateIndices(
      sortedTasks,
      earliestStartDate
    );

    const scheduledTasks: Task[] = [];
    // since tasks are already sorted, only the end date may need updating. we can't
    // assume which task has it since each task can be arbitrarily long
    let latestEndDate = sortedTasks[0].startDate.clone();

    indexedTasks.forEach(task => {
      scheduledTasks.push(this.scheduleTask(task));

      if (task.endDate.isAfter(latestEndDate)) {
        latestEndDate = task.endDate.clone();
      }
    });

    this.scheduledTasks = scheduledTasks;
    this.scheduledDateRange = {
      startDate: earliestStartDate,
      endDate: latestEndDate,
      totalDays: getDateRangeInclusiveDayCount(earliestStartDate, latestEndDate)
    };
  };

  /**
   * create and schedule multiple starting tasks from their data
   * @param rawTasks the names, start dates and end dates
   */
  private processStartingTasks = (rawTasks: RawTaskData[]): void => {
    rawTasks.forEach(taskData => {
      const task = this.generateTask(taskData);

      this.sortedTaskList.add(task);
    });

    this.updateSchedule();
  };

  /**
   * create and schedule an individual task, derived from its raw data
   * @param rawTask the name, start date and end date
   */
  public add = (rawTask: RawTaskData): Task => {
    const task = this.generateTask(rawTask);
    const sortIndex = this.sortedTaskList.add(task);

    this.updateSchedule();

    return this.scheduledTasks[sortIndex];
  };

  /**
   * remove the task with the provided dict from the schedule
   * @param removedTaskId
   */
  public remove = (removedTaskId: number): void => {
    // todo for high amounts of tasks, a dictionary lookup would before better
    const removedTaskIndex = this.scheduledTasks.findIndex(task => {
      return task.id === removedTaskId;
    });

    this.sortedTaskList.remove(removedTaskIndex);

    this.updateSchedule();
  };

  /**
   * getter for the scheduled tasks
   */
  public get tasks(): Task[] {
    return Array.from(this.scheduledTasks);
  }

  /**
   * getter for the scheduled date range
   */
  public get dateRange(): DateRange {
    return { ...this.scheduledDateRange };
  }

  /**
   * getter for the scheduled lanes
   */
  public get lanes(): Lane[] {
    return Array.from(this.scheduledLanes);
  }
}
