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

  console.log(cards);

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
  $(this).css("cursor", "wait");

  console.log("submit-button was clicked");
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

  if(firstName == "" || lastName == "" || dob == "" ||
  creditScore == "" || income == "" || streetAddress == "" ||
  city == "" || state == "" || zip == "" || email == "" || phoneNum == ""){
    alert("Please check to make sure all fileds are filled in before applying");
  }else{

    var cardId = cardApplyingTo.id;
    $.ajax({
      type: 'POST',
      url: "https://techcase-cards-api.herokuapp.com/api/v1/cards/" + cardId + "/apply",
      data: JSON.stringify({"creditScore": creditScore}),
      contentType: "application/json",
      complete: function(data){
        sessionStorage.setItem("success", data.responseJSON.success);
        var newApp = firebase.database().ref('/Applications/').push();

        newApp.set({
          "First Name": firstName,
          "Last Name": lastName,
          "Date Of Birth": dob,
          "Credit Score": creditScore,
          "Income": income,
          "Street Address": streetAddress,
          "City": city,
          "State": state,
          "Zip Code": zip,
          "Email": email,
          "Phone Number": phoneNum
        })

        var numOfCardApps;
        firebase.database().ref('/Cards/' + cardApplyingTo.name + "/").once("value").then(function(snap){
          numOfCardApps = snap.val();
        }).then(function(){
          numOfCardApps = numOfCardApps + 1;
          firebase.database().ref('/Cards/' + cardApplyingTo.name + '/').set(numOfCardApps);
        })

        var numApplications;
        firebase.database().ref('/Applications/Num Applications/').once("value").then(function(snap){
          numApplications = snap.val();
        }).then(function(){
          numApplications = numApplications + 1;
          firebase.database().ref('/Applications/Num Applications/').set(numApplications);
        })

        if(!cardApplyingTo.intro_apr.does_not_apply){
          //increment firebase count for 0% intro apr
          var currentIntroApr;
          firebase.database().ref('/Application Attributes/0% Intro APR/').once("value").then(function(snap){
            currentIntroApr = snap.val();
          }).then(function(){
            currentIntroApr = currentIntroApr + 1;
            firebase.database().ref('/Application Attributes/0% Intro APR/').set(currentIntroApr);
          })
        }

        if(cardApplyingTo.tags.includes('cashback')){
          //increment firebase count for cash back
          var cashback;
          firebase.database().ref('/Application Attributes/Cash Back/').once("value").then(function(snap){
            cashback = snap.val();
          }).then(function(){
            cashback = cashback + 1;
            firebase.database().ref('/Application Attributes/Cash Back/').set(currentIntroApr);
          })
        }

        if(cardApplyingTo.regular_apr.rate > 0.2){
          //increment firebase count for low apr
          var lowAprCount;
          firebase.database().ref('/Application Attributes/Low APR/').once("value").then(function(snap){
            lowAprCount = snap.val();
          }).then(function(){
            lowAprCount = lowAprCount + 1;
            firebase.database().ref('/Application Attributes/Low APR/').set(lowAprCount);
          })
        }

        if(cardApplyingTo.tags.includes('travel')){
          //increment firebase count for travel
          var travelCount;
          firebase.database().ref('/Application Attributes/Travel/').once("value").then(function(snap){
            travelCount = snap.val();
          }).then(function(){
            travelCount = travelCount + 1;
            firebase.database().ref('/Application Attributes/Travel/').set(travelCount);
          })
        }

        /*Very poor way of waiting for asynchronous requests to finish, used this because we were
          low on time, and didn't get a chance to implement callback
        */
        setTimeout(function(){
          window.location = "../html/postApplication.html"
        }, 3000)
      }
    })
  }
})
