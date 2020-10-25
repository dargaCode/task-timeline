import { Comparator } from "./sortedListUtils";

/* numbers */

export const ascendingNumberComparator: Comparator<number> = (a, b) => {
  return a - b;
};

export const UNSORTED_NUMS = [2.67, 10, 12, 3, -23, 6, 20];
// adding UNSORTED_NUMS in index order should return these indices in order:
export const NUM_ADDED_INDICES = [0, 1, 2, 1, 0, 3, 6];
export const SORTED_NUMS = Array.from(UNSORTED_NUMS).sort(
  ascendingNumberComparator
);

/* people */

export interface Person {
  name: string;
  age: number;
}

export const ascendingPersonAgeComparator: Comparator<Person> = (a, b) => {
  return a.age - b.age;
};

export const UNSORTED_PEOPLE = [
  /* eslint-disable spellcheck/spell-checker */
  { name: "Laszlo", age: 325 },
  { name: "Jenna", age: 0 },
  { name: "Nadja", age: 582 },
  { name: "Nandor", age: 758 },
  { name: "Guillermo", age: 28 }
  /* eslint-enable spellcheck/spell-checker */
];
// adding UNSORTED_STRS in index order should return these indices in order:
export const PEOPLE_ADDED_INDICES = [0, 0, 2, 3, 1];
export const SORTED_PEOPLE = Array.from(UNSORTED_PEOPLE).sort(
  ascendingPersonAgeComparator
);
