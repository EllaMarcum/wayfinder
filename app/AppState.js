import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { Trip } from "./Models/Trip.js"
import { Reservation } from "./Models/Reservation.js"

function _loadState() {
  let tempState = JSON.parse(window.localStorage.getItem('wayfair_data'));
  if (tempState) {
    let state = { trips: [], reservations: [] };
    tempState.trips.forEach(t => {
      state.trips.push(Object.assign(new Trip(), t));
    });

    tempState.reservations.forEach(r => {
      state.reservations.push(Object.assign(new Reservation(), r));
    })

    return state;
  } else {
    return null;
  }
}

class AppState extends EventEmitter {
  constructor() {
    super();

    // Used to clear the local storage then comment back out.
    //window.localStorage.clear();

    const state = _loadState();
    if (state) {
      this.trips = state.trips;
      this.reservations = state.reservations;
    } else {
      this.trips = [new Trip("Disneyland", "We are going to go to Disney!"), new Trip("Savannah", "Don't forget to go to Traylor Park's!")];
      this.reservations = [
        new Reservation(this.trips[0].id, "HOTEL", "Mariott", "X90345", "2424 West Way Rd", new Date('2024-12-30'), 234),
        new Reservation(this.trips[0].id, "HOTEL", "Mariott", "X90345", "2424 West Way Rd", new Date('2024-3-30'), 234),
        new Reservation(this.trips[1].id, "HOTEL", "Mariott", "X90345", "2424 West Way Rd", new Date('2024-12-30'), 234),
        new Reservation(this.trips[1].id, "HOTEL", "Mariott", "X90345", "2424 West Way Rd", new Date('2024-1-30'), 444),
        new Reservation(this.trips[1].id, "HOTEL", "Mariott", "X90345", "2424 West Way Rd", new Date('2024-11-30'), 234),
      ];
    }
  }
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
