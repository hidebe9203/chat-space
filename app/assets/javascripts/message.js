$(function() {

  function buildHTML(comment) {
    var imageUrl = (comment.image_url !== null) ? `<img src=${ comment.image_url } >` : '';
    var html = `<div class="main__contents__content">
                  <div class="main__contents__content__title">
                    ${ comment.user_name }
                    <span>${ comment.created_at }</span>
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

$(function() {

  function buildHTML(user) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
  }

  $(document).on('click', ".user-search-add", function(e) {
    e.preventDefault();
    var user_id = $(this).data("user-id");
    $(this).parent().remove();
    $.ajax({
      type: 'GET',
      url: `/users/${user_id}/edit`,
      data: { id: user_id },
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(user) {
      var html = buildHTML(user);
      $('#js-chat-groups').append(html);
    })
    .fail(function() {
      alert('error');
    })
  });
});

$(function() {
  $(document).on('click', ".user-search-remove", function() {
    $(this).parent().remove();
  })
})
