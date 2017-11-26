const baseUrl = 'https://trektravel.herokuapp.com/trips'

const successCallback = function(response){
  console.log("POST request to reserve a spot on a trip was successful");
  console.log(response);
  let name = $('#trip-form').data('name');
  // console.log(`Trip name: ${name}`);
  $('#message').html(`Congratulations! You successfully reserved a spot on ${name}!`);
};

$(document).ready(()=> {
  $('#reserve-form').hide();
  $('#content').hide();

  let loadTrips = function loadTrips() {
    $.get(baseUrl, (response) => {
      console.log(response);
      console.log('success!');
      response.forEach(function(trip) {
        let tripInfo = `<li><h2 data-id=${trip.id}>` + trip.name + '<h2></li>';
        $('#show-trips ul').append(tripInfo)
      });
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>');
    });
  };

  let loadTrip = function loadTrip(id){
    $.get(baseUrl + `/${id}`, (response) => {
      console.log('success!');
      console.log(response);

      let tripInfo = `
      <p>ID: ${response.id}</p>
      <p>Category: ${response.category}</p>
      <p>Destination: ${response.continent}</p>
      <p>Details: ${response.about}</p>
      <p>Cost: $${response.cost}</p>
      <p>Length: ${response.weeks} weeks</p>`;
      $('#show-trip').html(tripInfo);

      let button = $(`<button id="reserve" value="${response.id}">Reserve A Spot!</button>
      `);

      button.click((event) => {
        console.log(`trip id:${response.id}`);
        $('#reserve-form').show();
        $('#trip-form').attr('data-id' , `${response.id}`);
        $('#trip-form').attr('data-name' , `${response.name}`);
      });
      $('#show-trip').append(button);
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    });
  };

  // EVENTS
  $('#show-trips ul').on('click', 'h2', function(){
    let tripId = $(this).attr('data-id');
    loadTrip(tripId);

    $('html,body').animate({
      scrollTop: $("#anchor").offset().top},
      'slow');
  });

  $('#load').on('click', function(){
    $('#content').show();
    loadTrips();
    $('html,body').animate({ scrollTop: $("#show-trips").offset().top -20},'slow');
  });

  $('#trip-form').on('submit', function(event){
    event.preventDefault();
    let url = baseUrl + `/${$(this).data('id')}/reservations`;
    let formData = $('#trip-form').serialize();
    let tripName = $(this).data('name');
    console.log(formData);
    $.post(url, formData,successCallback).fail((response) => {
      console.log("Didn't go so hot");
      $('#message').html(`There was an error in your reservation for  ${tripName}, please try again`);
    });
    // When the user clicks the button, open the modal
    modal.style.display = "block";
  });

  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // $("#load").mouseover(function(){
  //   $("#highlight").addClass("on").removeClass("off");
  // });
  // mouseover
  $("#load").hover(function() {
    $("#highlight").addClass("on").removeClass("off");
  },

  // mouse out
  function() {
    $('#highlight').addClass("off");
  });
});
