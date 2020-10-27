import moment from "moment";
import { RawTaskData, Task, taskComparator, Lane } from "./taskSchedulerUtils";
import SortedList from "../sorted-list/SortedList";
import { DATE_FORMAT } from "../../utils/dateConstants";

const TEMP_DUMMY_TASK: Task = {
  id: 2,
  startDate: moment("2018-01-01", DATE_FORMAT),
  endDate: moment("2018-01-01", DATE_FORMAT),
  name: "Dummy Task",
  sortIndex: 0,
  laneIndex: 0
};

export default class TaskScheduler {
  private sortedTasks: SortedList<Task>;

  private scheduledTasks: Task[];

  private scheduledLanes: Lane[];

  constructor(startingTasksData?: RawTaskData[]) {
    this.sortedTasks = new SortedList<Task>(taskComparator);
    this.scheduledTasks = [];
    this.scheduledLanes = [];
  }

  add(taskData: RawTaskData): Task {
    return TEMP_DUMMY_TASK;
  }

  get tasks(): Task[] {
    return Array.from(this.scheduledTasks);
  }

  get lanes(): Lane[] {
    return Array.from(this.scheduledLanes);
  }
}
