import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListComponent, ListOption, ListColumnType, ListColumn } from './list.component';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let wrapper: TestComponentWrapper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        ListComponent,
        FilterSelectorComponent,
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

    it('should accept a selectable option', () => {
      wrapper.isSelectable  = false;
      fixture.detectChanges();
      const compiled = fixture.debugElement.children[0].nativeElement;
      expect(compiled.querySelector('#select-all')).toBeNull();
      expect(compiled.querySelectorAll('.select').length).toEqual(0);
      wrapper.isSelectable  = true;
      fixture.detectChanges();
      expect(compiled.querySelector('#select-all')).toBeDefined();
      expect(compiled.querySelectorAll('.select').length).toEqual(wrapper.items.length);
    });

    it('should accept generateFilterSelector option', () => {
      wrapper.generateFilterSelector = false;
      fixture.detectChanges();
      const compiled = fixture.debugElement.children[0].nativeElement;
      expect(compiled.querySelector('#filter-container')).toBeNull();
      expect(compiled.querySelector('#filter-toggle')).toBeNull();
      wrapper.generateFilterSelector = true;
      fixture.detectChanges();
      expect(compiled.querySelector('#filter-container')).toBeDefined();
      expect(compiled.querySelector('#filter-toggle')).toBeDefined();
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

  describe('#onColumnClick', () => {
    it('should set false to inc', () => {
      component.onColumnClick(undefined, wrapper.columns[0]);
      expect(wrapper.columns[0].sorted).toEqual('inc');
    });

    it('should set inc to dec', () => {
      wrapper.columns[0].sorted = 'inc'
      component.onColumnClick(undefined, wrapper.columns[0]);
      expect(wrapper.columns[0].sorted).toEqual('dec');
    });

    it('should set dec to false', () => {
      wrapper.columns[0].sorted = 'dec'
      component.onColumnClick(undefined, wrapper.columns[0]);
      expect(wrapper.columns[0].sorted).toBeFalsy();
    });

    it('should unsort all others', () => {
      // TODO
    });

    it('should be default order if not sorted', () => {
      for(let i = 0; i < component.sortedItems.length; i++) {
        expect(component.sortedItems[i]).toBe(component.items[i]);
      }
    });

    it('should sort in increasing order if inc', () => {
      component.onColumnClick(undefined, wrapper.columns[0]);
      for(let i = 0; i < component.sortedItems.length - 1; i++) {
        expect(component.sortedItems[i].value).toBeGreaterThanOrEqual(component.sortedItems[i + 1].value);
      }
    });

    it('should sort in decreasing order if dec', () => {
      component.onColumnClick(undefined, wrapper.columns[0]);
      component.onColumnClick(undefined, wrapper.columns[0]);
      for(let i = 0; i < component.sortedItems.length - 1; i++) {
        expect(component.sortedItems[i].value).toBeLessThanOrEqual(component.sortedItems[i + 1].value);
      }
    });
  });

  describe('filteredItems', () => {
    it('should filter based on filter descriptor', () => {
      component.filter = {
          'value': 'Item1'
      };
      fixture.detectChanges();
      expect(component.filteredItems.length).toEqual(1);
    });

    it('should ignore case', () => {
      component.filter = {
          'value': 'iTEM1'
      };
      fixture.detectChanges();
      expect(component.filteredItems.length).toEqual(1);
    });

    it('should find a partial match', () => {
      component.filter = {
          'value': '1'
      };
      fixture.detectChanges();
      expect(component.filteredItems.length).toEqual(1);
    });

    it('should find partials', () => {
      component.filter = {
          'value': 'item'
      };
      fixture.detectChanges();
      expect(component.filteredItems.length).toEqual(wrapper.items.length);
    });
  });

  describe('sortedItem', () => {
    it('should return all items in given order if no sort column', () => {
      expect(component.sortedItems.length).toEqual(component.items.length);
      for (let i = 0; i < component.items.length; i++) {
        expect(component.sortedItems[i]).toBe(component.items[i]);
      }
    });

    it('should inc sort by sorted column', () => {
      wrapper.columns[0].sorted = 'inc';
      fixture.detectChanges();
      for (let i = 0; i < component.sortedItems.length; i++) {
        for (let j = i + 1; j < component.sortedItems.length; j++) {
          expect(component.print(component.sortedItems[i], wrapper.columns[0].value) >=
            (component.print(component.sortedItems[j], wrapper.columns[0].value))).toBeTruthy();
        }
      }
    });

    it('should dec sort by sorted column', () => {
      wrapper.columns[0].sorted = 'dec';
      fixture.detectChanges();
      for (let i = 0; i < component.sortedItems.length; i++) {
        for (let j = i + 1; j < component.sortedItems.length; j++) {
          expect(component.print(component.sortedItems[i], wrapper.columns[0].value) <=
            (component.print(component.sortedItems[j], wrapper.columns[0].value))).toBeTruthy();
        }
      }
    });
  });

  it('should select all', () => {
    component.selectAll({checked: true});
    expect(component.selected.length).toEqual(component.items.length);
    for (const item of component.selected) {
      expect(item.selected).toBeTruthy();
    }
  });

  it('should select item on checkbox change', () => {
    let spy = spyOn(component, 'selectItem')
      .and.stub();
    component.onSelectedChange({ checked: true}, component.items[0]);
    expect(spy).toHaveBeenCalledWith(component.items[0], true);
  });

  it('should emit on add clicked', () => {
    let spy = spyOn(component.buttonClicked, 'emit')
      .and.stub();
    component.onAddClicked();
    expect(spy).toHaveBeenCalledWith({event: 'create'});
  });

  it('should emit for each selected item on deleteSelected', () => {
    let spy = spyOn(component.buttonClicked, 'emit')
      .and.stub();
    component.selectAll({checked: true});
    component.deleteSelected();
    expect(spy).toHaveBeenCalledTimes(5);
  });

  it('should emit for each selected item on many option', () => {
    let spy = spyOn(component.buttonClicked, 'emit')
      .and.stub();
    component.selectAll({checked: true});
    component.onManyButtonClick({} as MouseEvent, new ListOption('asdf'));
    expect(spy).toHaveBeenCalledTimes(5);
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
    component.selectItem(wrapper.items[0]);
    fixture.detectChanges();
    wrapper.items = [];
    fixture.detectChanges();
    expect(component.selected.length).toEqual(0);
  });

  it('should emit the column event on click', () => {
    let spy = spyOn(component.buttonClicked, 'emit')
      .and.stub();
    let item = new Item('an item');
    let column = new ListColumn('a column');
    component.onButtonClick({} as MouseEvent, item, column);
    expect(spy).toHaveBeenCalledWith({
      target: item,
      event: column.event
    });
  });

  it('should not render options if none are given', () => {
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
  let column: ListColumn;

  beforeEach(() => {
    column = new ListColumn('a column');
  });

  it('should be constructed with a single argument', () => {
    const header = 'A Column'
    let col = new ListColumn(header);
    expect(col.header).toEqual(header);
    expect(col.value).toEqual('a column');
    expect(col.type).toEqual('string');
    expect(col.event).toEqual('a_column');
  });

  it('should have a setable header and be dot chainable', () => {
    let chained = column.setHeader('a header');
    expect(column.header).toEqual('a header');
    expect(chained).toBe(column);
  });

  it('should have a setable value and be dot chainable', () => {
    let chained = column.setValue('a value');
    expect(column.value).toEqual('a value');
    expect(chained).toBe(column);
  });

  it('should have a setable type and be dot chainable', () => {
    let chained = column.setType('button');
    expect(column.type).toEqual('button');
    expect(chained).toBe(column);
  });

  it('should have a setable event and be dot chainable', () => {
    let chained = column.setEvent('event');
    expect(column.event).toEqual('event');
    expect(chained).toBe(column);
  });

  it('should be hidable', () => {
    let chained = column.hide();
    expect(column.hidden).toBeTruthy();
    expect(chained).toBe(column);
  });

  it('should be showable', () => {
    let chained = column.show();
    expect(column.hidden).toBeFalsy();
    expect(chained).toBe(column);
  });
});

describe('ListOption', () => {
  let option: ListOption;

  beforeEach(() => {
    option = new ListOption('a column');
  });

  it('should be constructed with a single argument', () => {
    const header = 'A Column'
    let col = new ListColumn(header);
    expect(col.header).toEqual(header);
    expect(col.value).toEqual('a column');
    expect(col.type).toEqual('string');
    expect(col.event).toEqual('a_column');
  });

  it('should have a setable label and be dot chainable', () => {
    let chained = option.setLabel('a label');
    expect(option.label).toEqual('a label');
    expect(chained).toBe(option);
  });

  it('should have a setable event and be dot chainable', () => {
    let chained = option.setEvent('event');
    expect(option.event).toEqual('event');
    expect(chained).toBe(option);
  });

  it('should have a setable many and be dot chainable', () => {
    let chained = option.setMany(true);
    expect(option.many).toBeTruthy();
    expect(chained).toBe(option);
  });
});

@Component({
  selector: 'test-component-wrapper',
  template:`
    <vcl-list
      [title]="title"
      [columns]="columns"
      [options]="options"
      [selectable]="isSelectable"
      [filter]="filter"
      [generateFilterSelector]="generateFilterSelector"
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
  public filter = {};
  public generateFilterSelector: boolean;

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
      new ListColumn('id'),
      new ListColumn('Value')
    ];
  }
}

class Item {
  public id: number;

  constructor(public value: string) { }
}
