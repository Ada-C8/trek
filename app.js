$(document).ready(() => {
  $('.search-trips').on('click', function() {

    $.get('https://trektravel.herokuapp.com/trips',
    response => {
      console.log('success!');
      //console.log(JSON.stringify(response));

      let tableRows = '';
      response.forEach(function(trip) {
        tableRows += `<tr data-id=${trip.id}>`
        for (let attr in trip) {
          tableRows += '<td>' + trip[attr] + '</td>'
        }
        tableRows += '</tr>'
      })

      $('#trips table').show().append(tableRows);

    })
    .fail(function(response) {
      //{"readyState":0,"status":0,"statusText":"error"}
      // console.log('what returns '+ JSON.stringify(response));
      $('#error').append("Content cannot be retrieved");
      console.log('failure');
    })
    .always(function(){
      console.log('always even if we have success or failure');
    });

    // FUNCTION FOR AJAX REQUEST AND RESPONSE FOR A SPECIFIC TRIP
    let loadTrip = function(id) {
      $('#trip').html('');
      $.get(`https://trektravel.herokuapp.com/trips/${id}`,
        (response) => {
          // console.log('this is' + response[name]);  //why is this returning object object
          let tripInfo = `

          <p> Id: ${response.id} </p>
          <p> Continent: ${response.continent} </p>
          <p> About: ${response.about} </p>
          <p> Category: ${response.category} </p>
          <p> Weeks: ${response.weeks} </p>
          <p> Costs: ${response.cost} </p>
          <form id="add-name-form" action="https://trektravel.herokuapp.com/trips/${id}/reservations">
          <label for="name">Name:</label>
          <input type="text" name="name" placeholder="Name"></input>

          <label for="age">Age:</label>
          <input type="number" age="age" placeholder="Age"></input>

          <label for="email">Email:</label>
          <input type="text" email="email" placeholder="Email"></input>

          <input type="submit" value="Reserve Spot"></input>
          </form>`;

          $('#trip').html(tripInfo);

        })
        .fail(function(response){
          console.log(response);
          $('#fail').html('<p>Request was unsuccessful</p>');
        })
        .always(function(){
          console.log('always even if we have success or failure');
        });
    };
    $('#trips table').on('click', 'tr',  function() {
      let tripID = $(this).attr('data-id');
      console.log(tripID);
      $('#trip').show();
      loadTrip(tripID);
      // console.log(loadTrip);
    });
  });

    const successCallback = function(response) {
      console.log("POST request was successful");
      console.log(response);

      let generatedHTML = '<p>Everything went great,';
      generatedHTML += `and your ${ response["name"] } has been added to the DB!</p>`;
      console.log("we're here" + generatedHTML);
      $('#ajax-results').html(generatedHTML);
    }
    // FUNCTION TO RESERVE A SPOT TO A SINGLE TRIP

    $('#trip').on('submit', "#add-name-form", function(event) {
      event.preventDefault();

      let formData = $('#add-name-form').serialize();
      console.log(formData);

      const url = $('#add-name-form').attr('action');

      $.post(url, formData, successCallback).fail((response) => {
        console.log("Unable to post");
      });
    });


  //   // EVENTS
  // why is this out of scope here?
  // $('#trips ul').on('click', 'h3', function(){
  //   let tripID = $(this).attr('data-id');
  //   console.log(tripID);
  //   loadTrip(tripID);
  //   // console.log(loadTrip);
  // });
  $("#search-trips").click(function(){
        $("#trip").hide();
    });

  //   function slideSwitch() {
  //     let $active = $('#slideshow IMG.active');
  //
  //     if ( $active.length == 0 ) $active = $('#slideshow IMG:last');
  //
  //     let $next =  $active.next().length ? $active.next()
  //         : $('#slideshow IMG:first');
  //
  //     $active.addClass('last-active');
  //
  //     $next.css({opacity: 0.0})
  //         .addClass('active')
  //         .animate({opacity: 1.0}, 1000, function() {
  //             $active.removeClass('active last-active');
  //         });
  // }
  //
  // $(function() {
  //     setInterval( "slideSwitch()", 5000 );
  // });

}); //end of document ready

  function slideSwitch() {
    let $active = $('#slideshow IMG.active');

    if ( $active.length == 0 ) $active = $('#slideshow IMG:last');

    let $next =  $active.next().length ? $active.next()
        : $('#slideshow IMG:first');

    $active.addClass('last-active');

    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active last-active');
        });
}

$(function() {
    setInterval( "slideSwitch()", 5000 );
});
