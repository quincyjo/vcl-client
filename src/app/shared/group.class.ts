import { Idable } from './idable.interface';

/**
 * Describes a group of objects which are idable. Manages the collection
 * abstractly to allow set-like queries and management.
 */
export class Group<T extends Idable> implements Iterable<T> {

  /** The number of items in the group. **/
  get length(): number { return this.items.length; }

  /** The items in the group as an array. **/
  get value(): Array<T> { return this.items.slice(); }

  constructor(public items: Array<T> = []) { }

  /**
   * Symbol for iteration over items in the group.
   * @return {Iterator<T>} The iterator for the items.
   */
  [Symbol.iterator]() {
    let pointer = 0;
    let items = this.items.slice();

    return {
      next(): IteratorResult<T> {
        if (pointer < items.length) {
          return {
            done: false,
            value: items[pointer++]
          }
        } else {
          return {
            done: true,
            value: null
          }
        }
      }
    } as Iterator<T>;
  }

  /**
   * Gets an item from the group by index.
   * @param  {number} index The index of the desired item.
   * @return {T}            The item at index `index`.
   */
  public getByIndex(index: number): T {
    if (index > -1 && index < this.items.length) {
      return this.items[index];
    } else {
      return null;
    }
  }

  /**
   * Adds an item to the group. If it was already in the group, nothing is done.
   * Returns with the index of the item in `items`.
   * @param  {T}      item The item to add to the group.
   * @return {number}      The index of `item` in `items`.
   */
  public add(item: T): number {
    let index = this.items.findIndex((elem) => {
      return item.id === elem.id;
    });
    if (index !== -1) {
      return index;
    } else {
      this.items.push(item);
      return this.items.length - 1;
    }
  }

  public remove(item: T): boolean {
    let index = this.items.findIndex((elem) => {
      return item.id === elem.id;
    });
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Checks if the group contains the given `item` or not.
   * @param  {T}       item The item to check for.
   * @return {boolean}      If the item is contained in the group or not.
   */
  public contains(item: T): boolean {
    return !!this.items.find((elem) => {
      return elem.id === item.id;
    });
  }
}
