



let tetris = document.createElement('div');
tetris.classList.add('tetris');

for(let i = 1; i < 181; i++) {
    let excel = document.createElement('div');
    excel.classList.add('excel');
    tetris.appendChild(excel);
};

let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris);

let excel = document.getElementsByClassName('excel');
let i = 0;

for(let y = 18; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
        excel[i].setAttribute('posX', x);                
        excel[i].setAttribute('posY', y); 
        i++;               
    }
};

let x = 5;
let y = 15;
let mainArr = [

    // прорисовываем фигуру - палка
    [
        [0, 1],
        [0, 2],
        [0, 3],
        // поворот на 90 градусов
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        // поворот на 180 градусов
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
        // поворот на 270 градусов
        [
            [-1, 1],
            [0, 0],
            [1, -1],
            [2, -2],
        ],
        // поворот на 360 градусов
        [
            [1, -1],
            [0, 0],
            [-1, 1],
            [-2, 2],
        ],
    ],

    // прорисовываем фигуру - квадрат
    [
        [1, 0],
        [0, 1],
        [1, 1],

        // поворот на 90 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        // поворот на 180 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        // поворот на 270 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        // поворот на 360 градусов
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
    ],

    // Буква L
    [
        [1, 0],
        [0, 1],
        [0, 2],

        // поворот на 90 градусов
        [
            [0, 0],
            [-1, 1],
            [1, 0],
            [2, -1]
        ],
        // поворот на 180 градусов
        [
            [1, -1],
            [1, -1],
            [-1, 0],
            [-1, 0]
        ],
        // поворот на 270 градусов
        [
            [-1, 0],
            [0, -1],
            [2, -2],
            [1, -1]
        ],
        // поворот на 360 градусов
        [
            [0, -1],
            [0, -1],
            [-2, 0],
            [-2, 0]
        ],
    ],

     // Зеракльная буква L
     [
        [1, 0],
        [1, 1],
        [1, 2],

        // поворот на 90 градусов
        [
            [0, 0],
            [0, 0],
            [1, -1],
            [-1, -1]
        ],
        // поворот на 180 градусов
        [
            [0, -1],
            [-1, 0],
            [-2, 1],
            [1, 0]
        ],
        // поворот на 270 градусов
        [
            [2, 0],
            [0, 0],
            [1, -1],
            [1, -1]
        ],
        // поворот на 360 градусов
        [
            [-2, 0],
            [1, -1],
            [0, 0],
            [-1, 1]
        ],
    ],

     // Молния вправо
     [
        [1, 0],
        [-1, 1],
        [0, 1],

        // поворот на 90 градусов
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, -0]
        ],
        // поворот на 180 градусов
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1]
        ],
        // поворот на 270 градусов
        [
            [0, -1],
            [-1, 0],
            [2, -1],
            [1, 0]
        ],
        // поворот на 360 градусов
        [
            [0, 0],
            [1, -1],
            [-2, 0],
            [-1, -1]
        ],
    ],

    // Молния влево
    [
        [1, 0],
        [1, 1],
        [2, 1],

        // поворот на 90 градусов
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0]
        ],
        // поворот на 180 градусов
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1]
        ],
        // поворот на 270 градусов
        [
            [2, -1],
            [0, 0],
            [1, -1],
            [-1, 0]
        ],
        // поворот на 360 градусов
        [
            [-2, 0],
            [0, -1],
            [-1, 0],
            [1, -1]
        ],
    ],

    // Деталь Лего
    [
        [1, 0],
        [2, 0],
        [1, 1],

        // поворот на 90 градусов
        [
            [1, -1],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        // поворот на 180 градусов
        [
            [0, 0],
            [-1, 0],
            [-1, 0],
            [1, -1]
        ],
        // поворот на 270 градусов
        [
            [1, -1],
            [1, -1],
            [1, -1],
            [0, 0]
        ],
        // поворот на 360 градусов
        [
            [-2, 0],
            [0, -1],
            [0, -1],
            [-1, -1]
        ],
    ],
];

let currentFigur = 0;
let figureBody = 0;
let rotate = 1; 

