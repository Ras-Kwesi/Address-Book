//Business Logic
function Contact(first,last) {  // Contact Constructor declared
  this.firstName=first; //Properties Declared
  this.lastName=last;
  this.addresses = [];
}

function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {  //Prototype method that takes instances properties and concats them
  return this.firstName + " " + this.lastName; // Returns the concated info
}
//User Interface Logic
$(document).ready(function() {  // JQ runs when Doc is ready
  $("#add-address").click(function() {
    $("#new-addresses").append('<div class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                               '</div>');
  });

  $("form#new-contact").submit(function(event) { // Event listener submit initialized
    event.preventDefault(); // Prevent the data from being passed when keyed in

    var inputtedFirstName = $("input#new-first-name").val(); // Collects the First name keyed in the form
    var inputtedLastName = $("input#new-last-name").val(); // Collects last name keyed in the form

    var newContact = new Contact(inputtedFirstName, inputtedLastName); // New instance of Contact created

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState)
      newContact.addresses.push(newAddress)
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.firstName + "</span></li>"); // New line from Keyed in data is added

    $("input#new-first-name").val(""); // Holds the data keyed in (inputed) at the form ID
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");

    $(".contact").last().click(function() {  //  Selects contact class and allows only the last keyed in data to be accessible
      $("#show-contact").show(); // Unhides the Instances properties after hide function from css
      $("#show-contact h2").text(newContact.firstName); // firstName property is displayed from instance, child to show-contact. Becomes title
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
      $("ul#addresses").append("<li>" + address.street + ", " + address.city + " " + address.state + "</li>");
      });
    });
    resetFields();
  });
});
