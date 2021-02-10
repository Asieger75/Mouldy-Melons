$(document).ready(function() {
  // Getting references to the name input and author container, as well as the table body
  let usernameInput = $("#user-name");
  let userList = $("tbody");
  let userContainer = $(".user-container");

  // Adding event listeners to the form to create a new object, and the button to delete
  // a user
  $(document).on("submit", "#user-form", handleUserFormSubmit);
  $(document).on("click", ".delete-user", handleDeleteButtonPress);

  // Getting the initial list of Users
  getUsers();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleUserFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!usernameInput.val().trim().trim()) {
      return;
    }
  
    upsertUser({
      name: usernameInput
        .val()
        .trim()
    });
  }

  // A function for creating an author. Calls getAuthors upon completion
  function upsertUser(userData) {
    $.post("/api/authors", userData)
      .then(getUsers);
  }

  // Function for creating a new list row for authors
  function createUserRow(userData) {
    var newTr = $("<tr>");
    newTr.data("user", userData);
    newTr.append("<td>" + userData.name + "</td>");
    if (authorData.Posts) {
      newTr.append("<td> " + userData.Reviews.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/blog?author_id=" + authorData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?author_id=" + authorData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newTr;
  }

  // Function for retrieving authors and getting them ready to be rendered to the page
  function getUsers() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (let i = 0; i < data.length; i++) {
        rowsToAdd.push(createAuthorRow(data[i]));
      }
      renderAuthorList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of authors to the page
  function renderAuthorList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no authors
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create an Author before you can create a Post.");
    authorContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("author");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/authors/" + id
    })
      .then(getAuthors);
  }
});
