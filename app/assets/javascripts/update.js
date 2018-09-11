$(window).on('load', function(e) {
  if(document.URL.match(/groups\/\d+\/messages/)) {

    var message_list = $('.main__contents');

    function buildHTML(message) {
      var imageUrl = (message.image_url !== null) ? `<img src=${ message.image_url } >` : '';
      var html = `<div class="main__contents__content" data-message-id=${ message.id }>
                    <div class="main__contents__content__title">
                      ${ message.user_name }
                      <span>
                        ${ message.created_at }
                      </span>
                    </div>
                    <div class="main__contents__content__body">
                      <p>
                        ${ message.content }
                      </p>
                      ${ imageUrl }
                    </div>
                  </div>`
      return html;
    }

    e.preventDefault();
    var group_id = document.URL.match(/\d+(?=\/messages)/);
    var countup = function() {
      $.ajax({
        type: 'GET',
        url: `/groups/${group_id}/messages`,
        data: { group_id: group_id },
        dataType: 'json'
      })
      .done(function(messages) {
        var id = $('.main__contents__content').filter(":last").data('messageId');
        var insertHTML ='';
        messages.forEach(function(message) {
          if(message.id > id) {
            insertHTML += buildHTML(message);
            $('.main__contents').append(insertHTML);
            $('.main__contents').animate({scrollTop: $('.main__contents')[0].scrollHeight}, 'fast');
            console.log("更新完了")
          }
        })
        console.log("最新レコード検索中…")
      })
      .fail(function() {
        alert('error')
      })
    }
    setInterval(function() {
      countup();
    }, 5000);
  }
})
