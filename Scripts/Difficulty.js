Difficulty = {
    Easy: 0,
    Normal: 1,
    Hard: 2
}

GetDifficulty = function () {
    var difficulty = document.getElementsByClassName("active")[0].id;
    if (difficulty == 'easy') return Difficulty.Easy;
    if (difficulty == 'normal') return Difficulty.Normal;
    if (difficulty == 'hard') return Difficulty.Hard;
}

GetRowNumber = function (difficulty) {
    if (difficulty == Difficulty.Easy)
        return 3;
    if (difficulty == Difficulty.Normal)
        return 4;
    if (difficulty == Difficulty.Hard)
        return 5;
}

GetNumberOfBlocks = function (difficulty) {
    if (difficulty == Difficulty.Easy)
        return 5;
    if (difficulty == Difficulty.Normal)
        return 6;
    if (difficulty == Difficulty.Hard)
        return 7;
}

GetBlockWidth = function (difficulty) {
    if (difficulty == Difficulty.Easy)
        return 56;
    if (difficulty == Difficulty.Normal)
        return 46;
    if (difficulty == Difficulty.Hard)
        return 38;
}

GetBlockHeight = function (difficulty) {
    if (difficulty == Difficulty.Easy)
        return 20;
    if (difficulty == Difficulty.Normal)
        return 15;
    if (difficulty == Difficulty.Hard)
        return 10;
}

GetBlockDisplacement = function (difficulty) {
    if (difficulty == Difficulty.Easy)
        return 30;
    if (difficulty == Difficulty.Normal)
        return 25;
    if (difficulty == Difficulty.Hard)
        return 10;
}

GetBallRadius = function (difficulty) {
    if (difficulty == Difficulty.Easy)
        return 5;
    if (difficulty == Difficulty.Normal)
        return 4;
    if (difficulty == Difficulty.Hard)
        return 3;
}

GetPaddleWidth = function (difficulty) {
    if (difficulty == Difficulty.Easy)
        return 70;
    if (difficulty == Difficulty.Normal)
        return 60;
    if (difficulty == Difficulty.Hard)
        return 50;
}