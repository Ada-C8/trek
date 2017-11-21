$(document).ready(()=>{

  let allTrips = function allTrips() {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      // console.log(response);
      response.forEach(function(trip) {
        let tripInfo = `<li id=${trip.id}><h3> ${trip.name} </h3><p> ${trip.continent}, ${trip.weeks} weeks</p></li>` //<h3 data-id='${trip.id}'>

        $('#trips').append(tripInfo);
      });
    }); //get
  };

  let tripDetails = function tripDetails(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`, (response) =>{
      console.log(response);

      let tripDetails = '';
      tripDetails += `<p class='cost'>${response.category}, $${response.cost}</p>`;
      tripDetails += `<p>${response.about}</p>`;
      tripDetails += `<button class='signup' data-id=${id}>Sign me up!</button>`
      $(`#${id}`).append(tripDetails);
    }); //get, add .failure here
  };

  let loadForm = function loadForm(id) {
    $('')
  };


  /////EVENTS////////////////
  $('#load').click(allTrips);
  $('#trips').on('click', 'li', function() {
    let tripID = $(this).attr('id');
    tripDetails(tripID);
    // console.log($(`#${tripID} .cost`));
    // how to get others to collapse automatically?
    // if ($(`#${tripID} .cost`)) {
    //   $(`#${tripID}`).html(`<li>redacted</li>`);
    // } else {
    //   tripDetails(tripID);
    // }
  });
  $('.signup').click(function() {
    let tripID = $(this).attr('data-id');
    loadForm(tripID);
  });
});
