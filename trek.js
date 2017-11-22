$(document).ready(()=>{


  let loadTrips = function loadTrips() {
    const allTripsUrl = 'https://trektravel.herokuapp.com/trips';
    $.get(allTripsUrl, (response) => {
      let i = 0;
      for (let trip of response) {
        let id = response[i].id
        let name = response[i].name;
        let continent = response[i].continent;
        let weeks = response[i].weeks;
        let tripDetails = loadTrip(id)
        let tripSummary = `
        <li class="${id}">
        <strong class="${id}">
        ${name}
        </strong>
        ${weeks} weeks in ${continent}
        <p id=${id} class="summary">
        </p>
        </li>`
        $('.list').append(tripSummary);
        $(`#${id}`).hide()
        i += 1
      }
    })
  }

  let loadTrip = function loadTrip(id) {
    const oneTripUrl = 'https://trektravel.herokuapp.com/trips/' + id
    $.get(oneTripUrl, (response) => {
      console.log(response)
      let id = response.id;
      let name = response.name;
      let about = response.about;
      let cost = response.cost;
      let category = response.category;
      let tripDetails = `
      <strong>
      Trip Summary:
      </strong>
      ${about} \n
      <strong>
      Cost:
      </strong>
      ${cost}
      `;
      $(`#${id}`).html(tripDetails)

      ;
    })
  }

  // let minimizeTrip = function minimizeTrip(id){
  //
  // }



  $('#load_all').on('click', function(){
    loadTrips();
  });

  $('.list').on('click', 'li', function(event){
    id = event.target.className;
    loadTrip(id);
    $(`#${id}`).toggle()
  });

  // $('.summary').on('click', '.list', function(event){
  //   $(".summary").hide(1000);
  // });



})

//Events
