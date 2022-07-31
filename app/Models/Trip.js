import { generateId } from "../Utils/generateId.js"

export class Trip {
  constructor(name, notes) {
    this.id = generateId();
    this.name = name;
    this.notes = notes;
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  get TripTemplate() {
    return /*html*/`
            <div class="trip-card shadow rounded">
              <div class="row trip-header">
                <div class="col-10">
                  <h2 class='trip-name'>${this.name}</h2>
                </div>
                <div class="col-2 d-flex flex-row-reverse">
                  <button onClick="javascript:app.tripsController.deleteTrip('${this.id}');">X</button>
                  <button type="button" data-bs-toggle="collapse" data-bs-target="#trip-body_${this.id}" area-expanded="false" aria-controls="trip-body_${this.id}");">➖/➕</button>
                </div>
              </div>
              <div class="collapse show" id="trip-body_${this.id}">
                <div class="row hide-when-small reservation-table-header">
                  <div class="col-1"><h4>Type</h4></div>
                  <div class="col-2"><h4>Name</h4></div>
                  <div class="col-3"><h4>Confirmation Number</h4></div>
                  <div class="col-3"><h4>Address</h4></div>
                  <div class="col-1"><h4>Date</h4></div>
                  <div class="col-1"><h4>Cost</h4></div>
                  <div class="col-1"></div>
                </div>
                <div id="${this.id}">
                </div>
                <div class="notes-container">
                  <div class="row">
                    <div class="col">
                      Notes
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <textarea class="notes-field" id="notes-field_${this.id}">${this.notes}</textarea>
                      <button type="button" onClick="javascript:app.tripsController.saveNotes('${this.id}', document.getElementById('notes-field_${this.id}').value);">Save Notes</button>
                    </div>
                    <div class="col-6 d-flex flex-row-reverse">
                      <h3 id="total-cost_${this.id}"></h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
  }

  get ReservationFormTemplate() {
    return `
            <form action="javascript:app.reservationsController.addReservation('${this.id}', reservationType_${this.id}.value, reservationName_${this.id}.value, reservationConfNum_${this.id}.value, reservationAddress_${this.id}.value, reservationDate_${this.id}.value, reservationCost_${this.id}.value);">
              <div class="row reservation-form-card">
                <div class="col-1">
                  <select class="form-control" id="reservationType_${this.id}" required>
                    <option value="HOTEL">HOTEL</option>
                    <option value="CAR">CAR</option>
                    <option value="SPA">SPA</option>
                    <option value="PLANE">PLANE</option>
                  </select>
                </div>
                <div class="col-2">
                  <input type="text" class="form-control" id="reservationName_${this.id}" required>
                </div>
                <div class="col-3">
                  <input type="text" class="form-control" id="reservationConfNum_${this.id}" required>
                </div>
                <div class="col-3">
                  <input type="text" class="form-control" id="reservationAddress_${this.id}" required>
                </div>
                <div class="col-1">
                  <input type="date" class="form-control" id="reservationDate_${this.id}" value="${this.formatDate(new Date())}" required>
                </div>
                <div class="col-1">
                  <input type="number" class="form-control" id="reservationCost_${this.id}" required>
                </div>
                <div class="col-1 d-flex flex-row-reverse">
                  <input class="rounded" type="submit" value="Add">
                </div>
              </div>
            </form>
        `;
  }
}