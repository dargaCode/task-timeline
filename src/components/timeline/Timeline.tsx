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
  onTaskDelete: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

/**
 * timeline renders the date headers, the schedule grid, and
 * the tasks themselves.
 */
export default function Timeline(props: Props): JSX.Element {
  const { tasks, columnDates, columnCount, onTaskDelete } = props;

  const gridColumnsSetting = `repeat(${columnCount}, 5%)`;

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
            return (
              <TaskCard key={task.id} task={task} onTaskDelete={onTaskDelete} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
