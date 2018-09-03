$(function() {

  function buildHTML(message) {
    var imageUrl = (message.image_url !== null) ? `<img src=${ message.image_url } >` : '';
    var html = `<div class="main__contents__content" data-message-id=${ message.id }>
                  <div class="main__contents__content__title">
                    ${ message.user_name }
                    <span>${ message.created_at }</span>
                  </div>
                  <div class="main__contents__content__body">
                    <p>${ message.content }<p>
                    ${ imageUrl }
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.main__contents').append(html)
      $('.main__footer__input-box').val('');
      $('.hidden').val('');
      $('.main__contents').animate({scrollTop: $('.main__contents')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('error')
    })
    return false;
  })
})
