import React from "react";
import { STARTING_TASKS } from "../timeline-data";
import TaskScheduler from "../../classes/task-scheduler/TaskScheduler";
import {
  Task,
  DateRange
} from "../../classes/task-scheduler/taskSchedulerUtils";
import { getNSequentialDaysFromStart } from "../../utils/dateUtils";
import Timeline from "../timeline/Timeline";

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

    this.scheduler = undefined;

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
      <Timeline
        tasks={tasks}
        columnDates={columnDates || []}
        columnCount={totalDays || 0}
      />
    );
  }
}
