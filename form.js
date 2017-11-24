$(document).ready(()=>{
  $('#reserve-form').submit (function(e) {
    // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
    id = localStorage.getItem("id")
    e.preventDefault();

    const postUrl = `https://trektravel.herokuapp.com/trips/${id}/reservations`
    const url = $(this).attr("action"); // Retrieve the action from the form
    const name = $('#reserve-form input[name="name"]').val()


    const successMessage = `
    <div class="success text-center">
    <h2>${name}'s trip reserved!</h2>
    </div>`


    if (name!== ""){
      const formData = $(this).serialize();
      $.post(postUrl, formData, function(response){
        e.preventDefault();
        $('.success-message').append(successMessage);
        $('#reserve-form').hide()
        $(".error-message").hide()
        // $(".trip-name").hide()
      }).fail(function(e) {
        $(".error-message").html('<p class="fail text-center">Failed to communicate with API</p>');
      });

    }else if (name === ""){
      $(".error-message").html('<p class="fail text-center">You must enter your name to reserve a spot on this trip!</p>');
    }
  });

  const loadName  = function loadName(){
    const id = localStorage.getItem("id")
    const oneTripUrl = 'https://trektravel.herokuapp.com/trips/' + id
    $.get(oneTripUrl, (response) => {
      let tripName = response.name;
      $(".trip-name").append(`Reserve your spot on our <strong>${tripName}</strong> trip!`);
    });
  };

    // const findName = function findName(){
    //   const id = localStorage.getItem("id");
    //   const oneTripUrl = 'https://trektravel.herokuapp.com/trips/' + id;
    //   $.get(oneTripUrl, (response) => {
    //     let tripName = response.name;
    //     console.log(tripName)
    //     return tripName;
    //   });
    // };

    loadName()

  });
