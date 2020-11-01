import React from "react";
import moment from "moment";
import styles from "./DateHeaderRow.module.scss";
import { DATE_FORMAT_TIMELINE_DATE } from "../../utils/dateConstants";

interface Props {
  columnDates: moment.Moment[];
  gridColumnsSetting: string;
}

function getColumnDateHeaders(columnDates: moment.Moment[]): JSX.Element[] {
  return columnDates.map(date => {
    return (
      <div key={date.dayOfYear()} className={styles.date}>
        {date.format(DATE_FORMAT_TIMELINE_DATE)}
      </div>
    );
  });
}

export default function DateHeaderRow(props: Props): JSX.Element {
  const { columnDates, gridColumnsSetting } = props;

  return (
    <div
      className={styles.dateRow}
      style={{
        gridTemplateColumns: gridColumnsSetting
      }}
    >
      {getColumnDateHeaders(columnDates)}
    </div>
  );
}
