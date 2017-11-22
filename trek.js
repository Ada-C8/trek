// let words ['Enjoy ', 'Adventure for ', 'Get away from it all for']
// let rand = words[Math.floor(Math.random() * words.length)];

$(document).ready(()=>{
  let words = ['Enjoy ', 'Adventure for ', 'Get away from it all for ', 'Relax with ']


  let loadTrips = function loadTrips() {
    const allTripsUrl = 'https://trektravel.herokuapp.com/trips';
    $.get(allTripsUrl, (response) => {
      let i = 0;
      for (let trip of response) {
        let id = response[i].id
        let name = response[i].name;
        let continent = response[i].continent;
        let weeks = response[i].weeks;
        let tripDetails = loadTrip(id)
        let rand = words[Math.floor(Math.random() * words.length)];
        let tripSummary = `
        <li class="${id} Trip">
        <h3 class="${id}">
        ${name}
        </h3>
        </li>
        ${rand}${weeks} weeks in ${continent}
        <div id=${id} class="summary">
        </div>
        `
        $('.list').append(tripSummary);
        $(`#${id}`).hide()
        i += 1
      }
    })
  }


  let loadTrip = function loadTrip(id) {
    const oneTripUrl = 'https://trektravel.herokuapp.com/trips/' + id
    $.get(oneTripUrl, (response) => {
      let id = response.id;
      let name = response.name;
      let about = response.about;
      let cost = response.cost;
      let category = response.category;
      let tripDetails = `
      <p>
      <strong>
      Trip Summary:<br/>
      </strong>
      ${about} <br/>
      <strong>Trip ID: </strong>${id} <br/>
      <strong>Category: </strong>${category} <br/>
      <strong>Cost:  </strong>${cost}
      </p>
      <div>
        <a class="${id}" href="form.html"> Book your adventure now!</a>`;
      $(`#${id}`).html(tripDetails);
    })
  }


    // <a href="form.html"> Book your adventure now!</a>
//<form id="reserve-form" action=${postUrl} method="post">
//  <button type="submit">Make Reservation!</button>

  // // $('#reserve-form').load("index.html", function() {
  //   $('#reserve-form').submit (function(e) {
  //     // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
  //     e.preventDefault();
  //     e.stopPropagation();
  //
  //     const url = $(this).attr("action"); // Retrieve the action from the form
  //     const name = $('#reserve-form input[name="name"]').val()
  //     console.log(`Name=${name}`)
  //     if (name!=':'){
  //       const formData = $(this).serialize();
  //       console.log("form data = ", formData);
  //       $.post(url, formData, function(response){
  //         e.preventDefault();
  //         $('#message').html('<p>Trip reserved!</p>');
  //
  //         // What do we get in the response?
  //         console.log(response);
  //         return false;
  //       }).fail(function(e) {
  //         console.log(e);
  //         $("#message").html("<p>Failure!</p>");
  //       });
  //       return false;
  //     };
  //   });
  // });



  // let minimizeTrip = function minimizeTrip(id){
  //
  // }



  $('#load_all').on('click', function(){
    loadTrips();
  });

  $('.list').on('click', 'h3', function(event){
    id = event.target.className;
    loadTrip(id);
    $(`#${id}`).toggle()
  });

  $('.list').on('click', 'div a', function(event){
    // e.preventDefault();
    id = event.target.className
    localStorage.setItem('id', id)
    const name = $('#reserve-form input[name="name"]').val()
    id = event.target.className;
    console.log(id)
    console.log('here')

  });



  // $('.summary').on('click', '.list', function(event){
  //   $(".summary").hide(1000);
  // });



})

//Events
