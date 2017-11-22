$( document ).ready(function() {
  $.get('https://trektravel.herokuapp.com/trips',
    response => {
      console.log('success!');
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        // TODO: add link to li items
        $('ul').append(`<li><h3>${response[i]["name"]}</h3></li> continent : ${response[i]["continent"]}`)
      }
    })
});
