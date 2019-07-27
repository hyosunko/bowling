var totalScore = 0;
score = 0;
round = 1;
spare = false;
strike = false;
firstPins = 0;
secondPins = 0;
thirdPins = 0;
spareAddScore = 0;
roundScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
roundFrameStatus = ["O", "O", "O", "O", "O", "O", "O", "O", "O", "O"];

document.querySelector("#play-button").addEventListener("click", function() {
  if (round < 11) {
    document.querySelector("#round-no").innerHTML = "Round: " + round;
    // 1. random remain pins
    firstPins = Math.floor(Math.random() * 11);
    secondPins = firstPins - Math.floor(Math.random() * firstPins);
    thirdPins = secondPins - Math.floor(Math.random() * secondPins);

    //if last frame check strike or spare
    if (round === 10 && (firstPins === 0 || secondPins === 0)) {
      roundScore[round - 1] =
        10 - firstPins + (firstPins - secondPins) + (secondPins - thirdPins);
    } else {
      roundScore[round - 1] = 10 - secondPins;
    }

    // add each round frame status: Open, Strike(S), Spare(P)
    if (firstPins === 0) {
      roundFrameStatus[round - 1] = "S";
    } else if (secondPins === 0) {
      roundFrameStatus[round - 1] = "P";
    } else {
      roundFrameStatus[round - 1] = "O";
    }

    //bonus point calculation for Strike
    if (roundFrameStatus[round - 3] === "S") {
      roundScore[round - 3] += roundScore[round - 2] + roundScore[round - 1];
      document.querySelector(`#round-${round - 2}`).innerHTML =
        roundScore[round - 3];
    }

    //bonus point calculation for Spare
    if (roundFrameStatus[round - 2] === "P") {
      roundScore[round - 2] += roundScore[round - 1];
      document.querySelector(`#round-${round - 1}`).innerHTML =
        roundScore[round - 2];
    }
  }

  //total Score calculation
  totalScore = roundScore.reduce((total, current) => total + current);

  // replace remaining pins for each round
  document.querySelector("#first-pins").innerHTML =
    "first remain pins: " + firstPins;
  document.querySelector("#second-pins").innerHTML =
    "second remain pins: " + secondPins;

  if (round === 10 && (firstPins === 0 || secondPins === 0)) {
    document.querySelector("#third-pins").innerHTML =
      "second remain pins: " + thirdPins;
  }
  // replace each round score and total score
  document.querySelector(`#round-${round}`).innerHTML = roundScore[round - 1];
  document.querySelector("#total-score").innerHTML = totalScore;
  round++;
});

// reset
document.querySelector("#reset-button").addEventListener("click", function() {
  round = 1;
  document.querySelector("#first-pins").innerHTML = "";
  document.querySelector("#second-pins").innerHTML = "";
  document.querySelector("#third-pins").innerHTML = "";
  document.querySelector("#round-no").innerHTML = "";
  var lis = document.querySelectorAll(".scores");
  for (var i = 0; (li = lis[i]); i++) {
    li.innerHTML = 0;
    roundFrameStatus[i] = "O";
    roundScore[i] = 0;
  }
});
