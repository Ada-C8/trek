const url = 'https://trektravel.herokuapp.com/trips';

const successCallback = function(response) {
  // $('.success').empty();

  console.log("POST request was successful");
  console.log(response);

  let generatedHMTL = `<p>You have successfully reserved a spot as ${ response["name"] } </p>`;
  $('.success').html(generatedHMTL).show().delay(1000).fadeOut();
  $("html, #wrapper").animate({ scrollTop: 0 }, 500);
};

const querySuccessCallback = function(response) {
  $('#show-trip').hide();
  let body = ''
  console.log(response);
  if(response) {
    response.forEach(function(trip) {
      let tripInfo = `<tr><td data-id=${trip.id} class= 'id'>${trip.id}</td><td data-id=${trip.id} class= 'id'> ${trip.name}</td><td>${trip.continent}</td><td> ${trip.weeks}</td></tr>`
      body += tripInfo;
    })
    $('.success').html(`<p>Results for the following search: ${response[0].continent}.</p>`).show().delay(1000).fadeOut();
    $("html, #wrapper").animate({ scrollTop: 0 }, 500);
  } else {
    $('.fail').html(`<p>Could not find trips for this search.</p>`).show().delay(1000).fadeOut();
    $("html, #wrapper").animate({ scrollTop: 0 }, 500);
  }
  $('#trips tbody').html(body);
  $('#trips').show();
};


$(document).ready(()=>{

  let loadTrips = function loadTrips() {
    $.get(url,
      (response) => {
        $('#show-trip').hide();
        let body = ''
        console.log(response);
        response.forEach(function(trip) {
          let tripInfo = `<tr><td  data-id=${trip.id} class= 'id'>${trip.id}</td><td data-id=${trip.id} class= 'id'>
          ${trip.name}</td><td>${trip.continent}</td><td> ${trip.weeks}</td></tr>`
          body += tripInfo;
        });
        $('.success').html(`<p>Succesfully loaded all trips.</p>`).show().delay(1000).fadeOut();
        $('#trips tbody').html(body);
        $('#trips').show();
      }).fail(function(response){
        console.log(response);
        $('.fail').html('<p>Could not load trips.</p>').show().delay(1000).fadeOut();
      })
    }

    // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR A SPECIFIC TRIP
    let loadTrip = function loadTrip(id){
      $.get(`${url}/${id}`,
        (response) => {
          let tripInfo = `
          <h2> ${response.id}: ${response.name} </h2>
          <p> ${response.about} </p>
          <p> <strong>Continent:</strong> ${response.continent} </p>
          <p> <strong>Category: </strong>${response.category} </p>
          <p> <strong>Weeks: </strong>${response.weeks} </p>
          <p> <strong>Cost: </strong>$${parseFloat(response.cost).toFixed(2)} </p>`;

          // $('#trip').html(tripInfo);

          $('#trip').html(tripInfo);
          $('#show-trip').show();

          $('#reserve-trip-form').show();
          $("html, #wrapper").animate({ scrollTop: 0 }, 500);
          $("#reserve-trip-form").attr("trip-id", `${response.id}`);

          console.log(response)
          $('.success').html(`<p>Succesfully loaded trip information.</p>`).show().delay(1000).fadeOut();
        }).fail(function(response){
          console.log(response);
          $('#fail').html(`<p>Could not load trip information.</p>`).delay(1000).fadeOut();
        })
      };

      $('#load').on('click', function(){
        loadTrips();
      });

      $('#trips table').on('click', 'tr .id', function(){
        let tripID = $(this).attr('data-id');
        console.log(`this is the trip id${$(this).attr('data-id')}`);
        loadTrip(tripID);
      });


      $('#reserve-trip-form').on('submit', function(event) {
        event.preventDefault();

        let formData = $(this).serialize();
        console.log(formData);
        let tripId = $(this).attr('trip-id');


        $.post(`${url}/${tripId}/reservations`, formData, successCallback).fail((response) => {
          console.log("Post request was unsuccessful.");
          $('#fail').html(`<p>Could not reserve trip.</p>`).delay(1000).fadeOut();
        });
      });

      let query = function query(search, type){
        $.get(`${url}/${type}?query=${search}`,
          querySuccessCallback).fail(function(response){
            console.log(response);
            $('.fail').html('<p>Could not load trips.</p>').show().delay(1000).fadeOut();
          })
        }

        $('#continent, #weeks, #budget').on('keypress', function(e){
          if(e.which === 13) {
            console.log(this)
            let search = $(this).val();
            console.log(`this is the search ${this.id} for ${$(this).val()}`);
            query(search, `${this.id}`);
          }
        });

        // $('#continent').on('keypress', function(e){
        //   if(e.which === 13) {
        //     let continent = $(this).val();
        //     console.log(`this is the continent ${$(this).val()}`);
        //     query(continent, "continent");
        //   }
        // // });
        //
        // $('#max-weeks').on('keypress', function(e){
        //   if(e.which === 13) {
        //     let maxWeeks = $(this).val();
        //     query(maxWeeks, "weeks");
        //   }
        // });
        //
        // $('#max-budget').on('keypress', function(e){
        //   if(e.which === 13) {
        //     let maxBudget = $(this).val();
        //     console.log(`this is the budget ${$(this).val()}`);
        //     query(maxBudget, "budget");
        //   }
        // });

        // let queryByContinent = function queryByContinent(query){
        //   $.get(`${url}/continent?query=${query}`,
        //     querySuccessCallback).fail(function(response){
        //       console.log(response);
        //       $('.fail').html('<p>Could not load trips.</p>').show().delay(1000).fadeOut();
        //     })
        //   }

        // $('#continent').on('keypress', function(e){
        //   if(e.which === 13) {
        //     let continent = $(this).val();
        //       console.log(`this is the continent ${$(this).val()}`);
        //       queryByContinent(continent);
        //   }
        // });

        // let queryByWeeks = function queryByWeeks(query){
        //   $.get(`${url}/weeks?query=${query}`,
        //     querySuccessCallback).fail(function(response){
        //       console.log(response);
        //       $('.fail').html('<p>Could not load trips.</p>').show().delay(1000).fadeOut();
        //     })
        //   }
        //
        //   $('#max-weeks').on('keypress', function(e){
        //     if(e.which === 13) {
        //       let maxWeeks = $(this).val();
        //         queryByWeeks(maxWeeks);
        //     }
        //   });

        // let queryByBudget = function queryByBudget(query){
        //   $.get(`${url}/budget?query=${query}`,
        //     querySuccessCallback).fail(function(response){
        //       console.log(response);
        //       $('.fail').html('<p>Could not load trips.</p>').show().delay(1000).fadeOut();
        //     })
        //   }
        //
        //   $('#max-budget').on('keypress', function(e){
        //     if(e.which === 13) {
        //       let maxBudget = $(this).val();
        //         console.log(`this is the budget ${$(this).val()}`);
        //         queryByBudget(maxBudget);
        //     }
        //   });

      });
