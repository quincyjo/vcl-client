import { Idable } from './idable.interface';
import { Group } from './group.class';

describe('Group', () => {
  let group: Group<Item>;
  let items: Array<Item>;

  beforeEach(() => {
    items = [
      new Item('Item 1'),
      new Item('Item 2'),
      new Item('Item 3')
    ];
    group = new Group<Item>(items.slice());
  });

  it('should construct', () => {
    expect(group).toBeDefined();
    expect(group.items).toBeDefined();
    expect(group.items.length).toEqual(items.length);
  });

  it('shoud have a gettable length', () => {
    expect(group.length).toBeDefined();
    expect(group.length).not.toBeNaN();
    expect(group.length).toEqual(group.items.length);
  });

  it('shoud have gettable items', () => {
    expect(group.value).toBeDefined();
    expect(group.value.length).toEqual(group.items.length);
    expect(Array.isArray(group.value)).toBeTruthy();
  });

  it('should be iterable', () => {
    let count = 0;
    for (let item of group) {
      expect(item).toBe(items[count]);
      count++;
    }
    expect(count).toEqual(items.length);
  });

  describe('#getByIndex', () => {
    it('should get the item by index', () => {
      let item = group.getByIndex(0);
      expect(item).toBeDefined();
      expect(item).toBe(items[0]);
    });

    it('should return null for invalid indices', () => {
      expect(group.getByIndex(-1)).toBeNull();
      expect(group.getByIndex(items.length)).toBeNull();
    });
  });

  describe('#add', () => {
    it('should add a new item', () => {
      let item = new Item('A new item!');
      let index = group.add(item);
      expect(index).toBeDefined();
      expect(index).not.toBeNaN();
      expect(group.length).toEqual(items.length + 1);
      expect(group.getByIndex(index)).toBe(item);
    });

    it('should not add duplicate items', () => {
      let item = items[0];
      let index = group.add(item);
      expect(index).toBeDefined();
      expect(index).not.toBeNaN();
      expect(group.length).toEqual(items.length);
      expect(group.getByIndex(index)).toBe(item);
    });
  });

  describe('#contains', () => {
    it('should return true if the item is in the group', () => {
      let doesContain = group.contains(items[0]);
      expect(doesContain).toBe(true);
    });

    it('should return false if the item is not in the group', () => {
      let doesContain = group.contains(new Item('A new item!'));
      expect(doesContain).toBe(false);
    });
  });
});

class Item implements Idable {
  static runningId: number = 0;

  public id: number;

  constructor(public value: string) {
    this.id = Item.runningId++;
  }
}
