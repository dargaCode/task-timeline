import SortedList from "./SortedList";
import {
  ascendingNumberComparator,
  UNSORTED_NUMS,
  NUM_ADDED_INDICES,
  SORTED_NUMS,
  Person,
  ascendingPersonAgeComparator,
  UNSORTED_PEOPLE,
  PEOPLE_ADDED_INDICES,
  SORTED_PEOPLE
} from "./mockSortedListData";

let sortedNumList: SortedList<number>;

describe("SortedList", () => {
  beforeEach(() => {
    sortedNumList = new SortedList<number>(ascendingNumberComparator);
  });

  describe("when instantiated", () => {
    it("should contain an empty array", () => {
      expect(sortedNumList.items).toHaveLength(0);
    });
  });

  describe(".add()", () => {
    it.skip("should not accept items of the wrong type", () => {
      // TODO
    });

    it("should add the first item in the first index", () => {
      sortedNumList.add(10);

      expect(sortedNumList.items).toEqual([10]);
    });

    it("should keep list sorted as items are added", () => {
      UNSORTED_NUMS.forEach(num => {
        sortedNumList.add(num);
      });

      expect(sortedNumList.items).toEqual(SORTED_NUMS);
    });

    it("should return the index each number was placed at", () => {
      const indices: number[] = [];

      UNSORTED_NUMS.forEach(num => {
        indices.push(sortedNumList.add(num));
      });

      expect(indices).toEqual(NUM_ADDED_INDICES);
    });

    it("should sort generic items by generic comparators", () => {
      // note this test is using people instead of numbers like the rest
      const sortedPersonList = new SortedList<Person>(
        ascendingPersonAgeComparator
      );

      const indices: number[] = [];

      UNSORTED_PEOPLE.forEach(num => {
        indices.push(sortedPersonList.add(num));
      });

      expect(indices).toEqual(PEOPLE_ADDED_INDICES);
      expect(sortedPersonList.items).toEqual(SORTED_PEOPLE);
    });
  });

  describe(".items (getter)", () => {
    it("should return a copy of its array, not a ref to the array itself", () => {
      UNSORTED_NUMS.forEach(num => {
        sortedNumList.add(num);
      });

      const itemsCopyA: number[] = sortedNumList.items;

      // if itemsCopyA is a copy, this change won't be reflected in the SortedList's array
      itemsCopyA.push(0);

      const itemsCopyB = sortedNumList.items;

      expect(itemsCopyA).toHaveLength(SORTED_NUMS.length + 1);
      expect(itemsCopyA).not.toEqual(itemsCopyB);
      expect(itemsCopyB).toEqual(SORTED_NUMS);
    });
  });

  describe(".remove()", () => {
    it("it should shorten the list by one item", () => {
      UNSORTED_NUMS.forEach(num => {
        sortedNumList.add(num);
      });

      for (let i = 0; i < UNSORTED_NUMS.length; i++) {
        sortedNumList.remove(0);
      }

      expect(sortedNumList.items).toEqual([]);
    });

    it("it should remove the item at the specified index", () => {
      UNSORTED_NUMS.forEach(num => {
        sortedNumList.add(num);
      });

      const removalIndex = 2;
      const splicedNums = Array.from(SORTED_NUMS);

      splicedNums.splice(removalIndex, 1);
      sortedNumList.remove(removalIndex);

      expect(sortedNumList.items).toEqual(splicedNums);
    });

    it.skip("should error when called on an empty array and the array is empty", () => {
      // TODO
    });

    it.skip("should error when passed a negative index", () => {
      // TODO
    });

    it.skip("should error when array is not empty, and is passed an index beyond its end", () => {
      // TODO
    });

    // TODO in the future can return the item and use it to build an undo stack
  });

  describe.skip(".modify()", () => {
    it("", () => {
      // TODO this function will modify the item and then immediately re-sort it
    });

    // TODO in the future can return the item and use it to build an undo stack
  });
});
