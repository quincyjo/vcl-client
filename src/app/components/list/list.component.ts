import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { sprintf } from 'sprintf-js';

@Component({
  selector: 'vcl-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnChanges {
  /** The title of the list. If not set, 'Items' is the default value. **/
  @Input() title: string = 'Items';
  /** Determines if the list is selectable or not. Enabled by default. **/
  @Input() selectable: boolean = true;
  /** The list of items to display. **/
  @Input() items: Array<any> = [];
  /** The columns to display in the list. **/
  @Input() columns: Array<ListColumn> = [];
  /** The options to display if given, else option menues are not rendered. **/
  @Input() options: Array<ListOption> = [];
  /** If the list should be sortable or not. **/
  @Input() sortable: boolean = true;
  /** Filter attribute for text filtering. Not displayed if falsy. **/
  @Input() filter: string | false = 'name';

  /** Output for when a button or option button is clicked. **/
  @Output() buttonClicked: EventEmitter<any>;
  /** Output for when the bottom of the list is scrolled to. **/
  @Output() scrolledToBottom: EventEmitter<any>;
  /** Output for sort change to allow input update. **/
  @Output() sortChange: EventEmitter<any>;

  /** ViewChild for the table of items. **/
  @ViewChild('table') table: ElementRef;

  /** Array containing the currently selected items. **/
  public selected: Array<any>;

  public filterText: string = '';

  /**
   * The title to display at the top of the list. If no items are selected than
   * `title` is used. If items are selected, 'item(s)' will be displayed with
   * proper plurality.
   * @return {string} The title to display.
   */
  get tableTitle(): string {
    if(!this.selected.length) {
      return this.title;
    } else {
      let format: string = "%d item%s selected";
      return sprintf(format,
        this.selected.length, this.selected.length > 1 ? 's' : '');
    }
  }

  /**
   * The sorted items for sorted column or original order if no sort is set.
   * @return {Array<any>} The order of items to display.
   */
  get sortedItems(): Array<any> {
    let sort = this.columns.find((column) => {
      return !!column.sorted;
    });
    if (!sort) {
      return this.items.slice()
        .filter((elem) => {
          return (this.filterText
            ? this.print(elem, this.filter).toLowerCase().includes(this.filterText.toLowerCase())
            : true);
        });
    } else {
      return this.items.slice()
        .filter((elem) => {
          return (this.filterText
            ? this.print(elem, this.filter).toLowerCase().includes(this.filterText.toLowerCase())
            : true);
        })
        .sort((a, b) => {
          if(this.print(a, sort.value, sort.type) < this.print(b, sort.value, sort.type)) {
            return sort.sorted === 'inc' ? 1 : -1;
          } else {
            return sort.sorted === 'inc' ? -1 : 1;
          }
        });
    }
  }

  /**
   * Filters the given `options` to the ones which should be available across
   * multiple items.
   * @return {Array<ListOption>} The array of options to display in the header.
   */
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
    this.sortChange = new EventEmitter();
  }

  /**
   * Angular life-cycle hook for when data bound to the component changes.
   * Used to trim internal variables when the input `items` is changed.
   * Specifically, when items are removed from the input, they are also removed
   * from `selected` if present.
   * @param {SimpleChanges} changes The changes to bound data.
   */
  ngOnChanges(changes: SimpleChanges): void {
    let newSelected: Array<any> = [];
    for (let selected in this.selected) {
      let found = changes.items.currentValue.find((elem) => {
        return selected['id'] === elem.id;
      });
      if (found) {
        newSelected.push(found);
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

  /**
   * Handles click events on the column headers for settings sorting settings
   * and emits sortChange events to allow parent elements to update input.
   * @param {MouseEvent} mouseEvent The mouse event that triggered the click.
   * @param {ListColumn} column     The target column of the click.
   */
  public onColumnClick(mouseEvent: MouseEvent, column: ListColumn): void {
    if (this.sortable && column.type != 'button') {
      let target;
      if (!column.sorted) {
        target = 'inc';
      } else if (column.sorted === 'inc') {
        target = 'dec';
      } else {
        target = false;
      }
      for (let column of this.columns) {
        column.sorted = false;
      }
      column.sorted = target;
      this.sortChange.emit(column);
    }
  }

  /**
   * Prints a value from an item based on the column value and type. will
   * convert values to proper strings to display.
   * @param  {any}    item The item which is being displayed.
   * @param  {any}    key  The column value, poitining to the attribtue of
   *                       `item` to render.
   * @param  {string} type The ColumnType to determine render method.
   * @return {string}      The string to display.
   */
  public print(item: any, key: any, type?: string): string {
    let value = item;
    let keys = key.split('.');
    for (let key of keys) {
      value = value[key];
    }
    if (type === 'date'){
      return (new Date(value)).toLocaleString();
    } else {
      return value !== undefined ? value: '';
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

  /**
   * Event handler for when the user clicks on the 'add' button. Emits an event
   * to allow handling outside of ListComponent.
   */
  public onAddClicked(): void {
    this.buttonClicked.emit({
      event: 'create'
    })
  }

  /**
   * Event handler for when the user clicks on the 'delete' button. Emits an
   * event to allow handling outside of ListComponent.
   */
  public deleteSelected(): void {
    for (const item of this.selected) {
      this.buttonClicked.emit({
        target: item,
        event: 'delete'
      });
    };
  }

  /**
   * Handles a many option by emitting a series of events for each selected item
   * with the proper event key.
   * @param {MouseEvent} event  The mouse event on the button.
   * @param {ListOption} option The list option when was targetd.
   */
  public onManyButtonClick(event: MouseEvent, option: ListOption): void {
    for (const item of this.selected) {
      this.buttonClicked.emit({
        target: item,
        event: option.event
      });
    };
  }

  /**
   * Generic event handler for when a button column is clicked on. Emits an
   * object with the event name and target item.
   * @param {MouseEvent} event  The mouse event of the click.
   * @param {any}        item   The target item.
   * @param {any}        column The column which was the button clicked.
   */
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
  /** Status of the sorting value for the column. **/
  public sorted: 'inc' | 'dec' | boolean;
  /** Whether the column is hidden or not. **/
  public hidden: boolean;

  constructor(
    /** The header string for the column. **/
    public header: string,
    /** The object key path for the value to display in the column. **/
    public value: string = header.toLowerCase(),
    /** The type of content the target value is. **/
    public type: ListColumnType = 'string',
    /** The identifier string for events for the column. **/
    public event: string = value.toLowerCase().replace(' ', '_')
  ) {
    this.sorted = false;
    this.hidden = false;
  }

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

  /**
   * Hides the column from the list.
   * @return {ListColumn} The ListColumn object.
   */
  public hide(): ListColumn {
    this.hidden = true;
    return this;
  }

  /**
   * Shows the column from the list.
   * @return {ListColumn} The ListColumn object.
   */
  public show(): ListColumn {
    this.hidden = false;
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
    /** The printable label for the option. **/
    public label: string,
    /** The event identifier string for events for the option. **/
    public event: string = label.toLowerCase().replace(' ', '_'),
    /** If the option is executable over multiple items. **/
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
  public setMany(many: boolean = true): ListOption {
    this.many = many;
    return this;
  }
}
