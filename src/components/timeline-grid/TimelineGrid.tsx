import React from "react";
import { DATE_FORMAT } from "../../utils/dateConstants";
import { Task } from "../../classes/task-scheduler/taskSchedulerUtils";
import styles from "./TimelineGrid.module.scss";

interface Props {
  tasks: Task[];
}

interface State {}

export default class TimelineGrid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { tasks } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {tasks.map(task => {
            const { name, startDate, endDate, laneIndex, id } = task;

            return (
              <div key={id}>
                <h2>{name}</h2>

                <ul>
                  <li key={1}>Start: {startDate.format(DATE_FORMAT)}</li>
                  <li key={2}>End: {endDate.format(DATE_FORMAT)}</li>
                  <li key={3}>Lanes: {laneIndex}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
