$(document).ready(function () {
  let userId;

  // retrieve user info
  $.ajax({
    method: "GET",
    url: "/api/user_data",
  }).then(function(data) {
    userId = data.id;
  });

  // query the movie database for all records
  $.ajax({
    method: "GET",
    url: "/api/movies",
  }).then(function(data) {
    data.forEach((item) => {
      const option = document.createElement("option");
      option.text = item.title;
      option.value = item.id;
      const moviesSelect = document.querySelector("#movie");
      moviesSelect.appendChild(option);
    })
  });

  $("#submitReviewButton").on("click", function (event) {
      const review = {
        ratings: $("#rating").val(),
        body: $("#review").val(),
        MovieId: $("#movie").val(),
        UserId: userId,
      };
      console.log(review);
      $.ajax({
        method: "POST",
        url: "/api/reviews/",
        data: review,
      }).then(function () {
        window.location = ("/");
      });
    });

    $("#cancelButton").on("click", function () {
      window.location = ("/");
    });
  });
