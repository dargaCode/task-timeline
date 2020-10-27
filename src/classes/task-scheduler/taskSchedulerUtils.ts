import moment from "moment";
import { Comparator } from "../sorted-list/sortedListUtils";

export interface RawTaskData {
  name: string;
  start: string;
  end: string;
}

// when tasks are created from `RawTaskData`, more fields are added
export interface Task {
  id: number;
  name: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  sortIndex: number;
  laneIndex: number;
}

export interface Lane {
  nextFreeSlot: moment.Moment;
}

/**
 *  sort by ascending start time first, then ascending end time.
 *  ties behave normally.
 * @param a first task
 * @param b second task
 */
export const taskComparator: Comparator<Task> = (a, b) => {
  if (a.startDate.isBefore(b.startDate)) {
    return -1;
  }

  if (a.startDate.isAfter(b.startDate)) {
    return 1;
  }

  if (a.endDate.isBefore(b.endDate)) {
    return -1;
  }

  if (a.endDate.isAfter(b.endDate)) {
    return 1;
  }

  return 0;
};
