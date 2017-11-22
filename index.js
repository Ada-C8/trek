$(document).ready(function() {
  $('#allTrips').on('click', function() {
    let data = [
      {
          "id": 1,
          "name": "Cairo to Zanzibar",
          "continent": "Africa",
          "weeks": 5
      },
      {
          "id": 2,
          "name": "Everest Base Camp Trek",
          "continent": "Asia",
          "weeks": 2
      }
    ];

    let html = "<ul>";
    for(let i = 0; i < data.length; i++) {
      html += `<li><a class="trip" href="#">${data[i].name}</a></li>`;
    }
    html += "</ul>";

    $('#listOfTrips').html(html);
  });

  $('#listOfTrips').on('click', '.trip', function(event) {
    event.preventDefault();
  });
});
