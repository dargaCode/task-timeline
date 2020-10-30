import moment from "moment";
import { Lane, RawTaskData, Task, taskComparator } from "./taskSchedulerUtils";
import SortedList from "../sorted-list/SortedList";
import { DATE_FORMAT } from "../../utils/dateConstants";
import { getOneDayAfter } from "../../utils/dateUtils";

const STARTING_TASK_ID = 1;

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

  private scheduledLanes: Lane[];

  constructor(startingTasksData?: RawTaskData[]) {
    this.sortedTaskList = new SortedList<Task>(taskComparator);
    this.nextTaskId = STARTING_TASK_ID;
    this.scheduledTasks = [];
    this.scheduledLanes = [];

    if (startingTasksData) {
      this.processStartingTasks(startingTasksData);
    }
  }

  /**
   *
   */
  private getNextTaskId = (): number => {
    const { nextTaskId } = this;

    this.nextTaskId += 1;

    return nextTaskId;
  };

  /**
   *
   * @param rawTask
   */
  private generateTask = (rawTask: RawTaskData): Task => {
    const { name, start, end } = rawTask;
    const id = this.getNextTaskId();

    return {
      id,
      name,
      startDate: moment(start, DATE_FORMAT),
      endDate: moment(end, DATE_FORMAT),
      sortIndex: 0,
      laneIndex: 0
    };
  };

  /**
   *
   * @param startDate
   */
  private getNextAvailableLaneIndex = (startDate: moment.Moment): number => {
    if (!this.scheduledLanes) {
      return -1;
    }

    return this.scheduledLanes.findIndex(lane => {
      const { nextFreeSlot } = lane;

      return startDate.isSameOrAfter(nextFreeSlot);
    });
  };

  /**
   *
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
   *
   */
  private updateSchedule = (): void => {
    // create new lanes from scratch every time
    this.scheduledLanes = [];

    // taskList splices in each added item, so the sortIndices need to be updated
    const sortedTasks = updateSortIndices(this.sortedTaskList.items);

    this.scheduledTasks = sortedTasks.map(this.scheduleTask);
  };

  /**
   *
   * @param startingTasksData
   */
  private processStartingTasks = (startingTasksData: RawTaskData[]): void => {
    startingTasksData.forEach(taskData => {
      const task = this.generateTask(taskData);

      this.sortedTaskList.add(task);
    });

    this.updateSchedule();
  };

  /**
   *
   * @param taskData
   */
  public add = (taskData: RawTaskData): Task => {
    const task = this.generateTask(taskData);
    const sortIndex = this.sortedTaskList.add(task);

    this.updateSchedule();

    return this.scheduledTasks[sortIndex];
  };

  /**
   * getter for the scheduled tasks
   */
  public get tasks(): Task[] {
    return Array.from(this.scheduledTasks);
  }

  /**
   * getter for the scheduled lanes
   */
  public get lanes(): Lane[] {
    return Array.from(this.scheduledLanes);
  }
}
