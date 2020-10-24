import SortedList from "./SortedList";

const UNSORTED_NUMS = [2.67, 10, 12, 3, -23, 6, 20];
// adding UNSORTED_NUMS in index order should return these indices in order:
const NUM_ADDED_INDICES = [0, 1, 2, 1, 1, 3, 6];
const SORTED_NUMS = UNSORTED_NUMS.sort();

describe("SortedList", () => {
  describe("when instantiated without a comparator", () => {
    it("should contain an empty array", () => {
      const sortedNumList = new SortedList();

      expect(sortedNumList.items).toHaveLength(0);
    });

    describe(".add()", () => {
      it("should add the first item in the first index", () => {
        const sortedNumList = new SortedList();

        sortedNumList.add(10);

        expect(sortedNumList.items).toEqual([10]);
      });

      it("should keep list sorted as items are added", () => {
        const sortedNumList = new SortedList();

        UNSORTED_NUMS.forEach(num => {
          sortedNumList.add(num);
        });

        expect(sortedNumList.items).toEqual(SORTED_NUMS);
      });

      it("should return the index each number was placed at", () => {
        const sortedNumList = new SortedList();
        const indices: number[] = [];

        UNSORTED_NUMS.forEach(num => {
          indices.push(sortedNumList.add(num));
        });

        expect(indices).toEqual(NUM_ADDED_INDICES);
      });
    });

    describe(".items (getter)", () => {
      it("should return a copy of its array, not a ref to the array itself", () => {
        const sortedNumList = new SortedList();

        UNSORTED_NUMS.forEach(num => {
          sortedNumList.add(num);
        });

        const itemsCopyA: number[] = sortedNumList.items;

        // if this is a copy, these changes won't be reflected in the SortedList's array
        itemsCopyA.push(...Array(10).fill(0));

        const itemsCopyB = sortedNumList.items;

        expect(itemsCopyA).toHaveLength(SORTED_NUMS.length + 10);
        expect(itemsCopyA).not.toEqual(itemsCopyB);
        expect(itemsCopyB).toEqual(SORTED_NUMS);
      });
    });

    describe(".remove()", () => {
      it("it should shorten the list by one item", () => {
        const sortedNumList = new SortedList();

        UNSORTED_NUMS.forEach(num => {
          sortedNumList.add(num);
        });

        for (let i = 0; i < UNSORTED_NUMS.length; i++) {
          sortedNumList.remove(0);
        }

        expect(sortedNumList.items).toEqual([]);
      });

      it("it should remove the item at the specified index", () => {
        const sortedNumList = new SortedList();

        UNSORTED_NUMS.forEach(num => {
          sortedNumList.add(num);
        });

        const removalIndex = 2;
        const splicedNums = Array.from(SORTED_NUMS);

        splicedNums.splice(removalIndex, 1);
        sortedNumList.remove(removalIndex);

        expect(sortedNumList).toEqual(splicedNums);
      });

      it("should error when called on an empty array and the array is empty", () => {
        // TODO
      });

      it("should error when passed a negative index", () => {
        // TODO
      });

      it("should error when array is not empty, and is passed an index beyond its end", () => {
        // TODO
      });

      // TODO in the future can return the item and use it to build an undo stack
    });

    describe(".modify()", () => {
      it("", () => {
        // TODO this function will modify the item and then immediately re-sort it
      });

      // TODO in the future can return the item and use it to build an undo stack
    });
  });
});
