$(document).ready(() => {
  $('#load').click(() => {
    $.get('https://trektravel.herokuapp.com/trips',
      (response) => {
        console.log(response);
        response.forEach((trek) => {
          const trekInfo = `<li><article class="columns float-center small-12 medium-4 large-3"><h3 data-id=${trek.id}><a class="totrip"> ${trek.name} </a></h3><p> Continent: ${trek.continent}, Number of weeks: ${trek.weeks}</article></li>`

          $('#trips ul').append(trekInfo);
          $('#trips').show();
          $('#trip').hide();
          $('.message').hide();
        });
      })
      .fail(() => {
        $('#fail').html('<p>Request was unsuccessful</p>')
      })
  });

  $('#trips ul').on('click', 'h3', function () {
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
        <p> Cost: ${response.cost} </p>
        <p><h3> Reserve your spot now! </h3></p>
        <iframe name="hiddenFrame" class="hide"></iframe>
        <form action="https://trektravel.herokuapp.com/trips/${tripID}/reservations" method="post" target="hiddenFrame">
      <section>
        <label>Name</label>
        <input type="text" id="name" name="name"></input>
      </section>
      <section>
        <label>Age</label>
        <input type="text" id="age" name="age"></input>
      </section>
      <section>
        <label>Email</label>
        <input type="text" id="email" name="email"></input>
      </section>

      <section class="button">
        <button type="submit">Make Reservation</button>
      </section>
    </form>`;

        $('#trip').html(tripInfo);
        $('#trips').hide();
        $('#trip').show();
      })
      .fail((response) => {
        console.log(response);
        $('#fail').html('<p>Request was unsuccessful</p>');
      });
  });
  $('body').on('submit', 'form', (e) => {
    e.preventDefault();
    const url = $('form').attr('action');
    const formData = $('form').serialize();

    $.post(url, formData, () => {
      $('.message').html('<h3>Trip successfully reserved!</h3>');
      $('.message').show();
    }).fail(() => {
      $('.message').html('<h3>An Error Has Occured.</h3>');
      $('.message').show();
    });
  });
});
