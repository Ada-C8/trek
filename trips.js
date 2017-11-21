/*eslint-disable*/
$(document).ready(()=>{
  $('#all').on('click', () => {
    const url = 'https://trektravel.herokuapp.com/trips'
    $.get(url, response=>{
      const allTrips = response;
      for (let i = 0; i < allTrips.length; i++){
        let trip = `<h2>${allTrips[i].name}</h2>`
        $('#trips').append($(trip).attr('id', `trip${i}`))
      }

    })
  });
});
