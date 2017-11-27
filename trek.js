let baseUrl = "https://trektravel.herokuapp.com/trips/";
let clearPage = function () {
  $('main').empty();
  $('main').show();
};

$(document).ready(function () {
  $('main').hide();

  let tripListTemplate = _.template($('#trip-list-template').html());
  let showTripTemplate = _.template($('#show-trip-template').html());

  let tripsCallback = function (response) {
    clearPage();
    let generatedHtml = tripListTemplate({ trips: response });
    $('main').append(generatedHtml);
  };

  let tripCallback = function (response) {
    clearPage();
    let reservationUrl = baseUrl + response.id + "/reserve";
    let generatedHtml = showTripTemplate({
      trip: response,
      url: reservationUrl
    });
    $('main').append(generatedHtml);
  };

  let failCallback = function (response) {
    $('main').prepend("<p id='callout alert'>AJAX Request Failed!</p>");
  };

  $('#get-trips').click(function() {
    let url = baseUrl;
    $.get(url, tripsCallback).fail(failCallback);
  });

  $('main').on('click', '#trip-list a', function () {
    let url = baseUrl + $(this).attr('id');
    $.get(url, tripCallback).fail(failCallback);
  });

  $('form').submit(function (event) {
    event.preventDefault();

    let url = $('form').attr('action');
    let formData = $('form').serialize();

    $.post(url, formData, function (response) {
      $("<p class='callout success'>Reserved Successfully!</p>").insertAfter('h3');
    }).fail(failCallback);
  });
});
