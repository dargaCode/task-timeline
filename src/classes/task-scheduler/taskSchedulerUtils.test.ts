import { taskComparator } from "./taskSchedulerUtils";
import {
  UNSORTED_TASKS_START_TIME,
  SORTED_TASK_IDS_START_TIME,
  UNSORTED_TASKS_END_TIME,
  SORTED_TASK_IDS_END_TIME,
  UNSORTED_TASKS_START_END_TIMES,
  SORTED_TASK_IDS_START_END_TIMES
} from "./mockTaskSchedulerUtilsData";

describe("taskSchedulerUtils", () => {
  describe("taskComparator", () => {
    it("should sort earlier start dates first", () => {
      const sortedTasks = UNSORTED_TASKS_START_TIME.sort(taskComparator);

      sortedTasks.forEach((task, i) => {
        expect(task.id).toBe(SORTED_TASK_IDS_START_TIME[i]);
      });
    });

    describe("when start dates match", () => {
      it("should sort earlier end dates first", () => {
        const sortedTasks = UNSORTED_TASKS_END_TIME.sort(taskComparator);

        sortedTasks.forEach((task, i) => {
          expect(task.id).toBe(SORTED_TASK_IDS_END_TIME[i]);
        });
      });
    });

    it("should properly sort a mix of start and end date variations", () => {
      const sortedTasks = UNSORTED_TASKS_START_END_TIMES.sort(taskComparator);

      sortedTasks.forEach((task, i) => {
        expect(task.id).toBe(SORTED_TASK_IDS_START_END_TIMES[i]);
      });
    });
  });
});
