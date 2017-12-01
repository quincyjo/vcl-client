import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationProviderService } from '../../services/reservation-provider.service';

/**
 * Renders the detail view for the input `reservation`.
 */
@Component({
  selector: 'vcl-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss']
})
export class ReservationDetailComponent implements OnInit, OnDestroy {

  /** The actibely selected reservation. **/
  @Input() public reservation: any = {};

  /** Subscription to the route parameters. **/
  private paramsSub: any;

  constructor(
    private _provider: ReservationProviderService,
    private _route: ActivatedRoute,
  ) { }

  /**
   * OnInit hook to request data from the service provider after component
   * inititialization.
   */
  ngOnInit(): void {
    this.paramsSub = this._route.params.subscribe((params) => {
      if (!this.reservation.name) {
        let id = +params['id'];
        this._provider.get(id)
          .then((reservation) => {
            this.reservation = reservation;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }

  /**
   * OnDestroy Angular life cycle hook to unsubscribe from `paramsSub`.
   */
  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }
}
