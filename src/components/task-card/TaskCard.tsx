import React from "react";
import styles from "./TaskCard.module.scss";

export default class TaskCard extends React.Component<any, any> {
  render(): JSX.Element {
    const { name, laneIndex, id, startDate, endDate } = this.props.task;
    const rowNum = laneIndex + 1;

    // todo delete me
    const startDateText = startDate.format("M/D");
    const endDateText = endDate.format("M/D");

    return (
      <div key={id} className={styles.task} style={{ gridRow: `${rowNum}` }}>
        ({startDateText}-{endDateText}) {id}: {name}
      </div>
    );
  }
}
