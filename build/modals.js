import { Config } from './config.js';
export class Modal {
    constructor(name) {
        this.container = document.querySelector('.modal-container');
        this.dialog = document.querySelector('.modal[name=' + name + ']');
    }
    show() {
        Modal.visible_instance = this;
        window.setTimeout(Modal.hide_listener, 200);
        this.container.classList.remove('hidden');
        this.dialog.classList.remove('hidden');
    }
    hide() {
        this.container.classList.add('hidden');
        this.dialog.classList.add('hidden');
        document.onclick = () => { };
    }
    static hide() {
        if (!this.visible_instance)
            return;
        this.visible_instance.hide();
    }
    querySelector(selector) {
        return this.dialog.querySelector(selector);
    }
}
Modal.hide_listener = (e) => {
    document.onclick = (e) => {
        var target = event.target;
        if (target.closest('.modal'))
            return;
        Modal.hide();
    };
};
export class NewFileDialog extends Modal {
    constructor() {
        super('new_file');
        this.fields = {
            height: null,
            width: null
        };
        this.on_request_new_image = (dimensions) => { };
        let ok_button = this.querySelector('button[name=ok]');
        let cancel_button = this.querySelector('button[name=cancel]');
        ok_button.onclick = this.on_click_ok.bind(this);
        cancel_button.onclick = this.on_click_cancel.bind(this);
        this.fields.height = this.querySelector('input[name=height]');
        this.fields.width = this.querySelector('input[name=width]');
        this.reset_fields();
    }
    on_click_ok() {
        let dimensions = {
            height: parseInt(this.fields.height.value),
            width: parseInt(this.fields.width.value)
        };
        this.on_request_new_image(dimensions);
        this.hide();
    }
    on_click_cancel() {
        this.reset_fields();
        this.hide();
    }
    reset_fields() {
        this.fields.height.value = Config.default_size.height.toString();
        this.fields.width.value = Config.default_size.width.toString();
    }
}
export class SaveFileDialog extends Modal {
    constructor() {
        super('save_file');
        this.fields = {
            name: null,
            type: null
        };
        this.on_request_save = (name, type) => { };
        let ok_button = this.querySelector('button[name=ok]');
        let cancel_button = this.querySelector('button[name=cancel]');
        ok_button.onclick = this.on_click_ok.bind(this);
        cancel_button.onclick = this.on_click_cancel.bind(this);
        this.fields.name = this.querySelector('input[name=name]');
        this.fields.type = this.querySelector('select[name=type]');
        this.reset_fields();
    }
    reset_fields() {
        this.fields.name.value = "new_image";
    }
    on_click_ok() {
        this.on_request_save(this.fields.name.value, this.fields.type.value);
        this.hide();
    }
    on_click_cancel() {
        this.reset_fields();
        this.hide();
    }
}
export class LoadFileDialog extends Modal {
    constructor() {
        super('load_file');
        this.fields = {
            file: null
        };
        this.on_request_load = (path) => { };
        let ok_button = this.querySelector('button[name=ok]');
        let cancel_button = this.querySelector('button[name=cancel]');
        ok_button.onclick = this.on_click_ok.bind(this);
        cancel_button.onclick = this.on_click_cancel.bind(this);
        this.fields.file = this.querySelector('input[name=file]');
    }
    on_click_ok() {
        this.on_request_load(this.fields.file.files[0]);
        this.hide();
    }
    on_click_cancel() {
        this.fields.file.value = null;
        this.hide();
    }
}
export class HelpDialog extends Modal {
    constructor() {
        super('help');
        let ok_button = this.querySelector('button[name=ok]');
        ok_button.onclick = this.hide.bind(this);
    }
}
