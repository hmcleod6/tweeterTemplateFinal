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
            <img class="tinyPic" src=${escape(data.user.avatars)}/>
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

    const showError = function (error) {
      const markup = `
      <p><i class="fa-solid fa-circle-exclamation"></i></p>
      <p id="errorMessage">${escape(error)}</p>
      <p><i class="fa-solid fa-circle-exclamation"></i></p>
      `;

      if (!$(".error").is(":empty")) {
        return $(".error").html(markup);
      }
      $(markup).appendTo($(".error")).slideDown();
    };
    if (!characterLength) {
      const emptyField = "The text field is empty. Please enter a tweet.";
      showError(emptyField);
    } else if (characterLength > 140) {
      const overCharacterLimit =
        "You have exceeded the maximum character limit.";
      showError(overCharacterLimit);
    } else {
      const data = $(this).serialize();
      $("form").trigger("reset");
      $(".counter").html("140");

      $(".error").slideUp(200, () => {
        $(".error").remove().show();
      });

      $.ajax({
        method: "POST",
        url: "/tweets",
        data: data,
      }).then(() => {
        loadNewTweets();
      });
    }
  });
});
