const url = 'https://trektravel.herokuapp.com/trips'

const successCallback = function(response) {
  console.log("POST request was successful");
  console.log(response);

  let generatedHMTL = '<p>Everything went great,';
  generatedHMTL += `and your reservation ${ response["name"] } has been added to the DB!</p>`;
  $('#ajax-results').html(generatedHMTL);
};

$(document).ready(function() {
  const getTrips = function getTrips () {
    // let url = 'https://trektravel.herokuapp.com/trips'

    $.get(url,
      function (response) {
        $('#trips ul').html('')
        response.forEach((trip) => {
          // let tripName = trip['name']
          // console.log(tripName);

          $('#trips ul').append(`<li><a href="" data-id="${trip['id']}" >${trip.name}</a></li>`)
        })
      } // end function (response)
    ) // end $.get
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>');
    });
  } // end getTrips()

  const trip = function trip (id) {
    let url = 'https://trektravel.herokuapp.com/trips/' + `${id}`


    $.get(url, function(response) {
      console.log('success');
      console.log(response['name']);

      let tripInfo =
      `
      <h2 data-id=${response.id}> ${response.name} </h2>
      `;


      $('#name').append(tripInfo)
      $('#category').append(response.category)
      $('#duration').append(response.duration)
      $('#cost').append(response.cost)
      $('#about').append(response.about)
    }) // end $.get

  } // end trip(id)

  // $('#loadTrips').on('click', getTrips)
  $('#load-trips').on('click', getTrips)


  $('#load-trips').on('click', function(event){
    $('#trips').show();
    $('#trip').hide();
  });


  // 'a' targets the anchor tag with the trip.id in it. this gives the id when console.logging
  $('#trips ul').on('click', 'a', function(event){
    event.preventDefault();
    let tripID = $(this).attr('data-id');
    console.log(tripID);
    trip(tripID);
    $('#trip').show();
    $('#trips').hide();
  });

  $('#add-res').on('submit', function(event) {
    event.preventDefault();
    console.log('$(this)');
    console.log(this);
    console.log($(this).data('id'));

    let formData = $('#add-res').serialize();

    console.log(formData);
    // console.log(`${$(this).data('id')}`);

    let resUrl = 'https://trektravel.herokuapp.com/trips/1/reservations'
    // + `${id}` + '/reservations'

    $.post(resUrl, formData, successCallback).fail((response) => {
      console.log('Reservation failed');
    })
  })


// Form code for submitting a reservation.
})
