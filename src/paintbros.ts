import { NewFileDialog, SaveFileDialog, LoadFileDialog } from './modals.js'
import { Palette } from './palette.js'
import { Tools } from './tools.js'
import { Editor } from './editor.js'
import { File } from './file.js'
class PaintBros {
  
    private static new_file_dialog: NewFileDialog

    private static save_file_dialog: SaveFileDialog

    private static load_file_dialog: LoadFileDialog

    public static init_command_buttons() {

        let new_button = <HTMLButtonElement>document.querySelector('.commands > button[name=new]')
        let save_button = <HTMLButtonElement>document.querySelector('.commands > button[name=save]')
        let load_button = <HTMLButtonElement>document.querySelector('.commands > button[name=load]')
        
        new_button.onclick = () => { PaintBros.new_file_dialog.show() }
        save_button.onclick = () => { PaintBros.save_file_dialog.show() }
        load_button.onclick = () => { PaintBros.load_file_dialog.show() }
    }
    
    public static init() {
 
        PaintBros.new_file_dialog = new NewFileDialog()
        PaintBros.new_file_dialog.on_request_new_image = Editor.new_image

        PaintBros.save_file_dialog = new SaveFileDialog()
        PaintBros.save_file_dialog.on_request_save = File.save

        PaintBros.load_file_dialog = new LoadFileDialog()
        PaintBros.load_file_dialog.on_request_load = File.load

        PaintBros.init_command_buttons()
        Palette.init()
        Editor.init()
        Tools.init()
    }
}

PaintBros.init()