$(document).ready(() => {
  //This code contains the logic for the milestone stars. Each day gets a sun,
  //seven suns are traded for the week's icon, a sun star, some math happens, but
  //essentially 4 weeks are traded for a month and 12 months are traded for a year icon.

  //Set variable for milestones container
  const starsContainer = $(".stars-container");

  // Get the total sober days
  const stars = () => {
    $.get("/api/user_data").then(data => {
      const { stars } = data;

      // Figuring out the year milestones is easy
      const yearMilestones = parseInt(stars / 365.25);

      // How many days are left after we calculate the years
      const lessThanYear = stars % 365.25;

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

      //Now we stick our icon variable in an array to loop through and create our icon display
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
      //Displaying the total number of sober days
      // eslint-disable-next-line prettier/prettier
      starsContainer.append(`<p class="total-Days-label"><b>${stars}</b> total sober days!</p>`);

      //Loop through our array to create the milestones display
      milestonesArray.forEach(element => {
        const { icon, css } = element;

        for (let i = 0; i < icon; i++) {
          $(".stars-container")
            .append(`<i class="${css}"></i>`)
            .attr("title", `${stars} total sober days!"`);
        }
      });
    });
  };
  //Calling our function
  stars();
});
