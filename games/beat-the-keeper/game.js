(function() {
    var TOTAL_SHOTS = 5;
    var BEST_SCORE_KEY = "champion-football-stroud-beat-the-keeper-best-score";
    var SHOT_DELAY_MS = 750;
    var RESET_DELAY_MS = 550;
    var lanes = ["left", "middle", "right"];

    var goalMessages = {
        left: "Goal! You picked the left side and scored.",
        middle: "Goal! You smashed it down the middle.",
        right: "Goal! You tucked it into the right side."
    };

    var saveMessages = {
        left: "Saved on the left. Try another side next shot.",
        middle: "Saved in the middle. Mix it up next time.",
        right: "Saved on the right. You can beat the keeper next shot."
    };

    var state = {
        shotsTaken: 0,
        score: 0,
        bestScore: readBestScore(),
        roundActive: false,
        animating: false
    };

    var stage = document.getElementById("btk-stage");
    var startButton = document.getElementById("btk-start-button");
    var playAgainButton = document.getElementById("btk-play-again-button");
    var endScreen = document.getElementById("btk-end-screen");
    var endTitle = document.getElementById("btk-end-title");
    var endCopy = document.getElementById("btk-end-copy");
    var status = document.getElementById("btk-status");
    var scoreValue = document.getElementById("btk-score");
    var shotsValue = document.getElementById("btk-shots");
    var bestScoreValue = document.getElementById("btk-best-score");
    var shotButtons = Array.prototype.slice.call(document.querySelectorAll(".btk-shot-button"));

    function readBestScore() {
        try {
            var savedValue = localStorage.getItem(BEST_SCORE_KEY);
            var parsed = Number(savedValue);
            return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
        } catch (error) {
            return 0;
        }
    }

    function writeBestScore(value) {
        try {
            localStorage.setItem(BEST_SCORE_KEY, String(value));
        } catch (error) {
            // Ignore storage issues so the game still works.
        }
    }

    function randomLane() {
        return lanes[Math.floor(Math.random() * lanes.length)];
    }

    function setStatus(message) {
        status.textContent = message;
    }

    function updateScoreboard() {
        scoreValue.textContent = String(state.score);
        shotsValue.textContent = state.shotsTaken + "/" + TOTAL_SHOTS;
        bestScoreValue.textContent = String(state.bestScore);
    }

    function resetStage() {
        stage.dataset.shot = "idle";
        stage.dataset.keeper = "middle";
        stage.dataset.result = state.roundActive ? "ready" : "waiting";
    }

    function updateControls() {
        var disableShots = !state.roundActive || state.animating;

        shotButtons.forEach(function(button) {
            button.disabled = disableShots;
        });

        startButton.hidden = state.roundActive || state.shotsTaken > 0;
        startButton.disabled = state.roundActive || state.animating;
    }

    function getFinalMessage(score) {
        if (score === 5) {
            return {
                title: "Perfect round!",
                copy: "Amazing work. You scored all 5 goals."
            };
        }

        if (score >= 3) {
            return {
                title: "Brilliant shooting!",
                copy: "You scored " + score + " out of 5. Great choices."
            };
        }

        if (score >= 1) {
            return {
                title: "Nice round!",
                copy: "You scored " + score + " out of 5. Play again and try for more."
            };
        }

        return {
            title: "Keep trying!",
            copy: "The keeper stopped this round. Have another go and pick a new side."
        };
    }

    function beginRound() {
        state.shotsTaken = 0;
        state.score = 0;
        state.roundActive = true;
        state.animating = false;

        endScreen.hidden = true;
        resetStage();
        updateScoreboard();
        updateControls();
        setStatus("Round started. Choose left, middle, or right for your first shot.");
    }

    function finishRound() {
        state.roundActive = false;
        state.animating = false;

        if (state.score > state.bestScore) {
            state.bestScore = state.score;
            writeBestScore(state.bestScore);
        }

        var finalMessage = getFinalMessage(state.score);
        endTitle.textContent = finalMessage.title;
        endCopy.textContent = finalMessage.copy;
        endScreen.hidden = false;

        updateScoreboard();
        updateControls();
        setStatus("Round finished. Press Play again for another 5 shots.");
        resetStage();
    }

    function finishShot(playerLane) {
        var isGoal = playerLane !== stage.dataset.keeper;

        state.shotsTaken += 1;
        if (isGoal) {
            state.score += 1;
        }

        stage.dataset.result = isGoal ? "goal" : "save";
        updateScoreboard();
        setStatus(isGoal ? goalMessages[playerLane] : saveMessages[playerLane]);

        if (state.shotsTaken >= TOTAL_SHOTS) {
            window.setTimeout(finishRound, RESET_DELAY_MS);
            return;
        }

        window.setTimeout(function() {
            state.animating = false;
            resetStage();
            updateControls();
            setStatus(status.textContent + " Choose your next shot.");
        }, RESET_DELAY_MS);
    }

    function takeShot(playerLane) {
        if (!state.roundActive || state.animating) {
            return;
        }

        state.animating = true;
        endScreen.hidden = true;

        stage.dataset.result = "shooting";
        stage.dataset.keeper = randomLane();
        stage.dataset.shot = playerLane;

        updateControls();
        setStatus("Shot " + (state.shotsTaken + 1) + " is on the way...");

        window.setTimeout(function() {
            finishShot(playerLane);
        }, SHOT_DELAY_MS);
    }

    shotButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            takeShot(button.getAttribute("data-lane"));
        });
    });

    startButton.addEventListener("click", beginRound);
    playAgainButton.addEventListener("click", beginRound);

    document.addEventListener("keydown", function(event) {
        if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
            return;
        }

        var lane = null;

        if (event.key === "1") {
            lane = "left";
        } else if (event.key === "2") {
            lane = "middle";
        } else if (event.key === "3") {
            lane = "right";
        }

        if (lane) {
            event.preventDefault();
            takeShot(lane);
        }
    });

    updateScoreboard();
    updateControls();
    resetStage();
})();
