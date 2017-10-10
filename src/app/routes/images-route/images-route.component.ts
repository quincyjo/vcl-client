import { Component, OnInit } from '@angular/core';
import { ImageProviderService } from '../../services/image-provider.service';
import { Image } from '../../shared/image.class';

@Component({
  selector: 'app-images-route',
  templateUrl: './images-route.component.html',
  styleUrls: ['./images-route.component.scss']
})
export class ImagesRouteComponent implements OnInit {
  public columns = [
    {
      header: 'Name',
      value: 'name'
    }, {
      header: 'Owner',
      value: 'owner.email'
    }, {
      header: 'Image Type',
      value: 'type.name'
    }, {
      header: 'Platform',
      value: 'platform.name'
    }, {
      header: 'OS',
      value: 'os.prettyName'
    }
  ];

  get images(): Array<Image> { return this._provider.data; }

  constructor(private _provider: ImageProviderService) { }

  ngOnInit() {
    const iterator = this._provider.asyncIterator();
    let step = (iterator: AsyncIterator<Image>) => {
      iterator.next()
        .then((result) => {
          if (!result.done) step(iterator);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    step(iterator);
  }

  onScrolledToBottom(): void {
    console.log('asdlkjasd');
  }

}
