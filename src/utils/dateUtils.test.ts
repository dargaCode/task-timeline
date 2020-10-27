import moment from "moment";
import { getOneDayAfter } from "./dateUtils";
import { DATE_FORMAT } from "./dateConstants";

describe("dateUtils", () => {
  describe("getOneDateAfter", () => {
    it("should return the next day", () => {
      const today = moment("2020-01-01", DATE_FORMAT);
      const tomorrow = getOneDayAfter(today);

      const tomorrowString = tomorrow.format(DATE_FORMAT);

      expect(tomorrowString).toBe("2020-01-02");
    });
  });
});
