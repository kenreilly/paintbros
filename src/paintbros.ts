import { NewFileDialog, SaveFileDialog } from './modals.js'
import { Palette } from './palette.js'
import { Tools } from './tools.js'
import { Editor } from './editor.js'
import { File } from './file.js'
class PaintBros {
  
    private static new_file_dialog: NewFileDialog

    private static save_file_dialog: SaveFileDialog

    public static init_command_buttons() {

        let new_button = <HTMLButtonElement>document.querySelector('.commands > button[name=new]')
        let save_button = <HTMLButtonElement>document.querySelector('.commands > button[name=save]')
        
        new_button.onclick = () => { PaintBros.new_file_dialog.show() }
        save_button.onclick = () => { PaintBros.save_file_dialog.show() }
    }
    
    public static init() {
 
        PaintBros.new_file_dialog = new NewFileDialog()
        PaintBros.new_file_dialog.on_request_new_image = Editor.new_image

        PaintBros.save_file_dialog = new SaveFileDialog()
        PaintBros.save_file_dialog.on_request_save = File.save

        PaintBros.init_command_buttons()
        Palette.init()
        Editor.init()
        Tools.init()
    }
}

PaintBros.init()