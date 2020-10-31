import moment from "moment";

export function getOneDayAfter(date: moment.Moment): moment.Moment {
  return date.clone().add(1, "day");
}

export function getNSequentialDays(
  startDate?: moment.Moment,
  dayCount?: number
): moment.Moment[] {
  if (!startDate || !dayCount) {
    return [];
  }

  const dates: moment.Moment[] = [];
  const currentDate = startDate.clone();

  for (let i = 0; i < dayCount; i++) {
    const date = currentDate.clone();

    dates.push(date);
    currentDate.add(1, "days");
  }

  return dates;
}
