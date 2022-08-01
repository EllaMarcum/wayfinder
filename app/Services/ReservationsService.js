import { ProxyState } from "../AppState.js";
import { Reservation } from "../Models/Reservation.js";

class ReservationsService {
  addReservation(tripId, type, name, confNum, address, date, cost) {
    ProxyState.reservations = [...ProxyState.reservations, new Reservation(tripId, type, name, confNum, address, new Date(date), cost)];
  }

  deleteReservation(id) {
    const result = confirm("Are you sure you want to delete?");
    if (result) {
      ProxyState.reservations = ProxyState.reservations.filter(r => {
        return r.id != id;
      });
    }
  }
}

export const reservationsService = new ReservationsService();