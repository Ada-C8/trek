/* eslint-disable */

$(document).ready(() => {

  const allTripsUrl = 'https://trektravel.herokuapp.com/trips';

  $.get(allTripsUrl, (response) => {
    response.forEach((trip) => {
      const tripInfo= `<li><strong>${trip.name}</strong> - ${trip.weeks} week(s) in ${trip.continent} </li>`
      $('#trip-list ul').append(tripInfo);
    })

  })


  // $('#all-trips').on('click', () => {
  //   loadAllTrips();
  // })
})
