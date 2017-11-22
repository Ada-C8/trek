$(document).ready(function() {
  $('#allTrips').on('click', function() {
    let $allTrips = $(this);

    $allTrips.attr("disabled", true);

    $.ajax('https://trektravel.herokuapp.com/trips', {
      dataType: "json",
      success: function(response) {
        $allTrips.removeAttr('disabled');

        let html = "<ul>";
        for(let i = 0; i < response.length; i++) {
          html += `<li><a data-id="${response[i].id}" class="trip" href="#">${response[i].name}</a></li>`;
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

    $tripId = $(this);
    let tripUrl = `https://trektravel.herokuapp.com/trips/${$tripId.data("id")}`;

    $.ajax(tripUrl, {
      dataType: "json",
      success: function(trip) {
        $("#tripSearch").hide();

        $("#name").html(trip.name);
        $("#continent").html(trip.continent);
        $("#about").html(trip.about);
        $("#category").html(trip.category);
        $("#weeks").html(trip.weeks);
        $("#cost").html(trip.cost);

        $("#tripDetail").show();
      },
      error: function(request, errorType, errorMessage) {
        // TODO: handle errors here
      }
    });
  });
});
