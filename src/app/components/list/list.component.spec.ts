import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { ListComponent, ListOption, ListColumnType, ListColumn } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let wrapper: TestComponentWrapper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule
      ],
      declarations: [
        ListComponent,
        TestComponentWrapper
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    wrapper = fixture.debugElement.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Input', () => {
    it('should accept a title string', () => {
      expect(component.title).toEqual(wrapper.title);
      let compiled = fixture.debugElement.children[0].nativeElement;
      expect(compiled.querySelector('#header .title').textContent).toEqual(wrapper.title);
      wrapper.title = "A new title!";
      fixture.detectChanges();
      expect(component.title).toEqual(wrapper.title);
      compiled = fixture.debugElement.children[0].nativeElement;
      expect(compiled.querySelector('#header .title').textContent).toEqual(wrapper.title);
    });

    it('should accept a list of items', () => {
      expect(wrapper.items.length).toEqual(component.items.length);
      wrapper.items = [];
      fixture.detectChanges();
      expect(component.items.length).toEqual(0);
    });
  });

  describe('#print', () => {
    it('should print the attibute of an item', () => {
      const item = new Item('asdfjkl;');
      const key = 'value'
      const result = component.print(item, key);
      expect(typeof result).toBe('string');
      expect(result).toEqual('asdfjkl;');
    });

    it('should print dates to locale', () => {
      const date = new Date();
      const item = { value: date };
      const key = 'value'
      const result = component.print(item, key, 'date');
      expect(typeof result).toBe('string');
      expect(result).toEqual(date.toLocaleString());
    });

    it('should reference into nested objects with dot notation', () => {
      let item = {
        another: {
          value: 'a thing'
        }
      };
      const key = 'another.value'
      const result = component.print(item, key);
      expect(typeof result).toBe('string');
      expect(result).toEqual('a thing');
    });
  });

  describe('#selectItem', () => {
    it('should select an item', () => {
      component.selectItem(component.items[0]);
      fixture.detectChanges();
      expect(component.items[0].selected).toBeTruthy();
      expect(component.selected.length).toEqual(1);
      expect(component.selected[0]).toBe(component.items[0]);
    });

    it('should deselect an item', () => {
      component.selectItem(component.items[0]);
      fixture.detectChanges();
      component.selectItem(component.items[0], false);
      fixture.detectChanges();
      expect(component.items[0].selected).toBeFalsy();
      expect(component.selected.length).toEqual(0);
    });

    it('should ignore double selection', () => {
      component.selectItem(component.items[0]);
      fixture.detectChanges();
      component.selectItem(component.items[0]);
      fixture.detectChanges();
      expect(component.items[0].selected).toBeTruthy();
      expect(component.selected.length).toEqual(1);
      expect(component.selected[0]).toBe(component.items[0]);
    });

    it('should ignore invalid deselection', () => {
      component.selectItem(component.items[0], false);
      fixture.detectChanges();
      expect(component.items[0].selected).toBeFalsy();
      expect(component.selected.length).toEqual(0);
    })
  });

  it('should render the list', () => {
    let compiled = fixture.debugElement.children[0].nativeElement;
    expect(compiled.querySelector('#table #body').children.length).toEqual(wrapper.items.length);
  });

  it('should change title if an item is selected', () => {
    component.selected = [component.items[0]];
    fixture.detectChanges();
    const compiled = fixture.debugElement.children[0].nativeElement;
    expect(compiled.querySelector('#header .title').textContent).toEqual('1 item selected');
  });

  it('should change title if multiple items are selected', () => {
    component.selected = component.items;
    fixture.detectChanges();
    const compiled = fixture.debugElement.children[0].nativeElement;
    expect(compiled.querySelector('#header .title').textContent).toEqual(component.items.length + ' items selected');
  });

  it('should remove selected on deletion', () => {
    component.selected = [component.items[0]];
    fixture.detectChanges();
    wrapper.items = [];
    fixture.detectChanges();
    expect(component.selected.length).toEqual(0);
  });

  it('should not render options is non are given', () => {
    const compiled = fixture.debugElement.children[0].nativeElement;
    expect(compiled.querySelector('td.options')).toBeNull();
  });

  it('should render options when given', () => {
    wrapper.options = [
      new ListOption('Edit'),
      new ListOption('Delete')
    ];
    fixture.detectChanges();
    const compiled = fixture.debugElement.children[0].nativeElement;
    expect(compiled.querySelectorAll('td.options').length).toEqual(wrapper.items.length);
    expect(compiled.querySelector('td.options').children.length).toEqual(2);
  });

  it('should not render select boxes if non set', () => {
    const compiled = fixture.debugElement.children[0].nativeElement;
    expect(compiled.querySelector('td.select')).toBeNull();
  });

  it('should render select boxes when set', () => {
    wrapper.isSelectable = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.children[0].nativeElement;
    expect(compiled.querySelectorAll('td.select').length).toEqual(wrapper.items.length);
  });
});

describe('ListColumn', () => {
  it('should be constructed with a single argument', () => {
    const header = 'A Column'
    let col = new ListColumn(header);
    expect(col.header).toEqual(header);
    expect(col.value).toEqual(header.toLowerCase());
  });
});

describe('ListOption', () => {

});

@Component({
  selector: 'test-component-wrapper',
  template:`
    <vcl-list
      [title]="title"
      [columns]="columns"
      [options]="options"
      [selectable]="isSelectable"
      [items]="items">
    </vcl-list>
  `
})
class TestComponentWrapper {
  public items: Array<Item>;
  public pageIndex: number;
  public pageSize: number;
  public title: string;
  public columns: Array<ListColumn>;
  public options: Array<ListOption>;
  public isSelectable: boolean;

  constructor() {
    this.options = [];
    this.isSelectable = false;
    this.title = 'A title!';
    let id: number = 0;
    this.items = [
      new Item('Item1'),
      new Item('Item2'),
      new Item('Item3'),
      new Item('Item4'),
      new Item('Item5')
    ];
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].id = i;
    }
    this.columns = [
      new ListColumn('Value')
    ];
  }
}

class Item {
  public id: number;

  constructor(public value: string) { }
}
