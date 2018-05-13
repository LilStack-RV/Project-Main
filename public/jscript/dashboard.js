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

  //Get number of applications per card, and write to dom
  firebase.database().ref("/Cards/").once("value").then(function(snap){
    console.log("inside of firebase db call")
    snap.forEach(function(childSnap){
      var cardName = childSnap.key;
      var cardVal = childSnap.val();

      $("#info-table").append("<tr><td>" + cardName + "</td><td>" + cardVal + "</td></tr>");
    })
  })

  //Get number of applications per card aspect and write to
  var zeroIntroApr = 0;
  var cashBack = 0;
  var lowApr = 0;
  var travel = 0;
  var numApplications = 0;
  firebase.database().ref("/Application Attributes/").once("value").then(function(snap){
    zeroIntroApr = snap.child("0% Intro APR").val();
    cashBack = snap.child("Cash Back").val();
    lowApr = snap.child("Low APR").val();
    travel = snap.child("Travel").val();
  }).then(function(){
    firebase.database().ref("/Applications/Num Applications/").once("value").then(function(snap){
      numApplications = snap.val();
    }).then(function(){
      console.log(numApplications);
      console.log(travel);
      zeroIntroApr = ((zeroIntroApr / numApplications) * 100).toFixed(1);
      cashBack = ((cashBack / numApplications) * 100).toFixed(1);
      lowApr = ((lowApr / numApplications) * 100).toFixed(1);
      travel = ((travel / numApplications) * 100).toFixed(1);

      console.log(travel);

      //Modify width of html progress bars to reflect % of applications per attribute
      $("#travel").width(travel + "%");
      $("#introApr").width(zeroIntroApr + "%");
      $("#cashBack").width(cashBack + "%");
      $("#lowApr").width(lowApr + "%");

      //Modify the text of html progress bars to reflect % of applications per attribute
      $("#travel").append(travel + "%");
      $("#introApr").append(zeroIntroApr + "%");
      $("#cashBack").append(cashBack + "%");
      $("#lowApr").append(lowApr + "%");
    })
  })

})

var handleCards = function(data){
  data.forEach(function(card){
    cards.push(card);
  });
  console.log(cards);
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
