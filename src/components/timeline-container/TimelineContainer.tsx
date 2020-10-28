import React from "react";
import TaskScheduler from "../../classes/task-scheduler/TaskScheduler";
import {
  Task,
  RawTaskData
} from "../../classes/task-scheduler/taskSchedulerUtils";
import { STARTING_TASKS } from "../timeline-data";
import { DATE_FORMAT } from "../../utils/dateConstants";

interface Props {}

interface State {
  tasks: Task[];
  laneCount: number;
}

export default class TimelineContainer extends React.Component<Props, State> {
  private scheduler: TaskScheduler | undefined;

  constructor(props: Props) {
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

  // handleAdd(): void {
  //   const { tasks, laneCount } = this.state;
  //
  //   const nextTasks = Array.from(tasks);
  //
  //
  //   this.setState(
  //     {
  //       tasks =
  //     }
  //   )
  // }

  render(): JSX.Element {
    const { tasks, laneCount } = this.state;

    return (
      <div>
        <h1>{laneCount}</h1>
        <h1>Tasks</h1>

        {tasks.map(task => {
          const { name, startDate, endDate, laneIndex } = task;

          return (
            <div>
              <h2>{name}</h2>

              <ul>
                <li>Start: {startDate.format(DATE_FORMAT)}</li>
                <li>End: {endDate.format(DATE_FORMAT)}</li>
                <li>Lanes: {laneIndex}</li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}
