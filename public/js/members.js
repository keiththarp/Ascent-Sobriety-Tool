$(document).ready(() => {
  // Button Hover Graphics
  $("#mood1").hover(
    function() {
      $(this).html("<i class='fas fa-sad-cry'></i>");
    },
    function() {
      $(this).html("1");
    }
  );
  $("#mood2").hover(
    function() {
      $(this).html("<i class='fas fa-grimace'></i>");
    },
    function() {
      $(this).html("2");
    }
  );
  $("#mood3").hover(
    function() {
      $(this).html("<i class='fas fa-meh'></i>");
    },
    function() {
      $(this).html("3");
    }
  );
  $("#mood4").hover(
    function() {
      $(this).html("<i class='fas fa-smile'></i>");
    },
    function() {
      $(this).html("4");
    }
  );
  $("#mood5").hover(
    function() {
      $(this).html("<i class='fas fa-laugh-beam'></i>");
    },
    function() {
      $(this).html("5");
    }
  );

  // Checkin object that will hold user check in data
  let checkIn = {};

  // Captures Mood Button Values on Click
  $(".mood").on("click", function() {
    const userMood = $(this).val();
    $("#mood").val(userMood);
    console.log($("#mood").val());
  });

  // when i submit, i want to send userMood, soberYN, and textValue to checkIn object with key value pairs
  $(".submit").on("click", () => {
    let soberYN = true;
    if ($("#soberYN").is(":checked")) {
      soberYN = false;
    }
    checkIn = {
      // date: // date
      feeling: $("#mood").val(),
      body: $("#checkInText").val(),
      hiccup: soberYN
    };
    console.log(checkIn);

    // function (checkIn) {
    //   $.post("/api/check_in", checkIn)
    //     .then(getAuthors);
    // }
  });

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
  });
});
