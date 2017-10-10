import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { sprintf } from 'sprintf-js';

@Component({
  selector: 'vcl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {
  @Input() title: string = 'Items';
  @Input() selectable: boolean = true;
  @Input() items: Array<any> = [];
  @Input() columns: Array<ListColumn> = [];
  @Input() options: Array<ListOption> = [];

  @Output() buttonClicked: EventEmitter<any>;
  @Output() scrolledToBottom: EventEmitter<any>;

  @ViewChild('table') table: ElementRef;

  public selected: Array<any>;

  get tableTitle(): string {
    if(!this.selected.length) {
      return this.title;
    } else {
      let format: string = "%d item%s selected";
      return sprintf(format,
        this.selected.length, this.selected.length > 1 ? 's' : '');
    }
  }

  get manyOptions(): Array<ListOption> {
    return this.options
      ? this.options.filter((option) => { return !!option.many; })
      : [];
  }

  /**
   * True if all loaded reservations are selected, false if not.
   */
  get isAllSelected(): boolean {
    return this.selected.length && this.selected.length === this.items.length;
  }

  constructor() {
    this.selected = [];
    this.buttonClicked = new EventEmitter();
    this.scrolledToBottom = new EventEmitter();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let newSelected: Array<any> = [];
    for (let selected in this.selected) {
      if (changes.items.currentValue.find((elem) => {
        return selected['id'] === elem.id;
      })) {
        newSelected.push(selected);
      }
    }
    this.selected = newSelected;
  }

  /**
   * Scroll event listener. This is used to emit the scrolledToBottom event
   * when the user scrolls to the bottom of the list.
   */
  @HostListener("window:scroll", [])
  onWindowScroll() {
    // let number = this._element.nativeElement.offsetHeight;
    let bottom = window.pageYOffset + window.innerHeight;
    let compiled = this.table.nativeElement;
    let number = compiled.offsetHeight + compiled.offsetTop;
    if (bottom > number) this.scrolledToBottom.emit();
  }

  public print(item: any, key: any, type?: string): string {
    let value = item;
    let keys = key.split('.');
    for (let key of keys) {
      value = value[key];
    }
    if (type === 'date'){
      return (new Date(value)).toLocaleString();
    } else {
      return value !== undefined ? value.toString() : '';
    }
  }

  /**
   * Applies selection to all loaded reservation based on the event received.
   * @param {any} event A mdCheckbox change event.
   */
  public selectAll(event: any): void {
    this.items.forEach((reservation) => {
      this.selectItem(reservation, event.checked);
    });
  }

  /**
   * Selects the given reservation.
   * @param {Reservation} reservation The reservation to select.
   * @param {boolean}     state       Whether the reservation is selected or
   * deselected.
   */
  public selectItem(item: any, state: boolean = true): void {
    let index: number = this.selected.findIndex((elem) => {
      return elem.id === item.id;
    });
    if (state && index === -1) {
      item['selected'] = true;
      this.selected.push(item);
    } else if (!state && index !== -1){
      item['selected'] = false;
      this.selected.splice(index, 1);
    }
  }

  /**
   * Event handler for the MdCheckbox for a reservation in the list.
   * @param {any}         event       The MdCheckbox change event.
   * @param {Reservation} reservation The target reservation.
   */
  public onSelectedChange(event: any, item: any): void {
    this.selectItem(item, event.checked);
  }

  public onAddClicked(): void {
    this.buttonClicked.emit({
      event: 'create'
    })
  }

  public deleteSelected(): void {
    for (const item of this.selected) {
      this.buttonClicked.emit({
        target: item,
        event: 'delete'
      });
    }
  }

  public onManyButtonClick(event: MouseEvent, option: ListOption): void {
    this.buttonClicked.emit({
      target: this.selected.slice(),
      event: option.event
    })
  }

  public onButtonClick(event: MouseEvent, item: any, column: any): void {
    let output = {
      target: item,
      event: column.event || column.value
    }
    this.buttonClicked.emit(output);
  }
}

/**
 * Allowed types for columns in the ListComponent. The style of rendering
 * varies based on the type of the column.
 */
export  type ListColumnType = 'string' | 'date' | 'button' | 'number' | undefined;

/**
 * Represents a column for the ListComponent to render.
 * @param  {string}          header The label for the table head for the column.
 * @param  {string}          value  The path to the value of the item to
 *                                  display. dot notation is allowed to parse
 *                                  into sub-objects. By default it is the
 *                                  lowercase of the `header`.
 * @param  {ListColumnType}  type   The type of the column to control rendering
 *                                  style. 'string' is the default value.
 * @param  {string}          event  The even string is used as the `event`
 *                                  property of the event object fired such as
 *                                  for onClick of button type columns.
 */
export class ListColumn {
  constructor(
    public header: string,
    public value: string = header.toLowerCase(),
    public type: ListColumnType = 'string',
    public event: string = value.toLowerCase().replace(' ', '_')
  ) { }

  /**
   * Sets the header attribtue of the column.
   * @param  {string}     header The value to set `header` to.
   * @return {ListColumn}        The ListColumn object.
   */
  public setHeader(header: string): ListColumn {
    this.header = header;
    return this;
  }

  /**
   * Sets the value attribute of the column.
   * @param  {string}     value The value to set `value` to to.
   * @return {ListColumn}       The ListColumn object.
   */
  public setValue(value: string): ListColumn {
    this.value = value;
    return this;
  }

  /**
   * Sets the type attribute of the column.
   * @param  {ListColumnType} type The value to set `type` to.
   * @return {ListColumn}          The ListColumn object.
   */
  public setType(type: ListColumnType): ListColumn {
    this.type = type;
    return this;
  }

  /**
   * Sets the event attirbute of the column.
   * @param  {string}     event The value to set `event` to.
   * @return {ListColumn}       The ListColumn object.
   */
  public setEvent(event: string): ListColumn {
    this.event = event;
    return this;
  }
}

/**
 * Represents a list option for the list to render if options are enabled.
 * @param  {string}  label The label for the option, used in menus to display
 *                         the option.
 * @param  {string}  event The even name used to fire events when options are
 *                         selected. By default is constructed from the label
 *                         to lower case with '_'s replacing spaces.
 * @param  {boolean} many  If the option is allowed to be executed on many
 *                         selected items at once.
 */
export class ListOption {
  constructor(
    public label: string,
    public event: string = label.toLowerCase().replace(' ', '_'),
    public many: boolean = false
  ) { }

  /**
   * Sets the `label` attribute of the option.
   * @param  {string}     label The value to set `label` to.
   * @return {ListOption}       The ListOption object.
   */
  public setLabel(label: string): ListOption {
    this.label = label;
    return this;
  }

  /**
   * Sets the `event` attribute of the option.
   * @param  {string}     event The value to set `event` to.
   * @return {ListOption}       The ListOption object.
   */
  public setEvent(event: string): ListOption {
    this.event = event;
    return this;
  }

  /**
   * Sets the `many` attribute of the option.
   * @param  {boolean}    many The value to set `many` to.
   * @return {ListOption}      The ListOption object.
   */
  public setMany(many: boolean): ListOption {
    this.many = many;
    return this;
  }
}
