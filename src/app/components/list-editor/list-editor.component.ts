import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Idable } from '../../shared/idable.interface';

/**
 * An editable list of items which allows the user to add autocompleted items
 * to the list and also view current items and remove them.
 */
@Component({
  selector: 'vcl-list-editor',
  templateUrl: './list-editor.component.html',
  styleUrls: ['./list-editor.component.scss']
})
export class ListEditorComponent implements OnInit {
  /** The title of the list. **/
  @Input() title: string = 'Items';
  /** The items that are in the list. **/
  @Input() items: Array<ListEditorItem> = [];
  /** The available items to add used for autocomplete. **/
  @Input() available: Array<ListEditorItem> = [
    {
      id: 0,
      name: 'One'
    },
    {
      id: 1,
      name: 'Two'
    },
    {
      id: 2,
      name: 'Three'
    },
  ];
  /** Buttons to display in the header of the list. **/
  @Input() buttons: Array<ListEditorButton> = [
    new ListEditorButton('Manage') ];
  /** Whether the list is editable or not. **/
  @Input() editable: boolean = true;
  /** The placeholder for the input field for adding items. **/
  @Input() placeholder: string = '';

  /** Event output when the user selects to remove an item. **/
  @Output() removeItem: EventEmitter<any>;
  /** Event output when the user adds an item. **/
  @Output() addItem: EventEmitter<any>;
  /** Event output when the user clicks an item. **/
  @Output() itemClicked: EventEmitter<any>;
  /** Event output when the user clicks a button. **/
  @Output() buttonClicked: EventEmitter<any>;

  /** The form for adding items to the list. **/
  public addForm: FormGroup;

  /** Getter for if the form is valid. **/
  get valid(): boolean { return this.addForm.valid; }

  constructor() {
    this.removeItem = new EventEmitter();
    this.addItem = new EventEmitter();
    this.itemClicked = new EventEmitter();
    this.buttonClicked = new EventEmitter();
    this.addForm = new FormGroup({
      add: new FormControl()
    });
  }

  /**
   * Angular life cycle hook for component initialization.
   */
  public ngOnInit(): void {

  }

  /**
   * Resets `addForm`.
   */
  public reset(): void {
    this.addForm.reset();
  }

  /**
   * Emits `removeItem` with `item`.
   * @param {ListEditorItem} item The target item to rmeove.
   */
  public remove(item: ListEditorItem): void {
    this.removeItem.emit(item);
  }

  /**
   * Emits `itemClicked` with `item`.
   * @param {ListEditorItem} item The item that was clicked.
   */
  public click(item: ListEditorItem): void {
    this.itemClicked.emit(item);
  }

  /**
   * Emits `buttonClicked` with `button`.
   * @param {ListEditorButton} button The button that was clicked.
   */
  public onButtonClicked(button: ListEditorButton): void {
    this.buttonClicked.emit(button);
  }

  /**
   * Event handler for when `addForm` is submitted via ngSubmit event.
   */
  public onSubmit(): void {
    this.addItem.emit(this.addForm.get('add').value);
  }
}

/**
 * Interface for items in the ListEditor.
 */
export interface ListEditorItem extends Idable {
  /** The name of the item for display and autocomplete functionality. **/
  name: string;
}

/**
 * Wrapper class for the `buttons` input of ListEditorComponent.
 */
export class ListEditorButton {

  constructor(
    /** The label for display of the button. **/
    public label: string,
    /** Optional even type of the button. **/
    public event: string = label.toLowerCase().split(' ').join('_')
  ) { }

}
