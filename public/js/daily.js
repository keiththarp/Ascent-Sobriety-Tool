$(document).ready(() => {
  // This function just does a GET request to figure out which user is logged in
  $.get("/api/user_data").then(data => {
    console.log("This is the user data");
    console.log(data);
    displayName(data);
    return ({ id, email, name } = data);
  });

  function displayName(data) {
    $(".member-name").text(data.name);
  }

  $("button").click(function () {
    $("button").removeClass("active");
    $(this).addClass("active");
  });

  $("#mood1").hover(
    function () {
      $(this).html("<i class='fas fa-tired'></i>");
    },
    function () {
      $(this).html("1");
    }
  );
  $("#mood2").hover(
    function () {
      $(this).html("<i class='fas fa-frown'></i>");
    },
    function () {
      $(this).html("2");
    }
  );
  $("#mood3").hover(
    function () {
      $(this).html("<i class='fas fa-meh'></i>");
    },
    function () {
      $(this).html("3");
    }
  );
  $("#mood4").hover(
    function () {
      $(this).html("<i class='fas fa-smile'></i>");
    },
    function () {
      $(this).html("4");
    }
  );
  $("#mood5").hover(
    function () {
      $(this).html("<i class='fas fa-laugh-beam'></i>");
    },
    function () {
      $(this).html("5");
    }
  );

  // Captures Mood Button Values on Click
  let userMood = 0;
  $(".mood").on("click", function () {
    userMood = $(this).attr("data-mood");
  });

  // when i submit, i want to send userMood, soberYN, and textValue to checkIn object with key value pairs
  $(".sober-btn").on("click", event => {
    event.preventDefault();
    let soberYN = 0;
    if ($("#soberYN").is(":checked")) {
      soberYN = 1;
    }
    const checkInBox = $("#check-in-text");
    checkInText = checkInBox.val().trim();
    const today = moment().format("ddd, MM/DD/YY h:mm A");
    sendCheckIn(userMood, soberYN, checkInText, today);
  });

  function sendCheckIn(userMood, soberYN, checkInText, today) {
    $.post("/api/check-in", {
      authorId: id,
      body: checkInText,
      feeling: userMood,
      hiccup: soberYN,
      postDate: today
    })
      .then(() => {
        const timeStamp = moment().format("L");
        localStorage.setItem("timeStamp", timeStamp);
        localStorage.setItem("journalCat", userMood);
        // Commenting the below line out because the /resources route is not currently working from here.
        window.location.replace("/counter");
      })
      .catch(console.error());
  }
});
