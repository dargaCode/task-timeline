import React from "react";
import { STARTING_TASKS } from "../timeline-data";
import TaskScheduler from "../../classes/task-scheduler/TaskScheduler";
import {
  Task,
  DateRange,
  RawTaskData
} from "../../classes/task-scheduler/taskSchedulerUtils";
import { getNSequentialDaysFromStart } from "../../utils/dateUtils";
import Timeline from "../timeline/Timeline";
import TaskDetailsForm from "../task-details-form/TaskDetailsForm";

/**
 *  todo restricting date ranges until pagination is in.
 *  otherwise the app seems to hit the limit or maximum grid size or
 *  number of items in a grid.
 */
const MINIMUM_SCHEDULABLE_DATE = "2017-01-01";
const MAXIMUM_SCHEDULABLE_DATE = "2018-12-31";

interface State {
  tasks: Task[];
  dateRange: DateRange;
}

/**
 * timeline container owns what would be the api call to fetch preexisting
 * tasks. in this case it's loading them from a data file.
 */
export default class TimelineContainer extends React.Component<{}, State> {
  private scheduler: TaskScheduler | undefined;

  constructor(props: {}) {
    super(props);

    this.state = {
      tasks: [],
      dateRange: {
        startDate: undefined,
        endDate: undefined,
        totalDays: undefined
      }
    };
  }

  componentDidMount(): void {
    this.fetchTasks();
  }

  /**
   * create a new task when the user submits the form
   * @param event
   */
  handleTaskCreate = (event: React.FormEvent): void => {
    event.preventDefault();

    // make sure .value is accessible
    const target = event.target as HTMLFormElement;
    const { name, startDate, endDate } = target.value;
    const taskData: RawTaskData = {
      name,
      start: startDate,
      end: endDate
    };

    if (this.scheduler) {
      this.scheduler.add(taskData);

      this.setState({
        tasks: this.scheduler.tasks,
        dateRange: this.scheduler?.dateRange
      });
    }
  };

  /**
   * delete the event if user presses delete key while focused, or clicks the div
   * @param event
   */
  handleTaskDelete = (event: React.MouseEvent | React.KeyboardEvent): void => {
    event.preventDefault();

    // ignore non-delete keys
    if ("key" in event && event.key !== "Backspace") {
      return;
    }

    // make sure .id is accessible
    const target = event.target as HTMLDivElement;

    if (this.scheduler) {
      this.scheduler.remove(Number(target.id));

      this.setState({
        tasks: this.scheduler.tasks,
        dateRange: this.scheduler?.dateRange
      });
    }
  };

  /**
   * in a real task with a backend this would be an api call
   */
  fetchTasks(): void {
    const rawTasks = Array.from(STARTING_TASKS);

    this.scheduler = new TaskScheduler(rawTasks);

    this.setState({
      tasks: this.scheduler.tasks,
      dateRange: this.scheduler.dateRange
    });
  }

  render(): JSX.Element {
    const { tasks, dateRange } = this.state;
    const { startDate, totalDays } = dateRange;

    let columnDates;

    if (startDate && totalDays) {
      columnDates = getNSequentialDaysFromStart(startDate, totalDays);
    }

    return (
      <div>
        <Timeline
          tasks={tasks}
          columnDates={columnDates || []}
          columnCount={totalDays || 0}
          onTaskDelete={this.handleTaskDelete}
        />
        <TaskDetailsForm
          onSubmit={this.handleTaskCreate}
          minInputDate={MINIMUM_SCHEDULABLE_DATE}
          maxInputDate={MAXIMUM_SCHEDULABLE_DATE}
        />
      </div>
    );
  }
}
