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
    field[1][1] = 1;
    field[1][2] = 0;
    field[1][3] = 0;
    field[2][1] = 0;
    field[3][1] = 0;
    return field;
};

const getCellType = function (cell) {
    if (cell === -2) {
        return "border"
    } else if (cell === -1) {
        return "brick"
    } else if (cell === 0) {
        return "green"
    } else if (cell === 1) {
        return "active"
    } else if (cell === 2) {
        return "enemy"
    } else if (cell === 3) {
        return "bomb"
    } else if (cell === 4) {
        return "active bomb-man"
    }
};
const updateView = (elementString) => document.getElementById("game").innerHTML = elementString;
const renderView = field =>
    field.map((row) =>
        row.map((cell) =>
            `<div class="Cell Cell--${getCellType(cell)}"></div>`).join("")).join("");

function getActiveField() {
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === 1 || field[i][j] === 4) return [i, j]
        }
    }
}

function getEnemies(field) {
    let enemies = [];
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] === 2) enemies.push([i, j])
        }
    }
    return enemies;
}

function move(keycode, activeField) {
    if (keycode === 39) {
        if (field[activeField[0]][activeField[1] + 1] === 0) {
            activeField[1] = activeField[1] + 1
        }
    } else if (keycode === 37) {
        if (field[activeField[0]][activeField[1] - 1] === 0) {
            activeField[1] = activeField[1] - 1
        }
    }
    if (keycode === 40) {
        if (field[activeField[0] + 1][activeField[1]] === 0) {
            activeField[0] = activeField[0] + 1;
        }
    } else if (keycode === 38) {
        if (field[activeField[0] - 1][activeField[1]] === 0) {
            activeField[0] = activeField[0] - 1
        }
    }
    return activeField;
}

function moveBomberman(keycode) {
    let lastActive = [...getActiveField()];
    let activeFiled = move(keycode, getActiveField());
    if (field[lastActive[0]][lastActive[1]] === 4) field[lastActive[0]][lastActive[1]] = 3;
    else field[lastActive[0]][lastActive[1]] = 0;
    field[activeFiled[0]][activeFiled[1]] = 1;
    updateView(renderView(field));
}

function moveTo() {
    return [39, 37, 40, 38][Math.floor(Math.random() * 4)]
}

function moveEnemies() {
    for (const enemy of getEnemies(field)) {
        let lastActive = [...enemy];
        let activeFiled = move(moveTo(), enemy);
        field[lastActive[0]][lastActive[1]] = 0;
        field[activeFiled[0]][activeFiled[1]] = 2;
        updateView(renderView(field));
    }

}

function destroy(active) {
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
    // updateView(renderView(field))
}

function setBomb() {
    let active = [...getActiveField()];
    console.log(active);
    field[active[0]][active[1]] = 4;
    updateView(renderView(field));
    console.log(active);
    console.log(field);
    setTimeout(destroy, 2000, active);
    console.log(active);
}

function keyDownHandler(event) {
    if (event.keyCode === 32) setBomb();
    else moveBomberman(event.keyCode)
}

document.addEventListener('keyup', keyDownHandler, false);
document.addEventListener('keyup', keyDownHandler, false);

let field = generateField(21);
updateView(renderView(field));
setInterval(moveEnemies, 1000);