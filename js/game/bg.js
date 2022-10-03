class BackgroundBottom {

    #privateBackImgCounter
    constructor() {
        this.#privateBackImgCounter
    }


    draw(ctx, canvas, index, img,imgbg, speed,counter) {
        let offsetImg = 0


        // * координата по оси Х фонового изображения
        const backgroudX = -((index * speed) % 220);

        const bgSourceGround = {
            x: 300,
            y: 0,
            width: 200,
            height: 100,
        };
        const bgResultGround = {
            x: backgroudX + canvas.width,
            y: canvas.height -100,
            width: 220,
            height: 100,
        };



        for (let index = 0; index < counter; index++) {

            ctx.drawImage(
                img,
                bgSourceGround.x,
                bgSourceGround.y,
                bgSourceGround.width,
                bgSourceGround.height,
    
                bgResultGround.x - offsetImg,
                bgResultGround.y,
                bgResultGround.width,
                bgResultGround.height
            );
            offsetImg += 220
        }
    }




}


export default BackgroundBottom;