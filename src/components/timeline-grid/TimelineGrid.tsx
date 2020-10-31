import React from "react";
import moment from "moment";
import { Task } from "../../classes/task-scheduler/taskSchedulerUtils";
import TaskCard from "../task-card/TaskCard";
import { DATE_FORMAT_TIMELINE_DATE } from "../../utils/dateConstants";
import styles from "./TimelineGrid.module.scss";

interface Props {
  tasks: Task[];
  columnDates: moment.Moment[];
  columnCount: number;
}

/**
 * timeline grid renders the date headers, the schedule grid, and
 * the tasks themselves.
 */
export default function TimelineGrid(props: Props): JSX.Element {
  const { tasks, columnDates, columnCount } = props;

  const templateColumnsSetting = `repeat(${columnCount}, 10%)`;

  return (
    <div className={styles.container}>
      <div
        className={styles.dateRow}
        style={{
          gridTemplateColumns: templateColumnsSetting
        }}
      >
        {/* todo extract to own method */}
        {columnDates.map(date => {
          return (
            <div key={date.dayOfYear()} className={styles.date}>
              {date.format(DATE_FORMAT_TIMELINE_DATE)}
            </div>
          );
        })}
      </div>

      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: templateColumnsSetting
        }}
      >
        {tasks.map(task => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}
