import React from "react";
import moment from "moment";
import { Task } from "../../classes/task-scheduler/taskSchedulerUtils";
import {
  DATE_FORMAT,
  DATE_FORMAT_TIMELINE_DATE
} from "../../utils/dateConstants";
import { getNSequentialDays } from "../../utils/dateUtils";
import styles from "./TimelineGrid.module.scss";

interface Props {
  tasks: Task[];
  laneCount: number;
}

interface State {}

export default class TimelineGrid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render(): JSX.Element {
    const { tasks, laneCount } = this.props;

    // todo move this up one level? Add logic into TaskScheduler to track earliest and latest dates
    // then these won't be hardcoded
    const startDate = moment("2018-01-01", DATE_FORMAT);

    const columnDates = getNSequentialDays(startDate, 10);

    return (
      <div className={styles.container}>
        <div className={styles.dateRow}>
          {/* todo extract to own method */}
          {columnDates.map(date => {
            return (
              <div key={date.dayOfYear()} className={styles.date}>
                {date.format(DATE_FORMAT_TIMELINE_DATE)}
              </div>
            );
          })}
        </div>

        <div className={styles.grid} style={{ background: "gray" }}>
          {/* todo extract to Task component */}
          {/* todo convert task start/end dates to grid columns */}
          {tasks.map(task => {
            const { name, laneIndex, id } = task;
            const rowNum = laneIndex + 1;

            return (
              <div
                key={id}
                className={styles.task}
                style={{ gridRow: `${rowNum}` }}
              >
                {id} {name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
