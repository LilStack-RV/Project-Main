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

//write results to firebase db, after checking that user has entered value for all fields
$("#submit-button").click(function(){
  var quality = $('input:radio[name = "quality"]:checked').attr('value');
  var meetNeeds = $('input:radio[name = "needs"]:checked').val();
  var recommend = $('input:radio[name = "recommend"]:checked').val();
  var satisfaction = $('input:radio[name = "satisfied"]:checked').val();
  var additionalComments = $("#additional-comments").val();
  console.log(additionalComments);

  if(quality == undefined || meetNeeds == undefined || recommend == undefined || satisfaction == undefined){
    alert("please check to make sure all fields are filled out before submitting!")
  }else{
    var thisSurvey = firebase.database().ref("/Survey Results/").push();

    thisSurvey.set({
      Quality: quality,
      NeedsMet: meetNeeds,
      RecommentToFriend: recommend,
      AdditionalComments: additionalComments,
    })

    var currentSurveyCount;
    firebase.database().ref("/Survey Results/Num Surveys/").once("value").then(function(snap){
      currentSurveyCount = snap.val();
    }).then(function(){
      currentSurveyCount++;
      console.log(currentSurveyCount);
      firebase.database().ref("/Survey Results/Num Surveys/").set(currentSurveyCount);
    }).then(function(){
      window.location = "../index.html";
    })
  }


})
