import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ListColumn } from '../list.component';

import { FilterSelectorComponent, FilterSelector } from './filter-selector.component';

describe('FilterSelectorComponent', () => {
  let component: FilterSelectorComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;
  let wrapper: TestComponentWrapper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [
        FilterSelectorComponent,
        TestComponentWrapper
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    wrapper = fixture.componentInstance;
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate with a form control for each FilterSelector', () => {
    expect(Object.keys(component.filterForm.controls).length).toEqual(wrapper.filters.length);
  });

  it('should accept a disabled input', () => {
    wrapper.disabled = true;
    fixture.detectChanges();
    expect(component.filterForm.get('name').disabled).toBe(true);
    expect(component.filterForm.get('id').disabled).toBe(true);
  });

  it('should call #_emitChange on each value change', async(() => {
    // let spy = spyOn(component, '_emitChange')
    //   .and.stub();
    // new Promise((resolve, reject) => {
    //   component.filterForm.get('name').setValue('asdf');
    //   setTimeout(() => {
    //       resolve();
    //   }, 5);
    // })
    // .then(() => {
    //   expect(spy).toHaveBeenCalled();
    //   let spy2 = spyOn(component, '_emitChange')
    //     .and.stub();
    //   new Promise((resolve, reject) => {
    //     component.filterForm.get('id').setValue('asdf');
    //     setTimeout(() => {
    //         resolve();
    //     }, 5);
    //   })
    //   .then(() => {
    //     expect(spy2).toHaveBeenCalled();
    //   });
    // });
  }));

  it('#reset should reset the form', () => {
    component.filterForm.get('name').setValue('A name');
    component.filterForm.get('id').setValue('An id');
    component.reset();
    expect(component.filterForm.get('name').value).toBeFalsy();
    expect(component.filterForm.get('id').value).toBeFalsy();
  });

  it('#_emitChange should emit the onChange event', async(() => {
    component.onChange.subscribe((event) => {
      expect(event).toBe(component.filterForm.value);
    });
    component['_emitChange']();
  }));
});

describe('FilterSelector', () => {
  let filter: FilterSelector;

  beforeEach(() => {
    filter = new FilterSelector('A Filter');
  });

  it('should be created', () => {
    expect(filter).toBeTruthy();
  });

  it('should convert the given to camelcase for key', () => {
    expect(filter.key).toEqual('aFilter');
  });

  it('#setKey should set the key and be dot chainable', () => {
    const chained = filter.setKey('A key!');
    expect(filter.key).toEqual('A key!');
    expect(chained).toBe(filter);
  });

  it('should create a FilterSelector from a ListColumn', () => {
    const column = new ListColumn('A column');
    const filter = FilterSelector.fromListColumn(column);
    expect(filter.label).toEqual(column.header);
    expect(filter.key).toEqual(column.value);
  });
});

@Component({
  selector: 'test-component-wrapper',
  template: `
    <vcl-filter-selector
      [filters]="filters"
      [disabled]="disabled">
    </vcl-filter-selector>
  `
})
class TestComponentWrapper {
  public filters: Array<FilterSelector>;
  public disabled: boolean;

  constructor() {
    this.filters = [
      new FilterSelector('Name'),
      new FilterSelector('Id')
    ];
  }
}
