/*$(document).ready(function(){
  console.log(sessionStorage.getItem("card"));
})*/
var cards = []; //Going to be used to store cards for dynamic procesising of user searches
var cardApplyingTo;
$(document).ready(function(){
  //when document has loaded, make request for cards
  var getCardsUrl = "https://techcase-cards-api.herokuapp.com/api/v1/cards"
  $.ajax(getCardsUrl, {
    success: function(data){
      handleCards(data);
    },
    error: function(){
      console.log("request was unsuccessful :(");
    }
  })
})

var handleCards = function(data){
  data.forEach(function(card){
    cards.push(card);
  });
  for(var i=0; i<cards.length; i++){
    if(cards[i].name == sessionStorage.getItem("card")){
      cardApplyingTo = cards[i];
      $("#image").attr("src", cardApplyingTo.image);
      $("#card-name").append(" " + cardApplyingTo.name);
    }
  }
}

$("#searchbar").keyup(function(e){
  $("#dropdown").css("display", "inline-block");
  $("#dropdown").empty();
  if(e.whch == 13){
    //Need to store the search in session data to then handle on search.html
    window.location = "html/search.html";
  }
  var input = $("#searchbar").val();
  for(var i=0; i<cards.length; i++){
    var cardName = cards[i].name;
    console.log(input);
    //if card name matches input thus far, display in results
    if(cardName.substring(0, input.length).toLowerCase() == input.toLowerCase()){
      $("#dropdown").append("<p class='cardLink'>" + cardName + "</a>");
    }
  }
})

$("#searchbar").focusout(function(){
  $("#dropdown").css("display", "none");
})

$(document).on("mousedown", "p.cardLink", function(){
  console.log("hit the cardLink");
  console.log($(this).html());
  sessionStorage.setItem("card", $(this).html());
  window.location = "apply.html";
})

$("#submit-button").click(function(){
  var firstName = $("#firstName").val();
  var lastName = $("#lastName").val();
  var dob = $("#DOB").val();
  var creditScore = $("#creditScore").val();
  var income = $("#income").val();
  var streetAddress = $("#street_address").val();
  var city = $("#city").val();
  var state = $("#state").val();
  var zip = $("#zip").val();
  var email = $("#email").val();
  var phoneNum = $("#phone_number").val();

  if(firstName == undefined || lastName == undefined || dob == undefined ||
  creditScore == undefined || income == undefined || streetAddress == undefined ||
  city == undefined || state == undefined || zip == undefined || email == undefined || phoneNum == undefined){
    alert("Please check to make sure all fileds are filled in before applying");
  }else{

  }
})
