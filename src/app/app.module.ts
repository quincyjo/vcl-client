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

import 'hammerjs';

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
    canActivate: [AuthGuard] },
  {
    path: 'images',
    component: ImagesRouteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeRouteComponent,
    canActivate: [AuthGuard]
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
    ListComponent
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
    AuthGuard,
    http
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
