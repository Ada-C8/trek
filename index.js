const baseUrl = 'https://trektravel.herokuapp.com/trips'

const successCallback = function(response){
  console.log("POST request to reserve a spot on a trip was successful");
  console.log(response);
  let name = $('#trip-form').data('name');
  $('#message').html(`Congratulations! You successfully reserved a spot on ${name}!`);
};

const continents = {
  'Africa': 'africa.png',
  'Antarctica': 'antarctica.png',
  'Asia': 'asia.png',
  'Australasia': 'australia.png',
  'Europe': 'europe.png',
  'North America': 'north_america.png',
  'South America': 'south_america.png'
};

const continentImgInfo = function(trip){
  if (continents[trip]){
    return `<img src="img/${continents[trip]}" alt="${trip} picture" class="continent"/>`;
  }
};

$(document).ready(()=> {
  $('#reserve-form').hide();
  $('#content').hide();
  $('#show-trip').hide();


  let loadTrips = function loadTrips() {
    $.get(baseUrl, (response) => {
      console.log(response);
      console.log('success!');
      response.forEach(function(trip) {
        let a = continentImgInfo(trip.continent);
        let tripInfo = `<li><h3 data-id=${trip.id} data-name='${trip.name}'>` + trip.name + ` | <span>${a}</span> | ${trip.weeks}<h3></li><hr>`;
        $('#show-trips ul').append(tripInfo);
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
      <p><span class='info'>ID:</span> ${response.id}<br>
      <span>Category:</span> ${response.category}<br>
      <span>Destination:</span> ${response.continent}<br>
      <span>Details:</span> ${response.about}<br>
      <span>Cost:</span> $${response.cost}<br>
      <span>Length:</span> ${response.weeks} weeks</p>`;
      $('#hook').html(tripInfo);

      let button = $(`<button id="reserve" class="natGeoButton" value="${response.id}">Sign up today!</button>
      `);

      button.click((event) => {
        $('#reserve-form').show();
        $('html,body').animate({scrollTop: $("#reserve-form").offset().top -100},'slow');
      });
      $('#resButton').html(button);
    })
    .fail(function(response){
      console.log(response);
      $('#fail').html('<p>Request was unsuccessful</p>')
    });
  };

  // EVENTS

  // show trip details when a user clicks on a ul
  // also updates the trip from with attr data
  $('#show-trips ul').on('click', 'h3', function(){
    let tripId = $(this).attr('data-id');
    loadTrip(tripId);
    $('#show-trip').show();
    $('html,body').animate({scrollTop: $("#anchor").offset().top},'slow');
    $('#trip-form').attr('data-id' , `${$(this).attr('data-id')}`);
    $('#trip-form').attr('data-name' , `${$(this).attr('data-name')}`);
  });

  // when the main page button gets clicked it populates trips and scrolls to correct spot on page
  $('#load').on('click', function(){
    $('#content').show();
    loadTrips();
    $('html,body').animate({ scrollTop: $("#show-trips").offset().top -20},'slow');
  });

  // on submit it sends post message and opens a modal
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
    $('#reserve-form').hide();
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      $('#reserve-form').hide();
    }
  };

  // mouseover
  $("#load").hover(function() {
    $("#highlight").addClass("on").removeClass("off");
  },

  // mouse out
  function() {
    $('#highlight').addClass("off");
  });
});
