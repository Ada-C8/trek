/* eslint-disable */

$(document).ready(() => {
  $('form').submit(function(e) {
    e.preventDefault();
    console.log(this);
  })

  let loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        response.forEach(function(trip) {
          let name = trip.name;
          let continent = trip.continent;
          let weeks = trip.weeks;
          let id = trip.id;
          $('.panel').append(`
              <button class='accordion2'>${name}</button>
              <section class='panel2'>
                <p>Continent: ${continent}</p>
                <p>Duration: ${weeks} week(s)</p>
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
            `);
        }); //loop ends here
      })
      .fail(function(response) {
        console.log(response);
        $('#fail').html('<p>Request was unsuccessful</p>');
        })
        .always(function() {
          console.log('Always always always');
        });

      let tripDeets = function tripDeets(id){
        $.get('https://trektravel.herokuapp.com/trips/${id}',
          (response) => {
            console.log('defining this');
            console.log(this);
          });
          return this
      }

  }; //end of loadTrips
  //
  // const url=

  let accordion = function accordion(){
    let acc = $('.accordion');
    let i;

    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function(){
        this.classList.toggle('active');
        let panel = this.nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            panel.style.display = 'block';
        }
      }
    }
  }

  let accordion2 = function accordion2(){
    let acc = $(".accordion2");
    console.log(acc);
    let i;

    for (i = 0; i < acc.length; i++) {

      acc[i].onclick = function(){
        this.classList.toggle("active");
        let panel = this.nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
      }
    }
  }
// *****************EVENTS


  // // $('button').on('click', function() {
    loadTrips();
    accordion();
    accordion2();
  // //   $('.allTrips').toggle();
  // //   linkText = $(this).text() == 'All Trips' ? 'Hide' : 'All Trips';
  // //   $('.tripsButton').html(linkText);
  // // });
  // //
  // // $('.allTrips ul').on('click', 'p', function() {
  // //   console.log($(this).text());
  // // })

})
