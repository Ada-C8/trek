$(document).ready(()=>{

  let loadTrips = function loadTrips() {

  $.get('https://trektravel.herokuapp.com/trips',
    (response) => {
      console.log('success!');
      console.log(response);

      // $('#trips').show();
      // $('#trip').hide();

      $('#trips ul').html('');  //idempotent

      response.forEach(function(trip) {
        let dataId = trip["id"];
        let tripData = `<li><h3> <a href="/" data-id=${trip["id"]}> ${trip["name"]} </a> </h3> </li>`;
        // debugger
        $('#trips ul').append(tripData);
      });

    })

    .fail(function(response){
       console.log(response);
       $('#fail').html('<p>Request was unsuccessful</p>')
    })

  };

  // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR A SPECIFIC PET
  let loadTrip = function loadTrip(id){
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        let tripInfo = `
        <h2> ${response.name} </h2>
        <p> ID: ${response.id} </p>
        <p> Continent: ${response.continent} </p>
        <p> Category: ${response.category} </p>
        <p> Weeks: ${response.weeks} </p>
        <p> Cost: ${response.cost} </p>
        <p> About: ${response.about} </p>`;

        $('#trip').html(tripInfo);

      })
      .fail(function(response){
          console.log(response);
          $('#fail').html('<p>Request was unsuccessful</p>')
        })
        .always(function(){
          console.log('always even if we have success or failure');
        });
  };


  // $('#pets ul').on('click', 'h3', function(){
  //   let petID = $(this).attr('data-id');
  //   loadPet(petID);
  // });


// EVENTS
  $('#load-all-trips').on('click', loadTrips);

  $('#load-all-trips').on('click', function(event){
    $('#trips').show();
    $('#trip').hide();
  });


  $('#trips ul').on('click', 'a', function(event) {
    event.preventDefault();
    let tripID = $(this).attr('data-id');
    loadTrip(tripID);
    $('#trip').show();
    $('#trips').hide();
  });

});

// single trip info: id, name, destination, continent, about, category, weeks and cost
