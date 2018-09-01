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
