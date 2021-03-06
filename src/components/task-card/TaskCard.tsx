import React from "react";
import styles from "./TaskCard.module.scss";
import { Task } from "../../classes/task-scheduler/taskSchedulerUtils";

interface Props {
  task: Task;
  onTaskDelete: (event: React.MouseEvent | React.KeyboardEvent) => void;
}

/**
 * task card is the visual representation of a task itself
 */
export default function TaskCard(props: Props): JSX.Element {
  const { task, onTaskDelete } = props;
  const { name, laneIndex, id, startDateIndex, endDateIndex, sortIndex } = task;
  const taskRow = laneIndex + 1;
  const startColumn = startDateIndex + 1;
  const endColumn = endDateIndex + 1;

  return (
    <div
      key={id}
      className={styles.task}
      style={{
        gridRow: `${taskRow}`,
        gridColumnStart: `${startColumn}`,
        gridColumnEnd: `${endColumn}`
      }}
      id={id.toString()}
      role="button"
      tabIndex={sortIndex + 1}
      onMouseDown={onTaskDelete}
      onKeyUp={onTaskDelete}
    >
      {name}
    </div>
  );
}
