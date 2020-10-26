export interface RawTaskInput {
  name: string;
  start: string;
  end: string;
}

export interface ScheduledTask {
  id: number;
  start: string;
  end: string;
  name: string;
  sortIndex: number;
  laneIndex: number;
}

export interface Lane {
  nextFreeSlot: string;
}
