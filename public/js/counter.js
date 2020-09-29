$(document).ready(() => {
  const today = moment();
  console.log(today);
  // variables for DOM elements
  const daysSoberContainer = $("p.days-sober");
  const timeLeft = $("span#time-left");
  const quote = $("p.quote");
  const quoteAuthor = $("p.quote-author");

  // To diplay days sober in the counter
  // const displayDaysSober = () => {
  //   $.get("/api/user_data").then(response => {
  //     console.log("response is: ", response);
  //     const soberDate = moment(response.soberSince);
  //     console.log("soberdate: ", soberDate);
  //     // calculate difference between datetime in mysql(soberSince) and today's date.
  //     const daysSober = today.diff(soberDate, "days");
  //     console.log("daysSober: ", daysSober);
  //     daysSoberContainer.text(daysSober);
  //   });
  // };

  // To display consistent days in the counter
  //Use handleabrs instead - pass in user object to html route
  // const consistentDays = () => {

  // }

  //To display badges:
  const displayBadges = () => {
    // Take the consistent days
    // figure out the higest badge, and do all the lower badges too.

  }

  // to display inspirational quotes
  // https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373/15
  const displayRandomQuote = () => {
    // Settings for the api
    const settings = {
      async: true,
      crossDomain: true,
      url: "https://type.fit/api/quotes",
      method: "GET"
    };

    //Ajax call, there are 1643 total quotes available
    $.ajax(settings).done(response => {
      const data = JSON.parse(response);
      console.log(data);
      //to get a random quote:
      let randomNum = 23;
      // Avoid quote index 23 (Trump quote)
      while (randomNum === 23) {
        randomNum = Math.floor(Math.random() * (1643));
      }
      console.log("ranom num: ", randomNum);
      const { text, author } = data[randomNum];
      console.log("text, author:", text, author);
      quote.text(text);
      quoteAuthor.text(`-- ${author}`);
    });
  };

  //displayDaysSober();
  displayRandomQuote();

  // ********** FOR COUNTER/Chart ****************
  // How many sections in the chart; how many days/hours user has chosen for timeframe
  const seriesLength = 24;

  const currentTimePoints = 15;

  const seriesArray = [];

  // Creates an array of pieces for the donut chart
  for (let i = 0; i < seriesLength; i++) {
    seriesArray.push(1);
  }

  // Right now, just blue romance and grey(nepal); could add more colors to use
  const colors = ["#BFF0CF", "#87A2BB"];

  // For the chart use blue romance for the current points, grey for those left to go
  const chartColors = [];

  for (let i = 0; i < seriesLength; i++) {
    if (i < currentTimePoints) {
      chartColors.push(colors[0]);
    } else {
      chartColors.push(colors[1]);
    }
  }

  // Chart options
  const options = {
    chart: {
      type: "donut",
      width: "100%"
    },
    series: seriesArray, //length of array would come from the db
    //labels would also depend on the timeframe the user was working with
    labels: ["day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7"], //note sure if we need labels

    dataLabels: {
      enabled: false
    },

    fill: {
      type: "gradient"
    },

    legend: {
      show: false
    },

    colors: chartColors,

    plotOptions: {
      pie: {
        donut: {
          size: "85%"
        }
      }
    }
  };

  const chart = new ApexCharts(
    document.querySelector("#responsive-chart"),
    options
  );

  chart.render();
});

//Can also render a blank chart initially and fetch data w/ ajax
// https://apexcharts.com/docs/update-charts-from-json-api-ajax/
