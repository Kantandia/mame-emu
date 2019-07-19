// Get references to page elements
var $drinkText = $("#drink-text");
var $drinkDescription = $("#drink-description");
// var $submitBtn = $("#submit");
var $drinkList = $("#drink-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveDrink: function(drink) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      data: JSON.stringify(drink),
      url: "/api/drinks"
    });
  },
  getDrinks: function() {
    return $.ajax({
      url: "/api/drinks",
      type: "GET"
    });
  },
  deleteDrink: function(id) {
    return $.ajax({
      url: "/api/drinks/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshDrinks = function() {
  API.getDrinks().then(function(data) {
    var $drinks = data.map(function(drink) {
      var $a = $("<p>")
        .text(drink.text)
        //.attr("href", "/drink/" + drink.id);
      
      var $p = $("<span>")
        .text("Qty: " +drink.description)
        //.attr("href", "/drink/" +drink.id);  
      
        var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": drink.id
        })
        .append($a, $p);

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
    text: $($(this).siblings()[0]).val().trim(),
    description: $($(this).siblings()[1]).val().trim()
  };

  console.log(drink);
  if (!(drink.text && drink.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveDrink(drink).then(function(res) {
    console.log(res);
    refreshDrinks();
  });

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
$(".container").on("click",".submit", handleFormSubmit);
$drinkList.on("click", ".delete", handleDeleteBtnClick);
