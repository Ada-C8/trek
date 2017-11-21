// click to see all the trips
$(document).ready(function () {
  $('#get-trips').on('click', () => {
    $.get('https://trektravel.herokuapp.com/trips', (data) => {
      for(i = 0; i < data.length; i++) {
        let id = data[i]["id"];
        let name = data[i]["name"];
        let continent = data[i]["continent"];
        let weeks = data[i]["weeks"];

        let tripHTML =
          '<article>' +
          '<h3>' + name + '</h3>' +
          '<p> Trip details: </p>' +
          '<ul>' +
          '<li>' + 'ID: ' + id + '</li>' +
          '<li>' + 'Continent: ' + continent + '</li>' +
          '<li>' + 'Number of weeks: ' + weeks + '</li>' +
          '</ul>' ;

        $('#all-trips').append(tripHTML);
      }; // for loop
    }); // .get
  });// .on
}); // .ready
