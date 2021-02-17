$(document).ready(function () {
  $("#close").on("click", function() {
    $(".movie-details").addClass("hidden");
  });
  $(".genre").each(function() {
    const element = $(this);
    const itemGenre = $(element).data("genre");
    $.ajax({
      method: "GET",
      url: `/api/movies/category/${itemGenre}`,
    }).then(function(data) {
      data.forEach((item) => {
        const link = $("<a>");
        const br = $("<br>");
        link.attr("href", "javascript:void(0);");
        link.attr("data-id", item.id);
        link.text(item.title);
        link.on("click", function() {
          const movieId = $(this).data("id");
          $.ajax({
            method: "GET",
            url: `/api/movies/${movieId}`
          }).then(function(data) {
            $("#movieTitle").text(data.title);
            $("#movieRating").text(data.ratings);
            $("#movieSynopsis").text(data.synopsis);
            $('#movieDetails').removeClass("hidden");
            data.Reviews.forEach(function(review){
              const reviewBody = $("<p>");
              const hr = $("<hr>");
              reviewBody.text(`${review.ratings} Stars: ${review.body}`);
              $("#movieReviews").append(reviewBody);
              $("#movieReviews").append(hr);
            });
            console.log(data.Reviews);
          });
        });
        $(element).append(link);
        $(element).append(br);
      });
    });
  });
});
