import React from "react";
import TaskScheduler from "../../classes/task-scheduler/TaskScheduler";
import {
  Task,
  DateRange
} from "../../classes/task-scheduler/taskSchedulerUtils";
import { STARTING_TASKS } from "../timeline-data";
import TimelineGrid from "../timeline-grid/TimelineGrid";

interface State {
  tasks: Task[];
  laneCount: number;
  dateRange: DateRange;
}

export default class TimelineContainer extends React.Component<{}, State> {
  private scheduler: TaskScheduler | undefined;

  constructor(props: {}) {
    super(props);

    this.scheduler = undefined;

    this.state = {
      tasks: [],
      laneCount: 0,
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
      laneCount: this.scheduler.lanes.length
    });
  }

  render(): JSX.Element {
    const { tasks, laneCount, dateRange } = this.state;

    return (
      <TimelineGrid tasks={tasks} laneCount={laneCount} dateRange={dateRange} />
    );
  }
}
