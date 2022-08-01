import { ProxyState } from "../AppState.js";
import { Trip } from "../Models/Trip.js";
import { Reservation } from "../Models/Reservation.js";
import { generateId } from "../Utils/generateId.js"

class TripsService {
  addTrip(name) {
    let trip = new Trip(name, "");
    ProxyState.trips = [...ProxyState.trips, trip];
  }

  deleteTrip(id) {
    const result = confirm("Are you sure you want to delete?");
    if (result) {
      ProxyState.reservations = ProxyState.reservations.filter(r => {
        return r.tripId != id;
      });

      ProxyState.trips = ProxyState.trips.filter(t => {
        return t.id != id;
      });
    }
  }

  saveNotes(id, notes) {
    const tripIndex = ProxyState.trips.findIndex((t) => t.id === id);
    ProxyState.trips[tripIndex].notes = notes;
    ProxyState.flag = generateId();
    alert("Notes saved.");
  }

  updateShow(id, show) {
    const tripIndex = ProxyState.trips.findIndex((t) => t.id === id);
    ProxyState.trips[tripIndex].show = (ProxyState.trips[tripIndex].show === '➖') ? '➕' : '➖';
    ProxyState.flag = generateId();
    return false;
  }
}

export const tripsService = new TripsService();