/*eslint-disable*/

$(document).ready(() => {
  $('.reveal').click(() => {
    $('.reveal').hide();
    $('body').append('<table><tr><th>Name</th><th>Continent</th><th>Duration</th></tr></table>');
    // $.get('https://trektravel.herokuapp.com/trips', response => {
    //
    // })
  })
});
