// Get references to page elements
var $drinkText = $("#drink-text");
var $drinkDescription = $("#drink-description");
var $submitBtn = $("#submit");
var $drinkList = $("#drink-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveDrink: function(drink) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/drinks",
      data: JSON.stringify(drink)
    });
  },
  getDrinks: function() {
    return $.ajax({
      url: "api/drinks",
      type: "GET"
    });
  },
  deleteDrink: function(id) {
    return $.ajax({
      url: "api/drinks/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshDrinks = function() {
  API.getDrinks().then(function(data) {
    var $drinks = data.map(function(drink) {
      var $a = $("<a>")
        .text(drink.text)
        .attr("href", "/drink/" + drink.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": drink.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $drinkList.empty();
    $drinkList.append($drinks);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var drink = {
    text: $drinkText.val().trim(),
    description: $drinkDescription.val().trim()
  };

  if (!(drink.text && drink.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveDrink(drink).then(function() {
    refreshDrinks();
  });

  $drinkText.val("");
  $drinkDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDrink(idToDelete).then(function() {
    refreshDrinks();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$drinkList.on("click", ".delete", handleDeleteBtnClick);
