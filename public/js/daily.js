/* eslint-disable prettier/prettier */
$(document).ready(() => {
  let user = {};
  // This function just does a GET request to figure out which user is logged in
  $.get("/api/user_data").then(data => {
    displayName(data);
    user = data;
  });

  function sendSoberData(id, consDays, stars, badgeOne, badgeTwo, badgeThree, badgeFour, badgeFive) {
    return $.ajax({
      url: "/api/soberDaysUpdate",
      type: "PUT",
      data: {
        id: id,
        consDays: consDays,
        stars: stars,
        badgeOne: badgeOne,
        badgeTwo: badgeTwo,
        badgeThree: badgeThree,
        badgeFour: badgeFour,
        badgeFive: badgeFive
      }
    });
  }

  function sendCheckIn(id, userMood, soberYN, consDays, checkInText, today) {
    $.post("/api/check-in", {
      authorId: id,
      body: checkInText,
      feeling: userMood,
      hiccup: soberYN,
      soberTally: consDays,
      postDate: today
    })
      .then(() => {
        const timeStamp = moment().format("L");
        localStorage.setItem("timeStamp", timeStamp);
        localStorage.setItem("journalCat", userMood);

        window.location.replace("/counter");
      })
      .catch(console.error());
  }

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
  $("#check-in-form").on("submit", event => {
    event.preventDefault();
    let soberYN = 0;
    if ($("#soberYN").is(":checked")) {
      soberYN = 1;
      user.consDays++;
      user.stars++;
    } else {
      user.consDays = 0;
    }
    switch (user.consDays) {
      case 1:
        user.badgeOne = 1;
        break;
      case 5:
        user.badgeTwo = 1;
        break;
      case 10:
        user.badgeThree = 1;
        break;
      case 30:
        user.badgeFour = 1;
        break;
      case 365:
        user.badgeFive = 1;
        break;
    }

    const checkInBox = $("#check-in-text");
    checkInText = checkInBox.val().trim();
    const today = moment().format("ddd, MM/DD/YY h:mm A");
    sendSoberData(user.id, user.consDays, user.stars, user.badgeOne, user.badgeTwo, user.badgeThree, user.badgeFour, user.badgeFive).then(() => {
      sendCheckIn(user.id, userMood, soberYN, user.consDays, checkInText, today);
    });
  });

});
