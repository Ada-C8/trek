$(document).ready(function(){
  $('#hero').on('click', '.button', function(e){
    $('main > section').toggleClass('hidden');
  });
});
