import DOMControl from "./dom/dom.js";
import GameField from "./game/gameField.js";
import BackgroundBottom from "./game/bg.js";

import Bird from "./game/bird.js";
import Pipe from "./game/pipe.js";




class GameControl {
    #privateDOM
    #privateBird
    #privatePipes
    #privateGameField
    #privateBg
    #privateCurrentPoint
    #privateTopPoint
    constructor() {
        this.#privateDOM
        this.#privateBird
        this.#privatePipes
        this.#privateGameField
        this.#privateBg
        this.#privateCurrentPoint = 0
        this.#privateTopPoint = 0

    }

    setPrivateBird(bird) { this.#privateBird = bird; }
    setPrivatePipes(pipes) { this.#privatePipes = pipes; }

    setPrivateDOM(dom) { this.#privateDOM = dom; }
    setPrivateGameField(canvas) { this.#privateGameField = canvas; }
    setPrivateBg(bg) { this.#privateBg = bg; }

    // запуск игры
    PublicStart() {
        this.#privateLoadPoints()

        console.log("game start");
        this.#privateGameField.SetCanvasSize(this.#privateDOM.GetPrivateCanvas())
        const img = new Image();
        const imgbg = new Image();

        img.src = "img/sprite.png";
        imgbg.src = "img/back.png";

        const ctx = this.#privateDOM.GetPrivateCanvas().getContext("2d");



        // * константа для регулирования скорости анимации
        const SPEED = 1.8;
        // * переменная, необходимая для расчёта
        // * новых координат на каждом кадре
        let index = 0.2;
        let myReq, myReqBefore;
        let enable

        this.#privateBird.initFly()
        this.#privatePipes[0].setPrivatePosX(this.#privateDOM.GetPrivateCanvas().width)


        // * функция для отрисовки кадра
        const renderBefore = () => {
            index += 0.1;

            this.#privateGameField.draw(ctx, this.#privateDOM.GetPrivateCanvas(), index, img, imgbg, SPEED)



            this.#privateBg.draw(ctx, this.#privateDOM.GetPrivateCanvas(), index, img, imgbg, SPEED, this.#privateGameField.GetPrivateBackImgCounter())

            this.menu(ctx, index, SPEED, img)

            // console.log("ok");
            // после завершения расчётов для текущего кадра
            // сразу запускаем выполнение расчётов для следующего 

            myReqBefore = window.requestAnimationFrame(renderBefore);


        };


        // * как только изображение будет загружено,
        // * начнётся отрисовка анимаций
        img.onload = renderBefore;
        // renderBefore()
        // * функция для отрисовки кадра
        const render = () => {
            index += 0.1;

            this.#privateGameField.draw(ctx, this.#privateDOM.GetPrivateCanvas(), index, img, imgbg, SPEED)

            this.#privateBird.draw(ctx, this.#privateDOM.GetPrivateCanvas(), index, img)

            for (let index = 0; index < this.#privatePipes.length; index++) {
                this.#privatePipes[index].draw(ctx, this.#privateDOM.GetPrivateCanvas(), index, img)
                if (this.#privatePipes[index].getPrivatePosX() == this.#privateDOM.GetPrivateCanvas().width - 200) {
                    let pipe = new Pipe()
                    pipe.setPrivatePosX(this.#privateDOM.GetPrivateCanvas().width)
                    pipe.setPrivatePosY()

                    this.#privatePipes.push(pipe)
                }

                if (this.#privatePipes[index].getPrivatePosX() == Math.floor(this.#privateDOM.GetPrivateCanvas().width / 2)) {
                    this.#privateCurrentPoint = +this.#privateCurrentPoint + 1
                    this.#privateSaveCurrentPoints(this.#privateCurrentPoint)
                    console.log(this.#privateCurrentPoint);
                }


                // Отслеживание прикосновений
                if (this.#privateBird.getPrivatePosX() + this.#privateBird.getPrivateSize()[0] >= this.#privatePipes[index].getPrivatePosX()
                    && this.#privateBird.getPrivatePosX() <= this.#privatePipes[index].getPrivatePosX() + this.#privatePipes[0].getPrivateSize()[0]
                    && (this.#privateBird.getPrivatePosY() <= this.#privatePipes[index].getPrivatePosY() + this.#privatePipes[0].getPrivateSize()[1]
                        || this.#privateBird.getPrivatePosY() + this.#privateBird.getPrivateSize()[1] >= this.#privatePipes[index].getPrivatePosY() + this.#privatePipes[0].getPrivateSize()[1] + 150) || this.#privateBird.getPrivatePosY() + this.#privateBird.getPrivateSize()[1] >= this.#privateDOM.GetPrivateCanvas().height - 100) {

                    this.#privateCurrentPoint > this.#privateTopPoint ? this.#privateSavePoints(this.#privateCurrentPoint) : console.log();
                    location.reload(); // Перезагрузка страницы
                    // window.cancelAnimationFrame(myReq);
                    // ctx.clearRect(0, 0, this.#privateDOM.GetPrivateCanvas().width, this.#privateDOM.GetPrivateCanvas().height);




                }
            }
            this.#privateBg.draw(ctx, this.#privateDOM.GetPrivateCanvas(), index, img, imgbg, SPEED, this.#privateGameField.GetPrivateBackImgCounter())


            // console.log("ok");
            // после завершения расчётов для текущего кадра
            // сразу запускаем выполнение расчётов для следующего 

            if (enable) {
                myReq = window.requestAnimationFrame(render);

            }
        };

        window.addEventListener("resize", () => {
            this.#privateGameField.SetCanvasSize(this.#privateDOM.GetPrivateCanvas())
            // остановка с использованием последнего requestId
            window.cancelAnimationFrame(myReq);
            render()
        });

        let run = () => {
            enable = true
            this.#privateCurrentPoint = 0

            window.cancelAnimationFrame(myReqBefore);
            document.removeEventListener("click", run)

            render()
        }
        document.addEventListener("click", run)
    }

    menu(ctx, index, speed, img) {
        // * координата по оси Х фонового изображения
        const backgroudX = -((index * speed) % 220);

        const menuSource = {
            x: 0,
            y: 230,
            width: 174,
            height: 180,
        };
        const menuResult = {
            x: this.#privateDOM.GetPrivateCanvas().width / 2 - 180 / 2,
            y: 200,
            width: 160,
            height: 180,
        };

        const startBtn = {
            x: 250,
            y: 402,
            width: 100,
            height: 35,
        };

        const startBtnResult = {
            x: this.#privateDOM.GetPrivateCanvas().width / 2 - 180 / 2 + 40,
            y: 380,
            width: 100,
            height: 45,
        };

        const tableSource = {
            x: 177,
            y: 275,
            width: 228,
            height: 116,
        };

        const tableResult = {
            x: this.#privateDOM.GetPrivateCanvas().width / 2 - 180 / 2 - 30,
            y: 60,
            width: 228,
            height: 116,
        };


        ctx.drawImage(
            img,
            menuSource.x,
            menuSource.y,
            menuSource.width,
            menuSource.height,

            menuResult.x,
            menuResult.y,
            menuResult.width,
            menuResult.height
        );
        ctx.drawImage(
            img,
            startBtn.x,
            startBtn.y,
            startBtn.width,
            startBtn.height,

            startBtnResult.x,
            startBtnResult.y,
            startBtnResult.width,
            startBtnResult.height
        );

        ctx.drawImage(
            img,
            tableSource.x,
            tableSource.y,
            tableSource.width,
            tableSource.height,

            tableResult.x,
            tableResult.y,
            tableResult.width,
            tableResult.height
        );

        ctx.fillStyle = "#000";
        ctx.font = "24px Verdana";
        this.#privateLoadCurrentPoints()
        console.log("menu privateCurrentPoint  ", this.#privateCurrentPoint);
        ctx.fillText(this.#privateCurrentPoint, this.#privateDOM.GetPrivateCanvas().width / 2 - 180 / 2 + 148, 110);

        ctx.fillText(this.#privateTopPoint, this.#privateDOM.GetPrivateCanvas().width / 2 - 180 / 2 + 148, 155);
    }

    // Логика сохранения и лучшего результата из localStorage
    #privateSavePoints(v) {
        localStorage.setItem('topPoint', v);
    }
    #privateLoadPoints() {
        let storagePoints = localStorage.getItem('topPoint')
        console.log("TOP res ", storagePoints);
        storagePoints ? this.#privateTopPoint = storagePoints : this.#privateTopPoint = 0;
    }



    // Логика сохранения и лучшего результата из localStorage
    #privateSaveCurrentPoints(v) {
        localStorage.setItem('curPoint', v);
    }
    #privateLoadCurrentPoints() {
        let storagePoints = localStorage.getItem('curPoint')
        console.log("CUR res ", storagePoints);
        storagePoints ? this.#privateCurrentPoint = storagePoints : this.#privateCurrentPoint = 0;
    }


}




// InitGame Реализует функционал игры
function InitGame() {

    // Инициализация управляющего обьекта
    const domControl = new DOMControl()
    domControl.setPrivateMain()
    domControl.setPrivateCanvas()

    const gameField = new GameField()
    const bg = new BackgroundBottom()


    const bird = new Bird()

    const pipes = []
    const pipe = new Pipe()

    pipes[0] = pipe

    // Инициализация управляющего обьекта
    const game = new GameControl()

    game.setPrivateBird(bird)

    game.setPrivatePipes(pipes)

    game.setPrivateDOM(domControl)
    game.setPrivateGameField(gameField)
    game.setPrivateBg(bg)

    game.PublicStart()
}



document.addEventListener("DOMContentLoaded", InitGame)


export default GameControl;