/* eslint-disable */

$(document).ready(() => {
  $('body').on('submit', 'form', function(e) {
    e.preventDefault();
    console.log(this);
    const url = $(this).attr('action');
    const formData = $(this).serialize();

    $.post(url, formData, (response) => {
      $("#message").html('<p>Spot reserved!</p>');
      console.log(response);
    }).fail(() => {
      $("#message").html("<p>Unable to complete reservation</p>")
    }).always(() => {
      console.log("always always always here");
    });
  });

  let loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {

        response.forEach(function(trip) {
          let name = trip.name;
          let continent = trip.continent;
          let weeks = trip.weeks;
          let id = trip.id;
          let basicInfo = `
            <section class='main-info'>
              <h2 data-id=${id} class='accordion2'>${name}</h2>
              <p>Continent: ${continent}</p>
              <p>Duration: ${weeks} week(s)</p>
            </section>
            <section class='panel${id}'></section>`;
            $('.panel').append(basicInfo);
        }); //loop ends here
      })
      .fail(function(response) {
        console.log(response);
        $('.fail').html('<p>Request was unsuccessful</p>');
        })
        .always(function() {
          console.log('Always always always');
        });

  }; //end of loadTrips

  let loadTrip = function loadTrip(id) {
    $.get(`https://trektravel.herokuapp.com/trips/${id}`,
      (response) => {
        let tripDeets = `

          <section class='panel-info'>

            <p>ID: ${response.id}</p>
            <p>About: ${response.about}</p>
            <p>Category: ${response.category}</p>
            <p>Cost: $${response.cost.toFixed(2)}</p>
            <section id='message'></section>
            <form action='https://trektravel.herokuapp.com/trips/${id}/reservations' method='post'>
              <section>
                <label>Name</label>
                <input type="text" id="name" name="name"></input>
              </section>
              <section>
                <label>Age</label>
                <input type="text" id="age" name="age"></input>
              </section>
              <section>
                <label>Email</label>
                <input type="text" id="email" name="email"></input>
              </section>
              <section class='button'>
                <button class='reserve' type='submit'>Reserve Now</button>
              </section>
            </form>

          </section>

            `;
        $(`.panel${id}`).html(tripDeets);
      }) //loop ends here
      .fail(function(response) {
        console.log(response);
        $('.fail').html('<p>Request was unsuccessful</p>');
        })
        .always(function() {
          console.log('Always always always');
        });

  }; //end of loadTrip

// *****************EVENTS


  $('.panel').on('click', 'h2', function() {
    let tripId = $(this).attr('data-id');
loadTrip(tripId);
    $(`.panel${tripId}`).addClass('info').toggle();

  });
  // $('.allTrips').on('click', function(){
  //   loadTrips();
    // let val;
    // if ($(this).text() == 'All Trips') {
    //   return 'Hide';
    // } else {
    //   return 'All Trips';
    // }
    // // let linkText = $(this).text() == 'All Trips' ? 'Hide' : 'All Trips';
    // $('.tripsButton').html(linkText);
  // });

  $('.allTrips').on('click', function() {
    $('.panel').addClass('active').toggle();
    // let linkText = $('.panel')[0].childElementCount == 0 ? 'Hide' : 'All Trips' ;
    // $('.allTrips').html(linkText);
    loadTrips();




    // if ($('.panel').style.display === 'block') {
    //     $('.panel').style.display = 'none';
    // } else {
    //     $('.panel').style.display = 'block';
    // }
  });

});

// let accordion = function accordion(){
//   let effect = $('.accordion');
//   let i;
//
//   for (i = 0; i < acc.length; i++) {
//     acc[i].onclick = function(){
//       this.classList.toggle('active');
//       let panel = this.nextElementSibling;
//       if (panel.style.display === 'block') {
//           panel.style.display = 'none';
//       } else {
//           panel.style.display = 'block';
//       }
//     }
//   }
// }

// let accordion2 = function accordion2(){
//   let acc = $(".accordion2");
//   console.log(acc);
//   let i;
//
//   for (i = 0; i < acc.length; i++) {
//
//     acc[i].onclick = function(){
//       this.classList.toggle("active");
//       let panel = this.nextElementSibling;
//
//       if (panel.style.display === "block") {
//           panel.style.display = "none";
//       } else {
//           panel.style.display = "block";
//       }
//     }
//   }
// }
