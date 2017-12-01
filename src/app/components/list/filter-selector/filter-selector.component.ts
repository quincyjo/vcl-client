import { Component, OnInit, OnChanges, SimpleChanges, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';
import { ListColumn } from '../list.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

/**
 * Generated filter inputs that allows the user to input filter settings. The
 * values of the filters are emitted through the `onChange` event whenever a
 * change occurs to the state of the form.
 */
@Component({
  selector: 'vcl-filter-selector',
  templateUrl: './filter-selector.component.html',
  styleUrls: ['./filter-selector.component.scss']
})
export class FilterSelectorComponent implements OnInit, OnChanges {
  /** The filters to display. **/
  @Input() filters: Array<FilterSelector> = [];
  /** If the form is disabled or not. **/
  @Input() disabled: boolean = false;

  /** Output for when the state of the form changes. **/
  @Output() onChange: EventEmitter<any>;

  /** The form for the filters. **/
  public filterForm: FormGroup;

  /** Stored timeout for `onChange`. **/
  private timeout;

  constructor() {
    this.onChange = new EventEmitter();
  }

  /**
   * onInit Angular life cycle hook. Creates FormControls from the `filters`
   * input and initializes `filterForm`. Also binds to the controls valueChanges
   * event stream.
   */
  ngOnInit(): void {
    let controls = {};
    for (let filter of this.filters) {
      controls[filter.key] = new FormControl({ value: '', disabled: this.disabled });
    }
    this.filterForm = new FormGroup(controls);
    for (let control of Object.keys(this.filterForm.controls)) {
      this.filterForm.get(control).valueChanges
        .subscribe((a) => {
          if (this.filterForm.valid) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => { this._emitChange()}, 1);
          }
        });
    }
  }

  /**
   * OnChanges Angular life cycle hook. Detects changes in the `disabled` input
   * and maps it to all FormControls.
   * @param {SimpleChanges} changes The changes.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterForm && changes.disabled) {
      for (let control of Object.keys(this.filterForm.controls)) {
        let target = this.filterForm.get(control);
        if (target && changes.disabled.currentValue) {
          target.disable();
        } else {
          target.enable();
        }
      }
    }
  }

  /**
   * Resets the form.
   */
  public reset(): void {
    this.filterForm.reset();
  }

  /**
   * Emits the current state of `filterForm` through `onChange`.
   */
  public _emitChange(): void {
    this.onChange.emit(this.filterForm.value);
  }
}

/**
 * Wraps the filters input to FilterSelectorComponent allowing elegant
 * creation of input configuration.
 */
export class FilterSelector {
  /** The current value to filter with. **/
  public value: string;

  constructor(
    /** Label to display with the filter. **/
    public label: string,
    /** The object key for which the filter attribute the filter references. **/
    public key: string = label
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
          if (+match === 0) return "";
          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        })
  ) { }

  /**
   * Sets the `key` attribute for the filter selector.
   * @param  {string}         key The desired value.
   * @return {FilterSelector}     The FilterSelector object.
   */
  public setKey(key: string): FilterSelector {
    this.key = key;
    return this;
  }

  /**
   * Generates a FilterSelector from a ListColumn.
   * @param  {ListColumn}     column The column to generate from.
   * @return {FilterSelector}        The generated FilterSelector object.
   */
  static fromListColumn(column: ListColumn): FilterSelector {
    return new FilterSelector(column.header).setKey(column.value);
  }
}
