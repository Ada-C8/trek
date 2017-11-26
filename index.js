
$(document).ready(()=>{
  let loadTrips = function loadTrips (){
    $.get('https://trektravel.herokuapp.com/trips',
    (response) => {
      let tripInfo = '';
      tripInfo+= "<tr><th>ID</th><th>Trip</th><th>Continent</th><th>Weeks</th></tr>";//table headings
      response.forEach(function(trip) {
        tripInfo += `<tr data-id=${trip.id}>`
        for (let attr in trip) {
          tripInfo += '<td>' + trip[attr] + '</td>'
        } // for loop
        tripInfo += '</tr>'
      })// forEach
      $('#trips table').html(tripInfo);
    }) // .get, response

    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    }); // .fail
  } // loadTrip



  // Function for AJAX request for a specific trip

  let loadTrip = function loadTrip(id) {
    $('#trip').html('');
    $('#ajax-results').html('');
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        console.log(response);
        let tripInfo = `
        <div class="row"><h2 class="tripname"> ${response.name} </h2>
        <p> <b> Continent: </b>${response.continent}</p>
        <p> <b> About: </b> ${response.about}</p>
        <p> <b> Category: </b> ${response.category}</p>
        <p> <b> Weeks: </b>${response.weeks}</p>
        <p> <b> Cost: </b>${response.cost}</p></div>

        <div  class="row">
          <p class="reserve"><b> Make a reservation </b></p>
          <form id="add-trip-form" action = "https://trektravel.herokuapp.com/trips/${id}/reservations">
          <label for="name">Name:</label>
          <input type="text" name="name"></input>

          <label for="email">Email:</label>
          <input type="text" name="email"></input>

          <input type="submit" value="Reserve a spot" class="button"></input>
          </form>
        </div> `;

        $('#trip').html(tripInfo);
      })

      .fail(function(response) {
        console.log(response);
        $('#fail').html('<p> Request was unsuccessful </p>')
      });
    };
    $('#trips table').on('click', 'tr', function(){
      let tripID = $(this).attr('data-id');
      $('#trip').show();
      loadTrip(tripID);
    });

    // Function to submit form to the DB
    const successCallback = function(response) {
      console.log("POST request was successful");
      console.log(response);

      let generatedHMTL = '<p><strong>Everything went great, ';
      generatedHMTL += `and your trip ${ response["name"] } has been added to the DB!<strong></p>`;
      $('#ajax-results').html(generatedHMTL);
      $('#trip').html('');
    }

    $('#trip').on('submit','#add-trip-form',function(event){
      event.preventDefault();

      let formData = $('#add-trip-form').serialize();
      console.log(formData);

      const url = $('#add-trip-form').attr('action');

      $.post(url, formData, successCallback).fail((response) => {
        console.log("Couldn't post the data ");
      });
    });

    // Events

    $('#load').on('click', function(){
      loadTrips();
    });

    $("#load").click(function(){
      $("#trip").hide();
    });

  }); //.ready
