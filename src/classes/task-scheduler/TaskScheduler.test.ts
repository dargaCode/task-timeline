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
  ADD_TASK_NEW_LANE_INCREASED_DATE_RANGE,
  REMOVE_STARTING_TASKS,
  REMOVE_STARTING_TASKS_DATE_RANGE,
  REMOVE_STARTING_TASKS_LANES,
  REMOVE_ID_NO_DECREASED_LANES_OR_RANGE,
  REMOVE_ID_DECREASED_LANES_AND_RANGE,
  REMOVE_TASKS_DECREASED_DATE_RANGE,
  REMOVE_TASK_DECREASED_LANES,
  SCHEDULE_SUMMARY_DECREASED_LANES_AND_RANGE
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

    it("should assign the correct date indices to each task", () => {
      scheduler.tasks.forEach(task => {
        const { id } = task;

        expect(task.startDateIndex).toBe(
          SCHEDULE_SUMMARY_NEW_LANE[id].startDateIndex
        );
        expect(task.endDateIndex).toBe(
          SCHEDULE_SUMMARY_NEW_LANE[id].endDateIndex
        );
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

  describe(".remove()", () => {
    beforeEach(() => {
      scheduler = new TaskScheduler(REMOVE_STARTING_TASKS);
    });

    it("should remove the task with the given id from its tasks", () => {
      scheduler.remove(REMOVE_ID_DECREASED_LANES_AND_RANGE);

      const removedTaskIndex = scheduler.tasks.find(task => {
        return task.id === REMOVE_ID_DECREASED_LANES_AND_RANGE;
      });

      expect(removedTaskIndex).toBe(-1);
    });

    it("should not allow the next added task to use its id", () => {
      scheduler.remove(REMOVE_ID_DECREASED_LANES_AND_RANGE);

      const scheduledTask = scheduler.add(ADD_TASK_DATA_NEW_LANE);

      expect(scheduledTask.id).not.toBe(REMOVE_ID_DECREASED_LANES_AND_RANGE);
    });

    it("should update the remaining tasks' sortIndex", () => {
      scheduler.remove(REMOVE_ID_DECREASED_LANES_AND_RANGE);

      scheduler.tasks.forEach(task => {
        const { id, sortIndex } = task;

        expect(sortIndex).toBe(
          SCHEDULE_SUMMARY_DECREASED_LANES_AND_RANGE[id].sortIndex
        );
      });
    });

    it("should update the remaining tasks' laneIndex", () => {
      scheduler.remove(REMOVE_ID_DECREASED_LANES_AND_RANGE);

      scheduler.tasks.forEach(task => {
        const { id, laneIndex } = task;

        expect(laneIndex).toBe(
          SCHEDULE_SUMMARY_DECREASED_LANES_AND_RANGE[id].laneIndex
        );
      });
    });

    it("should update the remaining tasks' date indices", () => {
      scheduler.remove(REMOVE_ID_DECREASED_LANES_AND_RANGE);

      scheduler.tasks.forEach(task => {
        const { id } = task;

        expect(task.startDateIndex).toBe(
          SCHEDULE_SUMMARY_DECREASED_LANES_AND_RANGE[id].startDateIndex
        );
        expect(task.endDateIndex).toBe(
          SCHEDULE_SUMMARY_DECREASED_LANES_AND_RANGE[id].endDateIndex
        );
      });
    });

    describe("when removing it would not result in empty lanes", () => {
      it("should not reduce the lane count", () => {
        scheduler.remove(REMOVE_ID_NO_DECREASED_LANES_OR_RANGE);

        expect(scheduler.lanes).toHaveLength(
          REMOVE_STARTING_TASKS_LANES.length
        );
      });
    });

    describe("when removing it would result in empty lanes", () => {
      it("should reduce the lane count", () => {
        scheduler.remove(REMOVE_ID_DECREASED_LANES_AND_RANGE);

        expect(scheduler.lanes).toHaveLength(
          REMOVE_TASK_DECREASED_LANES.length
        );
      });
    });

    it("should update every lane's nextFreeSlot", () => {
      scheduler.remove(REMOVE_ID_DECREASED_LANES_AND_RANGE);

      scheduler.lanes.forEach((lane, i) => {
        const laneSlotDate = lane.nextFreeSlot.format(DATE_FORMAT);
        const expectedLaneSlotDate = REMOVE_TASK_DECREASED_LANES[
          i
        ].nextFreeSlot.format(DATE_FORMAT);

        expect(laneSlotDate).toBe(expectedLaneSlotDate);
      });
    });

    describe("when the task doesn't have the earliest start or latest end", () => {
      it("should not reduce the date range", () => {
        scheduler.remove(REMOVE_ID_NO_DECREASED_LANES_OR_RANGE);

        expect(scheduler.dateRange).toEqual(REMOVE_STARTING_TASKS_DATE_RANGE);
      });
    });

    describe("when the task has the earliest start and/or latest end", () => {
      it("should reduce the date range", () => {
        scheduler.remove(REMOVE_ID_DECREASED_LANES_AND_RANGE);

        expect(scheduler.dateRange).toEqual(REMOVE_TASKS_DECREASED_DATE_RANGE);
      });
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
});
