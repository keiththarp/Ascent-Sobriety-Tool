$(document).ready(() => {
  const submitQuote = () => {
    const settings = {
      url: "https://desolate-caverns-92812.herokuapp.com/api/add-quote",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        quote: "test quote",
        author: "author",
        source: "test source",
        category: "this category"
      }
    };

    $.ajax(settings).done(res => {
      console.log(res);
    });
  };

  submitQuote();
});
