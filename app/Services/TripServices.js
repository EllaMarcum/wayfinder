import { ProxyState } from "../AppState.js";
import { Trip } from "../Models/Trip.js";
import { Reservation } from "../Models/Reservation.js";

function _saveState() {
  window.localStorage.setItem('wayfair_data', JSON.stringify({ trips: ProxyState.trips, reservations: ProxyState.reservations }));
}

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
    _saveState();
  }
}

export const tripsService = new TripsService();