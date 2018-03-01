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
    console.log(card);
  })
  popCardsInitial(cards);
}

var popCardsInitial = function(cards){
  for(var i=0; i<cards.length; i++){
    if(i<3){
      $("#row-1").append('<div class="col-lg-4">' + '<div class="card" style="background-color: #404040;">'
    + '<div class="card-block">' + '<h3 class="card-header text-center text-light text-bold">' + cards[i].name + 'Card 1</h3>'
    + '<img src="' + cards[i].image + '" style="width:327px; height:210px;">' + '<p class="card-text">' + cards[i].features[0] + '</p>'
    + '<p class="card-text" style=>' + cards[i].features[1] + '</p>' + '<p class="card-text">' + cards[i].features[2] + '</p>'
    + '<p class="card-text">' + cards[i].features[3] + '</p>'
    + '<p class="card-text">' + Math.floor(cards[i].regular_apr.rate*100) + "% variable apr" + '</p>'
    + '<div class="card-footer text-right">' + '<a href="#" class="btn btn-info text-white btn-block">Apply</a>' + '</div>'
    + '</div>'
    + '</div>'
    + '</div>');
    }else if(i<6){
      $("#row-2").append('<div class="col-lg-4">' + '<div class="card" style="background-color: #404040;">'
    + '<div class="card-block">' + '<h3 class="card-header text-center text-light text-bold">' + cards[i].name + 'Card 1</h3>'
    + '<img src="' + cards[i].image + '" style="width:327px; height:210px;">' + '<p class="card-text">' + cards[i].features[0] + '</p>'
    + '<p class="card-text">' + cards[i].features[1] + '</p>' + '<p class="card-text">' + cards[i].features[2] + '</p>'
    + '<p class="card-text">' + cards[i].features[3] + '</p>'
    + '<p class="card-text">' + Math.floor(cards[i].regular_apr.rate*100) + "% variable apr" + '</p>'
    + '<div class="card-footer text-right">' + '<a href="#" class="btn btn-info text-white btn-block">Apply</a>' + '</div>'
    + '</div>'
    + '</div>'
    + '</div>');

    }else if(i<9){
      $("#row-3").append('<div class="col-lg-4">' + '<div class="card" style="background-color: #404040;">'
    + '<div class="card-block">' + '<h3 class="card-header text-center text-light text-bold">' + cards[i].name + 'Card 1</h3>'
    + '<img src="' + cards[i].image + '" style="width:327px; height:210px;">' + '<p class="card-text">' + cards[i].features[0] + '</p>'
    + '<p class="card-text">' + cards[i].features[1] + '</p>' + '<p class="card-text">' + cards[i].features[2] + '</p>'
    + '<p class="card-text">' + cards[i].features[3] + '</p>'
    + '<p class="card-text">' + Math.floor(cards[i].regular_apr.rate*100) + "% variable apr" + '</p>'
    + '<div class="card-footer text-right">' + '<a href="#" class="btn btn-info text-white btn-block">Apply</a>' + '</div>'
    + '</div>'
    + '</div>'
    + '</div>');

    }
  }
}
