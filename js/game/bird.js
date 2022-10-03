class Bird {
    #privateSize
    #privatePosY
    #privatePosX
    constructor() {
        this.#privateSize = [35, 26];
        this.#privatePosY = 200
        this.#privatePosX = 100
    }

    getPrivateSize() { return this.#privateSize }
    getPrivatePosX() { return this.#privatePosX }
    getPrivatePosY() { return this.#privatePosY }

    draw(ctx, canvas, index, img, speed) {
        this.#privatePosX = canvas.width / 2 - this.#privateSize[0] / 2
        const graw = 2 
        // изображение птицы источник
        const birdSource = {
            x: 277,
            y: Math.floor((index % 9) / 3) * this.#privateSize[1] + 113,
            width: this.#privateSize[0],
            height: this.#privateSize[1],
        };

        // координаты, по которым птица
        // будет расположена на Canvas
        const birdResult = {
            x: this.#privatePosX,
            y: this.#privatePosY,
            width: this.#privateSize[0],
            height: this.#privateSize[1],
        };


        ctx.drawImage(
            img,

            birdSource.x,
            birdSource.y,
            birdSource.width,
            birdSource.height,

            birdResult.x + graw,
            birdResult.y,
            birdResult.width,
            birdResult.height
        );
            this.#privatePosY += graw
    }

    initFly(){
        let moveup = () => {this.#privatePosY -= 30   }
        document.addEventListener("keydown", moveup)
        document.addEventListener("click", moveup)

    }

    
}


export default Bird;