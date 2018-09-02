$(function() {

  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_list.append(html);
  }
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user }</p>
                </div>`
    search_list.append(html);
  }

  $('#user-search-field').on('keyup', function(e) {
    e.preventDefault();
    var keyword = $('#user-search-field').val();
    if (keyword.length !== 0) {
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: keyword },
        dataType: 'json'
      })
      .done(function(users) {
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            appendUser(user);
          })
        } else {
          appendNoUser("一致するユーザがいません")
        }
      })
      .fail(function() {
        alert('error')
      })
    } else {
      $('#user-search-result').empty();
    }
  })
})


$(function() {
  function buildHTML(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
  }
  $(document).on('click', ".user-search-add", function() {
    var user_id = $(this).data("user-id");
    var user_name = $(this).data("user-name");
    $(this).parent().remove();
    var html = buildHTML(user_id, user_name);
    $('#js-chat-groups').append(html);
  });
});

$(function() {
  $(document).on('click', ".user-search-remove", function() {
    $(this).parent().remove();
  })
})
