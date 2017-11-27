//hide rows not to be seen

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

      // response.forEach(function(trip) {
      //   let tripInfo = `<tr><h3 data-id=${trip.id}>  <a href='#'>${trip.name} </a></h3>
      //
      //   </li>`

      $('#trips table').show().append(tableRows);
        // $("#trips ul").append(
        // "<table><tr><td>My column 1, row 1</td>" +
        // "<td>My column 2, row 2</td></tr>" +
        // "<tr><td>My column 1, row 2</td>" +
        // "<td>My column 2, row 2</td></tr></table>");
        // });



        // let tripInfo = `<li><h3 data-id=${trip.id}>  <a href='#'>${trip.name} </a></h3></li>`
        // $('#trips ul').append(tripInfo);

      // });
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
          <h2> ${response[name]} </h2>
          <p> Id: ${response.id} </p>
          <p> Continent: ${response.continent} </p>
          <p> About: ${response.about} </p>
          <p> Category: ${response.category} </p>
          <p> Weeks: ${response.weeks} </p>
          <p> Costs: ${response.cost} </p>
          <form id="add-name-form" action="https://trektravel.herokuapp.com/trips/${id}/reservations">
          <label for="name">Name:</label>
          <input type="text" name="name"></input>

          <label for="age">Age:</label>
          <input type="number" age="age"></input>

          <label for="email">Email:</label>
          <input type="text" email="email"></input>

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

// $('.slider').each(function() {
//   let $this = $this;
//   let $group = $this.find('.slide-group');
//   let $slides = $this.find('.slide');
//   let buttonArray = [];
//   let currentIndex = 0;
//   let timeout;
//
//   function move(newIndex) {
//     let animateLeft
//     let slideLeft;
//
//     advance();
//
//     if ($group.is(':animated') || currentIndex === newIndex) {
//       return;
//     }
//
//     buttonArray[currentIndex].removeClass('active');
//     buttonArray[newIndex].addClass('active');
//
//     if (newIndex > currentIndex) {
//       slideLeft = '100%';
//       animateLeft = '-100%';
//     } else {
//       slideLeft = '-100%';
//       animateLeft = '100%';
//     }
//
//     $slides.eq(newIndex).css( {left: slideLeft, display: 'block'} );
//     $group.animate( {left: animateLeft}, function() {
//       $slides.eq(currentIndex).css( {display: 'none'} );
//       $slides.eq(newIndex).css( {left: 0} );
//       $group.css( {left: 0} );
//       currentIndex = newIndex;
//     });
//   } //end of move function
//
//
//   function advance() {
//     clearTimeout(timeout);
//
//     timeout = setTimeout(function() {
//       if (currentIndex < ($slides.length - 1)) {
//         move(currentIndex + 1);
//       } else {
//         move(0);
//       }
//     }, 4000);
//   } // end of advance function
//
//   $.each($slides, function(index) {
//     let $button = $('<button type="button" class="slide-btn">&bull;</button>');
//     if (index === currentIndex) {
//       $button.addClass('active');
//     }
//     $button.on('click', function() {
//       move(index);
//     }).appendTo($this.find('.slide-buttons'));
//     buttonArray.push($button);
//   });
//
//   advance();
//
// }); //end of slide function


// Another option that works

// $(function() {
//   $('#clickme').click(function() {
//        $.ajax({
//          method: 'GET',
//          url: 'https://trektravel.herokuapp.com/trips',
//          dataType: 'json',
//          success: function(data) {
//           let travelData = [];
//           console.log(data);
//           for(r in data) {
//             let key = r;
//             let val = data[r];
//
//             travelData.push('<li id="' + key + '">' + val.id + '</li>');
//           }
//           console.log(travelData);
//
//
//           $('<ul/>', {
//              'class': 'interest-list',
//              html: travelData.join('')
//           }).appendTo('body');
//
//        },
//       statusCode: {
//          404: function() {
//            alert('There was a problem with the server.  Try again soon!');
//          }
//        }
//     });
//   });
// });
