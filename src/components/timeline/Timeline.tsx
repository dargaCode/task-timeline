import React from "react";
import moment from "moment";
import { Task } from "../../classes/task-scheduler/taskSchedulerUtils";
import TaskCard from "../task-card/TaskCard";
import styles from "./Timeline.module.scss";
import DateHeaderRow from "../date-header-row/DateHeaderRow";

interface Props {
  tasks: Task[];
  columnDates: moment.Moment[];
  columnCount: number;
}

/**
 * timeline renders the date headers, the schedule grid, and
 * the tasks themselves.
 */
export default function Timeline(props: Props): JSX.Element {
  const { tasks, columnDates, columnCount } = props;

  const gridColumnsSetting = `repeat(${columnCount}, 10%)`;

  return (
    <div className={styles.container}>
      <div className={styles.timeline}>
        <DateHeaderRow
          columnDates={columnDates}
          gridColumnsSetting={gridColumnsSetting}
        />

        <div
          className={styles.grid}
          style={{
            gridTemplateColumns: gridColumnsSetting
          }}
        >
          {tasks.map(task => {
            return <TaskCard key={task.id} task={task} />;
          })}
        </div>
      </div>
    </div>
  );
}
