import moment from "moment";
import { Lane, RawTaskData, Task, taskComparator } from "./taskSchedulerUtils";
import SortedList from "../sorted-list/SortedList";
import { DATE_FORMAT } from "../../utils/dateConstants";
import { getOneDayAfter } from "../../utils/dateUtils";

const STARTING_TASK_ID = 1;

const TEMP_DUMMY_TASK: Task = {
  id: 2,
  startDate: moment("2018-01-01", DATE_FORMAT),
  endDate: moment("2018-01-01", DATE_FORMAT),
  name: "Dummy Task",
  sortIndex: 0,
  laneIndex: 0
};

function updateSortIndices(tasks: Task[]): Task[] {
  return tasks.map(
    (task, i): Task => {
      const updatedTask = Object.assign(task);

      updatedTask.sortIndex = i;

      return updatedTask;
    }
  );
}

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

  getNextTaskId = (): number => {
    const { nextTaskId } = this;

    this.nextTaskId += 1;

    return nextTaskId;
  };

  generateTask = (rawTask: RawTaskData): Task => {
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

  getNextAvailableLaneIndex = (startDate: moment.Moment): number => {
    if (!this.scheduledLanes) {
      return -1;
    }

    return this.scheduledLanes.findIndex(lane => {
      const { nextFreeSlot } = lane;

      return startDate.isSameOrAfter(nextFreeSlot);
    });
  };

  scheduleTask = (task: Task): Task => {
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

    const scheduledTask = Object.assign(task);

    scheduledTask.laneIndex = nextAvailableLaneIndex;

    return scheduledTask;
  };

  updateSchedule = (): void => {
    // taskList splices in each added item, so the sortIndices need to be updated
    const sortedTasks = updateSortIndices(this.sortedTaskList.items);

    this.scheduledTasks = sortedTasks.map(this.scheduleTask);
  };

  processStartingTasks = (startingTasksData: RawTaskData[]): void => {
    startingTasksData.forEach(taskData => {
      const task = this.generateTask(taskData);

      this.sortedTaskList.add(task);
    });

    this.updateSchedule();
  };

  add = (taskData: RawTaskData): Task => {
    return TEMP_DUMMY_TASK;
  };

  get tasks(): Task[] {
    return Array.from(this.scheduledTasks);
  }

  get lanes(): Lane[] {
    return Array.from(this.scheduledLanes);
  }
}
