export class Modal {
    show() {
        this.container.classList.remove('hidden');
        this.dialog.classList.remove('hidden');
    }
    hide() {
        this.container.classList.add('hidden');
        this.dialog.classList.add('hidden');
    }
    querySelector(selector) {
        return this.dialog.querySelector(selector);
    }
    constructor(name) {
        this.container = document.querySelector('.modal-container');
        this.dialog = document.querySelector('.modal[name=' + name + ']');
    }
}
