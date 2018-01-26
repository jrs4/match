var MatchGame = {};
var unflipBackColor = 'rgb(32,64,86)';
var matchBackColor = 'rgb(153,153,153)';
var matchColor = 'rgb(204,204,204)';

var colors = ['hsl(25, 85%, 65%)',
              'hsl(55, 85%, 65%)',
              'hsl(90, 85%, 65%)',
              'hsl(160, 85%, 65%)',
              'hsl(220, 85%, 65%)',
              'hsl(265, 85%, 65%)',
              'hsl(310, 85%, 65%)',
              'hsl(360, 85%, 65%)'];

var gameEnded = false;

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function(){
  var cardValues = MatchGame.generateCardValues();
  MatchGame.renderCards(cardValues,"#game");

  $(".card").click(function(){
    MatchGame.flipCard(this, "#game");
  });

  $(".restart").click(function(){
    gameEnded = false;
    var cardValues = MatchGame.generateCardValues();
    MatchGame.reshuffleCards(cardValues, "#game");
  });

  setInterval(function(){
    gameEnded = checkFinished();
    if (gameEnded === true) {
      showFinalMessage("#game");
    }
  }, 2000);
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var orderedCards = [];
  var randomCards = [];

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 2; j++) {
      orderedCards.push(i+1);
      randomCards.push(0);
    }
  }

  var random;
  while (orderedCards.length>0) {
    random = Math.floor(Math.random() * 16);
    if (randomCards[random] === 0) {
      randomCards[random] = orderedCards.pop();
    }
  }

  return randomCards;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $($game).html("");
  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="card col-xs-3"></div>');
    $card.data('position', i);
    $card.data('value', cardValues[i]);
    $card.data('color', colors[cardValues[i]-1]);
    $card.data('flipped', false);
    $card.data('matched', false);
    $($game).append($card);
  }
  $($game).append($('<div class="restart col-xs-12">NEW GAME</div>'));
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($($card).data('flipped') === true) {
    return;
  }

  $($card).data('flipped', true);
  $($card).html($($card).data('value'));
  $($card).css('background-color', $($card).data('color'));

  setTimeout(function () {
    checkMatch($card, $game);
  }, 500);
};

function checkMatch($card, $game){
  $(".card").each(function(index){
    if ($(this).data('position') !== $($card).data('position') && $(this).data('flipped') === true && $(this).data('matched') === false) {
      if ($(this).data('value') === $($card).data('value')) {
        $(this).css('background-color', matchBackColor);
        $($card).css('background-color', matchBackColor);
        $(this).css('color', matchColor);
        $($card).css('color', matchColor);
        $(this).data('matched', true);
        $($card).data('matched', true);
      }
      else {
        $(this).css('background-color', unflipBackColor);
        $($card).css('background-color', unflipBackColor);
        $(this).data('flipped', false);
        $($card).data('flipped', false);
        $(this).html("");
        $($card).html("");
      }
    }
  });
};

function checkFinished(){
  var bTemp = true;

  $(".card").each(function(index){
    if ($(this).data('matched') === false) {
      bTemp = false;
    }
  });
  return bTemp;
}

function showFinalMessage($game){
  var counter = 0;
  $(".card").each(function(index){
    if (counter === 0) { $(this).html("E"); }
    if (counter === 1) { $(this).html("R"); }
    if (counter === 2) { $(this).html("E"); }
    if (counter === 3) { $(this).html("S"); }
    if (counter === 4) { $(this).html("U"); }
    if (counter === 5) { $(this).html("N"); }
    if (counter === 6) { $(this).html("A"); }
    if (counter === 7) { $(this).html(""); }
    if (counter === 8) { $(this).html("M"); }
    if (counter === 9) { $(this).html("A"); }
    if (counter === 10) { $(this).html("R"); }
    if (counter === 11) { $(this).html("A"); }
    if (counter === 12) { $(this).html("V"); }
    if (counter === 13) { $(this).html("I"); }
    if (counter === 14) { $(this).html("LL"); }
    if (counter === 15) { $(this).html("A"); }
    $(this).css('background-color', unflipBackColor);
    counter ++;
  });
};

MatchGame.reshuffleCards = function(cardValues, $game){
  var counter = 0;
  $(".card").each(function(index){
    $(this).data('value', cardValues[counter]);
    $(this).css('color', 'white');
    $(this).data('matched', false);
    $(this).css('background-color', unflipBackColor);
    $(this).data('flipped', false);
    $(this).data('color', colors[cardValues[counter]-1]);
    $(this).html("");
    counter++;
  });
};
