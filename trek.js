$(document).ready(() => {

  const allTrips = () => {
    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      response.forEach((place) => {
        const locations = `
        <h2> ${place.name} </h2>`;
        console.log(locations);
        // console.log('success!');
        $('#locations').append(locations);
      });
    });
  };
  allTrips();
});
