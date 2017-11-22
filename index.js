
$(document).ready(()=>{
  let loadTrips = function loadTrips (){
    $.get('https://trektravel.herokuapp.com/trips',
    (response) => {
      response.forEach(function(trip) {
        let tripInfo = `<li><h3 data-id=${trip.id}> ${trip.name}, ${trip.continent}</a></li></h3><p> `
        $('#trips ol').append(tripInfo);
      }); // forEach
    }) // .get, response
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    }); // .fail
  } // loadTrip



  // Function for AJAX request for a specific trip

  let loadTrip = function loadTrip(id) {
    $('#trip').html('');
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        console.log(response);
        let tripInfo = `
        <div class="row"><h2> ${response.name} </h2>
        <p> <b> Continent: </b>${response.continent}</p>
        <p> <b> About: </b> </p>${response.about}</p>
        <p> <b> Category: </b> ${response.category}</p>
        <p> <b> Weeks: </b>${response.weeks}</p>
        <p> <b> Cost: </b>${response.cost}</p></div>

        <form id="add-trip-form" action = "https://trektravel.herokuapp.com/trips/${id}/reservations">
        <label for="name">Name:</label>
        <input type="text" name="name"></input>

        <label for="email">Email:</label>
        <input type="text" name="email"></input>

        <input type="submit" value="Reserve a spot" class="button"></input>
        </form>`;
        // <p> <button>  Go back </button> </p>
        $('#trip').html(tripInfo);
      })

      .fail(function(response) {
        console.log(response);
        $('#fail').html('<p> Request was unsuccessful </p>')
      });
    };

    // Function to submit form to the DB

      const successCallback = function(response) {
        console.log("POST request was successful");
        console.log(response);

        let generatedHMTL = '<p>Everything went great,';
        generatedHMTL += `and your trip ${ response["name"] } has been added to the DB!</p>`;
        $('#ajax-results').html(generatedHMTL);
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

    $('#trips').on('click', 'h3', function(){
      let tripID = $(this).attr('data-id');
      $('#trip').show();
      loadTrip(tripID);
    });

    $('#load').on('click', function(){
      loadTrips();
    });

    $("#load").click(function(){
        $("#trip").hide();
    });

    // $("#back").click(function(){
    //     $("#trip").hide();
    // });
  }); //.ready
