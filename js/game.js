let size = 12;

const directions = {38: 11, 39:12, 40:13, 37:14};
const cellTypes = {
    "-2": "border",
    "-1": "brick",
    0: "green",
    1: "active-bottom",
    11: "active-top",
    12: "active-right",
    13: "active-bottom",
    14: "active-left",
    2: "enemy",
    21: "enemy-top",
    22: "enemy-right",
    23: "enemy-bottom",
    24: "enemy-left",
    3: "bomb",
    4: "active-bottom bomb-man",
    5: "hidden-door",
    51: "door"
};

const generateField = function (size) {
    let field = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
                row.push(-2)
            } else if (i % 2 === 0 && j % 2 === 0) {
                row.push(-2)
            } else {
                row.push([-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2][Math.floor(Math.random() * 18)])
            }
        }
        field.push(row)
    }
    field[1][1] = 13;
    field[1][2] = 0;
    field[1][3] = 0;
    field[2][1] = 0;
    field[3][1] = 0;
    document.getElementById("game").style.height = (size * 50).toString() + "px";
    document.getElementById("game").style.width = (size * 50).toString() + "px";
    return field;
};

const getCellType = (cell) => cellTypes[cell];

const updateView = (elementString) => document.getElementById("game").innerHTML = elementString;

const renderView = field =>
    field.map((row) =>
        row.map((cell) =>
            `<div class="Cell Cell--${getCellType(cell)}"></div>`).join("")).join("");

const getField = (type) => {
    let enemies = [];
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === type) enemies.push([i, j])
        }
    }
    if (type === 2) {
        return enemies
    }
    return enemies.length > 1 ? enemies : enemies[0];
};
const getActiveField = () => getField(1) || getField(4) || getField(11)
    || getField(12) || getField(13) || getField(14);

const getEnemies = () => getField(2);

const getDoor = () => getField(5);

const stopGame = (win) => {
    field[doorIndex[0]][doorIndex[1]] = 51;
    updateView(renderView(field));
    document.getElementById('message').style.display = 'block';
    document.getElementById('message').innerText = win ? "You Win!!!" : "You Lose((";
    document.removeEventListener('keyup', keyDownHandler);
    clearInterval(moveFunctionInterval);
};
const pauseGame = function () {
    console.log(field);
    document.removeEventListener('keyup', keyDownHandler);
    clearInterval(moveFunctionInterval);
    document.getElementById('message').style.display = 'block';
    document.getElementById('message').innerText = "Pause";

};

const resumeGame = function () {
    document.getElementById('message').style.display = 'none';
    document.addEventListener('keyup', keyDownHandler);
    moveFunctionInterval = setInterval(moveEnemies, 1000);
};

const lose = () => stopGame(false);

const win = () => stopGame(true);

const checkNeighbour = (neighbour, enemy) => {
    enemy && [1,11,12,13,14].includes(neighbour) ? lose() : null;
    !enemy && neighbour === 2 ? lose() : null;
};

const move = (keycode, activeField, enemy) => {
    if (keycode === 39) {
        if (field[activeField[0]][activeField[1] + 1] === 0) {
            activeField[1] = activeField[1] + 1
        } else {
            checkNeighbour(field[activeField[0]][activeField[1] + 1], enemy)
        }
    } else if (keycode === 37) {
        if (field[activeField[0]][activeField[1] - 1] === 0) {
            activeField[1] = activeField[1] - 1
        } else {

            checkNeighbour(field[activeField[0]][activeField[1] - 1], enemy)
        }
    }
    if (keycode === 40) {

        if (field[activeField[0] + 1][activeField[1]] === 0) {
            activeField[0] = activeField[0] + 1;
        } else {
            checkNeighbour(field[activeField[0] + 1][activeField[1]], enemy)
        }
    } if (keycode === 38) {
        if (field[activeField[0] - 1][activeField[1]] === 0) {
            activeField[0] = activeField[0] - 1
        } else {
            checkNeighbour(field[activeField[0] - 1][activeField[1]], enemy)
        }
    }
    return activeField;
};

const moveBomberman = (keycode) => {
    console.log(getActiveField());
    let lastActive = [...getActiveField()];
    let activeFiled = move(keycode, getActiveField(), false);
    if (field[lastActive[0]][lastActive[1]] === 4) field[lastActive[0]][lastActive[1]] = 3;
    else field[lastActive[0]][lastActive[1]] = 0;
    field[activeFiled[0]][activeFiled[1]] = directions[keycode];
    updateView(renderView(field));
};

const moveTo = () => [39, 37, 40, 38][Math.floor(Math.random() * 4)];

const moveEnemies = () => {
    console.log(field);
    for (const enemy of getEnemies(field)) {
        let lastActive = [...enemy];
        let activeFiled = move(moveTo(), enemy, true);
        field[lastActive[0]][lastActive[1]] = 0;
        field[activeFiled[0]][activeFiled[1]] = 2;
        updateView(renderView(field));
    }

};

const destroy = (active) => {
    if (field[active[0] + 1][active[1]] !== -2) {
        field[active[0] + 1][active[1]] = 0
    }
    if (field[active[0] - 1][active[1]] !== -2) {
        field[active[0] - 1][active[1]] = 0
    }
    if (field[active[0]][active[1] + 1] !== -2) {
        field[active[0]][active[1] + 1] = 0
    }
    if (field[active[0]][active[1] - 1] !== -2) {
        field[active[0]][active[1] - 1] = 0
    }
    field[active[0]][active[1]] = 0;
    updateView(renderView(field));
    console.log(checkDoor());
    console.log(getField(2).length < 1);
    !getActiveField() ? lose():null;
    checkWin()
};
const showDoor = () =>{
    field[doorIndex[0]][doorIndex[1]] = 51;
    updateView(renderView(field));
    return true;
};

const checkDoor = () => field[doorIndex[0]][doorIndex[1]] === 0 || field[doorIndex[0]][doorIndex[1]] === 51
    ? showDoor() : null;
const checkWin = () => checkDoor() && getField(2).length < 1 ? win(): null;

const setBomb = () => {
    let active = [...getActiveField()];
    field[active[0]][active[1]] = 4;
    updateView(renderView(field));
    setTimeout(destroy, 2000, active);
};

const keyDownHandler = (event) =>{
    console.log(event.keyCode);
    console.log([37,38,39,40].includes(event.keyCode));
    if (event.keyCode === 32) {
        setBomb()
    }else if ([37,38,39,40].includes(event.keyCode)){
        moveBomberman(event.keyCode)
    }
};

const randomIndex = (lst) => lst[Math.floor(Math.random() * lst.length)];

const getBricks = () => getField(-1);

const setDoor = () => {
    let index = randomIndex(getBricks());
    field[index[0]][index[1]] = 5;
};
const keyListener = function (){
    switch (event.keyCode) {
        case 49: pauseGame(); break;
        case 50: resumeGame(); break;
        case 82: window.location.reload(); break
    }
};

let field = generateField(size);
setDoor();
let doorIndex = getDoor();
document.addEventListener('keyup', keyDownHandler, false);
document.addEventListener('keyup', keyListener, false);
updateView(renderView(field));
let moveFunctionInterval = setInterval(moveEnemies, 1000);

