$(function() {

  function buildHTML(comment) {
    if (comment.image !== null) {
      var imageUrl = `<img src=${ comment.image } >`
    } else {
      var imageUrl = ''
    }
    var html = `<div class="main__contents__content">
                  <div class="main__contents__content__title">
                    <h2>${ comment.name }<span>${ comment.created_at }</span></h2>
                  </div>
                  <div class="main__contents__content__body">
                    <p>${ comment.content }<p>
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
