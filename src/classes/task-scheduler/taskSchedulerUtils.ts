import moment from "moment";

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
