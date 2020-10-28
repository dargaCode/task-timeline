import React from "react";
import TaskScheduler from "../../classes/task-scheduler/TaskScheduler";
import { Task } from "../../classes/task-scheduler/taskSchedulerUtils";
import { STARTING_TASKS } from "../timeline-data";
import TimelineGrid from "../timeline-grid/TimelineGrid";

interface State {
  tasks: Task[];
  laneCount: number;
}

export default class TimelineContainer extends React.Component<{}, State> {
  private scheduler: TaskScheduler | undefined;

  constructor(props: {}) {
    super(props);

    this.scheduler = undefined;

    this.state = {
      tasks: [],
      laneCount: 0
    };
  }

  componentDidMount(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    // in a real app with a backend this would be an api call
    const rawTasks = Array.from(STARTING_TASKS);

    this.scheduler = new TaskScheduler(rawTasks);
    // this.scheduler = new TaskScheduler();

    this.setState({
      tasks: this.scheduler.tasks,
      laneCount: this.scheduler.lanes.length
    });
  }

  render(): JSX.Element {
    const { tasks, laneCount } = this.state;

    return <TimelineGrid tasks={tasks} laneCount={laneCount} />;
  }
}
