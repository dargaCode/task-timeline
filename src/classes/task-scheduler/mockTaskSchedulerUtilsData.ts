import moment from "moment";
import { Task } from "./taskSchedulerUtils";
import { DATE_FORMAT } from "../../utils/dateConstants";

/* comparator */

// tasks to sort to make sure start date sorts properly
export const UNSORTED_TASKS_START_TIME: Task[] = [
  {
    id: 1,
    startDate: moment("2018-01-07", DATE_FORMAT),
    endDate: moment("2018-01-10", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 2,
    startDate: moment("2018-01-01", DATE_FORMAT),
    endDate: moment("2018-01-10", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 3,
    startDate: moment("2018-01-05", DATE_FORMAT),
    endDate: moment("2018-01-10", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  }
];

// more space-efficient way to verify testing worked
export const SORTED_TASK_IDS_START_TIME: number[] = [2, 3, 1];

// tasks to sort to make sure end date sorts properly
export const UNSORTED_TASKS_END_TIME: Task[] = [
  {
    id: 1,
    startDate: moment("2018-01-01", DATE_FORMAT),
    endDate: moment("2018-01-06", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 2,
    startDate: moment("2018-01-01", DATE_FORMAT),
    endDate: moment("2018-01-01", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 3,
    startDate: moment("2018-01-01", DATE_FORMAT),
    endDate: moment("2018-01-02", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  }
];

// more space-efficient way to verify testing worked
export const SORTED_TASK_IDS_END_TIME: number[] = [2, 3, 1];

// tasks to sort to make sure start date sorts properly
export const UNSORTED_TASKS_START_END_TIMES: Task[] = [
  {
    id: 1,
    startDate: moment("2018-01-07", DATE_FORMAT),
    endDate: moment("2018-01-10", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 2,
    startDate: moment("2018-01-01", DATE_FORMAT),
    endDate: moment("2018-01-05", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 3,
    startDate: moment("2018-01-06", DATE_FORMAT),
    endDate: moment("2018-01-08", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 4,
    startDate: moment("2018-01-03", DATE_FORMAT),
    endDate: moment("2018-01-07", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 5,
    startDate: moment("2018-01-03", DATE_FORMAT),
    endDate: moment("2018-01-03", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 6,
    startDate: moment("2018-01-06", DATE_FORMAT),
    endDate: moment("2018-01-08", DATE_FORMAT),
    name: "",
    startDateIndex: 0,
    endDateIndex: 0,
    sortIndex: 0,
    laneIndex: 0
  }
];

// more space-efficient way to verify testing worked
export const SORTED_TASK_IDS_START_END_TIMES: number[] = [2, 5, 4, 3, 6, 1];
