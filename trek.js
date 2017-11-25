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

      const tripDetails = `
      <ul>
      <li>ID:${response.id} </li>
      <li>Destination: </li>
      <li>Continent: </li>
      <li>About: </li>
      <li>Category: </li>
      <li>Weeks: </li>
      <li>Cost: </li>
      </ul>`;
      $(`li#${id}`).append(tripDetails);
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
