var cards = []; //Going to be used to store cards for dynamic procesising of user searches

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
  })
  popCardsInitial(cards);
}

var popCardsInitial = function(cards){
  console.log(cards);
  for(var i=0; i<cards.length; i++){
    if(i<3){
      $("#row-1").append('<div class="col-lg-4">' + '<div class="card" style="background-color: #404040;">'
    + '<div class="card-block">' + '<h3 class="card-header text-center text-light text-bold">' + cards[i].name + '</h3>'
    + '<img src="' + cards[i].image + '" style="width:383px; height:210px;">' + '<p class="card-text">' + cards[i].features[0] + '</p>'
    + '<p class="card-text">' + cards[i].features[1] + '</p>' + '<p class="card-text">' + cards[i].features[2] + '</p>'
    + '<p class="card-text">' + cards[i].features[3] + '</p>'
    + '<p class="card-text">' + Math.floor(cards[i].regular_apr.rate*100) + "% variable apr" + '</p>'
    + '<div class="card-footer text-right">' + '<a href="#" id="' + cards[i].name + '" class="apply-link btn btn-info text-white btn-block">Apply</a>' + '</div>'
    + '</div>'
    + '</div>'
    + '</div>');
    }else if(i<6){
      $("#row-2").append('<div class="col-lg-4">' + '<div class="card" style="background-color: #404040;">'
    + '<div class="card-block">' + '<h3 class="card-header text-center text-light text-bold">' + cards[i].name + '</h3>'
    + '<img src="' + cards[i].image + '" style="width:383px; height:210px;">' + '<p class="card-text">' + cards[i].features[0] + '</p>'
    + '<p class="card-text">' + cards[i].features[1] + '</p>' + '<p class="card-text">' + cards[i].features[2] + '</p>'
    + '<p class="card-text">' + cards[i].features[3] + '</p>'
    + '<p class="card-text">' + Math.floor(cards[i].regular_apr.rate*100) + "% variable apr" + '</p>'
    + '<div class="card-footer text-right">' + '<a href="#" id="' + cards[i].name + '" class="apply-link btn btn-info text-white btn-block">Apply</a>' + '</div>'
    + '</div>'
    + '</div>'
    + '</div>');

    }else if(i<9){
      $("#row-3").append('<div class="col-lg-4">' + '<div class="card" style="background-color: #404040;">'
    + '<div class="card-block">' + '<h3 class="card-header text-center text-light text-bold">' + cards[i].name + '</h3>'
    + '<img src="' + cards[i].image + '" style="width:383px; height:210px;">' + '<p class="card-text">' + cards[i].features[0] + '</p>'
    + '<p class="card-text">' + cards[i].features[1] + '</p>' + '<p class="card-text">' + cards[i].features[2] + '</p>'
    + '<p class="card-text">' + cards[i].features[3] + '</p>'
    + '<p class="card-text">' + Math.floor(cards[i].regular_apr.rate*100) + "% variable apr" + '</p>'
    + '<div class="card-footer text-right">' + '<a href="#" id="' + cards[i].name + '" class="apply-link btn btn-info text-white btn-block">Apply</a>' + '</div>'
    + '</div>'
    + '</div>'
    + '</div>');

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

//Dynamically bind card dropdowns from search input to click events and redirect to apply.html
$(document).on("mousedown", "p.cardLink", function(){
  sessionStorage.setItem("card", $(this).html());
  window.location = "apply.html";
})

$(document).on("mousedown", "a.apply-link", function(){
  console.log($(this).attr("id"));
  sessionStorage.setItem("card", $(this).attr("id"));
  window.location = "apply.html";
})

$("#filterButton").click(function(){
  var filteredCards = cards;

  if($("#lowApr").is(":checked")){
    var newFilteredCards = [];
    //filter out cards that have regular apr > 0.2
    for(var i=0; i<filteredCards.length; i++){
      if((typeof filteredCards[i].regular_apr.rate) == String){
        filteredCards[i].regular_apr.rate = Number(filteredCards[i].regular_apr.rate);
      }

      if(!(filteredCards[i].regular_apr.rate > 0.2)){
        newFilteredCards.push(filteredCards[i]);
      }
    }
    filteredCards = newFilteredCards;
  }

  if($("#cashBack").is(":checked")){
    var newFilteredCards = [];
    //filter out cards that do not have cash back as one of their tags
    for(var i=0; i<filteredCards.length; i++){
      if((filteredCards[i].tags.includes('cashback'))){
        newFilteredCards.push(filteredCards[i]);
      }
    }
    filteredCards = newFilteredCards;
  }

  if($("#zeroIntroApr").is(":checked")){
    var newFilteredCards = [];
    //filter out cards that do not have zero intro apr
    for(var i=0; i<filteredCards.length; i++){
      if((filteredCards[i].intro_apr.does_not_apply) == false){
        newFilteredCards.push(filteredCards[i]);
      }
    }
    filteredCards = newFilteredCards;
  }

  if($("#travel").is(":checked")){
    var newFilteredCards = [];
    //filter out cards that do not have travel tag
    for(var i=0; i<filteredCards.length; i++){
      if((filteredCards[i].tags.includes('travel'))){
        newFilteredCards.push(filteredCards[i]);
      }
    }
    filteredCards = newFilteredCards;
  }

  if(filteredCards.length == 0){
    alert("Sorry, we don't have any offerings matching that specification");
  }else{
    $("#row-1").empty();
    $("#row-2").empty();
    $("#row-3").empty();

    for(var i=0; i<filteredCards.length; i++){
      if(i<3){
        $("#row-1").append('<div class="col-lg-4">' + '<div class="card" style="background-color: #404040;">'
      + '<div class="card-block">' + '<h3 class="card-header text-center text-light text-bold">' + filteredCards[i].name + '</h3>'
      + '<img src="' + filteredCards[i].image + '" style="width:383px; height:210px;">' + '<p class="card-text">' + filteredCards[i].features[0] + '</p>'
      + '<p class="card-text">' + filteredCards[i].features[1] + '</p>' + '<p class="card-text">' + filteredCards[i].features[2] + '</p>'
      + '<p class="card-text">' + filteredCards[i].features[3] + '</p>'
      + '<p class="card-text">' + Math.floor(filteredCards[i].regular_apr.rate*100) + "% variable apr" + '</p>'
      + '<div class="card-footer text-right">' + '<a href="#" id="' + filteredCards[i].name + '" class="apply-link btn btn-info text-white btn-block">Apply</a>' + '</div>'
      + '</div>'
      + '</div>'
      + '</div>');
      }else if(i<6){
        $("#row-2").append('<div class="col-lg-4">' + '<div class="card" style="background-color: #404040;">'
      + '<div class="card-block">' + '<h3 class="card-header text-center text-light text-bold">' + filteredCards[i].name + '</h3>'
      + '<img src="' + filteredCards[i].image + '" style="width:383px; height:210px;">' + '<p class="card-text">' + filteredCards[i].features[0] + '</p>'
      + '<p class="card-text">' + filteredCards[i].features[1] + '</p>' + '<p class="card-text">' + filteredCards[i].features[2] + '</p>'
      + '<p class="card-text">' + filteredCards[i].features[3] + '</p>'
      + '<p class="card-text">' + Math.floor(filteredCards[i].regular_apr.rate*100) + "% variable apr" + '</p>'
      + '<div class="card-footer text-right">' + '<a href="#" id="' + filteredCards[i].name + '" class="apply-link btn btn-info text-white btn-block">Apply</a>' + '</div>'
      + '</div>'
      + '</div>'
      + '</div>');

      }else if(i<9){
        $("#row-3").append('<div class="col-lg-4">' + '<div class="card" style="background-color: #404040;">'
      + '<div class="card-block">' + '<h3 class="card-header text-center text-light text-bold">' + filteredCards[i].name + '</h3>'
      + '<img src="' + filteredCards[i].image + '" style="width:383px; height:210px;">' + '<p class="card-text">' + filteredCards[i].features[0] + '</p>'
      + '<p class="card-text">' + filteredCards[i].features[1] + '</p>' + '<p class="card-text">' + filteredCards[i].features[2] + '</p>'
      + '<p class="card-text">' + filteredCards[i].features[3] + '</p>'
      + '<p class="card-text">' + Math.floor(filteredCards[i].regular_apr.rate*100) + "% variable apr" + '</p>'
      + '<div class="card-footer text-right">' + '<a href="#" id="' + filteredCards[i].name + '" class="apply-link btn btn-info text-white btn-block">Apply</a>' + '</div>'
      + '</div>'
      + '</div>'
      + '</div>');

      }
    }
  }

})
