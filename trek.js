// let words ['Enjoy ', 'Adventure for ', 'Get away from it all for']
// let rand = words[Math.floor(Math.random() * words.length)];
let words = ['Enjoy ', 'Adventure for ', 'Get away from it all for ', 'Relax with ']

// still need to work on error handling (ex. if trip name is null, or the api get does not work)
$(document).ready(()=>{

  let loadTrips = function loadTrips() {
    const allTripsUrl = 'https://trektravel.herokuapp.com/trips';
    $.get(allTripsUrl, (response) => {
      let i = 0;
      for (let trip of response) {
        if (response[i].name && response[i].id){
          let id = response[i].id
          let name = response[i].name;
          let continent = response[i].continent;
          let weeks = response[i].weeks;
          let tripDetails = loadTrip(id)
          let rand = words[Math.floor(Math.random() * words.length)];
          let tripSummary = `
          <li class="${id} Trip">
          <h3 class="${id}">
          ${name}
          </h3>
          </li>
          ${rand}${weeks} weeks in ${continent}
          <div id=${id} class="summary columns 10">
          </div>
          `
          $('.list').append(tripSummary);
          $(`#${id}`).hide()
          i += 1;
        }

      }
    })
  }


  let loadTrip = function loadTrip(id) {
    const oneTripUrl = 'https://trektravel.herokuapp.com/trips/' + id
    $.get(oneTripUrl, (response) => {
      if (response) {
        let id = response.id;
        let name = response.name;
        if (!name){
          about = 'Unnammed trip';
        };
        let about = response.about;
        if (!about){
          about = 'No information on trip';
        };
        let cost = response.cost;
        if (!cost){
          cost = 'No information on trip cost';
        };
        let category = response.category;
        if (!category){
          category = 'No information on trip cost';
        };
        let tripDetails = `
        <p>
        <strong>
        Trip Summary:<br/>
        </strong>
        ${about} <br/>
        <strong>Trip ID: </strong>${id} <br/>
        <strong>Category: </strong>${category} <br/>
        <strong>Cost:  </strong>${cost}
        </p>
        <div class="text-center link">
        <a class="${id} button text-center" href="form.html"> <h3>Book your adventure today!</h3></a>
        <br/>`;
        $(`#${id}`).html(tripDetails)
      }
      else if (!response){
        console.log(`get request to trip ${oneTripUrl} failed`);
        $(`#${id}`).html(`<p class= "fail">can not retrive trip details</p>`)
      }
    })

  }

//events
  $('#load_all').on('click', function(){
    loadTrips();
  });

  $('.list').on('click', 'h3', function(event){
    id = event.target.className;
    loadTrip(id);
    $(`#${id}`).toggle()
  });

  $('.list').on('click', 'div a', function(event){
    id = event.target.className
    localStorage.setItem('id', id)
    const name = $('#reserve-form input[name="name"]').val()
    id = event.target.className;
  });
})
