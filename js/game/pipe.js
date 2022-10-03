class Pipe {
    #privateSize
    #privatePosY
    #privatePosX
    constructor() {
        this.#privateSize = [54, 405];
        this.#privatePosX
        this.#privatePosY = -100
    }

    setPrivatePosX(v) { this.#privatePosX = v }
    setPrivatePosY(){this.#privatePosY = Math.floor(Math.random() * this.#privateSize[1]) - this.#privateSize[1]}
    getPrivatePosX() { return this.#privatePosX }
    getPrivatePosY() { return this.#privatePosY }

    getPrivateSize() { return this.#privateSize }


    draw(ctx, canvas, index, img, speed) {
        const gap = 150
        // изображение pipe источник
        const pipeUPSource = {
            x: 555,
            y: 0,
            width: this.#privateSize[0],
            height: this.#privateSize[1],
        };

        // координаты, по которым птица
        // будет расположена на Canvas
        const pipeUPResult = {
            x: this.#privatePosX,
            y: this.#privatePosY,
            width: this.#privateSize[0],
            height: this.#privateSize[1],
        };



        const pipeBottomSource = {
            x: 500,
            y: 0,
            width: this.#privateSize[0],
            height: this.#privateSize[1],
        };

        // координаты, по которым птица
        // будет расположена на Canvas
        const pipeBottomResult = {
            x: this.#privatePosX - 3,
            y: this.#privateSize[1] + this.#privatePosY + gap,
            width: this.#privateSize[0],
            height: this.#privateSize[1],
        };



        ctx.drawImage(
            img,

            pipeUPSource.x,
            pipeUPSource.y,
            pipeUPSource.width,
            pipeUPSource.height,

            pipeUPResult.x,
            pipeUPResult.y,
            pipeUPResult.width,
            pipeUPResult.height
        );

        ctx.drawImage(
            img,

            pipeBottomSource.x,
            pipeBottomSource.y,
            pipeBottomSource.width,
            pipeBottomSource.height,

            pipeBottomResult.x,
            pipeBottomResult.y,
            pipeBottomResult.width,
            pipeBottomResult.height
        );
        this.#privatePosX --

    }



}



export default Pipe