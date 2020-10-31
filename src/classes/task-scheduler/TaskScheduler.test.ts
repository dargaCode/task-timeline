import TaskScheduler from "./TaskScheduler";
import {
  EMPTY_DATE_RANGE,
  STARTING_TASKS_DATA_UNSORTED,
  STARTING_TASKS_SCHEDULED,
  STARTING_TASKS_DATE_RANGE,
  STARTING_TASKS_LANES,
  ADD_TASK_DATA_NO_NEW_LANE,
  ADD_TASK_DATA_NEW_LANE,
  SCHEDULED_TASK_NEW_LANE,
  SCHEDULE_SUMMARY_NEW_LANE,
  ADD_TASK_INCREASED_LANES,
  ADD_TASK_NEW_LANE_INCREASED_DATE_RANGE
} from "./mockTaskSchedulerData";
import { DATE_FORMAT } from "../../utils/dateConstants";

let scheduler: TaskScheduler;

describe("TaskScheduler", () => {
  beforeEach(() => {
    scheduler = new TaskScheduler(STARTING_TASKS_DATA_UNSORTED);
  });

  describe("when instantiated", () => {
    describe("when not passed startingTasksData", () => {
      beforeEach(() => {
        scheduler = new TaskScheduler();
      });

      it("should not schedule any tasks", () => {
        expect(scheduler.tasks).toEqual([]);
      });

      it("should not create any lanes", () => {
        expect(scheduler.lanes).toEqual([]);
      });

      it("should not populate its date range", () => {
        expect(scheduler.dateRange).toEqual(EMPTY_DATE_RANGE);
      });
    });

    describe("when passed startingTasksData", () => {
      it("should create tasks with ascending ids (based on input order)", () => {
        scheduler.tasks.forEach((task, i) => {
          expect(task.id).toBe(STARTING_TASKS_SCHEDULED[i].id);
        });
      });

      it("should assign the correct date indices to each task", () => {
        scheduler.tasks.forEach((task, i) => {
          expect(task.startDateIndex).toBe(
            STARTING_TASKS_SCHEDULED[i].startDateIndex
          );
          expect(task.endDateIndex).toBe(
            STARTING_TASKS_SCHEDULED[i].endDateIndex
          );
        });
      });

      it("should schedule all the tasks in the correct lanes", () => {
        expect(scheduler.tasks).toEqual(STARTING_TASKS_SCHEDULED);
      });

      it("should create the correct amount of lanes", () => {
        expect(scheduler.lanes).toHaveLength(STARTING_TASKS_LANES.length);
      });

      it("each lane should have the correct nextFreeSlot", () => {
        scheduler.lanes.forEach((lane, i) => {
          const laneSlotDate = lane.nextFreeSlot.format(DATE_FORMAT);
          const expectedLaneSlotDate = STARTING_TASKS_LANES[
            i
          ].nextFreeSlot.format(DATE_FORMAT);

          expect(laneSlotDate).toBe(expectedLaneSlotDate);
        });
      });

      it("should track the overall date range", () => {
        expect(scheduler.dateRange).toEqual(STARTING_TASKS_DATE_RANGE);
      });
    });
  });

  describe(".add()", () => {
    it("should create and schedule a new task", () => {
      const oldTaskCount = scheduler.tasks.length;

      scheduler.add(ADD_TASK_DATA_NEW_LANE);

      expect(scheduler.tasks).toHaveLength(oldTaskCount + 1);
    });

    it("should assign the correct date indices to the task", () => {
      const scheduledTask = scheduler.add(ADD_TASK_DATA_NEW_LANE);

      expect(scheduledTask.startDateIndex).toBe(
        SCHEDULED_TASK_NEW_LANE.startDateIndex
      );
      expect(scheduledTask.endDateIndex).toBe(
        SCHEDULED_TASK_NEW_LANE.endDateIndex
      );
    });

    it("should assign a unique id to the task", () => {
      const scheduledTask = scheduler.add(ADD_TASK_DATA_NEW_LANE);

      expect(scheduledTask).toEqual(SCHEDULED_TASK_NEW_LANE);
    });

    it("should update every task's sortIndex", () => {
      scheduler.add(ADD_TASK_DATA_NEW_LANE);

      scheduler.tasks.forEach(task => {
        const { id, sortIndex } = task;

        expect(sortIndex).toBe(SCHEDULE_SUMMARY_NEW_LANE[id].sortIndex);
      });
    });

    it("should reschedule all tasks, including the new one", () => {
      scheduler.add(ADD_TASK_DATA_NEW_LANE);

      scheduler.tasks.forEach(task => {
        const { id, laneIndex } = task;

        expect(laneIndex).toBe(SCHEDULE_SUMMARY_NEW_LANE[id].laneIndex);
      });
    });

    describe("when it can fit into one of the existing lanes", () => {
      it("should not create a new lane", () => {
        scheduler.add(ADD_TASK_DATA_NO_NEW_LANE);

        expect(scheduler.lanes).toHaveLength(STARTING_TASKS_LANES.length);
      });
    });

    describe("when it can't fit into any of the existing lanes", () => {
      it("should create a new lane", () => {
        scheduler.add(ADD_TASK_DATA_NEW_LANE);

        expect(scheduler.lanes).toHaveLength(STARTING_TASKS_LANES.length + 1);
      });
    });

    it("should update every lane's nextFreeSlot", () => {
      scheduler.add(ADD_TASK_DATA_NEW_LANE);

      scheduler.lanes.forEach((lane, i) => {
        const laneSlotDate = lane.nextFreeSlot.format(DATE_FORMAT);
        const expectedLaneSlotDate = ADD_TASK_INCREASED_LANES[
          i
        ].nextFreeSlot.format(DATE_FORMAT);

        expect(laneSlotDate).toBe(expectedLaneSlotDate);
      });
    });

    describe("when the task's dates are between existing tasks", () => {
      it("should not increase the date range", () => {
        scheduler.add(ADD_TASK_DATA_NO_NEW_LANE);

        expect(scheduler.dateRange).toEqual(STARTING_TASKS_DATE_RANGE);
      });
    });

    describe("when the task's dates extend beyond existing tasks", () => {
      it("should increase the date range to match", () => {
        scheduler.add(ADD_TASK_DATA_NEW_LANE);

        expect(scheduler.dateRange).toEqual(
          ADD_TASK_NEW_LANE_INCREASED_DATE_RANGE
        );
      });
    });
  });

  describe(".tasks (getter)", () => {
    it("should return a copy of the scheduler items", () => {
      // they are copies, not the same ref
      expect(scheduler.tasks).not.toBe(scheduler.tasks);
    });
  });

  describe(".dateRange (getter)", () => {
    it("should return a copy of the scheduler date range", () => {
      // they are copies, not the same ref
      expect(scheduler.dateRange).not.toBe(scheduler.dateRange);
    });
  });

  describe(".lanes (getter)", () => {
    it("should return a copy of the scheduler lanes", () => {
      // they are copies, not the same ref
      expect(scheduler.lanes).not.toBe(scheduler.lanes);
    });
  });

  describe(".remove()", () => {
    it.skip("should remove the task with the given id from its tasks", () => {
      // todo
    });

    it.skip("should update the remaining tasks' sortIndex", () => {
      // todo
    });

    describe("when removing it would result in empty lane(s)", () => {
      it.skip("should remove all empty lanes", () => {
        // todo
      });
    });

    describe("when removing it would not result in empty lane(s)", () => {
      it.skip("should not remove any lanes", () => {
        // todo
      });
    });

    it.skip("should update the remaining tasks' laneIndex", () => {
      // todo
    });

    it.skip("should update every lane's nextFreeSlot", () => {
      // todo
    });
  });

  describe(".modify()", () => {
    it.skip("should remove the task of the given id", () => {
      // todo
    });

    // maybe this isn't ideal, since it would cause the event to have a new id
    it.skip("should add a new task with the updated properties", () => {
      // todo
    });
  });
});
