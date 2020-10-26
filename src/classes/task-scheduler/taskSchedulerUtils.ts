import moment from "moment";
import { Comparator } from "../sorted-list/sortedListUtils";

export interface RawTaskInput {
  name: string;
  start: string;
  end: string;
}

// when tasks are created from `RawTaskInput`, more fields are added
export interface Task {
  id: number;
  name: string;
  start: moment.Moment;
  end: moment.Moment;
  sortIndex: number;
  laneIndex: number;
}

export interface Lane {
  nextFreeSlot: string;
}

/**
 *  sort by ascending start time first, then ascending end time.
 *  ties behave normally.
 * @param a first task
 * @param b second task
 */
export const taskComparator: Comparator<Task> = (a, b) => {
  if (a.start.isBefore(b.start)) {
    return -1;
  }

  if (a.start.isAfter(b.start)) {
    return 1;
  }

  if (a.end.isBefore(b.end)) {
    return -1;
  }

  if (a.end.isAfter(b.end)) {
    return 1;
  }

  return 0;
};
