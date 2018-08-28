import { ImageSize } from './types.js'
import { Config } from './config.js'

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

interface DialogFields {
    [name: string]: HTMLInputElement | HTMLSelectElement
}

export class NewFileDialog extends Modal {

    public fields: DialogFields = { 
        height: null,
        width: null
    }

    public on_request_new_image: Function = (dimensions: ImageSize) => {}

    private on_click_ok() {
        
        let dimensions = {
            height: parseInt(this.fields.height.value),
            width: parseInt(this.fields.width.value)
        }

        this.on_request_new_image(dimensions)
        this.hide()
    }

    private on_click_cancel() {

        this.reset_fields()
        this.hide()
    }

    private reset_fields() {

        this.fields.height.value = Config.default_size.height.toString()
        this.fields.width.value = Config.default_size.width.toString()
    }

    constructor() {

        super('new_file')

        let ok_button = <HTMLButtonElement>this.querySelector('button[name=ok]')
        let cancel_button = <HTMLButtonElement>this.querySelector('button[name=cancel]')
        
        ok_button.onclick = this.on_click_ok.bind(this)
        cancel_button.onclick = this.on_click_cancel.bind(this)

        this.fields.height = <HTMLInputElement>this.querySelector('input[name=height]')
        this.fields.width = <HTMLInputElement>this.querySelector('input[name=width]')
        
        this.reset_fields()
    }
}

export class SaveFileDialog extends Modal {

    public fields: DialogFields = { 
        name: null,
        type: null
    }

    public on_request_save: Function = (name: string, type: string) => {}

    private reset_fields() {

        this.fields.name.value = "new_image"
    }

    private on_click_ok() {

        this.on_request_save(this.fields.name.value, this.fields.type.value)
        this.hide()
    }

    private on_click_cancel() {

        this.reset_fields()
        this.hide()
    }

    constructor() {
        
        super('save_file')

        let ok_button = <HTMLButtonElement>this.querySelector('button[name=ok]')
        let cancel_button = <HTMLButtonElement>this.querySelector('button[name=cancel]') 

        ok_button.onclick = this.on_click_ok.bind(this)
        cancel_button.onclick = this.on_click_cancel.bind(this)

        this.fields.name = <HTMLInputElement>this.querySelector('input[name=name]')
        this.fields.type = <HTMLInputElement>this.querySelector('select[name=type]')

        this.reset_fields()
    }
}