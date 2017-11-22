$(document).ready(() => {
  $('#clickme').on('click', function() {

    $.get('https://trektravel.herokuapp.com/trips',
    response => {
      console.log('success!');
      //console.log(JSON.stringify(response));
      response.forEach(function(trip) {
        let tripInfo = `<li><h3 data-id=${trip.id}>  <a href='#'>${trip.name} </a></h3></li>`

        $('#trips ul').append(tripInfo);

      });
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
    let loadTrip = function loadTrip(id){
      $.get(`https://trektravel.herokuapp.com/trips/${id}`,
        (response) => {
          console.log('this is' + response);
          let tripInfo = `
          <h2> ${response.name} </h2>
          <p> Id: ${response.id} </p>
          <p> Continent: ${response.continent} </p>
          <p> About: ${response.about} </p>
          <p> Category: ${response.category} </p>
          <p> Weeks: ${response.weeks} </p>
          <p> Costs: ${response.costs} </p>`;

          $('#trip').html(tripInfo);

        })
        .fail(function(response){
            console.log(response);
            $('#fail').html('<p>Request was unsuccessful</p>')
          })
          .always(function(){
            console.log('always even if we have success or failure');
          });
    };


    // EVENTS
    $('#trips ul').on('click', 'h3', function(){
      let tripID = $(this).attr('data-id');
      loadTrip(tripID);
    });

  });
});
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
