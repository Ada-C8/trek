const baseURL = 'https://trektravel.herokuapp.com/trips';

$(document).ready(() => {
  const loadAllTrips = () => {
    $.get(baseURL, (response) => {
      console.log('all trips worked');
      response.forEach((trip) => {
        const thisTrip = `<li id='${trip.id}'> ${trip.name} </li>`;
        $('#tripSection').append(thisTrip);
      });
    });
  };

  const tripDetails = (id) => {
    $.get(`${baseURL}/${id}`, (response) => {
      console.log('Single trip worked');
      console.log(response);
      if ($('#details').length > 0) {
        $('#details').remove();
      }
      const details = `
      <ul id='details'>
      <li>ID: ${response.id} </li>
      <li>Destination: ${response.name} </li>
      <li>Continent: ${response.continent} </li>
      <li>About: ${response.about} </li>
      <li>Category: ${response.category} </li>
      <li>Weeks: ${response.weeks} </li>
      <li>Cost: ${response.cost} </li>
      </ul>`;
      $(`li#${id}`).append(details);
    });
  };

  $('#trips').on('click', () => {
    loadAllTrips();
  });

  $('#tripSection').on('click', 'li', (e) => {
    const id = e.target.id;
    console.log(id);
    tripDetails(id);
  });
});
