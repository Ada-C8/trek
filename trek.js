$(document).ready(() => {

  const allTrips = () => {
    // const allTheTrips = ()

    $.get('https://trektravel.herokuapp.com/trips', (response) => {
      const locations = `
      <h2> ${response[0].name} </h2>`;
      console.log(locations);
      console.log('success!');
      $('#locations').append(locations);
      response.forEach();
    });
  };
  allTrips();
});