function create() {
    function getRandom() {
        return Math.round(Math.random() * (mainArr.length - 1));
    }
    rotate = 1;
    currentFigur = getRandom(); // даные, пришедшие из функции getRandom() заносим в переменную currentFigure

    figureBody = [
        document.querySelector(`[posX = "${x}"][posY = "${y}"]`), // Разбирпемся (получаем даные) с первым элементом фигуры
        document.querySelector(`[posX = "${x + mainArr[currentFigur][0][0]}"][posY = "${y + mainArr[currentFigur][0][1]}"]`), // Разбирпемся (получаем даные) со вторым элементом фигуры
        document.querySelector(`[posX = "${x + mainArr[currentFigur][1][0]}"][posY = "${y + mainArr[currentFigur][1][1]}"]`), // Разбирпемся (получаем даные) с третьим элементом фигуры
        document.querySelector(`[posX = "${x + mainArr[currentFigur][2][0]}"][posY = "${y + mainArr[currentFigur][2][1]}"]`), // Разбирпемся (получаем даные) с четвертым элементом фигуры
    ]
    for(let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add('figure');
    }
};
create();

let score = 0;
let input = document.getElementsByTagName('input')[0];
input.value = `Ваши очки: ${score}`;

// Прописываем логику падения фигур функция move
function move(){
    let moveFlag = true;
    let cordinates = [
        [figureBody[0].getAttribute('posX'), figureBody[0].getAttribute('posY')],
        [figureBody[1].getAttribute('posX'), figureBody[1].getAttribute('posY')],
        [figureBody[2].getAttribute('posX'), figureBody[2].getAttribute('posY')],
        [figureBody[3].getAttribute('posX'), figureBody[3].getAttribute('posY')],
    ];

// //Первое условие в цикле for (cordinates[i][1] == 1), который ниже этого коментария, обращаемся к фигуре и выуживаем(извлекаем) все атрибуты координат posX и posY. И если хоть один из 4 элементов имеет posY == 1, то мы останавливаем движение. Это означает, что наша фигура достигла дна нашего поля, ниже уже некуда.
// И второе условие - (document.querySelector(`[posX = "${cordinates[i][0]}"][posY = "${cordinates[i][1]} - 1"]`).classList.contains('set') - если ниже находится элемент с классом set, то есть уже упавшая фигура, то опять же, нам дальше двигаться некуда, падать некуда. Мы должны остановить движение и сгенерировать новую фигуру, чтобы она падала дальше в своем темпе

    for(let i =0; i < cordinates.length; i++) {
        if(cordinates[i][1] == 1 || document.querySelector(`[posX = "${cordinates[i][0]}"][posY = "${cordinates[i][1] - 1}"]`).classList.contains('set')) {
            moveFlag = false; // запрещаем фигуре двигаться вниз
            break;
        }
    };

    if(moveFlag) {
        for(let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
        }
        figureBody = [
            document.querySelector(`[posX = "${cordinates[0][0]}"][posY = "${cordinates[0][1] - 1}"]`),
            document.querySelector(`[posX = "${cordinates[1][0]}"][posY = "${cordinates[1][1] - 1}"]`),
            document.querySelector(`[posX = "${cordinates[2][0]}"][posY = "${cordinates[2][1] - 1}"]`),
            document.querySelector(`[posX = "${cordinates[3][0]}"][posY = "${cordinates[3][1] - 1}"]`),
        ];
        for(let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.add('figure');
        } 
    } else {
        for(let i = 0; i < figureBody.length; i++) {
            figureBody[i].classList.remove('figure');
            figureBody[i].classList.add('set');
        }
        for(let i = 1; i < 15; i++) {
            let count = 0;
            for(let k = 1; k < 11; k++) {
                if(document.querySelector(`[posX = "${k}"][posY = "${i}"]`).classList.contains('set')) {
                    count++;
                    if(count == 10) {
                        score += 10;
                        input.value = `Ваши очки: ${score}`;
                        for(let m = 1; m < 11; m++) {
                            document.querySelector(`[posX = "${m}"][posY = "${i}"]`).classList.remove('set');
                        }
                        let set = document.querySelectorAll('.set');
                        let newSet = [];
                        for(let s = 0; s < set.length; s++) {
                            let setCordinates = [set[s].getAttribute('posX'), set[s].getAttribute('posY')];
                            if(setCordinates[1] > i) {
                                set[s].classList.remove('set');
                                newSet.push(document.querySelector(`[posX = "${setCordinates[0]}"][posY = "${setCordinates[1] - 1}"]`));
                            }
                        }
                        for(let a = 0; a < newSet.length; a++) {
                            newSet[a].classList.add('set')
                        }
                        i--;
                    }
                }
            }
        }
        for(let n = 1; n < 11; n++) {
            if(document.querySelector(`[posX = "${n}"][posY = "15"]`).classList.contains('set')) {
                clearInterval(interval);
                alert(`Игра окончена. Ваши очки: ${score}`);
                break;
            }
        }
        create();
    }
};

