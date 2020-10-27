import { Comparator } from "./sortedListUtils";

export default class SortedList<T> {
  private readonly itemList: T[];

  private readonly comparator: Comparator<T>;

  constructor(comparator: Comparator<T>) {
    this.itemList = [];
    this.comparator = comparator;
  }

  /**
   * return the first index in the sorted list where the new item can be sorted
   * @param addItem the item for which to find an index
   * @private
   */
  private getInsertionIndex(addItem: T): number {
    let insertionIndex: number | null = null;

    // use find rather than forEach so that it can break early
    this.itemList.find((item, i) => {
      const comparison = this.comparator(item, addItem);

      // sort the item in front of identical items
      if (comparison >= 0) {
        insertionIndex = i;

        // break the loop
        return true;
      }

      // continue
      return false;
    });

    if (insertionIndex !== null) {
      return insertionIndex;
    }

    // ran out of numbers to compare, the correct slot must be at the end
    return this.itemList.length;
  }

  /**
   * add the item to the sorted array and return its index
   * @param addItem
   */
  add(addItem: T): number {
    const addIndex = this.getInsertionIndex(addItem);

    if (addIndex === this.itemList.length) {
      this.itemList.push(addItem);
    } else {
      this.itemList.splice(addIndex, 0, addItem);
    }

    return addIndex;
  }

  /**
   * return a copy of the sorted item list
   */
  get items(): T[] {
    return Array.from(this.itemList);
  }

  /**
   * remove the item at the given index
   * @param removeIndex the index of the item to remove
   */
  remove(removeIndex: number): void {
    this.itemList.splice(removeIndex, 1);
  }
}
