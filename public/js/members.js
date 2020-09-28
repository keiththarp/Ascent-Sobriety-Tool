$(document).ready(() => {
  // This function just does a GET request to figure out which user is logged in
  $.get("/api/user_data").then(data => {
    console.log(data);
    displayName(data);
    return ({ id, email, name } = data);
  });

  function displayName(data) {
    $(".member-name").text(data.name);
  }

  $("button").click(function() {
    $("button").removeClass("active");
    $(this).addClass("active");
  });

  $("#mood1").hover(
    function() {
      const $this = $(this); // caching $(this)
      $this.data("defaultText", $this.text());
      $this.html("<i class='fas fa-sad-cry'></i>");
    },
    function() {
      const $this = $(this); // caching $(this)
      $this.text($this.data("defaultText"));
    }
  );
  $("#mood2").hover(
    function() {
      const $this = $(this); // caching $(this)
      $this.data("defaultText", $this.text());
      $this.html("<i class='fas fa-grimace'></i>");
    },
    function() {
      const $this = $(this); // caching $(this)
      $this.text($this.data("defaultText"));
    }
  );
  $("#mood3").hover(
    function() {
      const $this = $(this); // caching $(this)
      $this.data("defaultText", $this.text());
      $this.html("<i class='fas fa-meh'></i>");
    },
    function() {
      const $this = $(this); // caching $(this)
      $this.text($this.data("defaultText"));
    }
  );
  $("#mood4").hover(
    function() {
      const $this = $(this); // caching $(this)
      $this.data("defaultText", $this.text());
      $this.html("<i class='fas fa-smile'></i>");
    },
    function() {
      const $this = $(this); // caching $(this)
      $this.text($this.data("defaultText"));
    }
  );
  $("#mood5").hover(
    function() {
      const $this = $(this); // caching $(this)
      $this.data("defaultText", $this.text());
      $this.html("<i class='fas fa-laugh-beam'></i>");
    },
    function() {
      const $this = $(this); // caching $(this)
      $this.text($this.data("defaultText"));
    }
  );

  // Captures Mood Button Values on Click
  let userMood = 0;
  $(".mood").on("click", function() {
    userMood = $(this).attr("data-mood");
    console.log(userMood);
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
    sendCheckIn(userMood, soberYN, checkInText);
  });

  function sendCheckIn(userMood, soberYN, checkInText) {
    $.post("/api/check-in", {
      authorId: id,
      body: checkInText,
      feeling: userMood,
      hiccup: soberYN
    })
      .then(() => {
        // Commenting the below line out because the /resources route is not currently working from here.
        window.location.replace("/daily");
      })
      .catch(console.error());
  }
});
