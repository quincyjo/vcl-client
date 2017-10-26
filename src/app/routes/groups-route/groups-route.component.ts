import { Component, OnInit } from '@angular/core';
import { UserGroupProviderService } from '../../services/user-group-provider.service';
import { ListComponent, ListColumn, ListColumnType, ListOption } from '../../components/list/list.component';
import { UserGroup } from '../../shared/user-group.class';

/**
 * Displays the group management page.
 */
@Component({
  selector: 'app-groups-route',
  templateUrl: './groups-route.component.html',
  styleUrls: ['./groups-route.component.scss']
})
export class GroupsRouteComponent implements OnInit {
  public userGroups: Array<UserGroup>;

  public listColumns: Array<ListColumn> = [
    new ListColumn('name'),
    new ListColumn('id'),
  ];

  public listOptions: Array<ListOption> = [
    new ListOption('Edit')
  ];

  constructor(private _provider: UserGroupProviderService) {
    this.userGroups = [];
  }

  public handleListEvent(event: any): void {
    console.log(event);
  }

  public onScrolledToBottom(event: any): void {
    console.log(event);
  }

  ngOnInit() {
    this._provider.get(0)
      .then((group) => {
        this.userGroups.push(group);
      });
  }
}
