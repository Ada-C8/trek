$(document).ready(function() {
  let loadTrips = function loadTrips() {
    url = "https://trektravel.herokuapp.com/trips";
    $.get(`${url}`, function(data) {
      for (let trip of data) {
        if (trip.continent != null) {
          let tripInfo = $(
            '<tr id="trip' + trip.id + '">'
            + '<td class="trip-name">' + '<a class="trip-title" data-id =' + trip.id + '>' + trip.name + '</a>' + '</td>'
            + '<td class="trip-cont">' + trip.continent + '</td>'
            + '<td class="trip-week">' + trip.weeks + '</td>'
            + '</tr>'
          );
          $('#trip-list').append(tripInfo);
        }
      }
    });
  };

  let loadTrip = function loadTrip(id) {
    url = `https://trektravel.herokuapp.com/trips/${id}`
    $.get(`${url}`, function(data) {
      data.category = data.category.charAt(0).toUpperCase() + data.category.slice(1);
      data.cost = parseFloat(Math.round(data.cost * 100) / 100).toFixed(2);
      let tripInfo = $(
        '<tr class="trip-deets">'
        + '<td colspan="3">'
        + '<table class="deet-table">'
        + '<tr>'
        + '<td>' + '<i class="fa fa-tags"></i> Category: ' + data.category + '</td>'
        + '<td>' + '<i class="fa fa-usd"></i> Cost: ' + data.cost + '</td>'
        + '</tr>'
        + '<tr>'
        + '<td class="about-text" colspan="2">' + data.about + '</td>'
        + '</tr>'
        + '<tr>'
        + '<td class="about-text" colspan="2"><button id="reserve-go" class="btn btn-warning">Reserve Trip</button>' + '</td>'
        + '</tr>'
        + '</table>'
        + '</td>'
        + '</tr>'
      );
      tripInfo.fadeIn('slow', function() {
        $(`tr#trip${data.id}`).after(tripInfo);
      })

      // $(`tr#trip${data.id}`).after(tripInfo);
    });
  };

  let details_exist = false;
  let current_trip_id;

  $('tbody#trip-list').on('click', 'a', function() {
    let tripID = $(this).attr('data-id');

    console.log(current_trip_id);

    if (current_trip_id != tripID) {
      $('tr[id^=trip]').css('background', 'none');
      $('table.table').find('tr.trip-deets').each(function() {
        $(this).remove();
      });
      details_exist = false;
      current_trip_id = null;

      loadTrip(tripID);
      $(`tr#trip${tripID}`).css('background', '#777');
      details_exist = true;
      current_trip_id = tripID;

      console.log(current_trip_id);
    } else {
      $('tr[id^=trip]').css('background', 'none');
      $('table.table').find('tr.trip-deets').each(function() {
        $(this).remove();
      });
      details_exist = false;
      current_trip_id = null;
    }
  });

  console.log(current_trip_id);

  $('#all-trips').on('click', function() {
    let imageHeight = $('section.hero-image').css('height');
    if (imageHeight == '780px') {
      $('section.hero-image').css('height', '100px');
      $('div.image-wrapper').css('padding', '0');
      $('div.wtf-row').css('height', '100%');
      $(this).css('width', '30%');

      $('h1.title').removeClass('col-12').addClass('col');
      $('div.button-wrapper').removeClass('col-12').addClass('col');
    }
    else {
      $('section.hero-image').css('height', '780px');
      $('div.image-wrapper').css('padding', '15%');
      $('div.wtf-row').css('height', '50%');
      $(this).css('width', '20%');

      $('h1.title').removeClass('col').addClass('col-12');
      $('div.button-wrapper').removeClass('col').addClass('col-12');
    }
    $('.table').toggle('slow');
    loadTrips();
  });

  $('#trip-list').on('click', '#reserve-go', function() {
    $('div#reserve-modal').show('slow');
  });
  $('i.modal-close').on('click', function() {
    $('div#reserve-modal').hide('slow');
  })

  // $('#name-sort').on('click', function() {
  //   if ($('tbody#trip-list tr:first-of-type').text()[0] != 'A') {
  //     sortTable('asc');
  //   } else {
  //     sortTable('desc');
  //   }
  // });
  //
  // let sortTable = function sortTable(direction) {
  //   let rows = $('tbody#trip-list tr').get();
  //
  //   rows.sort(function(a, b) {
  //     let A = $(a).children('td').eq(0).text().toUpperCase();
  //     let B = $(b).children('td').eq(0).text().toUpperCase();
  //
  //     if(direction == 'asc') {
  //       return (A > B) ? 1 : 0;
  //     } else {
  //       return (A > B) ? 0 : 1;
  //     }
  //   });
  //
  //   $.each(rows, function(index, row) {
  //     $('.trip-table').children('tbody').append(row);
  //   });
  // };


    let reserve_url = `https://trektravel.herokuapp.com/trips/${current_trip_id}/reservations`;

    let successCallback = function(response) {
    console.log("POST request was successful");
    console.log(response);

    // let generatedHMTL = '<p>Everything went great,';
    // generatedHMTL += `and your pet ${ response["name"] } has been added to the DB!</p>`;
    // $('#ajax-results').html(generatedHMTL);
  };

  $('#reserve-form').on('submit', function(event) {
    console.log(reserve_url);
    event.preventDefault();

    let formData = $('#reserve-form').serialize();
    console.log(formData);

    console.log(reserve_url);

    $.post(reserve_url, formData, successCallback).fail((response) => {
      console.log("Didn't go so hot");
    });
  });



});