// запускаем интервал, который будет повторять нашу функцию move каждые 300 милисекунд
let interval = setInterval(() => {
    move();
}, 500);

let flag = true;

// прописываем действия, которые будут происходить при нажатии клавиш влево и вправо

window.addEventListener('keydown', function (e) {
    let cordinates1 = [figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posY')];
    let cordinates2 = [figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posY')];
    let cordinates3 = [figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posY')];
    let cordinates4 = [figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posY')];

    // определяем новое положение фигуры в пространстве
    function getNewState(a) {

        flag = true;
        
        let figureNew = [
            document.querySelector(`[posX = "${+cordinates1[0] + a}"][posY = "${cordinates1[1]}"]`),
            document.querySelector(`[posX = "${+cordinates2[0] + a}"][posY = "${cordinates2[1]}"]`),
            document.querySelector(`[posX = "${+cordinates3[0] + a}"][posY = "${cordinates3[1]}"]`),
            document.querySelector(`[posX = "${+cordinates4[0] + a}"][posY = "${cordinates4[1]}"]`),
        ];
        for(let i = 0; i < figureNew.length; i++) {
            if(!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }
        if (flag == true) {
            for(let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }
            figureBody = figureNew;

            for(let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
        }
    }

    // прописываем логику, что произойдет при нажатии на ту или иную стрелку
    if(e.code == "ArrowLeft") {
        getNewState(-1); 
    } else if(e.code == "ArrowRight") {
        getNewState(1);
    } else if(e.code == "ArrowDown") {
        move();
    } else if(e.code == "ArrowUp") {
        flag = true;
        
        let figureNew = [
            document.querySelector(`[posX = "${+cordinates1[0] + mainArr[currentFigur][rotate + 2][0][0]}"][posY = "${+cordinates1[1] + mainArr[currentFigur][rotate + 2][0][1]}"]`),
            document.querySelector(`[posX = "${+cordinates2[0] + mainArr[currentFigur][rotate + 2][1][0]}"][posY = "${+cordinates2[1] + mainArr[currentFigur][rotate + 2][1][1]}"]`),
            document.querySelector(`[posX = "${+cordinates3[0] + mainArr[currentFigur][rotate + 2][2][0]}"][posY = "${+cordinates3[1] + mainArr[currentFigur][rotate + 2][2][1]}"]`),
            document.querySelector(`[posX = "${+cordinates4[0] + mainArr[currentFigur][rotate + 2][3][0]}"][posY = "${+cordinates4[1] + mainArr[currentFigur][rotate + 2][3][1]}"]`),
        ];
        for(let i = 0; i < figureNew.length; i++) {
            if(!figureNew[i] || figureNew[i].classList.contains('set')) {
                flag = false;
            }
        }
        if (flag == true) {
            for(let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.remove('figure');
            }
            figureBody = figureNew;

            for(let i = 0; i < figureBody.length; i++) {
                figureBody[i].classList.add('figure');
            }
            if(rotate < 4) {
                rotate++;
            } else {
                rotate = 1;
            }
        }
    }
    

});
