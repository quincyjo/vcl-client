import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageProviderService } from '../../services/image-provider.service';
import { ImageGroupProviderService } from '../../services/image-group-provider.service';
import { Image } from '../../shared/image.class';
import { ImageGroup } from '../../shared/image-group.class';
import { ListEditorButton, ListEditorItem } from '../../components/list-editor/list-editor.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormStatus } from '../../shared/form-status.class';

/**
 * Renders the details of a specific image by id encoded in the route parameter
 * with key 'id'.
 */
@Component({
  selector: 'vcl-image-detail-route',
  templateUrl: './image-detail-route.component.html',
  styleUrls: ['./image-detail-route.component.scss']
})
export class ImageDetailRouteComponent implements OnInit, OnDestroy {
  /** View child for the ListEditorComponent for the image's image groups. **/
  @ViewChild('groupList') groupList;

  /** The image to show the details off. **/
  private image: Image;

  /** The image groups. **/
  private imageGroups: Array<ImageGroup>;

  /** Subscription to the route parameters. **/
  private paramsSub: any;

  /** The form for editing the `image`. **/
  public imageForm: FormGroup;

  /** Whether of not to show advanced options. **/
  public showAdvanced: boolean = true;

  /** Timeout callback for saving changes. **/
  public saveTimeout: any;

  /** If changes have been saved. **/
  public saved: boolean;

  public status: FormStatus;

  /** Getter for the title of the page. **/
  get title(): string { return this.image ? this.image.name : 'loading...'; }

  /** The buttons to display on the list of image groups. **/
  public buttons: Array<ListEditorButton> = [
    new ListEditorButton('Manage')
  ];

  constructor(
    private _imageProvider: ImageProviderService,
    private _groupProvider: ImageGroupProviderService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.imageGroups = [];
    this.status = new FormStatus();
  }

  /**
   * Builds `imageForm` using FormBuilder.
   */
  private _buildForm(): void {
    this.imageForm = this._formBuilder.group({
      description: this.image.description,
      minRam: this.image.minRam,
      minProcNumber: this.image.minProcSpeed,
      minProcSpeed: this.image.minProcNumber,
      minNetwork: this.image.minNetwork,
      maxConcurrent: this.image.maxConcurrent,
      reloadTime: this.image.reloadTime,
      forCheckout: this.image.forCheckout,
      checkUser: false,
      administrativeAccess: false,
      hostname: 'host',
      connect: 'SSH'
    });
    this.imageForm.valueChanges.subscribe((value) => {
      this.status.pending('Unsaved changes...')
      if(this.saveTimeout) {
        clearTimeout(this.saveTimeout)
      }
      this.saveTimeout = setTimeout(() => {
        this._saveImage();
      }, 3000);
    });
  }

  /**
   * Event handler for the `imageForm`'s ngSubmit event.
   */
  public onFormSubmit(): void {
    this._saveImage();
  }

  /**
   * Updates `image` with the updated values from `imageForm` and attempts to
   * put the update to the backend. The promises resolves uppon the successful
   * update or rejects if an error occurs. Also manages `status` across the
   * save progress.
   * @param  {value}       value=this.imageForm.value The updated values.
   * @return {Promise<any>}                           The promise of the update.
   */
  private _saveImage(value = this.imageForm.value): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.status.pending('Unsaved changes...')
      for (let key of Object.keys(value)) {
        this.image[key] = value[key];
      }
      this._imageProvider.put(this.image)
        .then((image) => {
          this.status.success('Changes have been saved.');
        })
        .catch((error) => {
          this.status.error('Changes could not be saved')
          console.log('error: ', error);
        })
    });
    return promise;
  }

  /**
   * OnInit hook to request data from the service provider after component
   * inititialization.
   */
  ngOnInit() {
    this.paramsSub = this._route.params.subscribe((params) => {
      if (!this.image) {
        let id = +params['id'];
        this._imageProvider.get(id)
          .then((image) => {
            this.image = image;
            this._buildForm();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    let iterator: AsyncIterator<ImageGroup> = this._groupProvider.asyncIterator();
    let step = () => {
      iterator.next()
        .then((result) => {
          this.imageGroups.push(result.value);
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
   * Event handler for the addItem event from `groupList`.
   * @param {ImageGroup} group The group to add.
   */
  public groupListAddItem(group: ImageGroup): void {
    this.image.addGroup(group);
    this._imageProvider.put(this.image)
      .then((result) => {
        this.groupList.reset();
      })
      .catch((error) =>  {
        console.log(error);
      });
  }

  /**
   * Event handler for the removeItem event from `groupoList`.
   * @param {ImageGroup} group The image group to remove.
   */
  public groupListRemoveItem(group: ImageGroup): void {
    this.image.removeGroup(group);
    this._imageProvider.put(this.image)
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
      this._router.navigate(['imagegroups']);
    }
  }
}
