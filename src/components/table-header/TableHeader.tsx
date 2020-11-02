import React from "react";
import moment from "moment";
import styles from "./TableHeader.module.scss";
import {
  DATE_FORMAT_TIMELINE_MONTH,
  DATE_FORMAT_TIMELINE_DATE,
  DATE_FORMAT
} from "../../utils/dateConstants";

interface Props {
  columnDates: moment.Moment[];
  gridColumnsSetting: string;
}

function getMonthText(date: moment.Moment, dateIndex: number): string {
  const dayOfMonth = date.date();

  return dayOfMonth === 1 || dateIndex === 0
    ? date.format(DATE_FORMAT_TIMELINE_MONTH)
    : "";
}

function getMonthItems(columnDates: moment.Moment[]): JSX.Element[] {
  const monthItems: JSX.Element[] = [];

  columnDates.forEach((date, i) => {
    const monthText = getMonthText(date, i);

    if (monthText) {
      monthItems.push(
        <div
          key={date.format(DATE_FORMAT)}
          className={styles.month}
          style={{
            gridColumnStart: `${i + 1}`
          }}
        >
          {monthText}
        </div>
      );
    }
  });

  return monthItems;
}

function getDayItems(columnDates: moment.Moment[]): JSX.Element[] {
  return columnDates.map(date => {
    return (
      <div key={date.format(DATE_FORMAT)} className={styles.day}>
        {date.format(DATE_FORMAT_TIMELINE_DATE)}
      </div>
    );
  });
}

export default function TableHeader(props: Props): JSX.Element {
  const { columnDates, gridColumnsSetting } = props;

  return (
    <div className={styles.headerRow}>
      <div
        className={styles.monthRow}
        style={{
          gridTemplateColumns: gridColumnsSetting
        }}
      >
        {getMonthItems(columnDates)}
      </div>
      <div
        className={styles.dayRow}
        style={{ gridTemplateColumns: gridColumnsSetting }}
      >
        {getDayItems(columnDates)}
      </div>
    </div>
  );
}
