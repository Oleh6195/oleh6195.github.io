/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! exports provided: startGame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startGame\", function() { return startGame; });\nlet size = 12;\n\nconst directions = {38: 11, 39: 12, 40: 13, 37: 14};\nconst cellTypes = {\n    \"-2\": \"border\",\n    \"-1\": \"brick\",\n    0: \"green\",\n    1: \"active-bottom\",\n    11: \"active-top\",\n    12: \"active-right\",\n    13: \"active-bottom\",\n    14: \"active-left\",\n    2: \"enemy\",\n    21: \"enemy-top\",\n    22: \"enemy-right\",\n    23: \"enemy-bottom\",\n    24: \"enemy-left\",\n    3: \"bomb\",\n    4: \"active-bottom bomb-man\",\n    5: \"hidden-door\",\n    51: \"door\"\n};\n\nconst generateField = function (size) {\n    let field = [];\n    for (let i = 0; i < size; i++) {\n        let row = [];\n        for (let j = 0; j < size; j++) {\n            if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {\n                row.push(-2)\n            } else if (i % 2 === 0 && j % 2 === 0) {\n                row.push(-2)\n            } else {\n                row.push([-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2][Math.floor(Math.random() * 18)])\n            }\n        }\n        field.push(row)\n    }\n    field[1][1] = 13;\n    field[1][2] = 0;\n    field[1][3] = 0;\n    field[2][1] = 0;\n    field[3][1] = 0;\n    document.getElementById(\"game\").style.height = (size * 50).toString() + \"px\";\n    document.getElementById(\"game\").style.width = (size * 50).toString() + \"px\";\n    return field;\n};\n\nconst getCellType = (cell) => cellTypes[cell];\n\nconst updateView = (elementString) => document.getElementById(\"game\").innerHTML = elementString;\n\nconst renderView = field =>\n    field.map((row) =>\n        row.map((cell) =>\n            `<div class=\"Cell Cell--${getCellType(cell)}\"></div>`).join(\"\")).join(\"\");\n\nconst getField = (type) => {\n    let enemies = [];\n    for (let i = 0; i < field.length; i++) {\n        for (let j = 0; j < field[i].length; j++) {\n            if (field[i][j] === type) enemies.push([i, j])\n        }\n    }\n    if (type === 2) {\n        return enemies\n    }\n    return enemies.length > 1 ? enemies : enemies[0];\n};\nconst getActiveField = () => getField(1) || getField(4) || getField(11)\n    || getField(12) || getField(13) || getField(14);\n\nconst getEnemies = () => getField(2);\n\nconst getDoor = () => getField(5);\n\nconst stopGame = (win) => {\n    field[doorIndex[0]][doorIndex[1]] = 51;\n    updateView(renderView(field));\n    document.getElementById('message').style.display = 'block';\n    document.getElementById('message').innerText = win ? \"You Win!!!\" : \"You Lose((\";\n    document.removeEventListener('keyup', keyDownHandler);\n    clearInterval(moveFunctionInterval);\n};\nconst pauseGame = function (mess = true) {\n    console.log(field);\n    document.removeEventListener('keyup', keyDownHandler);\n    clearInterval(moveFunctionInterval);\n    mess ? document.getElementById('message').style.display = 'block' : null;\n    mess ? document.getElementById('message').innerText = \"Pause\" : null;\n\n};\n\nconst resumeGame = function () {\n    document.getElementById('message').style.display = 'none';\n    document.addEventListener('keyup', keyDownHandler);\n    moveFunctionInterval = setInterval(moveEnemies, 1000);\n};\n\nconst lose = () => stopGame(false);\n\nconst win = () => stopGame(true);\n\nconst checkNeighbour = (neighbour, enemy) => {\n    enemy && [1, 11, 12, 13, 14].includes(neighbour) ? lose() : null;\n    !enemy && neighbour === 2 ? lose() : null;\n};\n\nconst move = (keycode, activeField, enemy) => {\n    if (keycode === 39) {\n        if (field[activeField[0]][activeField[1] + 1] === 0) {\n            activeField[1] = activeField[1] + 1\n        } else {\n            checkNeighbour(field[activeField[0]][activeField[1] + 1], enemy)\n        }\n    } else if (keycode === 37) {\n        if (field[activeField[0]][activeField[1] - 1] === 0) {\n            activeField[1] = activeField[1] - 1\n        } else {\n\n            checkNeighbour(field[activeField[0]][activeField[1] - 1], enemy)\n        }\n    }\n    if (keycode === 40) {\n\n        if (field[activeField[0] + 1][activeField[1]] === 0) {\n            activeField[0] = activeField[0] + 1;\n        } else {\n            checkNeighbour(field[activeField[0] + 1][activeField[1]], enemy)\n        }\n    }\n    if (keycode === 38) {\n        if (field[activeField[0] - 1][activeField[1]] === 0) {\n            activeField[0] = activeField[0] - 1\n        } else {\n            checkNeighbour(field[activeField[0] - 1][activeField[1]], enemy)\n        }\n    }\n    return activeField;\n};\n\nconst moveBomberman = (keycode) => {\n    console.log(getActiveField());\n    let lastActive = [...getActiveField()];\n    let activeFiled = move(keycode, getActiveField(), false);\n    if (field[lastActive[0]][lastActive[1]] === 4) field[lastActive[0]][lastActive[1]] = 3;\n    else field[lastActive[0]][lastActive[1]] = 0;\n    field[activeFiled[0]][activeFiled[1]] = directions[keycode];\n    updateView(renderView(field));\n};\n\nconst moveTo = () => [39, 37, 40, 38][Math.floor(Math.random() * 4)];\n\nconst moveEnemies = () => {\n    console.log(field);\n    for (const enemy of getEnemies(field)) {\n        let lastActive = [...enemy];\n        let activeFiled = move(moveTo(), enemy, true);\n        field[lastActive[0]][lastActive[1]] = 0;\n        field[activeFiled[0]][activeFiled[1]] = 2;\n        updateView(renderView(field));\n    }\n\n};\n\nconst destroy = (active) => {\n    if (field[active[0] + 1][active[1]] !== -2) {\n        field[active[0] + 1][active[1]] = 0\n    }\n    if (field[active[0] - 1][active[1]] !== -2) {\n        field[active[0] - 1][active[1]] = 0\n    }\n    if (field[active[0]][active[1] + 1] !== -2) {\n        field[active[0]][active[1] + 1] = 0\n    }\n    if (field[active[0]][active[1] - 1] !== -2) {\n        field[active[0]][active[1] - 1] = 0\n    }\n    field[active[0]][active[1]] = 0;\n    updateView(renderView(field));\n    console.log(checkDoor());\n    console.log(getField(2).length < 1);\n    !getActiveField() ? lose() : null;\n    checkWin()\n};\nconst showDoor = () => {\n    field[doorIndex[0]][doorIndex[1]] = 51;\n    updateView(renderView(field));\n    return true;\n};\n\nconst checkDoor = () => field[doorIndex[0]][doorIndex[1]] === 0 || field[doorIndex[0]][doorIndex[1]] === 51\n    ? showDoor() : null;\nconst checkWin = () => checkDoor() && getField(2).length < 1 ? win() : null;\n\nconst setBomb = () => {\n    let active = [...getActiveField()];\n    field[active[0]][active[1]] = 4;\n    updateView(renderView(field));\n    setTimeout(destroy, 2000, active);\n};\n\nconst keyDownHandler = (event) => {\n    console.log(event.keyCode);\n    console.log([37, 38, 39, 40].includes(event.keyCode));\n    if (event.keyCode === 32) {\n        setBomb()\n    } else if ([37, 38, 39, 40].includes(event.keyCode)) {\n        moveBomberman(event.keyCode)\n    }\n};\n\nconst randomIndex = (lst) => lst[Math.floor(Math.random() * lst.length)];\n\nconst getBricks = () => getField(-1);\n\nconst setDoor = () => {\n    let index = randomIndex(getBricks());\n    field[index[0]][index[1]] = 5;\n};\nconst keyListener = function () {\n    switch (event.keyCode) {\n        case 49:\n            pauseGame();\n            break;\n        case 50:\n            resumeGame();\n            break;\n        case 82:\n            pauseGame();\n            startGame();\n            resumeGame();\n            break\n    }\n};\nlet doorIndex;\nlet moveFunctionInterval;\nlet field;\ndocument.getElementById('start').addEventListener('click', () => {\n    document.getElementById('game').style.visibility = 'visible';\n    document.getElementById('start').style.display = 'none';\n    document.body.style.background = '#394F64';\n    resumeGame()\n\n});\n\n\nconst startGame = function () {\n    field = generateField(size);\n    setDoor();\n    doorIndex = getDoor();\n    document.addEventListener('keyup', keyDownHandler, false);\n    document.addEventListener('keyup', keyListener, false);\n    document.addEventListener('keyup', keyDownHandler, false);\n    document.addEventListener('keyup', keyListener, false);\n    updateView(renderView(field));\n    moveFunctionInterval = setInterval(moveEnemies, 1000);\n    pauseGame(false);\n};\n\n\n//# sourceURL=webpack:///./js/game.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./js/game.js\");\n\r\n\r\nObject(_game__WEBPACK_IMPORTED_MODULE_0__[\"startGame\"])();\n\n//# sourceURL=webpack:///./js/index.js?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./js/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /Users/oleg/Desktop/web_comisia/js/index.js */\"./js/index.js\");\n\n\n//# sourceURL=webpack:///multi_./js/index.js?");

/***/ })

/******/ });