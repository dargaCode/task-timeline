import React from "react";
import styles from "./TaskCard.module.scss";
import { Task } from "../../classes/task-scheduler/taskSchedulerUtils";

interface Props {
  task: Task;
}

export default function TaskCard(props: Props): JSX.Element {
  const { task } = props;
  const {
    name,
    laneIndex,
    id,
    startDate,
    endDate,
    startDateIndex,
    endDateIndex
  } = task;
  const taskRow = laneIndex + 1;
  const startColumn = startDateIndex + 1;
  const endColumn = endDateIndex + 1;

  // todo delete me
  const startDateText = startDate.format("M/D");
  const endDateText = endDate.format("M/D");

  return (
    <div
      key={id}
      className={styles.task}
      style={{
        gridRow: `${taskRow}`,
        gridColumnStart: `${startColumn}`,
        gridColumnEnd: `${endColumn}`
      }}
    >
      ({startDateText}-{endDateText}) {id}: {name}
    </div>
  );
}
