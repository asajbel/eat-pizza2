$(function() {
  $(".devour").on("click", function(event) {
    event.preventDefault();
    var id = event.target.dataset.id;
    var customer = $("#customerName"+id).val().trim();
    console.log(customer);
    if (customer === "" || customer === null) {
      return;
    }
    $.ajax("/api/customer", {
      type: "POST",
      data: {
        name: customer
      }
    }).then(function(result) {
      console.log(result);
      var pizza = {
        id: id,
        devoured: true,
        CustomerId: result.id
      };
      $.ajax("/api/pizza/" + id, {
        type: "PUT",
        data: pizza
      }).then(function() {
        console.log(result.name +" devoured pizza with id " + id);
        location.reload();
      });
    });


  });

  $("#newPizza").on("submit", function(event) {
    event.preventDefault();
    var pizza = {
      name: event.target.pizzaName.value.trim()
    };

    $.ajax("/api/pizza", {
      type: "POST",
      data: pizza
    }).then(function() {
      console.log("created new pizza " + pizza.name);
      location.reload();
    });
  });
});