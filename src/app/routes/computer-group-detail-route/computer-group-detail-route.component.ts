import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComputerProviderService } from '../../services/computer-provider.service';
import { ComputerGroupProviderService } from '../../services/computer-group-provider.service';
import { Computer } from '../../shared/computer.class';
import { ComputerGroup } from '../../shared/computer-group.class';
import { ListEditorButton, ListEditorItem } from '../../components/list-editor/list-editor.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormStatus } from '../../shared/form-status.class';

/**
 * Renders the details of a given computer group detail for the user to access.
 * The id of the target group to render is embedded in the url with key 'id',
 */
@Component({
  selector: 'vcl-computer-group-detail-route',
  templateUrl: './computer-group-detail-route.component.html',
  styleUrls: ['./computer-group-detail-route.component.scss']
})
export class ComputerGroupDetailRouteComponent implements OnInit {
  /** View child for the ListEditorComponent for the computer's computer groups. **/
  @ViewChild('computerList') computerList;

  /** The ComputerGroup to show the details of. **/
  public computerGroup: ComputerGroup;

  /** The computers in `computerGroup`. **/
  public computers: Array<Computer>;

  /** Subscription to the route parameters. **/
  private paramsSub: any;

  /** The form for editing the `computer`. **/
  public computerGroupForm: FormGroup;

  /** Whether of not to show advanced options. **/
  public showAdvanced: boolean = true;

  /** Timeout callback for saving changes. **/
  public saveTimeout: any;

  /** If changes have been saved. **/
  public saved: boolean;

  /** The form status for the computer form. **/
  public status: FormStatus;

  /** The buttons to display on the list of computer groups. **/
  public buttons: Array<ListEditorButton> = [
    new ListEditorButton('Manage')
  ];


  /** Getter for the title of the page. **/
  get title(): string { return this.computerGroup ? this.computerGroup.name : 'loading...'; }

  constructor(
    private _computerProvider: ComputerProviderService,
    private _computerGroupProvider: ComputerGroupProviderService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.status = new FormStatus();
    this.computers = [];
  }

  /**
   * OnInit hook to request data from the service provider after component
   * inititialization.
   */
  ngOnInit(): void {
    this.paramsSub = this._route.params.subscribe((params) => {
      if (!this.computerGroup) {
        let id = +params['id'];
        this._computerGroupProvider.get(id)
          .then((computerGroup) => {
            this.computerGroup = computerGroup;
            this._buildForm();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    let iterator: AsyncIterator<Computer> = this._computerProvider.asyncIterator();
    let step = () => {
      iterator.next()
        .then((result) => {
          if(result.value) {
            this.computers.push(result.value);
            console.log(result.value);
          }
          if (!result.done) {
            step();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    step();
  }

  /**
   * OnDestroy Angular life cycle hook to unsubscribe from `paramsSub`.
   */
  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  /**
   * Event handler for the `computerForm`'s ngSubmit event.
   */
  public onFormSubmit(): void {
    console.log('submitting form!');
    this._saveComputerGroup();
  }

  /**
   * Builds `computerGroupForm` using FormBuilder.
   */
  private _buildForm(): void {
    this.computerGroupForm = this._formBuilder.group({
      name: this.computerGroup.name,
    });
    this.computerGroupForm.valueChanges.subscribe((value) => {
      this.status.pending('Unsaved changes...')
      if(this.saveTimeout) {
        clearTimeout(this.saveTimeout)
      }
      this.saveTimeout = setTimeout(() => {
        this._saveComputerGroup();
      }, 3000);
    });
  }

  /**
   * Updates `computerGroup` with the updated values from `computerGroupForm` and
   * attempts to put the update to the backend. The promises resolves uppon
   * the successful update or rejects if an error occurs. Also manages `status`
   * across the save progress.
   * @param  {value}       value=this.computerGroupForm.value The updated values.
   * @return {Promise<any>}                           The promise of the update.
   */
  private _saveComputerGroup(value = this.computerGroupForm.value): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.status.pending('Unsaved changes...')
      for (let key of Object.keys(value)) {
        this.computerGroup[key] = value[key];
      }
      this._computerGroupProvider.put(this.computerGroup)
        .then((computer) => {
          this.status.success('Changes have been saved.');
        })
        .catch((error) => {
          this.status.error('Changes could not be saved')
          console.log('error: ', error);
        });
    });
    return promise;
  }

  /**
   * Event handler for the addItem event from `groupList`.
   * @param {ComputerGroup} group The group to add.
   */
  public computerListAddItem(computer: Computer): void {
    this.computerGroup.addToGroup(computer);
    this._computerGroupProvider.put(this.computerGroup)
      .then((result) => {
        this.computerList.reset();
      })
      .catch((error) =>  {
        console.log(error);
      });
  }

  /**
   * Event handler for the removeItem event from `computerList`.
   * @param {ComputerGroup} group The computer group to remove.
   */
  public computerListRemoveItem(computer: Computer): void {
    this.computerGroup.removeFromGroup(computer);
    this._computerGroupProvider.put(this.computerGroup)
      .then((result) => {

      })
      .catch((error) =>  {
        console.log(error);
      });
  }

  /**
   * Event handler for the itemClicked event from `computerList`.
   * @param {any} event The click event.
   */
  public computerListClickItem(event: any): void {
    console.log(event);
  }

  /**
   * Event handler for the buttonClicked event from `computerList`.
   * @param {any} event The button event.
   */
  public computerListClickButton(event: any): void {
    if (event.event === 'manage') {
      this._router.navigate(['computers']);
    }
  }
}
