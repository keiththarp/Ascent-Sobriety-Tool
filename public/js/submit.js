$(document).ready(() => {
  $("#submit-quote-btn").on("click", e => {
    e.preventDefault();
    const quoteData = {
      email: $("#submit-email")
        .val()
        .trim(),
      quote: $("#submit-quote")
        .val()
        .trim(),
      author: $("#submit-author")
        .val()
        .trim(),
      source: $("#submit-source")
        .val()
        .trim(),
      category: $("#submit-category")
        .val()
        .trim()
    };

    const { email, quote, author, source, category } = quoteData;

    submitQuote(email, quote, author, source, category);
    sendEmail(email, quote, author, category);
  });

  const submitQuote = (email, quote, author, source, category) => {
    const settings = {
      url: "https://desolate-caverns-92812.herokuapp.com/api/add-quote",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        email: email,
        quote: quote,
        author: author,
        source: source,
        category: category
      }
    };

    $.ajax(settings).done(res => {
      console.log(res);
      window.location.replace("/counter");
    });
  };

  const sendEmail = (email, quote, author, category) => {
    if (!quote || !author || !category) {
      return;
    }

    const settings = {
      url: "http://localhost:8080/email",
      method: "POST",
      timeout: 0,
      headers: {
        "Content-Type": "text/plain"
      },
      // eslint-disable-next-line prettier/prettier
      data: email
    };

    $.ajax(settings).done(response => {
      console.log(response);
    });
    console.log(`Send email from ${email}`);
  };
});
