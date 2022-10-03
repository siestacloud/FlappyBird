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
    constructor() {
        this.#privateDOM
        this.#privateBird
        this.#privatePipes
        this.#privateGameField
        this.#privateBg
    }

    setPrivateBird(bird) { this.#privateBird = bird; }
    setPrivatePipes(pipes) { this.#privatePipes = pipes; }

    setPrivateDOM(dom) { this.#privateDOM = dom; }
    setPrivateGameField(canvas) { this.#privateGameField = canvas; }
    setPrivateBg(bg) { this.#privateBg = bg; }

    // запуск игры
    PublicStart() {


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
            let myReq;

            this.#privateBird.initFly()
            this.#privatePipes[0].setPrivatePosX(this.#privateDOM.GetPrivateCanvas().width)

            // ширина и высота птицы


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

                    // Отслеживание прикосновений
                    if (this.#privateBird.getPrivatePosX() + this.#privateBird.getPrivateSize()[0] >= this.#privatePipes[index].getPrivatePosX()
                        && this.#privateBird.getPrivatePosX() <= this.#privatePipes[index].getPrivatePosX() + this.#privatePipes[0].getPrivateSize()[0]
                        && (this.#privateBird.getPrivatePosY() <= this.#privatePipes[index].getPrivatePosY() + this.#privatePipes[0].getPrivateSize()[1]
                            || this.#privateBird.getPrivatePosY() + this.#privateBird.getPrivateSize()[1] >= this.#privatePipes[index].getPrivatePosY() + this.#privatePipes[0].getPrivateSize()[1] + 90) || this.#privateBird.getPrivatePosY() + this.#privateBird.getPrivateSize()[1] >= this.#privateDOM.GetPrivateCanvas().height - 100) {
                        // window.cancelAnimationFrame(myReq);

                        location.reload(); // Перезагрузка страницы

                    }
                }
                this.#privateBg.draw(ctx, this.#privateDOM.GetPrivateCanvas(), index, img, imgbg, SPEED, this.#privateGameField.GetPrivateBackImgCounter())

                // console.log("ok");
                // после завершения расчётов для текущего кадра
                // сразу запускаем выполнение расчётов для следующего 
                
                myReq = window.requestAnimationFrame(render);
            };

            // * как только изображение будет загружено,
            // * начнётся отрисовка анимаций
            img.onload = render;
            window.addEventListener("resize", () => {
                this.#privateGameField.SetCanvasSize(this.#privateDOM.GetPrivateCanvas())
                // остановка с использованием последнего requestId
                window.cancelAnimationFrame(myReq);
                render()
            });
        


        // document.addEventListener("click", callback)
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