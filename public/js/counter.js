// request outside of $(document).ready to resolve latency issue
const quote = $("p.quote");
const quoteAuthor = $("p.quote-author");

const displayRandomQuote = () => {
  // Settings for the api
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://desolate-caverns-92812.herokuapp.com/api/random",
    method: "GET"
  };

  //Ajax call to sobriety api
  $.ajax(settings).done(res => {
    quote.text(res.quote);
    quoteAuthor.text("- " + res.author);
    console.log(`${res.quote} -${res.author}`);
  });
};

displayRandomQuote();

$(document).ready(() => {
  // ********** FOR COUNTER/Chart ****************
  // How many sections in the chart; how many days/hours user has chosen for timeframe
  // hardcoded for 24 hours for now
  const seriesLength = 24;

  const currentTimePoints = moment().format("kk");

  const seriesArray = [];

  // Creates an array of pieces for the donut chart based on the series length
  for (let i = 0; i < seriesLength; i++) {
    seriesArray.push(1);
  }

  // Right now, just blue romance and grey(nepal); could add more colors to use
  const colors = ["#BFF0CF", "#87A2BB"];

  // For the chart use blue romance for the current points(hours past in the day), grey for those left to go
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
    series: seriesArray,
    //labels for each section of the donut chart
    labels: [
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour",
      "hour"
    ],

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
          // determines the size of the inner circle of the donut chart (the empty part)
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
