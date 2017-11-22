$(document).ready(() => {

  $('#load').click(function() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        console.log(response);
        response.forEach(function(trek) {
          let trekInfo = `<li><h3 data-id=${trek.id}><a class="totrip"> ${trek.name} </a></h3><p> ${trek.continent}, ${trek.weeks}</li>`

          $('#trips ul').append(trekInfo);
        });

      })
      .fail(function(response){
          console.log(response);
          $('#fail').html('<p>Request was unsuccessful</p>')
        })
        .always(function(){
          console.log('always even if we have success or failure');
        });
  });

  $('#trips ul').on('click', 'h3', function(){
    let tripID = $(this).attr('data-id');
    $.get(`https://trektravel.herokuapp.com/trips/${tripID}`,
      (response) => {
        let tripInfo = `
        <h2> ${response.name} </h2>
        <p> Trip ID: ${response.id} </p>
        <p> Continent: ${response.continent} </p>
        <p> Category: ${response.category} </p>
        <p> About: ${response.about} </p>
        <p> Weeks: ${response.weeks} </p>
        <p> Cost: ${response.cost} </p>`;

        $('#trip').html(tripInfo);

      })
      .fail(function(response){
          console.log(response);
          $('#fail').html('<p>Request was unsuccessful</p>')
        })
        .always(function(){
          console.log('always even if we have success or failure');
        });
  });

});
