import { ImageSize } from './types.js'
import { Config } from './config.js'

export abstract class Modal {

    private container: HTMLElement
    private dialog: HTMLElement
    public static visible_instance: Modal

    public static hide_listener = (e) => {

        document.onclick = (e) => {
            var target = <HTMLElement>event.target
            if (target.closest('.modal')) return
            Modal.hide()
        }
    }

    public show() { 

        Modal.visible_instance = this
        window.setTimeout(Modal.hide_listener, 200)

        this.container.classList.remove('hidden')
        this.dialog.classList.remove('hidden') 
    }

    public hide() {

        this.container.classList.add('hidden')
        this.dialog.classList.add('hidden') 
        document.onclick = () => {}
    }

    public static hide() {

        if (!this.visible_instance) return
        this.visible_instance.hide()
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

    public fields: DialogFields = {  height: null, width: null }

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


export class LoadFileDialog extends Modal {

    public fields: DialogFields = { 
        file: null        
    }

    public on_request_load: Function = (path: string) => {}

    private on_click_ok() {

        this.on_request_load((<any>this.fields.file).files[0])
        this.hide()
    }

    private on_click_cancel() {

        this.fields.file.value = null
        this.hide()
    }

    constructor() {
        
        super('load_file')

        let ok_button = <HTMLButtonElement>this.querySelector('button[name=ok]')
        let cancel_button = <HTMLButtonElement>this.querySelector('button[name=cancel]') 

        ok_button.onclick = this.on_click_ok.bind(this)
        cancel_button.onclick = this.on_click_cancel.bind(this)

        this.fields.file = <HTMLInputElement>this.querySelector('input[name=file]')
    }
}

export class HelpDialog extends Modal {

    constructor() {

        super('help')

        let ok_button = <HTMLButtonElement>this.querySelector('button[name=ok]')
        ok_button.onclick = this.hide.bind(this)
    }
}