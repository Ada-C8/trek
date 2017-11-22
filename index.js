$(document).ready(() => {
  const loadTrips = function loadTrips() {
    $.get('https://trektravel.herokuapp.com/trips/', (response) => {
      console.log('success!');

      for (i = 0; i < response.length; i++) {
        let tripInfo = `<article data-id="${response[i].id}" data-name="${response[i].name}" data-continent="${response[i].continent}" data-weeks="${response[i].weeks}">

          <ul>
            <li>${response[i].name}</li>
            <button class="trip_details">View Trip Details</button>
          </ul>
        </article>`
        $('#trips').append(tripInfo);
      }

      $('.trip_details').on('click', function () {

        let list = $(this).siblings()[0];

        let parentArticle = $(this).closest('article');

        let details = `<li>${parentArticle.attr("data-id")}</li>
          <li>${parentArticle.attr("data-weeks")}</li>
          <li>${parentArticle.attr("data-continent")}</li>`

        $(list).append(details);
      })
    });
  }


  $('#load').on('click', () => {
    $('#trips').empty();
    loadTrips();
  });
});
