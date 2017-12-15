import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { AuthenticationService } from './services/authentication.service';
import { ReservationProviderService } from './services/reservation-provider.service';
import { ImageProviderService } from './services/image-provider.service';
import { UserGroupProviderService } from './services/user-group-provider.service';
import { ImageGroupProviderService } from './services/image-group-provider.service';
import { ComputerProviderService } from './services/computer-provider.service';
import { ComputerGroupProviderService } from './services/computer-group-provider.service';
import { ManagementNodeProviderService } from './services/management-node-provider.service';
import { EventManagerService } from './services/event-manager.service';
import { MockBackendService } from './services/mock-backend.service';

import { LoginRouteComponent } from './routes/login-route/login-route.component';
import { ReservationsRouteComponent } from './routes/reservations-route/reservations-route.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeRouteComponent } from './routes/home-route/home-route.component';
import { AddReservationDialogComponent } from './components/add-reservation-dialog/add-reservation-dialog.component';
import { EditReservationDialogComponent } from './components/edit-reservation-dialog/edit-reservation-dialog.component';
import { ConnectReservationDialogComponent } from './components/connect-reservation-dialog/connect-reservation-dialog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavItemComponent } from './components/navigation/nav-item/nav-item.component';
import { ImagesRouteComponent } from './routes/images-route/images-route.component';
import { ListComponent } from './components/list/list.component';

import { GroupsRouteComponent } from './routes/groups-route/groups-route.component';
import { SchedulesRouteComponent } from './routes/schedules-route/schedules-route.component';
import { ComputersRouteComponent } from './routes/computers-route/computers-route.component';
import { FilterSelectorComponent } from './components/list/filter-selector/filter-selector.component';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { ListEditorComponent } from './components/list-editor/list-editor.component';
import { ImageDetailRouteComponent } from './routes/image-detail-route/image-detail-route.component';
import { ImageGroupsRouteComponent } from './routes/image-groups-route/image-groups-route.component';
import { FormStatusComponent } from './components/form-status/form-status.component';
import { ImageGroupDetailRouteComponent } from './routes/image-group-detail-route/image-group-detail-route.component';
import { ComputerGroupsRouteComponent } from './routes/computer-groups-route/computer-groups-route.component';
import { ComputerGroupDetailRouteComponent } from './routes/computer-group-detail-route/computer-group-detail-route.component';
import { ComputerDetailRouteComponent } from './routes/computer-detail-route/computer-detail-route.component';

import 'hammerjs';
import { ManagementNodesRouteComponent } from './routes/management-nodes-route/management-nodes-route.component';
import { ManagementNodeDetailRouteComponent } from './routes/management-node-detail-route/management-node-detail-route.component';
import { NotificationStackComponent } from './components/notification-stack/notification-stack.component';

let http: any
  = environment.production
  ? HttpClient
  : {
    provide: HttpClient,
    useClass: MockBackendService
  };

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginRouteComponent,
    data: { header: false, footer: false }
  },
  {
    path: 'reservations',
    component: ReservationsRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reservations/:id',
    component: ReservationDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'images',
    component: ImagesRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'images/:id',
    component: ImageDetailRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'imagegroups',
    component: ImageGroupsRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'imagegroups/:id',
    component: ImageGroupDetailRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'groups',
    component: GroupsRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'schedules',
    component: SchedulesRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'computers',
    component: ComputersRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'computers/:id',
    component: ComputerDetailRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'computergroups',
    component: ComputerGroupsRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'computergroups/:id',
    component: ComputerGroupDetailRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginRouteComponent,
    ReservationsRouteComponent,
    HomeRouteComponent,
    AddReservationDialogComponent,
    EditReservationDialogComponent,
    ConnectReservationDialogComponent,
    NavigationComponent,
    NavItemComponent,
    ImagesRouteComponent,
    ListComponent,
    GroupsRouteComponent,
    SchedulesRouteComponent,
    ComputersRouteComponent,
    FilterSelectorComponent,
    ReservationDetailComponent,
    ListEditorComponent,
    ImageDetailRouteComponent,
    ImageGroupsRouteComponent,
    FormStatusComponent,
    ImageGroupDetailRouteComponent,
    ComputerGroupsRouteComponent,
    ComputerGroupDetailRouteComponent,
    ComputerDetailRouteComponent,
    ManagementNodesRouteComponent,
    ManagementNodeDetailRouteComponent,
    NotificationStackComponent
  ],
  entryComponents: [
    AddReservationDialogComponent,
    EditReservationDialogComponent,
    ConnectReservationDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MdNativeDateModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    ReservationProviderService,
    ImageProviderService,
    ImageGroupProviderService,
    UserGroupProviderService,
    ComputerGroupProviderService,
    ComputerProviderService,
    ManagementNodeProviderService,
    EventManagerService,
    AuthGuard,
    http
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
