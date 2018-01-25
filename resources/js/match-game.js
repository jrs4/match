var MatchGame = {};

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
  var flippedCards = [];
  var colors = ['hsl(25, 85%, 65%)',
                'hsl(55, 85%, 65%)',
                'hsl(90, 85%, 65%)',
                'hsl(160, 85%, 65%)',
                'hsl(220, 85%, 65%)',
                'hsl(265, 85%, 65%)',
                'hsl(310, 85%, 65%)',
                'hsl(360, 85%, 65%)'];

  $($game).html("");
  for (var i = 0; i < cardValues.length; i++) {
    var $card = $('<div class="card col-xs-3"></div>');
    $card.data('position', i);
    $card.data('value', cardValues[i]);
    $card.data('color', colors[cardValues[i]-1]);
    $card.data('flipped', false);
    $card.data('matched', false);
    $($game).append($card);
    flippedCards.push(false);
  }
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

  setTimeout(checkMatch($card), 5000);
};

function checkMatch($card){
  var unflipColor = 'rgb(32,64,86)';
  var matchColor = 'rgb(153,153,153)';
  console.log('Check Match');

  $(".card").each(function(index){
    if ($(this).data('position') !== $($card).data('position') && $(this).data('flipped') === true && $(this).data('matched') === false) {
      if ($(this).data('value') === $($card).data('value')) {
        $(this).css('background-color', matchColor);
        $($card).css('background-color', matchColor);
        $(this).data('matched', true);
        $($card).data('matched', true);
      }
      else {
        $(this).css('background-color', unflipColor);
        $($card).css('background-color', unflipColor);
        $(this).data('flipped', false);
        $($card).data('flipped', false);
        $(this).html("");
        $($card).html("");
      }
    }
  });
};
