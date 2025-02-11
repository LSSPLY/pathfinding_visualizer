const startButton = document.getElementById("startButton");
const generateMazeButton = document.getElementById("generateMazeButton");
const clearAllButton = document.getElementById("clearAllButton");

const startSelectorButton = document.getElementById("startSelector");
const endSelectorButton = document.getElementById("endSelector");
const wallBuilderButton = document.getElementById("wallBuilder");
const eraserButton = document.getElementById("eraser");

let activeButton = startSelectorButton;
let isMouseDown = false;
let toolState = 0;

for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
        grid[c][r].classList.add("startCell");
    }
}

startSelectorButton.addEventListener("click", function () {
    SetButtonActive(this);
    removeCursorClass();
    toolState = 0;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            grid[c][r].classList.add("startCell");
        }
    }
});
endSelectorButton.addEventListener("click", function () {
    SetButtonActive(this);
    removeCursorClass();
    toolState = 1;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            grid[c][r].classList.add("endCell");
        }
    }
});
wallBuilderButton.addEventListener("click", function () {
    SetButtonActive(this);
    removeCursorClass();
    toolState = 2;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            grid[c][r].classList.add("wallCell");
        }
    }
});
eraserButton.addEventListener("click", function () {
    SetButtonActive(this);
    removeCursorClass();
    toolState = 3;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            grid[c][r].classList.add("eraserCell");
        }
    }
});

function removeCursorClass() {
    switch (toolState) {
        case 0:
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    grid[c][r].classList.remove("startCell");
                }
            }
            break;
        case 1:
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    grid[c][r].classList.remove("endCell");
                }
            }
            break;
        case 2:
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    grid[c][r].classList.remove("wallCell");
                }
            }
            break;
        default:
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    grid[c][r].classList.remove("eraserCell");
                }
            }
            break;
    }
}

function performCellAction(cell) {
    if (isPathDisplayed) {
        isPathDisplayed = false;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                grid[r][c].classList.remove("visited");
                grid[r][c].firstChild.classList.remove("visited");
                grid[r][c].firstChild.classList.remove("path");
                grid[r][c].classList.remove("path");
                grid[r][c].firstChild.firstChild.setAttribute("fill", wallColor);
                hideDialogue();
            }
        }
    }
    switch (toolState) {
        case 0:
            setToStart(cell);
            break;
        case 1:
            setToEnd(cell);
            break;
        case 2:
            setToWall(cell);
            break;
        default:
            eraseValue(cell);
            break;
    }
}

function SetButtonActive(button) {
    activeButton.classList.remove("active");
    activeButton = button;
    button.classList.add("active");
}

startButton.addEventListener("click", () => {
    if (startCell && endCell) {
        bfs(grid[startCell[0]][startCell[1]], grid[endCell[0]][endCell[1]]);
    } else {
        alert("Please select a start and an end point!");
    }
});

generateMazeButton.addEventListener("click", () => {
    generateMaze();
});

clearAllButton.addEventListener("click", () => {
    hideDialogue();
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            eraseValue(grid[r][c]);
        }
    }
});
