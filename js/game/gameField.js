class GameField {
    #privateBackImgCounter
    constructor() {
        this.#privateBackImgCounter
    }

    GetPrivateBackImgCounter() { return this.#privateBackImgCounter }

    // изменяю размер игрового поля в соответствии с экраном игрока
    SetCanvasSize(canvas) {
        canvas.width = window.innerWidth % 10 ? (Math.floor(window.innerWidth / 10) * 10) : window.innerWidth;
        // canvas.height = window.innerHeight % 10 ? (Math.floor(window.innerHeight / 10) * 10) : window.innerHeight;
        this.#privateBackImgCounter = Math.ceil(canvas.width / 220) + 1
    }

    draw(ctx, canvas, index, img,imgbg, speed) {
        let posY = canvas.height - 220
        let offsetImg = 0


        // * координата по оси Х фонового изображения
        const backgroudX = -((index * speed) % 220);


        const bgSource = {
            x: 0,
            y: 0,
            width: 220,
            height: 220,
        };

        const bgResult = {
            x: backgroudX + canvas.width,
            y: posY - 98,
            width: 220,
            height: 220,
        };

        // const bgSourceGround = {
        //     x: 300,
        //     y: 0,
        //     width: 200,
        //     height: 100,
        // };
        // const bgResultGround = {
        //     x: backgroudX + canvas.width,
        //     y: canvas.height -100,
        //     width: 220,
        //     height: 100,
        // };

        const bgSourceBlue = {
            x: 0,
            y: 0,
            width: 200,
            height: 100,
        };
        const bgResultBlue = {
            x: backgroudX + canvas.width,
            y: 0,
            width: 220,
            height: canvas.height - 100,
        };



        for (let index = 0; index < this.#privateBackImgCounter; index++) {
            ctx.drawImage(
                imgbg,
                bgSourceBlue.x,
                bgSourceBlue.y,
                bgSourceBlue.width,
                bgSourceBlue.height,
    
                bgResultBlue.x - offsetImg,
                bgResultBlue.y,
                bgResultBlue.width,
                bgResultBlue.height
            );

            // ctx.drawImage(
            //     img,
            //     bgSourceGround.x,
            //     bgSourceGround.y,
            //     bgSourceGround.width,
            //     bgSourceGround.height,
    
            //     bgResultGround.x - offsetImg,
            //     bgResultGround.y,
            //     bgResultGround.width,
            //     bgResultGround.height
            // );
            ctx.drawImage(
                img,

                bgSource.x,
                bgSource.y,
                bgSource.width,
                bgSource.height,

                bgResult.x - offsetImg,
                bgResult.y,
                bgResult.width,
                bgResult.height
            );

            offsetImg += 220
        }
    }




}


export default GameField;