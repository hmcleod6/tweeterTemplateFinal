/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (data) {
    const $tweet = $(` 
    <div class="hardcodedTweet">     
      <header class="tweetPerson">
        <div class = "nameAndPic">
        <img class="tinyPic" src=${escape(data.user.avatar)}/>
        <p>${escape(data.user.name)}</p>
        </div>
        <p>${escape(data.user.handle)}</p>
    </header>
    <div class="content">
    <p>${escape(data.content.text)}</p>
   </div>
    <footer class="footerClass">
    <div class="timeAgo">
    <p>${timeago.format(escape(data.created_at))}</p>
  </div> 
       <div class="icons">
       <div class="icon1 icon">
       <p><i class="fa-solid fa-flag"></i></p>
     </div>
     <div class="icon2 icon">
       <p><i class="fa-solid fa-retweet"></i></p>
     </div>
     <div class="icon3 icon">
       <p><i class="fa-solid fa-heart"></i></p>
     </div>
   </div>
 </footer>
 </div>
  `);
    return $tweet;
  };

  const renderTweets = function (tweets) {
    tweets.forEach((tweet) => {
      const newTweet = createTweetElement(tweet);
      $(".tweetContainer").prepend(newTweet);
      console.log("tweet", tweet);
    });
    return;
  };

  const loadNewTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then((tweets) => {
      $(".tweetcontainer").empty();
      renderTweets(tweets);
    });
  };
  loadNewTweets();

  $("#submit-form").on("submit", function (event) {
    event.preventDefault();
    const characterLength = $("#tweet-text").val().length;
    if (characterLength > 140) {
      alert("Your tweet is over 140 characters.");
    }
    if (!characterLength) {
      alert("The text field is empty");
    }

    const data = $(this).serialize();
    $("form").trigger("reset");
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: data,
    }).then(() => {});
  });
});
