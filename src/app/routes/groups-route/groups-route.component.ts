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
  /** The user groups for the route. **/
  public userGroups: Array<UserGroup>;

  /** The columns to display in the ListComponent. **/
  public listColumns: Array<ListColumn> = [
    new ListColumn('name'),
    new ListColumn('id'),
  ];

  /** The options to display in the ListComponent. **/
  public listOptions: Array<ListOption> = [
    new ListOption('Edit')
  ];

  constructor(private _provider: UserGroupProviderService) {
    this.userGroups = [];
  }

  /**
   * Event handler for ListComponent events.
   * @param {any} event The ListComponent event.
   */
  public handleListEvent(event: any): void {
    console.log(event);
  }

  /**
   * Event handler for when the user scrolls to the bottom of the list.
   * @param {any} event The event.
   */
  public onScrolledToBottom(event: any): void {
    console.log(event);
  }

  /**
   * OnInit Angular life cycle hook. Fetches user groups from the provider.
   */
  public ngOnInit(): void {
    this._provider.get(0)
      .then((group) => {
        this.userGroups.push(group);
      });
  }
}
