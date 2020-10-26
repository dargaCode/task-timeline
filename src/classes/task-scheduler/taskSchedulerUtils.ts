export interface RawTaskInput {
  name: string;
  start: string;
  end: string;
}

// when tasks are created from `RawTaskInput`, more fields are added
export interface ScheduledTask extends RawTaskInput {
  id: number;
  sortIndex: number;
  laneIndex: number;
}

export interface Lane {
  nextFreeSlot: string;
}
