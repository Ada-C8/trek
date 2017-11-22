$(document).ready(()=>{
  $('#reserve-form').submit (function(e) {
    // By default, the form will attempt to do it's own local POST so we want to prevent that default behavior
    id = localStorage.getItem("id")
    e.preventDefault();

    const postUrl = `https://trektravel.herokuapp.com/trips/${id}/reservations`
    const url = $(this).attr("action"); // Retrieve the action from the form
    const name = $('#reserve-form input[name="name"]').val()
    if (name!== ""){
      const formData = $(this).serialize();
      $.post(postUrl, formData, function(response){
        e.preventDefault();
        $('.message').append('<p>Trip reserved!</p>');
      }).fail(function(e) {
        $(".message").append("<p>Failed to communicate with API</p>");
      });

    }else if (name === ""){
      $(".message").append('You must enter your name to reserve a spot on this trip!');
    }
  });

  const loadName  = function LoadName(){
    const id = localStorage.getItem("id")
    const oneTripUrl = 'https://trektravel.herokuapp.com/trips/' + id
    $.get(oneTripUrl, (response) => {
      let name = response.name;
      console.log(response)
      $(".trip-name").append(`Reserve your spot on our <strong>${name}</strong> trip!`);
    });

  };

  loadName()

});
