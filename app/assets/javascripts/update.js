$(window).on('load', function(e) {
  if(document.URL.match(/groups\/\d+\/messages/)) {

    var message_list = $('.main__contents');

    function appendMessage(message) {
      var imageUrl = (message.image_url !== null) ? `<img src=${ message.image_url } >` : '';
      var html = `<div class="main__contents__content">
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
      message_list.append(html)
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
        $('.main__contents').empty();
        messages.forEach(function(message) {
          appendMessage(message);
        })
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
