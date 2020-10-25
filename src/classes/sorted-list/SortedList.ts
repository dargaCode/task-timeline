import { Comparator } from "./sortedListUtils";

export default class SortedList<T> {
  constructor(comparator: Comparator<T>) {
    // todo

    console.log(comparator);
  }

  add(item: T) {
    return 0;
  }

  get items(): T[] {
    return [];
  }

  remove(index: number): void {
    // todo
  }
}
