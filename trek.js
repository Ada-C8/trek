var baseUrl = "https://trektravel.herokuapp.com/trips/";
var clearPage = function () {
  $('main').empty();
  $('main').show();
};

$(document).ready(function () {
  $('main').hide();

  var tripListTemplate = _.template($('#trip-list-template').html());
  var showTripTemplate = _.template($('#show-trip-template').html());

  var tripsCallback = function (response) {
    clearPage();
    var generatedHtml = tripListTemplate({ trips: response });
    $('main').append(generatedHtml);
  };

  var tripCallback = function (response) {
    clearPage();
    var reservationUrl = baseUrl + response.id + "/reserve";
    var generatedHtml = showTripTemplate({
      trip: response,
      url: reservationUrl
    });
    $('main').append(generatedHtml);
  };

  var failCallback = function (response) {
    $('main').prepend("<p id='callout alert'>AJAX Request Failed!</p>");
  };

  $('#get-trips').click(function() {
    var url = baseUrl;
    $.get(url, tripsCallback).fail(failCallback);
  });

  $('main').on('click', '#trip-list a', function () {
    var url = baseUrl + $(this).attr('id');
    $.get(url, tripCallback).fail(failCallback);
  });

  $('form').submit(function (event) {
    event.preventDefault();

    var url = $('form').attr('action');
    var formData = $('form').serialize();

    $.post(url, formData, function (response) {
      $("<p class='callout success'>Reserved Successfully!</p>").insertAfter('h3');
    }).fail(failCallback);
  });
});
