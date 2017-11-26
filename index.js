const baseUrl = 'https://trektravel.herokuapp.com/trips'

const successCallback = function(response){
  console.log("POST request to reserve a spot on a trip was successful");
  console.log(response);
  let name = $('#trip-form').data('name');
  // console.log(`Trip name: ${name}`);
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
  // console.log(continents[trip]);
  if (continents[trip]){
    // console.log(`this trip exists! ${continents[trip]}`);
    // let a = ;
    // console.log(a);
    console.log(trip.weeks);
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
        let tripInfo = `<li><h2 data-id=${trip.id}>` + trip.name + ` | <span>${a}</span> | ${trip.weeks}<h2></li><hr>`;
        $('#show-trips ul').append(tripInfo);
        // console.log(trip.continent);

        // console.log(a);
        // $('#show-trips ul').append(a);
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

      let button = $(`<button id="reserve" value="${response.id}">Reserve A Spot!</button>
      `);

      button.click((event) => {
        console.log(`trip id:${response.id}`);
        $('#reserve-form').show();
        $('#trip-form').attr('data-id' , `${response.id}`);
        $('#trip-form').attr('data-name' , `${response.name}`);
      });
      $('#resButton').html(button);
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
    $('#show-trip').show();
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
