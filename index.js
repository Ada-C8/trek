$('#load-trips').click(function(event) {
  $.get('https://trektravel.herokuapp.com/trips',
  response => {
    console.log('success!');
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      $('#trips').append(`<tr><td>${response[i].id}</td>
        <td>${response[i].name}</td>
        <td>${response[i].continent}</td>
        <td>${response[i].weeks}</td></tr>`);
    };
    })
    .fail(function(){
      console.log('failure');
      $('#message').html('<p>Request failed no0o0</p>');
    })
    .always(function(){
      console.log('always even if we have success or failure');
    }); // Note that this is where the semi-colon ends up
});
