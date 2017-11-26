$(document).ready(function() {
  $(document).foundation();

  $('#trips').hide();
  $('#single-trip').hide();
  $('#reserve-trip').hide();

  const baseURL = 'https://trektravel.herokuapp.com/trips/';

  /////// GET REQUEST FOR ALL TRIPS
  const displayTrips = function displayTrips() {
    $.get(baseURL, successCallback)
    .fail(function(){
      console.log('failure!');
    });
  };

  /////// CALL BACK FOR ALL TRIPS
  const successCallback = (response) => {
    for(let trip of response) {
      $('#trips').show();
      $('#table-body').append(
        '<tr id=trip' + trip.id + ' class="accordian" data-accordion data-allow-all-closed="true">' +
          '<td>' + trip.id + '</td>' +
          '<td>' + trip.name + '</td>' +
          '<td>' + trip.continent + '</td>' +
        '</tr>');
      $('#trip' + trip.id).click(function(event) {
        displaySingleTrip(trip.id);
      });
    }
  };

  /// EVENT FOR ONE BUTTON
  $('button').click(displayTrips);

  /////// CALL BACK FOR A SINGLE TRIP
  const singleTripSuccessCallback = (response) => {
    // console.log(response);
    $('#trips').hide();
    $('#table-body').empty();
    $('#single-trip').show();
    $('#trip-name').append(response.name.toUpperCase());
    $('#trip-country').append(response.continent.toUpperCase());
    $('#about').append('<p>' + response.about + '</p>');
    $('#reserve-id' + response.id).click(function(event) {
      displayForm(response.id);
    });
  };

  // Event handler for the click event of the links
  /////// GET REQUEST FOR SINGLE TRIP
  const displaySingleTrip = function displaySingleTrip(tripID) {
    // console.log(baseURL + `${tripID}`);
    $.get(baseURL + `${tripID}`, singleTripSuccessCallback)
    .fail(function() {
      console.log('failure!');
    });
  };

  /////// FORM CALLBACK FUNCTION
  const formCallBack = function(response) {
    console.log(response);
  };

  ///// DISPLAY FORM ON CLICK OF A BUTTON
  const displayForm = function displayForm(tripID) {
    $('form').show();
    $('#reserve-form').on('submit', function(event) {
      // Don't refresh the page (the default behavior)
      event.preventDefault();

      let formData = $('#reserve-form').serialize();

      $.post(baseURL + `${tripID}/reservations`, formData, formCallBack)
        .fail((response) => {
          console.log("Didn't go so hot");
      });
    });
  };

});
