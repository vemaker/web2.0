(function() {

    var pieces = document.getElementById('puzzlearea').getElementsByTagName('div');
    var blankPosition = 15;
    var movingCount = 0;
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var moving = false;
    var indexRecorder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    var clickPieceValue;
    var shuffling = false;
    var shuffleTime = 0;

    var initialize = function() {
        var x = -100, y = -100;
        var index, index1, index2;
        for (index in pieces) {
            if (pieces.hasOwnProperty(index)) {
                pieces[index].className = 'puzzlepiece';
            }
        }
        index = 0;
        for (index1 = 0; index1 < 4; index1++) {
            y += 100;
            x = -100;
            for (index2 = 0; index2 < 4; index2++) {
                x += 100;
                pieces[index].style.backgroundPosition = -x * 0.96 + "px " + -y * 0.96 + "px";
                pieces[index].style.left = x + "px";
                pieces[index++].style.top = y + "px";
                if (index === 15) {
                    break;
                } 
            }
        }
    };


    var eventHandler = function(event) {
        if (event.target.className !== 'puzzlepiece movablepiece' || moving) {
            return;
        }
        clickPieceValue = event.target.innerHTML - 1;
        var index;
        var clickPieceIndex;
        for (index in indexRecorder) {
            if (indexRecorder.hasOwnProperty(index)) {
                if (clickPieceValue === indexRecorder[index]) {
                    clickPieceIndex = index;
                    break;
                }
            }
        }
        moving = true;
        removeMovableClass();
        if (shuffling) {
            shuffleMove(clickPieceIndex);
        } else {
            move(clickPieceIndex);
        }
    };

    var move = function(clickPieceIndex) {
        if (movingCount++ === 25) {
            indexRecorder[clickPieceIndex] = indexRecorder[clickPieceIndex] ^ indexRecorder[blankPosition];
            indexRecorder[blankPosition] = indexRecorder[clickPieceIndex] ^ indexRecorder[blankPosition];
            indexRecorder[clickPieceIndex] = indexRecorder[clickPieceIndex] ^ indexRecorder[blankPosition];
            movingCount = 0;
            moving = false;
            blankPosition = clickPieceIndex;
            recognizeMovablePieces();
            return;
        }
        if (blankPosition - clickPieceIndex === 1) {
            var left = parseInt(pieces[clickPieceValue].style.left, 10);
            pieces[clickPieceValue].style.left = (left + 4) + "px";
        }
        if (blankPosition - clickPieceIndex === 4) {
            var top = parseInt(pieces[clickPieceValue].style.top, 10);
            pieces[clickPieceValue].style.top = (top + 4) + "px";
        }
        if (blankPosition - clickPieceIndex === -1) {
            var left1 = parseInt(pieces[clickPieceValue].style.left, 10);
            pieces[clickPieceValue].style.left = (left1 - 4) + "px";
        }
        if (blankPosition - clickPieceIndex === -4) {
            var top1 = parseInt(pieces[clickPieceValue].style.top, 10);
            pieces[clickPieceValue].style.top = (top1 - 4) + "px";
        }
        requestAnimationFrame(function() {
            move(clickPieceIndex);
        });
    };

    var removeMovableClass = function() {
        var index;
        for (index in pieces) {
            if (pieces.hasOwnProperty(index)) {
                pieces[index].className = 'puzzlepiece';
            }
        }
    };

    var recognizeMovablePieces = function() {
        if ((blankPosition) % 4 !== 0) {
            pieces[indexRecorder[parseInt(blankPosition, 10) - 1]].className = "puzzlepiece movablepiece";
        }
        if (blankPosition < 12) {
            pieces[indexRecorder[parseInt(blankPosition, 10) + 4]].className = "puzzlepiece movablepiece";
        }
        if (blankPosition > 3) {
            pieces[indexRecorder[parseInt(blankPosition, 10) - 4]].className = "puzzlepiece movablepiece";
        }
        if ((blankPosition + 1) % 4 !== 0 && parseInt(blankPosition, 10) !== 15) {
            pieces[indexRecorder[parseInt(blankPosition, 10) + 1]].className = "puzzlepiece movablepiece";
        }
    };

    var shuffle = function() {
        if (shuffleTime++ === 1000) {
            shuffling = false;
            shuffleTime = 0;
            return;
        }
        var random;
        while (1) {
            if ((blankPosition) % 4 !== 0) {
                random = Math.floor(Math.random() * 3);
                if (!random) {
                    pieces[indexRecorder[parseInt(blankPosition, 10) - 1]].click();
                    break;
                }
            }
            if (blankPosition < 12) {
                random = Math.floor(Math.random() * 3);
                if (!random) {
                    pieces[indexRecorder[parseInt(blankPosition, 10) + 4]].click();
                    break;
                }
            }
            if (blankPosition > 3) {
                random = Math.floor(Math.random() * 3);
                if (!random) {
                    pieces[indexRecorder[parseInt(blankPosition, 10) - 4]].click();
                    break;
                }
            }
            if ((blankPosition + 1) % 4 !== 0 && parseInt(blankPosition, 10) !== 15) {
                random = Math.floor(Math.random() * 3);
                if (!random) {
                    pieces[indexRecorder[parseInt(blankPosition, 10) + 1]].click();
                    break;
                }
            }
        }
        setTimeout(shuffle, 5);
    };

    var shuffleMove = function(clickPieceIndex) {
        if (movingCount++ === 5) {
            indexRecorder[clickPieceIndex] = indexRecorder[clickPieceIndex] ^ indexRecorder[blankPosition];
            indexRecorder[blankPosition] = indexRecorder[clickPieceIndex] ^ indexRecorder[blankPosition];
            indexRecorder[clickPieceIndex] = indexRecorder[clickPieceIndex] ^ indexRecorder[blankPosition];
            movingCount = 0;
            moving = false;
            blankPosition = clickPieceIndex;
            recognizeMovablePieces();
            return;
        }
        if (blankPosition - clickPieceIndex === 1) {
            var left = parseInt(pieces[clickPieceValue].style.left, 10);
            pieces[clickPieceValue].style.left = (left + 20) + "px";
        }
        if (blankPosition - clickPieceIndex === 4) {
            var top = parseInt(pieces[clickPieceValue].style.top, 10);
            pieces[clickPieceValue].style.top = (top + 20) + "px";
        }
        if (blankPosition - clickPieceIndex === -1) {
            var left1 = parseInt(pieces[clickPieceValue].style.left, 10);
            pieces[clickPieceValue].style.left = (left1 - 20) + "px";
        }
        if (blankPosition - clickPieceIndex === -4) {
            var top1 = parseInt(pieces[clickPieceValue].style.top, 10);
            pieces[clickPieceValue].style.top = (top1 - 20) + "px";
        }
        requestAnimationFrame(function() {
            shuffleMove(clickPieceIndex);
        });
    };

    window.onload = function() {
        initialize();
        recognizeMovablePieces();
        document.getElementById('puzzlearea').addEventListener('click', function() {
            eventHandler(event);
        });
        document.getElementById('shufflebutton').addEventListener('click', function() {
            shuffling = true;
            shuffle();
        });
    };

})();
