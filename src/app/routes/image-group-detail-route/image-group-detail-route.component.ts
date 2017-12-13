import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageProviderService } from '../../services/image-provider.service';
import { ImageGroupProviderService } from '../../services/image-group-provider.service';
import { Image } from '../../shared/image.class';
import { ImageGroup } from '../../shared/image-group.class';
import { ComputerGroup } from '../../shared/computer-group.class';
import { ListEditorButton, ListEditorItem } from '../../components/list-editor/list-editor.component';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormStatus } from '../../shared/form-status.class';

/**
 * Renders the details of a specific image group by id encoded in the route
 * parameter with key 'id'.
 */
@Component({
  selector: 'vcl-image-group-detail-route',
  templateUrl: './image-group-detail-route.component.html',
  styleUrls: ['./image-group-detail-route.component.scss']
})
export class ImageGroupDetailRouteComponent implements OnInit, OnDestroy {
  /** View child for the ListEditorComponent for the image's image groups. **/
  @ViewChild('imageList') imageList;

  /** The ImageGroup to show the details of. **/
  public imageGroup: ImageGroup;

  /** The images in `imageGroup`. **/
  public images: Array<Image>;

  /** The ComputerGroups linked to `imageGroup`. **/
  public computerGroups: Array<ComputerGroup>;

  /** Subscription to the route parameters. **/
  private paramsSub: any;

  /** The form for editing the `image`. **/
  public imageGroupForm: FormGroup;

  /** Whether of not to show advanced options. **/
  public showAdvanced: boolean = true;

  /** Timeout callback for saving changes. **/
  public saveTimeout: any;

  /** If changes have been saved. **/
  public saved: boolean;

  /** The form status for the image form. **/
  public status: FormStatus;

  /** The buttons to display on the list of image groups. **/
  public buttons: Array<ListEditorButton> = [
    new ListEditorButton('Manage')
  ];


  /** Getter for the title of the page. **/
  get title(): string { return this.imageGroup ? this.imageGroup.name : 'loading...'; }

  constructor(
    private _imageProvider: ImageProviderService,
    private _imageGroupProvider: ImageGroupProviderService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.status = new FormStatus();
    this.images = [];
  }

  /**
   * OnInit hook to request data from the service provider after component
   * inititialization.
   */
  ngOnInit(): void {
    this.paramsSub = this._route.params.subscribe((params) => {
      if (!this.imageGroup) {
        let id = +params['id'];
        this._imageGroupProvider.get(id)
          .then((imageGroup) => {
            this.imageGroup = imageGroup;
            this._buildForm();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    let iterator: AsyncIterator<Image> = this._imageProvider.asyncIterator();
    let step = () => {
      iterator.next()
        .then((result) => {
          if(result.value) {
            this.images.push(result.value);
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
   * Event handler for the `imageForm`'s ngSubmit event.
   */
  public onFormSubmit(): void {
    console.log('submitting form!');
    this._saveImageGroup();
  }

  /**
   * Builds `imageGroupForm` using FormBuilder.
   */
  private _buildForm(): void {
    this.imageGroupForm = this._formBuilder.group({
      name: this.imageGroup.name,
    });
    this.imageGroupForm.valueChanges.subscribe((value) => {
      this.status.pending('Unsaved changes...')
      if(this.saveTimeout) {
        clearTimeout(this.saveTimeout)
      }
      this.saveTimeout = setTimeout(() => {
        this._saveImageGroup();
      }, 3000);
    });
  }

  /**
   * Updates `imageGroup` with the updated values from `imageGroupForm` and
   * attempts to put the update to the backend. The promises resolves uppon
   * the successful update or rejects if an error occurs. Also manages `status`
   * across the save progress.
   * @param  {value}       value=this.imageGroupForm.value The updated values.
   * @return {Promise<any>}                           The promise of the update.
   */
  private _saveImageGroup(value = this.imageGroupForm.value): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.status.pending('Unsaved changes...')
      for (let key of Object.keys(value)) {
        this.imageGroup[key] = value[key];
      }
      this._imageGroupProvider.put(this.imageGroup)
        .then((image) => {
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
   * @param {ImageGroup} group The group to add.
   */
  public imageListAddItem(image: Image): void {
    this.imageGroup.addToGroup(image);
    this._imageGroupProvider.put(this.imageGroup)
      .then((result) => {
        this.imageList.reset();
      })
      .catch((error) =>  {
        console.log(error);
      });
  }

  /**
   * Event handler for the removeItem event from `groupList`.
   * @param {ImageGroup} group The image group to remove.
   */
  public imageListRemoveItem(image: Image): void {
    this.imageGroup.removeFromGroup(image);
    this._imageGroupProvider.put(this.imageGroup)
      .then((result) => {

      })
      .catch((error) =>  {
        console.log(error);
      });
  }

  /**
   * Event handler for the itemClicked event from `groupList`.
   * @param {any} event The click event.
   */
  public imageListClickItem(event: any): void {
    console.log(event);
  }

  /**
   * Event handler for the buttonClicked event from `groupList`.
   * @param {any} event The button event.
   */
  public imageListClickButton(event: any): void {
    if (event.event === 'manage') {
      this._router.navigate(['images']);
    }
  }
}
