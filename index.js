$(document).ready(() => {
  $('#load-trips').on('click', () => {
    $.get(
      'https://trektravel.herokuapp.com/trips',
      (response) => {
        $('#content').html('<div id="content"><ul id="list"></ul></div>');
        for (let i = 0; i < response.length; i += 1) {
          const trip = response[i];
          const weeks = trip.weeks === 1 ? 'week' : 'weeks';
          const tripHTML = `<li><h3><a class='trip' id='${trip.id}' href="#">${trip.name}</a></h3><ul><li>${trip.continent}</li><li>${trip.weeks} ${weeks}</li></ul></li>`;
          $('#list').append(tripHTML);
        }
      },
    );
  });
  $('body').on('click', '.trip', (event) => {
    $.get(
      `https://trektravel.herokuapp.com/trips/${event.target.id}`,
      (response) => {
        const tripHTML = `<a id='reserve' href='#' trip_id='${response.id}'>Reserve</a><h4>Details</h4><ul><li>ID: ${response.id}</li><li>Continent: ${response.continent}</li><li>About: ${response.about}</li><li>Category: ${response.category}</li><li>Weeks: ${response.weeks}</li><li>Cost: ${response.cost}</li></ul>`;
        $('#title').html(`${response.name}`);
        $('#content').html(tripHTML);
      },
    );
  });
  $('body').on('click', '#reserve', () => {
    const formElements = ['Name', 'Email', 'Age'];
    const sectionHTML = formElements.reduce((string, element) => {
      return `${string}<section><label>${element}</label><input type='text' id='${element.toLowerCase()}' name='${element.toLowerCase()}' /></section>`;
    }, '');
    console.log(sectionHTML);
    const formHTML = `<form>${sectionHTML}<section><button type='submit'>Reserve</button></section></form>`;

    $('#content').html(formHTML);
  });
});
