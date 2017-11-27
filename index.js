$(document).ready(()=>{
  $('#reservation-form').hide();
  $('.select-by-continent').hide();
  console.log('we are inside');

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  let loadTrips = function loadTrips() {
     $('.globe-large').hide();
     $('#trips').before('<div class="adventure-container"><h2 class="adventure">Pick Your Adventure:</h2></div>');

     //stores array of continents. I played with doing this, in case we want to show filters by continents provided in the API (rather than using a hard-coded list) in case future filter categories are added in the future.
     // let continentArray = []
     // let continentSet = [];

    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      console.log('success!');
      $('#load').hide();
      response.forEach(function(trip) {
        let tripInfo =
        `<li class='listed-trip ${trip.continent}' trip-id=${trip.id}>${trip.name}</li>`;
        //console.log(trip);
        //if statement to remove those trips that are not fully fleshed out:
        if (trip.name.length > 5) {
          $('#trips #trips-ul').append(tripInfo);
        // continentArray.push(trip.continent);
        }
      });

      //console.log(`continentArray: ${continentArray}`);
      // continentSet = [...new Set(continentArray)];
      // console.log(`continentSet: ${continentSet}`);
    })
        .fail(function(){
          console.log('failure');
        })
        .always(function(){
          console.log('Action complete');
        });
      //return continentSet;
  };

  //create html elements to create a button for each continent
    let createFilters = function createFilters() {
      console.log('inside create filters');
      $('.select-by-continent').show();

      //continent filters
      const continents = ['Africa','Asia','Australasia','Europe','South America','North America','Antarctica'];
      let allContinentsHTML = `<li class='continent all-continents' class=${continents}>All Continents</li>`;
      $('#trips #continent-ul').append(allContinentsHTML);

      continents.forEach(function(continent) {
        let continentHTML = `<li class='continent' class=${continent} continent-name=${continent} >${continent}</li>`;
        $('#trips #continent-ul').append(continentHTML);
        console.log('printed continents!');
      });

      //trip duration filters
      // const tripWeeks = [1,2,3,4,5,6]
    };

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR A SPECIFIC TRIP
    let loadTrip = function loadTrip(id){
      $.get(`https://trektravel.herokuapp.com/trips/${id}`,
        (response) => {
          console.log(response);
          let indivTripInfo = `
          <h2 id="trip-name" reservation-trip-id=${response.id}> ${response.name} </h2>
          <p class=${response.continent}><strong>Continent:</strong> ${response.continent}</p>
          <p> <strong>Trip Duration:</strong> ${response.weeks} week(s)</p>
          <p> <strong>Trip Category:</strong> ${response.category} </p>
          <p> <strong>Cost: $${response.cost}</strong> </p>
          <p class="about"> <strong>Description:</strong> ${response.about} </p>
          <button id="reserve-button" reservation-trip-id=${response.id}> Make a Reservation </button>
          `;

          $('#trip').html(indivTripInfo);
          $('#load').hide();
          $(this).scrollTop(0);
          //

        })
        .fail(function(response){
            console.log(response);
            $('#fail').html('<p>Request was unsuccessful</p>')
          })
          .always(function(){
            console.log('always even if we have success or failure');
          });

    };


//CREATE FORM WHEN CLICK "RESERVE" BUTTON
  // let showForm = function showForm(id) {
  //
  // };
//



//POST RESERVATION INFO (RECEIVE INFO FROM FORM)
const submitReservation = function submitReservation() {
  $('form').submit( function(e) {
    e.preventDefault();
    let form = document.createElement("form")
    let tripID = $('#trip-name').attr('reservation-trip-id')
    const url = $(this).attr('action') + tripID + '/reservations'; // Retrieve the action from the form
    //console.log(`URL: ${url}`);
    const personName = $(this).serializeArray()[0].value;
    const formData = $(this).serialize();
    console.log(`formData: ${formData}`)

    $.post(url, formData, (response) => {
      //$('#message').html(`<p> Reservation confirmed for ${personName} </p>`);
      alert(`Reservation confirmed for ${personName}` );
      console.log(`successfully posted reservation for ${personName}`)
      console.log(response);
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Post was unsuccessful</p>')
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });
  });
};

//EVENTS
  $('#load').on('click', function(){
    loadTrips();
    createFilters();
    //tried the below to try to receive the set of continents. returns an empty array.
    //let continentList = loadTrips();
    //console.log(continentList);
  });

  $('#trips #trips-ul').on('click', 'li', function(){
    let tripID = $(this).attr('trip-id');
    loadTrip(tripID);
    //below is needed because: if you select a trip, then click but to Make a Reservation, then go select another trip, the reservation form remains there
    $('#reservation-form').hide();
  });

  //show reservation form button
  $('#trip').on('click','#reserve-button', function(){
    console.log('inside reservation form button');
    console.log($(this).attr('reservation-trip-id'));
    // let tripID = $(this).attr('reservation-trip-id');
    $('#reservation-form').show()
    $('#reserve-button').hide();
  });

  //submit reservation button
  $('#reservation-form').on('click','#submit-reservation', function(){
    console.log('submitted reservation');
    submitReservation();
    $('#reservation-form').hide();
  });

//FILTER EVENTS
  //click event for continents
  $('#continent-ul').on('click', '.continent', function(){
    console.log('clicked continent button');
    let continentName = $(this).attr('continent-name');
    console.log(continentName);
    $(`.listed-trip`).hide();
    // $(`#listed-trip`).has(`#f-${continentName}`);
    //$('#listed-trip').filter('.' +continentName).hide();
    $('.listed-trip').filter(`.${continentName}`).show();
  });

  //click event for "all continents" view filter
  $('#continent-ul').on('click', '.all-continents', function(){
    console.log('clicked All Continents button');
    // let continentName = $(this).attr('continent-name');
    // console.log(continentName);
    $(`.listed-trip`).show();
  });
});
