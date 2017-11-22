const imageUrls = ['backpack.jpg', 'belize.jpg', 'camino.jpg', 'farm.jpg', 'greenlake.jpg', 'london.jpg', 'rowhouses.jpg', 'seattle.jpg', 'snow.jpg', 'tent.jpg']

$(document).ready(()=>{

  let allTrips = function allTrips() {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      // console.log(response);
      response.forEach(function(trip) {
        let tripInfo = `<li id=${trip.id}><h3 data-id='${trip.id}'> ${trip.name} </h3><p> ${trip.continent}, ${trip.weeks} weeks</p></li>`

        $('#trips').append(tripInfo);
        $('.centerbutton').addClass('disappear');
      });
    }); //get
  };

  let tripDetails = function tripDetails(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) =>{
      // console.log(response);

      let tripDetails = `<h3 data-id='${response.id}'> ${response.name} </h3><p> ${response.continent}, ${response.weeks} weeks</p>`;
      tripDetails += `<p class='cost'>${response.category}, $${response.cost}</p>`;
      tripDetails += `<p>${response.about}</p>`;
      tripDetails += `<button class='signup' data-id=${id}>Sign me up!</button>`;
      tripDetails += '<div class="formspace"></div>'
      $(`#${id}`).html(tripDetails);
    }); //get, add .failure here
  };

  let loadForm = function loadForm(id) {
    let reservationForm = '';
    reservationForm += `<form class='resForm' action="https://trektravel.herokuapp.com/trips/${id}/reservations" method="post">`;
    reservationForm += '<label for="name">Name:</label>';
    reservationForm += '<input type="text" name="name"></input>';
    reservationForm += '<label for="email">Email:</label>';
    reservationForm += '<input type="text" name="email"></input>';
    reservationForm += '<label for="age">Age:</label>';
    reservationForm += '<input type="number" name="age"></input>';
    reservationForm += '<input type="submit" value="Register for Trip"></input>';
    reservationForm += '</form>';
    // console.log(reservationForm);

    $(`#trips li#${id} .formspace`).html(reservationForm);
  };


  ////////////EVENTS////////////////
  $('#load').click(allTrips);
  $('#trips').on('click', 'h3', function() {
    let tripID = $(this).attr('data-id');
    tripDetails(tripID);
    // console.log($(`#${tripID} .cost`));
    // how to get others to collapse automatically?
    // if ($(`#${tripID} .cost`)) {
    //   $(`#${tripID}`).html(`<li>redacted</li>`);
    // } else {
    //   tripDetails(tripID);
    // }
  });

  $('#trips').on('click', '.signup', function() {
    let tripID = $(this).attr('data-id');
    console.log('clicked signup');
    loadForm(tripID);

  });

  $('#trips').on('submit', '.resForm', function(e) {
    e.preventDefault();

    const url = $(this).attr('action');
    console.log(url);
    const formData = $(this).serialize();
    console.log(formData);

    $.post(url, formData, (response) => {
      $('#message').html('<p> Registered for trip! </p>');
      // What do we get in the response?
      console.log(response);
      $(`#trips li#${response.trip_id} .formspace`).addClass('disappear');
      $(`#trips li#${response.trip_id} .signup`).addClass('disappear');
      $(`#trips li#${response.trip_id}`).append(`<p>You're all signed up!</p>`);
    });

  });

});
