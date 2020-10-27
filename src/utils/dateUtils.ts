import moment from "moment";

export function getOneDayAfter(date: moment.Moment): moment.Moment {
  return date.clone().add(1, "day");
}
