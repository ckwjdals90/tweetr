/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

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
    var date = tweetData.created_at;

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
      .append($('<a>').attr('href', '#').text('A'))
      .append($('<a>').attr('href', '#').text('B'))
      .append($('<a>').attr('href', '#').text('C'));

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
      $(this).append($("<p>").text("NO CONTENT!").css("float", "right").delay(300).fadeOut('slow'))
      return false;
    }
    if (inputText.length >140) {
      $(this).append($("<p>").text("CONTENT LIMIT EXCEEDED!").css("float", "right").delay(300).fadeOut('slow'))
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

