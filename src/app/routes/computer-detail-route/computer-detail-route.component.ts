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
 * Renders the details of a given computer detail for the user to access. The
 * id of the target computer to render is embedded in the url with key 'id',
 */
@Component({
  selector: 'vcl-computer-detail-route',
  templateUrl: './computer-detail-route.component.html',
  styleUrls: ['./computer-detail-route.component.scss']
})
export class ComputerDetailRouteComponent implements OnInit, OnDestroy {
  /** View child for the ListEditorComponent for the computer's computer groups. **/
  @ViewChild('groupList') groupList;

  /** The computer to show the details off. **/
  private computer: Computer;

  /** The computer groups. **/
  private computerGroups: Array<ComputerGroup>;

  /** Subscription to the route parameters. **/
  private paramsSub: any;

  /** The form for editing the `computer`. **/
  public computerForm: FormGroup;

  /** Whether of not to show advanced options. **/
  public showAdvanced: boolean = true;

  /** Timeout callback for saving changes. **/
  public saveTimeout: any;

  /** If changes have been saved. **/
  public saved: boolean;

  /** The form status for the computer form. **/
  public status: FormStatus;

  /** Getter for the title of the page. **/
  get title(): string { return this.computer ? this.computer.hostname : 'loading...'; }

  /** The buttons to display on the list of computer groups. **/
  public buttons: Array<ListEditorButton> = [
    new ListEditorButton('Manage')
  ];

  constructor(
    private _computerProvider: ComputerProviderService,
    private _groupProvider: ComputerGroupProviderService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.computerGroups = [];
    this.status = new FormStatus();
  }

  /**
   * OnInit hook to request data from the service provider after component
   * inititialization.
   */
  ngOnInit(): void {
    this.paramsSub = this._route.params.subscribe((params) => {
      if (!this.computer) {
        let id = +params['id'];
        this._computerProvider.get(id)
          .then((computer) => {
            this.computer = computer;
            this._buildForm();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    let iterator: AsyncIterator<ComputerGroup> = this._groupProvider.asyncIterator();
    let step = () => {
      iterator.next()
        .then((result) => {
          this.computerGroups.push(result.value);
          // console.log(result.value);
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
   * Builds `computerForm` using FormBuilder.
   */
  private _buildForm(): void {
    this.computerForm = this._formBuilder.group({
      hostname: this.computer.hostname,
    });
    this.computerForm.valueChanges.subscribe((value) => {
      this.status.pending('Unsaved changes...')
      if(this.saveTimeout) {
        clearTimeout(this.saveTimeout)
      }
      this.saveTimeout = setTimeout(() => {
        this._saveComputer();
      }, 3000);
    });
  }

  /**
   * Event handler for the `computerForm`'s ngSubmit event.
   */
  public onFormSubmit(): void {
    console.log('submitting form!');
    this._saveComputer();
  }

  /**
   * Updates `computer` with the updated values from `computerForm` and attempts
   * to put the update to the backend. The promises resolves uppon the
   * successful update or rejects if an error occurs. Also manages `status`
   * across the save progress.
   * @param  {value}       value=this.computerForm.value The updated values.
   * @return {Promise<any>}                           The promise of the update.
   */
  private _saveComputer(value = this.computerForm.value): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.status.pending('Unsaved changes...')
      for (let key of Object.keys(value)) {
        this.computer[key] = value[key];
      }
      this._computerProvider.put(this.computer)
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
  public groupListAddItem(group: ComputerGroup): void {
    this.computer.addGroup(group);
    this._computerProvider.put(this.computer)
      .then((result) => {
        this.groupList.reset();
      })
      .catch((error) =>  {
        console.log(error);
      });
  }

  /**
   * Event handler for the removeItem event from `groupoList`.
   * @param {ComputerGroup} group The computer group to remove.
   */
  public groupListRemoveItem(group: ComputerGroup): void {
    this.computer.removeGroup(group);
    this._computerProvider.put(this.computer)
      .then((result) => {

      })
      .catch((error) =>  {
        console.log(error);
      });
  }

  /**
   * Event handler for the itemClicked event from `grouList`.
   * @param {any} event The click event.
   */
  public groupListClickItem(event: any): void {
    console.log(event);
  }

  /**
   * Event handler for the buttonClicked event from `groupList`.
   * @param {any} event The button event.
   */
  public groupListClickButton(event: any): void {
    if (event.event === 'manage') {
      this._router.navigate(['computergroups']);
    }
  }
}
