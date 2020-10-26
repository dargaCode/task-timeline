import TaskScheduler from "./TaskScheduler";
import {
  STARTING_TASK_INPUTS_UNSORTED,
  STARTING_TASKS_SCHEDULED,
  STARTING_TASK_LANES,
  ADD_TASK_INPUT_NO_NEW_LANE,
  ADD_TASK_INPUT_NEW_LANE,
  SCHEDULED_TASK_NEW_LANE,
  SCHEDULE_SUMMARY_NEW_LANE,
  ADD_TASK_INCREASED_LANES
} from "./mockTaskSchedulerData";

let scheduler: TaskScheduler;

describe("TaskScheduler", () => {
  beforeEach(() => {
    scheduler = new TaskScheduler(STARTING_TASK_INPUTS_UNSORTED);
  });

  describe("when instantiated", () => {
    describe("when not passed startingTaskInputs", () => {
      beforeEach(() => {
        scheduler = new TaskScheduler();
      });

      it("should not schedule any tasks", () => {
        expect(scheduler.tasks).toEqual([]);
      });

      it("should not create any lanes", () => {
        expect(scheduler.lanes).toEqual([]);
      });
    });

    describe("when passed startingTaskInputs", () => {
      it("should create tasks with ascending ids (based on input order)", () => {
        scheduler.tasks.forEach((task, i) => {
          expect(task.id).toBe(STARTING_TASKS_SCHEDULED[i].id);
        });
      });

      it("should schedule all the new tasks in the correct lanes", () => {
        expect(scheduler.tasks).toEqual(STARTING_TASKS_SCHEDULED);
      });

      it("should create the correct amount of lanes", () => {
        expect(scheduler.lanes).toHaveLength(STARTING_TASK_LANES.length);
      });

      it("each lane should have the correct nextFreeSlot", () => {
        scheduler.lanes.forEach((lane, i) => {
          expect(lane.nextFreeSlot).toBe(STARTING_TASK_LANES[i].nextFreeSlot);
        });
      });
    });
  });

  describe(".add()", () => {
    it("should add a new task", () => {
      const oldTaskCount = scheduler.tasks.length;

      scheduler.add(ADD_TASK_INPUT_NEW_LANE);

      expect(scheduler.tasks).toHaveLength(oldTaskCount + 1);
    });

    it("should return a ref to the new task", () => {
      const scheduledTask = scheduler.add(ADD_TASK_INPUT_NEW_LANE);

      expect(scheduledTask).toEqual(SCHEDULED_TASK_NEW_LANE);
    });

    it("should assign the new task a unique id", () => {
      scheduler.add(ADD_TASK_INPUT_NEW_LANE);

      const uniqueIds = new Set(scheduler.tasks.map(task => task.id));

      expect(uniqueIds.size).toEqual(scheduler.tasks.length);
    });

    it("should update every task's sortIndex", () => {
      scheduler.add(ADD_TASK_INPUT_NEW_LANE);

      scheduler.tasks.forEach(task => {
        const { id, sortIndex } = task;

        expect(sortIndex).toBe(SCHEDULE_SUMMARY_NEW_LANE[id].sortIndex);
      });
    });

    it("should reschedule all tasks, including the new one", () => {
      scheduler.add(ADD_TASK_INPUT_NEW_LANE);

      scheduler.tasks.forEach(task => {
        const { id, laneIndex } = task;

        expect(laneIndex).toBe(SCHEDULE_SUMMARY_NEW_LANE[id].laneIndex);
      });
    });

    describe("when it can't fit into any of the existing lanes", () => {
      it("should create a new lane", () => {
        scheduler.add(ADD_TASK_INPUT_NEW_LANE);

        expect(scheduler.lanes).toHaveLength(STARTING_TASK_LANES.length + 1);
      });
    });

    describe("when it can fit into one of the existing lanes", () => {
      it("should not create a new lane", () => {
        scheduler.add(ADD_TASK_INPUT_NO_NEW_LANE);

        expect(scheduler.lanes).toHaveLength(STARTING_TASK_LANES.length);
      });
    });

    it("should update every lane's nextFreeSlot", () => {
      scheduler.add(ADD_TASK_INPUT_NO_NEW_LANE);

      expect(scheduler.lanes).toEqual(ADD_TASK_INCREASED_LANES);
    });
  });

  describe(".tasks (getter)", () => {
    it("should return a copy of the sortedList items", () => {
      // todo
    });
  });

  describe(".lanes (getter)", () => {
    it("should return a copy of the lanes", () => {
      // todo
    });
  });

  describe(".remove()", () => {
    it("should remove the task with the given id from its tasks", () => {
      // todo
    });

    it("should update the remaining tasks' sortIndex", () => {
      // todo
    });

    describe("when removing it would result in empty lane(s)", () => {
      it("should remove all empty lanes", () => {
        // todo
      });
    });

    describe("when removing it would not result in empty lane(s)", () => {
      it("should not remove any lanes", () => {
        // todo
      });
    });

    it("should update the remaining tasks' laneIndex", () => {
      // todo
    });

    it("should update every lane's nextFreeSlot", () => {
      // todo
    });
  });

  describe(".modify()", () => {
    it("should remove the task of the given id", () => {
      // todo
    });

    // maybe this isn't ideal, since it would cause the event to have a new id
    it("should add a new task with the updated properties", () => {
      // todo
    });
  });
});
