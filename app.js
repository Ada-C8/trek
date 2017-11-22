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
