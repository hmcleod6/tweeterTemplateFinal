/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const createTweetElement = function (data) {
    const $tweet = $(` 
    <div class="hardcodedTweet">     
      <header class="tweetPerson">
        <div class = "nameAndPic">
            <img class="tinyPic" src=${data.user.avatar}/>
            <p>${data.user.name}</p>
        </div>
        <p>${data.user.handle}</p>
    </header>
    <div class="content">
        <p>${data.content.text}</p>
   </div>
    <footer class="footerClass">
      <span class="daysAgo">${data.created_at}</span> 
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
      $(".tweetContainer").append(newTweet);
      console.log("tweet", tweet);
    });
    return;
  };
  renderTweets(data);

  // console.log($tweet);
  // $("#tweetsContainer").append($tweet);

  $("#submit-form").on("submit", function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    console.log("data", data);

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: data,
    }).then(() => {
      console.log("Worked");
    });
  });
});
