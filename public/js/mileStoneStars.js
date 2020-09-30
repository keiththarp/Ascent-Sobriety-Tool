// Setting a variable for testing
$(document).ready(() => {
  //Set variable for milestones container
  const starsContainer = $(".stars-container");

  // Get the total sober days
  const stars = () => {
    $.get("/api/user_data").then(data => {
      console.log(data.stars);
      const { stars } = data;
      console.log(stars);

      const days = stars;

      // Figuring out the year milestones is easy
      const yearMilestones = parseInt(days / 365.25);

      // How many days are left after we calculate the years
      const lessThanYear = days % 365.25;

      // Since we are not working with a strict calendar, allowing "off days"
      // our years and months can be figured with fractions and will level out
      // over a short course of time.

      // So we divide 365.25 by 12 to get 30.4375 days per month.
      const monthMilestones = parseInt(lessThanYear / 30.4375);

      // How many days are left after removing the years and months
      const lessThanMonth = parseInt(lessThanYear % 30.4375);

      // From there, getting the weeks and days is pretty straight forward.
      const weekMilestones = parseInt(lessThanMonth / 7);
      const dayMilestones = parseInt(lessThanMonth % 7);

      // Now we just need to wire these variables up to icons.
      console.log(`
    Years: ${yearMilestones}
    Months: ${monthMilestones}
    Weeks: ${weekMilestones}
    Days: ${dayMilestones}`);

      const milestonesArray = [
        {
          icon: yearMilestones,
          css: "fas fa-medal year-star"
        },
        {
          icon: monthMilestones,
          css: "fas fa-star month-star"
        },
        {
          icon: weekMilestones,
          css: "far fa-sun week-star"
        },
        {
          icon: dayMilestones,
          css: "fas fa-sun day-star"
        }
      ];
      //Labeling the total number of sober days
      starsContainer.append(`<p class="total-Days-label"><b>${days}</b> total sober days!</p>`);
      //Loop to create the milestones
      milestonesArray.forEach(element => {
        const { icon, css } = element;

        for (let i = 0; i < icon; i++) {
          $(".stars-container")
            .append(`<i class="${css}"></i>`)
            .attr("title", `${days} total sober days!"`);
        }
      });
    });
  };
  stars();
});
