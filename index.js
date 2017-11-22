$(document).ready(()=>{
  $('#reservation-form').hide();
  console.log('we are inside');
  //$('#trips').append('<h3>A list of trips should go here.</h3>')

  // const filtersHTML =
  //   '<button class="continent-all is-active">All Items</button> \
	// 	<button class="continent-asia">Asia</button> \
	// 	<button class="continent-africa">Africa</button> \
	// 	<button class="continent-europe">Europe</button> \
  //   <button class="continent-southamerica">South America</button>\
  //   <button class="continent-australasia">Australasia</button>'

  // let fActive;
  // function filterContinent(continent){
  //   if(fActive != continent){
  //     $('.listed-trip').filter('.'+continent).slideDown();
  //     $('.listed-trip').filter(':not(.'+continent+')').slideUp();
  //     fActive = continent;
  // 		$('button').removeClass("is-active");
  //   }
  // }
  //
  // $('.continent-asia').click(function(){
  //   filterColor('blue');
  //   $(this).addClass("is-active");
  // });
  // $('.continent-africa').click(function(){
  //   filterColor('green');
  //   $(this).addClass("is-active");
  // });
  //
  // $('.continent-all').click(function(){
  //   $('.listed-trip').slideDown();
  //   fActive = 'all';
  // 	$(this).addClass("is-active");
  // });
  //
  // let applyFilters = function applyFilters() {
  //   $('trips ul').append(filtersHTML)
  // };

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR ALL TRIPS
  let loadTrips = function loadTrips() {
     $('#trips ul').append('<h2>Pick Your Adventure:</h3>');
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      console.log('success!');
      response.forEach(function(trip) {
        let tripInfo =
        `<li><h3 class='listed-trip' trip-id=${trip.id}>${trip.name}</li>`;
        //took this out of tripInfo:
        //<li> Continent: ${trip.continent}</li>
        //console.log(trip);
        $('#trips ul').append(tripInfo);
        $('#load').hide();
      });
    })
        .fail(function(){
          console.log('failure');
        })
        .always(function(){
          console.log('Action complete');
        });
  };

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR A SPECIFIC TRIP
    let loadTrip = function loadTrip(id){
      $.get(`https://trektravel.herokuapp.com/trips/${id}`,
        (response) => {
          console.log(response);
          let indivTripInfo = `
          <h2 id="trip-name" reservation-trip-id=${response.id}> ${response.name} </h2>
          <p class=${response.continent}> Continent: ${response.continent} </p>
          <p> Trip Duration: ${response.weeks} week(s)</p>
          <p> Trip Category: ${response.category} </p>
          <p> Cost: $${response.cost} </p>
          <p> Description: ${response.about} </p>
          <button id="reserve-button" reservation-trip-id=${response.id}> Make a Reservation </button>
          `;

          $('#trip').html(indivTripInfo);
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
  });

  $('#trips ul').on('click', 'h3', function(){
    let tripID = $(this).attr('trip-id');
    loadTrip(tripID);
  });

  //show reservation form button
  $('#trip').on('click','#reserve-button', function(){
    console.log('inside reservation form button');
    console.log($(this).attr('reservation-trip-id'));
    let tripID = $(this).attr('reservation-trip-id');
    $('#reservation-form').show()
    $('#reserve-button').hide();
  });

  //submit reservation button
  $('#reservation-form').on('click','#submit-reservation', function(){
    console.log('submitted reservation');
    submitReservation();
    $('#reservation-form').hide();
  });

});
