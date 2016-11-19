/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  var $container = $('#tweets-container').html('');
  function renderTweets(tweets) {
    // possible to use .map() instead of .forEach()
    tweets.forEach(function(tweet) {
      $container.prepend(createTweetElement(tweet));
    });
  }

  function createTweetElement(tweetData) {
    var name = tweetData.user.name;
    var avatar = tweetData.user.avatars.regular;
    var handle = tweetData.user.handle;
    var content = tweetData.content.text;
    var date = moment(new Date(tweetData.created_at)).fromNow();

    // var $avatar = $('<img href=' + avatar + '>').addClass('display-picture');
    var $avatar = $('<img>')
      .addClass('display-picture')
      .attr('src', avatar);
    var $name = $('<h2>').text(name);
    // <h2>name</h2>
    var $handle = $('<h4>').text(handle);
    var $content = $('<p>').text(content);
    var $footer = $('<footer>')
      .append($('<h5>').text(date))
      .append($('<i>').addClass('fa fa-heart').attr('aria-hidden', 'true'))
      .append($('<i>').addClass('fa fa-refresh').attr('aria-hidden', 'true'))
      .append($('<i>').addClass('fa fa-flag').attr('aria-hidden', 'true'));

    // var $date = $('<h5>' + date + '</h5>');
    // var $footer = $('<footer>')
    // var $footerclose = $('</footer>');

    var $tweet = $('<article>')
      .addClass('tweet')
      .append(
        $('<header>')
          .append($avatar)
          .append($name)
          .append($handle)
      )
      .append($content)
      .append($footer);

    return $tweet;
  }

  $('form[action="/tweets"]').on('submit', function (event) {
    event.preventDefault();
    var thisForm = $(this);
    var inputText = thisForm.find("textarea").val()

    if (inputText.length == "") {
      $(".warning").show().text("NO CONTENT!").css("color", "red").css("float", "right").delay(300).fadeOut('slow');
      return false;
    }
    if (inputText.length >140) {
      $(".warning").show().text("CONTENT LIMIT EXCEEDED!").css("color", "red").css("float", "right").delay(300).fadeOut('slow');
      return false;
    }

    $.ajax({
      method: thisForm.attr('method'),
      url: thisForm.attr('action'),
      data: thisForm.find("textarea").serialize(),
      success: function() {
        loadTweets();
      }
    });

    $("form").trigger("reset");
    $(".counter").text(140);

    loadTweets();
  });
  loadTweets();




function loadTweets() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    success: function(tweetsData) {
      renderTweets(tweetsData)},
    error: function (error) {
      alert(error);
    }
  });
};

$("#compose-butt").click(function(event) {
  event.preventDefault;
  if ( $(".new-tweet:first").is(":hidden") ) {
    $(".new-tweet").slideDown('slow', function() {
      $("#tweet-text").focus();
    }).addClass("active");
  } else {
    $(".new-tweet").slideUp("fast").removeClass("active");
  }
})


});

