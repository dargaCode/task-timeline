import moment from "moment";

export function getOneDayAfter(date: moment.Moment): moment.Moment {
  return date.clone().add(1, "day");
}

/**
 * return moment dates for the start date and n sequential
 * days after that. Sequence is every day, no gaps.
 *
 * @param startDate day to start counting from
 * @param dayCount how many days to add beyond start
 */
export function getNSequentialDaysFromStart(
  startDate: moment.Moment,
  dayCount: number
): moment.Moment[] {
  const dates: moment.Moment[] = [];
  const currentDate = startDate.clone();

  for (let i = 0; i < dayCount; i++) {
    const date = currentDate.clone();

    dates.push(date);
    currentDate.add(1, "days");
  }

  return dates;
}

/**
 * returns the total days between start and end date, inclusive
 * of both the start date and end date
 * @param startDate from the beginning of this day
 * @param endDate to the end of this day
 */
export function getDateRangeInclusiveDayCount(
  startDate: moment.Moment,
  endDate: moment.Moment
): number | undefined {
  // inclusive of both start and end dates
  return 1 + endDate.diff(startDate, "days");
}
