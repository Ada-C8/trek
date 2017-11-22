$(document).ready(function() {
  $('#allTrips').on('click', function() {
    $.ajax('https://trektravel.herokuapp.com/trips', {
      dataType: "json",
      success: function(response) {
        let html = "<ul>";
        for(let i = 0; i < response.length; i++) {
          html += `<li><a class="trip" href="#">${response[i].name}</a></li>`;
        }
        html += "</ul>";

        $('#listOfTrips').html(html);
      },
      error: function(request, errorType, errorMessage) {
        // TODO: handle errors here
      }
    });
  });

  $('#listOfTrips').on('click', '.trip', function(event) {
    event.preventDefault();
  });
});
