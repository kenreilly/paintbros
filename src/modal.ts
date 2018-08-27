export class Modal {

    private container: HTMLElement;

    private dialog: HTMLElement;

    public show() { 

        this.container.classList.remove('hidden')
        this.dialog.classList.remove('hidden') 
    }

    public hide() {

        this.container.classList.add('hidden')
        this.dialog.classList.add('hidden') 
    }

    protected querySelector(selector: string): HTMLElement {

        return this.dialog.querySelector(selector)
    }

    public constructor(name: string) {

        this.container = document.querySelector('.modal-container')
        this.dialog = document.querySelector('.modal[name=' + name + ']')
    }
}