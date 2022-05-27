$(document).ready(function () {
  const $inputForm = $("#tweet-text");
  let charactersRemaining = 140;

  $inputForm.on("keyup", function () {
    const lengthOfInput = $(this).val().length;

    let $counter = $(".counter");

    if (lengthOfInput > 140) {
      $counter.css("color", "#FF0000");
      console.log("test");
      $counter.text(charactersRemaining - lengthOfInput);
    } else {
      $counter.css("color", "#545149");
      console.log("test2");
      $counter.text(charactersRemaining - lengthOfInput);
    }
  });
});
