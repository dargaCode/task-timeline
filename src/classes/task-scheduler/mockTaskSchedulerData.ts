import moment from "moment";
import { RawTaskData, Task, DateRange, Lane } from "./taskSchedulerUtils";
import { DATE_FORMAT } from "../../utils/dateConstants";

export const EMPTY_DATE_RANGE: DateRange = {
  startDate: undefined,
  endDate: undefined,
  totalDays: undefined
};

/* initializing scheduler with starting tasks */

// starting task data to pass to the scheduler constructor
export const STARTING_TASKS_DATA_UNSORTED: RawTaskData[] = [
  {
    start: "2018-01-01",
    end: "2018-01-05",
    name: "First item"
  },
  {
    start: "2018-01-02",
    end: "2018-01-08",
    name: "Second item"
  },
  {
    start: "2018-01-06",
    end: "2018-01-13",
    name: "Another item"
  },
  {
    start: "2018-01-14",
    end: "2018-01-14",
    name: "Another item"
  },
  {
    start: "2018-02-01",
    end: "2018-02-15",
    name: "Third item"
  },
  {
    start: "2018-01-12",
    end: "2018-02-16",
    name: "Fourth item with a super long name"
  },
  {
    start: "2018-02-01",
    end: "2018-02-02",
    name: "Fifth item with a super long name"
  },
  {
    start: "2018-01-03",
    end: "2018-01-05",
    name: "First item"
  },
  {
    start: "2018-01-04",
    end: "2018-01-08",
    name: "Second item"
  },
  {
    start: "2018-01-06",
    end: "2018-01-13",
    name: "Another item"
  },
  {
    start: "2018-01-09",
    end: "2018-01-09",
    name: "Another item"
  },
  {
    start: "2018-02-01",
    end: "2018-02-15",
    name: "Third item"
  },
  {
    start: "2018-01-12",
    end: "2018-02-16",
    name: "Fourth item with a super long name"
  },
  {
    start: "2018-02-01",
    end: "2018-02-02",
    name: "Fifth item with a super long name"
  }
];

// the starting tasks after they've been created and scheduled
export const STARTING_TASKS_SCHEDULED: Task[] = [
  {
    id: 1,
    startDate: moment("2018-01-01", DATE_FORMAT),
    startDateIndex: 0,
    endDate: moment("2018-01-05", DATE_FORMAT),
    endDateIndex: 4,
    name: "First item",
    sortIndex: 0,
    laneIndex: 0
  },
  {
    id: 2,
    startDate: moment("2018-01-02", DATE_FORMAT),
    startDateIndex: 1,
    endDate: moment("2018-01-08", DATE_FORMAT),
    endDateIndex: 7,
    name: "Second item",
    sortIndex: 1,
    laneIndex: 1
  },
  {
    id: 8,
    startDate: moment("2018-01-03", DATE_FORMAT),
    startDateIndex: 2,
    endDate: moment("2018-01-05", DATE_FORMAT),
    endDateIndex: 4,
    name: "First item",
    sortIndex: 2,
    laneIndex: 2
  },
  {
    id: 9,
    startDate: moment("2018-01-04", DATE_FORMAT),
    startDateIndex: 3,
    endDate: moment("2018-01-08", DATE_FORMAT),
    endDateIndex: 7,
    name: "Second item",
    sortIndex: 3,
    laneIndex: 3
  },
  {
    id: 10,
    startDate: moment("2018-01-06", DATE_FORMAT),
    startDateIndex: 5,
    endDate: moment("2018-01-13", DATE_FORMAT),
    endDateIndex: 12,
    name: "Another item",
    sortIndex: 4,
    laneIndex: 0
  },
  {
    id: 3,
    startDate: moment("2018-01-06", DATE_FORMAT),
    startDateIndex: 5,
    endDate: moment("2018-01-13", DATE_FORMAT),
    endDateIndex: 12,
    name: "Another item",
    sortIndex: 5,
    laneIndex: 2
  },
  {
    id: 11,
    startDate: moment("2018-01-09", DATE_FORMAT),
    startDateIndex: 8,
    endDate: moment("2018-01-09", DATE_FORMAT),
    endDateIndex: 8,
    name: "Another item",
    sortIndex: 6,
    laneIndex: 1
  },
  {
    id: 13,
    startDate: moment("2018-01-12", DATE_FORMAT),
    startDateIndex: 11,
    endDate: moment("2018-02-16", DATE_FORMAT),
    endDateIndex: 46,
    name: "Fourth item with a super long name",
    sortIndex: 7,
    laneIndex: 1
  },
  {
    id: 6,
    startDate: moment("2018-01-12", DATE_FORMAT),
    startDateIndex: 11,
    endDate: moment("2018-02-16", DATE_FORMAT),
    endDateIndex: 46,
    name: "Fourth item with a super long name",
    sortIndex: 8,
    laneIndex: 3
  },
  {
    id: 4,
    startDate: moment("2018-01-14", DATE_FORMAT),
    startDateIndex: 13,
    endDate: moment("2018-01-14", DATE_FORMAT),
    endDateIndex: 13,
    name: "Another item",
    sortIndex: 9,
    laneIndex: 0
  },
  {
    id: 14,
    startDate: moment("2018-02-01", DATE_FORMAT),
    startDateIndex: 31,
    endDate: moment("2018-02-02", DATE_FORMAT),
    endDateIndex: 32,
    name: "Fifth item with a super long name",
    sortIndex: 10,
    laneIndex: 0
  },
  {
    id: 7,
    startDate: moment("2018-02-01", DATE_FORMAT),
    startDateIndex: 31,
    endDate: moment("2018-02-02", DATE_FORMAT),
    endDateIndex: 32,
    name: "Fifth item with a super long name",
    sortIndex: 11,
    laneIndex: 2
  },
  {
    id: 12,
    startDate: moment("2018-02-01", DATE_FORMAT),
    startDateIndex: 31,
    endDate: moment("2018-02-15", DATE_FORMAT),
    endDateIndex: 45,
    name: "Third item",
    sortIndex: 12,
    laneIndex: 4
  },
  {
    id: 5,
    startDate: moment("2018-02-01", DATE_FORMAT),
    startDateIndex: 31,
    endDate: moment("2018-02-15", DATE_FORMAT),
    endDateIndex: 45,
    name: "Third item",
    sortIndex: 13,
    laneIndex: 5
  }
];

