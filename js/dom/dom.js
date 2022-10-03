// класс для работы с DOM
// экземпляр класса используется в GameControl
class DOMControl {
    #privateMain
    #privateCanvas
    constructor() {
        this.#privateMain
        this.#privateCanvas

    }


    setPrivateMain() { this.#privateMain = document.querySelector(".main") }
    GetPrivateMain() { return this.#privateMain }

    setPrivateCanvas() { this.#privateCanvas = document.querySelector(".canvas") }
    GetPrivateCanvas() { return this.#privateCanvas }
    

}


export default DOMControl;