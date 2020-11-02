import React from "react";
import moment from "moment";
import styles from "./TableHeader.module.scss";
import {
  DATE_FORMAT_TIMELINE_DATE,
  DATE_FORMAT,
  DATE_FORMAT_YEAR,
  DATE_FORMAT_MONTH
} from "../../utils/dateConstants";

interface Props {
  columnDates: moment.Moment[];
  gridColumnsSetting: string;
}

/**
 * create an element for the first date in the timeline,
 * as well as for the first of every month
 * @param columnDates
 */
function getMonthItems(columnDates: moment.Moment[]): JSX.Element[] {
  const monthItems: JSX.Element[] = [];

  columnDates.forEach((date, i) => {
    const needMonth = date.date() === 1 || i === 0;

    if (needMonth) {
      monthItems.push(
        <div
          key={date.format(DATE_FORMAT)}
          className={styles.month}
          style={{
            gridColumnStart: `${i + 1}`
          }}
        >
          <div>{date.format(DATE_FORMAT_YEAR)}</div>
          <div>{date.format(DATE_FORMAT_MONTH)}</div>
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
