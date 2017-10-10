import { Reservation } from '../shared/reservation.class';

let id: number = 0;
export const RESERVATIONS: Array<Reservation> = [
  new Reservation('Reservation1', new Date(2017,8,15), new Date(2017,8,16), id++),
  new Reservation('Reservation2', new Date(2016,8,15), new Date(2016,9,1), id++),
  new Reservation('Reservation3', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation4', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation5', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation6', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation7', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation8', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation9', new Date(2017,7,15), new Date(2017,7,16), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++),
  new Reservation('Reservation0', new Date(2017,8,19), new Date(2017,8,21), id++)
];

export const RESERVATIONTYPES: Array<ReservationType> = [
  'Basic Reservation',
  'Imaging Reservation',
  'Server Reservation'
];

export const ENVIRONMENTS:  Array<string> = [
  'CentOS',
  'Linux Lab Machine',
  'Red Hat Enterprise Linux',
  'VCL Sandbox',
  'Windows 7 Base'
]

export type ReservationType = 'Basic Reservation'
                            | 'Imaging Reservation'
                            | 'Server Reservation';
