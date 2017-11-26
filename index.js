const url = 'https://trektravel.herokuapp.com/trips';

const successCallback = function successCallback(response) {
  // console.log('POST request was successful');
  // console.log(response);

  let generatedHMTL = '<p>Everything went great,';
  generatedHMTL += ` and your reservation ${response.name} has been added to the DB!</p>`;
  $('#ajax-results').html(generatedHMTL);
};

$(document).ready(function() {
  const getTrips = getTrips => {
    $.get(url,
      function (response) {
        $('#trips ul').html('')
        response.forEach((trip) => {
          // let tripName = trip['name']
          // console.log(tripName);

          $('#trips ul').append(`<li><a href="" data-id="${trip.id}" >${trip.name}</a></li>`)
        })
      } // end function (response)
    ) // end $.get
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>');
    });
  }; // end getTrips()

  const trip = function trip (id) {

    let url = 'https://trektravel.herokuapp.com/trips/' + `${id}`


    $.get(url, function(response) {
      $('#trip').html('')

      console.log('success');
      console.log(response['name']);

      // tripId = `${response.id}`

      let tripInfo = `
      <h2 data-id=${response.id}> ${response.name} </h2>
      `;


      $('#name').html(tripInfo)
      $('#category').html(response.category)
      $('#duration').html(response.duration)
      $('#cost').html((response.cost).toFixed(2))
      $('#about').html(response.about)

      // I am not sure if putting the reservation code with in the scope of the $.get trip is best practice. It is here because this was the simplest way to access the trip's id. I tried using the .data()


      // Form code for submitting a reservation.
      $('#add-res').on('submit', function(event) {
        event.preventDefault();


        let formData = $('#add-res').serialize();

        console.log(formData);
        // console.log(`${$(this).data('id')}`);

        let resUrl = 'https://trektravel.herokuapp.com/trips/' + `${response.id}` + '/reservations'
        console.log(resUrl);

        $.post(resUrl, formData, successCallback).fail((response) => {
          console.log('Reservation failed');
        })
      })
    }) // end $.get
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>');
    });
  } // end trip(id)

  $('#load-trips').on('click', getTrips)

  $('#load-trips').on('click', function (event){
    $('#trips').show();
    $('#trip').hide();
  });


  // 'a' targets the anchor tag with the trip.id in it. this gives the id when console.logging

  $('#trips ul').on('click', 'a', function (event){
    event.preventDefault();
    let tripID = $(this).attr('data-id');
    console.log(tripID);
    trip(tripID);
    $('#trip').show();
    $('#trips').hide();
  });
})
