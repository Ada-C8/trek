$(function() {
  $('#clickme').click(function() {
       $.ajax({
         method: 'GET',
         url: 'https://trektravel.herokuapp.com/trips',
         dataType: 'json',
         success: function(data) {
           console.log(data);
          let travelData = [];
          for(r in data) {
            let key = r;
            let val = data[r];

            travelData.push('<li id="' + key + '">' + val + '</li>');
          }
          console.log(travelData);


          $('<ul/>', {
             'class': 'interest-list',
             html: travelData.join('')
          }).appendTo('body');

       },
      statusCode: {
         404: function() {
           alert('There was a problem with the server.  Try again soon!');
         }
       }
    });
  });
});











//Wave 1: Click button or link to show all trips
//
// const url = 'https://trektravel.herokuapp.com/trips'
//
// const trekData = {
//   id;
//   name;
//   continent;
//   weeks;
// };
//
// $(function(){
//     $.getJSON('https://trektravel.herokuapp.com/trips', function(travelData) {
//         console.log(data);
//     });
// });


// Which URL do we want to 'get'?
// let url = 'https://trektravel.herokuapp.com/trips';
//
// // What do we want to happen when we get our response?
// let successCallback =  (response) => {
//   console.log('success!');
// };
//
//
// $.getJSON(url, successCallback);
