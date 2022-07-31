import { ProxyState } from "../AppState.js";
import { tripsService } from "../Services/TripsService.js";

function _draw() {
  let trips = ProxyState.trips;
  let reservations = ProxyState.reservations.sort(
    (rA, rB) => Number(rA.date) - Number(rB.date),
  );
  let tripsTemplate = '';
  let reservationsTemplate = '';

  trips.forEach(t => tripsTemplate += t.TripTemplate);
  document.getElementById("app").innerHTML = tripsTemplate;

  let costs = [];
  reservations.forEach(r => {
    let reservations = document.getElementById(r.tripId);
    if (reservations.innerHTML) {
      document.getElementById(r.tripId).innerHTML += r.ReservationTemplate;
    }

    if (costs[r.tripId]) {
      costs[r.tripId] += r.cost;
    } else {
      costs[r.tripId] = r.cost;
    }
  });

  console.log(costs)

  trips.forEach(t => {
    document.getElementById(t.id).innerHTML += t.ReservationFormTemplate;
    document.getElementById(`total-cost_${t.id}`).innerHTML += `Total: $${costs[t.id]}`;
  });
}

function _onDataChange() {
  _saveState();
  _draw();
}

function _saveState() {
  window.localStorage.setItem('wayfair_data', JSON.stringify({ trips: ProxyState.trips, reservations: ProxyState.reservations }));
}

export class TripsController {
  constructor() {
    ProxyState.on("trips", _onDataChange);
    ProxyState.on("reservations", _onDataChange);
    _draw();
  }

  addTrip(name) {
    if (name.length > 2 && name.length < 16) {
      tripsService.addTrip(name);
    }
  }

  deleteTrip(id) {
    tripsService.deleteTrip(id);
  }

  saveNotes(id, notes) {
    tripsService.saveNotes(id, notes);
  }
}