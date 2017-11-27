
$(document).ready(()=>{
  const imageUrls = ['backpack.jpg', 'belize.jpg', 'camino.jpg', 'farm.jpg', 'greenlake.jpg', 'london.jpg', 'rowhouses.jpg', 'seattle.jpg', 'snow.jpg', 'tent.jpg']
  // let randImg = imageUrls[Math.floor(Math.random() * imageUrls.length)];

  let allTrips = function allTrips() {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      // console.log(response);
      let i = 0;
      response.forEach(function(trip) {
        let tripInfo = `<li id=${trip.id} class='row'><img class='column small-12 medium-6' src="adventuregram/${imageUrls[i]}" alt="${trip.name}"><div class='column small-12 medium-6'><h3 data-id='${trip.id}'> ${trip.name} </h3><dl><dt>Continent</dt><dd>${trip.continent}</dd><dt>Weeks</dt><dd>${trip.weeks} weeks</dd><div class='trip-details'></div></dl></div></li>`

        // console.log(imageUrls[randNum]);
        $('#trips').append(tripInfo);
        $('.centerbutton').addClass('disappear');

        i < imageUrls.length - 1 ? i++ : i = 0


      });
    }); //get
  };

  let tripDetails = function tripDetails(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) =>{
      // console.log(response);

      let tripDetails = '';
      tripDetails += `<dt>Category</dt><dd>${response.category}</dd> <dt>Cost</dt><dd>$${response.cost}</dd>`;
      tripDetails += `<p>${response.about}</p>`;
      tripDetails += `<button class='signup' data-id=${id}>Sign me up!</button>`;
      tripDetails += '<div class="formspace"></div>'
      $(`#${id} .trip-details`).html(tripDetails);
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
