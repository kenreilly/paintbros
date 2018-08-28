import { Editor } from './editor.js';
export class File {
    static load() {
    }
    static trigger_download(name, blob) {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.download = name + '.json';
        a.click();
    }
    static save(name, type) {
        if (type == 'BMP')
            return alert('not yet implemented');
        let image_data = Editor.image_data;
        let json = JSON.stringify(Object.assign({ name: name }, image_data));
        let blob = new Blob([json], { type: "octet/stream" });
        File.trigger_download(name, blob);
    }
}
