// const moment = require("moment");

// $(document).ready(() => {
const today = moment();
console.log(today);
// variables for DOM elements
const daysSoberContainer = $("p.days-sober");
const timeLeft = $("span#time-left");
const quote = $("p.quote");
const quoteAuthor = $("p.quote-author");

const displayDaysSober = () => {
  $.get("/api/user_data").then(response => {
    console.log("response is: ", response);
    const soberDate = moment(response.soberSince);
    console.log("soberdate: ", soberDate);
    // calculate difference between datetime in mysql(soberSince) and today's date.
    const daysSober = today.diff(soberDate, "days");
    console.log("daysSober: ", daysSober);
    daysSoberContainer.text(daysSober);
  });
};

displayDaysSober();
// });

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

//Can also render a blank chart initially and fetch data w/ ajax
// https://apexcharts.com/docs/update-charts-from-json-api-ajax/
