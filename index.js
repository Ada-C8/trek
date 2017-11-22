$(document).ready(() => {

  $('#load').click(function() {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        console.log(response);
        response.forEach(function(trek) {
          let trekInfo = `<li><h3 data-id=${trek.id}> ${trek.name} </a></h3><p> ${trek.continent}, ${trek.weeks}</li>`

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

});
