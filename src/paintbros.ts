import { NewFileDialog, SaveFileDialog, LoadFileDialog, HelpDialog, Modal } from './modals.js'
import { Palette } from './palette.js'
import { Tools } from './tools.js'
import { Editor } from './editor.js'
import { File } from './file.js'

class PaintBros {
  
    private static new_file_dialog: NewFileDialog

    private static save_file_dialog: SaveFileDialog

    private static load_file_dialog: LoadFileDialog

    private static help_dialog: HelpDialog

    public static init_command_buttons() {

        let new_button = <HTMLButtonElement>document.querySelector('.commands > button[name=new]')
        let save_button = <HTMLButtonElement>document.querySelector('.commands > button[name=save]')
        let load_button = <HTMLButtonElement>document.querySelector('.commands > button[name=load]')
        let help_button = <HTMLButtonElement>document.querySelector('.commands > button[name=help]')
        
        new_button.onclick = () => { PaintBros.new_file_dialog.show() }
        save_button.onclick = () => { PaintBros.save_file_dialog.show() }
        load_button.onclick = () => { PaintBros.load_file_dialog.show() }
        help_button.onclick = () => { PaintBros.help_dialog.show() }
    }
    
    public static init() {
 
        PaintBros.new_file_dialog = new NewFileDialog()
        PaintBros.new_file_dialog.on_request_new_image = Editor.new_image

        PaintBros.save_file_dialog = new SaveFileDialog()
        PaintBros.save_file_dialog.on_request_save = File.save

        PaintBros.load_file_dialog = new LoadFileDialog()
        PaintBros.load_file_dialog.on_request_load = File.load

        PaintBros.help_dialog = new HelpDialog()

        PaintBros.init_command_buttons()
        Palette.init()
        Editor.init()
        Tools.init()
    }
}

PaintBros.init()