export const STARTING_TASKS_LANES: Lane[] = [
  { nextFreeSlot: moment("2018-02-03", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-17", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-03", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-17", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-16", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-16", DATE_FORMAT) }
];

// earliest start date to latest end date
export const STARTING_TASKS_DATE_RANGE = {
  startDate: moment("2018-01-01", DATE_FORMAT),
  endDate: moment("2018-02-16", DATE_FORMAT),
  totalDays: 47
};

/* adding new tasks */

// task data to pass to .add()
export const ADD_TASK_DATA_NO_NEW_LANE: RawTaskData = {
  name: "task that fits within existing lanes",
  start: "2018-01-18",
  end: "2018-01-24"
};

// task data to pass to .add()
export const ADD_TASK_DATA_NEW_LANE: RawTaskData = {
  name: "task that requires a new lane",
  start: "2018-01-21",
  end: "2018-02-17"
};

// the resultant scheduled task from `ADD_TASK_DATA_NEW_LANE`
export const SCHEDULED_TASK_NEW_LANE: Task = {
  id: 15,
  name: "task that requires a new lane",
  startDate: moment("2018-01-21", DATE_FORMAT),
  startDateIndex: 20,
  endDate: moment("2018-02-17", DATE_FORMAT),
  endDateIndex: 47,
  sortIndex: 10,
  laneIndex: 0
};

// `ADD_TASK_DATA_NEW_LANE` has an end date beyond the previously-existing range.
export const ADD_TASK_NEW_LANE_INCREASED_DATE_RANGE = {
  startDate: moment("2018-01-01", DATE_FORMAT),
  endDate: moment("2018-02-17", DATE_FORMAT),
  totalDays: 48
};

// a more space-efficient way to verify sort and lanes
// shouldn't be used outside of test, so leaving it in mocks vs utils
export interface ScheduleSummary {
  [key: number]: {
    startDateIndex: number;
    endDateIndex: number;
    sortIndex: number;
    laneIndex: number;
  };
}

// resultant scheduling after adding `ADD_TASK_DATA_NEW_LANE`
export const SCHEDULE_SUMMARY_NEW_LANE: ScheduleSummary = {
  1: {
    startDateIndex: 0,
    endDateIndex: 4,
    sortIndex: 0,
    laneIndex: 0
  },
  2: {
    startDateIndex: 1,
    endDateIndex: 7,
    sortIndex: 1,
    laneIndex: 1
  },
  3: {
    startDateIndex: 5,
    endDateIndex: 12,
    sortIndex: 5,
    laneIndex: 2
  },
  4: {
    startDateIndex: 13,
    endDateIndex: 13,
    sortIndex: 9,
    laneIndex: 0
  },
  5: {
    startDateIndex: 31,
    endDateIndex: 45,
    sortIndex: 14,
    laneIndex: 6
  },
  6: {
    startDateIndex: 11,
    endDateIndex: 46,
    sortIndex: 8,
    laneIndex: 3
  },
  7: {
    startDateIndex: 31,
    endDateIndex: 32,
    sortIndex: 12,
    laneIndex: 4
  },
  8: {
    startDateIndex: 2,
    endDateIndex: 4,
    sortIndex: 2,
    laneIndex: 2
  },
  9: {
    startDateIndex: 3,
    endDateIndex: 7,
    sortIndex: 3,
    laneIndex: 3
  },
  10: {
    startDateIndex: 5,
    endDateIndex: 12,
    sortIndex: 4,
    laneIndex: 0
  },
  11: {
    startDateIndex: 8,
    endDateIndex: 8,
    sortIndex: 6,
    laneIndex: 1
  },
  12: {
    startDateIndex: 31,
    endDateIndex: 45,
    sortIndex: 13,
    laneIndex: 5
  },
  13: {
    startDateIndex: 11,
    endDateIndex: 46,
    sortIndex: 7,
    laneIndex: 1
  },
  14: {
    startDateIndex: 31,
    endDateIndex: 32,
    sortIndex: 11,
    laneIndex: 2
  },
  15: {
    startDateIndex: 20,
    endDateIndex: 47,
    sortIndex: 10,
    laneIndex: 0
  }
};

// resultant lanes after adding `ADD_TASK_DATA_NEW_LANE`
export const ADD_TASK_INCREASED_LANES: Lane[] = [
  { nextFreeSlot: moment("2018-02-18", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-17", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-03", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-17", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-03", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-16", DATE_FORMAT) },
  { nextFreeSlot: moment("2018-02-16", DATE_FORMAT) }
];
