/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {

// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
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
}

function createTweetElement(tweetData) {

  var name = tweetData.user.name;
  var avatar = tweetData.user.avatars.regular;
  var handle = tweetData.user.handle;
  var content = tweetData.content["text"];
  var date = tweetData.created_at;

  var $header = $('<header>')
  // var $avatar = $('<img href=' + avatar + '>').addClass('display-picture');
  var $avatar = $('<img>')
    .addClass('display-picture')
    .attr('src', avatar);
  var $name = $('<h2>').text(name);
  // <h2>name</h2>
  var $handle = $('<h4>').text(handle);

  var $content = $('<p>').text(content);

  var $footer = $('<footer>').append( $('<h5>').text(date) );
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


var $tweet = createTweetElement(tweetData);
$('#tweets-container').append($tweet);
var $tweet = createTweetElement(tweetData);
$('#tweets-container').append($tweet);
var $tweet = createTweetElement(tweetData);
$('#tweets-container').append($tweet);

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet);
// to add it to the page so we can make sure
//it's got all the right elements, classes, etc.



});

