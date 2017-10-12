import { Reservation } from './reservation.class';

describe('Reservation', () => {
  let reservation: Reservation;
  let start: Date;
  let end: Date;

  beforeEach(() => {
    start = new Date();
    end = new Date()
    end.setDate(start.getDate() + 1);
    reservation = new Reservation('a reservation', start, end);
  });

  it('should be created', () => {
    expect(reservation).toBeDefined();
    expect(reservation.name).toEqual('a reservation');
    expect(reservation.start).toEqual(start);
    expect(reservation.end).toEqual(end);
  });
});
