$(document).ready(function () {
  $("#submitMovieButton").on("click", function () {
    const movie = {
      title: $("#title").val(),
      ratings: $("#ratings").val(),
      synopsis: $("#synopsis").val(),
      categories: $("#categories").val(),
    };
    $.ajax({
      method: "POST",
      url: "/api/movies/",
      data: movie,
    }).then(function () {
      window.location = ("/");
    });
  });
  $("#cancelButton").on("click", function () {
    window.location = ("/");
  });
});
