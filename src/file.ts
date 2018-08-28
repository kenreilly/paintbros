import { Editor } from './editor.js'

export class File {

    public static load() {

    }

    private static trigger_download(name: string, blob: Blob) {
        
        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        
        a.href = url
        a.target = '_blank'
        a.download = name + '.json'
        a.click()
    }

    public static save(name: string, type: string) {

        if (type == 'BMP') return alert('not yet implemented')

        let image_data = Editor.image_data        
        let json = JSON.stringify({ name: name, ...image_data })
        let blob = new Blob([json], {type: "octet/stream"})
        File.trigger_download(name, blob)
    }
}