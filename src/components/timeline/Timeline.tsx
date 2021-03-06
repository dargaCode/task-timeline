import React from "react";
import moment from "moment";
import { Task } from "../../classes/task-scheduler/taskSchedulerUtils";
import TaskCard from "../task-card/TaskCard";
import styles from "./Timeline.module.scss";
import TableHeader from "../table-header/TableHeader";

// eslint-disable-next-line spellcheck/spell-checker
const COLUMN_WIDTH = "85px";

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
  const gridColumnsSetting = `repeat(${columnCount}, ${COLUMN_WIDTH})`;

  return (
    // false positive
    // eslint-disable-next-line css-modules/no-undef-class
    <div className={styles.container}>
      <h1>Task Timeline</h1>

      <div className={styles.timeline}>
        <TableHeader
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
