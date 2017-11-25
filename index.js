$(document).ready(()=>{
  let loadTrips = function loadTrips() {
    $('#load').hide('slow')

    $.get('https://trektravel.herokuapp.com/trips',
    (response) => {
      response.forEach(function(trip) {
        let tripInfo = `<div class = "inside" id=${trip.id}> <h3 id=${trip.id} > ${trip.name} </h3> </div>`;

        $('#single-trip').html('');
        $(tripInfo).appendTo('#many-trips').show('slow');

      });
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    });
  };

  let loadTrip = function loadTrip(id){
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        console.log(response);
        let tripInfo =
        `<p> ID: ${response.id} </p>
        <p> Name: ${response.name} </p>
        <p> Category: ${response.category} </p>
        <p> About: ${response.about} </p>
        <p> Continent: ${response.continent} </p>
        <p> Weeks: ${response.weeks} </p>
        <p> Cost: ${response.cost} </p>
        <form class="reserve" action="index.html" method="post">
        <label for="name">Name:</label>
        <input id="text" type="text" name="name" value=""></input>
        <input class="button" id="submit" type="submit" name="submit" value="Reserve">
        </form>`;

        let numberId = response.id
        let stringId = numberId.toString()

        $(`<div id='open' style="display: none;">${tripInfo}</div>`).appendTo(`#${stringId}`).show('slow');
        $(`#${stringId}`).append(`<div class='status'></div>`);

        submit(response.name)

      })
      .fail(function(response){
        console.log(response);
        $('#fail').html('<p>Request was unsuccessful</p>')
      });
    };


    $('#many-trips').on('click', 'h3', function(){
      let tripID = $(this).attr('id');
      if($(`#${tripID}`).find('#open').length > 0){
        $('#open').hide('slow', function(){$('#open').remove();});
        $('.status').remove()
      }
      else {
        loadTrip(tripID);
      }
    });

    $('#load').on('click', function(){
      loadTrips();
    });


  });


      const url = 'https://trektravel.herokuapp.com/trips/1/reservations';

      const successCallback = function(name) {
        console.log('POST was successful');
        let generatedHTML = `<p> You have successfully reserved a spot on ${name}! </p>`
        $('.status').html(generatedHTML)
        $('.reserve').hide('slow')

      };
      const submit =  function submit(name){
      $('.reserve').on('submit', function(event) {
        event.preventDefault();
        console.log("IN SUBMIT")
        let formData = $('.reserve').serialize();
        $.post(url, formData, successCallback(name)).fail((response) => {
          console.log("Failure");
          let generatedHTML = `<p> Something went wrong, we were not able to reserve a spot for you </p>`
          $('.status').html(generatedHTML)
        });
      })};
