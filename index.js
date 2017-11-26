$(document).ready(function() {
  $('#allTrips').on('click', function() {
    let $allTrips = $(this);
    $allTrips.hide();
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
      $('#message').html('<p>Unable to complete request.</p>');
      location.reload(true);
      }
    });
  });

  let reserveTripUrl = "";

  $('#listOfTrips').on('click', '.trip', function(event) {
    event.preventDefault();

    $tripId = $(this);
    let tripUrl = `https://trektravel.herokuapp.com/trips/${$tripId.data("id")}`;
    reserveTripUrl = `https://trektravel.herokuapp.com/trips/${$tripId.data("id")}/reservations`;

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
      $('#message').html('<p>Unable to complete request.</p>');
      location.reload(true);
      }
    });
  });

  $('#reserveBtn').on('click', function() {
    $('#reservationForm').show();
    $('button').hide();
    $('#tripDetail #about').hide();
    $('#tripDetail p').hide();
  });

  $('#reservation').submit(function(event) {
    event.preventDefault();
    const url = reserveTripUrl;
    const formData = $(this).serialize();

    // $.post(url, formData, (response) => {
    //   $('#message').html('<p>Reserved!</p>');
    // }).fail(() => {
    //   $('#message').html('<p>Unable to add trip.</p>');
    // });

    $.ajax(url, {
      method: "POST",
      data: formData,
      dataType: "json",
      success: function(trip) {
        $('#message').html('<p>Reserved! Have fun!</p>');
        $('#tripDetail').hide();
        $('#tripSearch').show();
        $('#reservationForm').hide();
        setTimeout(location.reload.bind(location), 2500);},
        error: function(request, errorType, errorMessage) {
        $('#message').html('<p>Unable to add trip.</p>');
        location.reload(true);
      }
    });
  });
});
