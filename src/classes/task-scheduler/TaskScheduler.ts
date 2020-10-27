import moment from "moment";
import { Lane, RawTaskData, Task, taskComparator } from "./taskSchedulerUtils";
import SortedList from "../sorted-list/SortedList";
import { DATE_FORMAT } from "../../utils/dateConstants";

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

  updateSchedule = (): void => {
    // taskList splices in each added item, so the sortIndices are not correct
    const sortedTasks = updateSortIndices(this.sortedTaskList.items);

    this.scheduledTasks = sortedTasks;
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
