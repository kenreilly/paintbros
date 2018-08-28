import { Editor } from './editor.js';
export class File {
    static on_load(reader) {
        Editor.load_image(JSON.parse(reader.result.toString()));
    }
    static load(file) {
        let reader = new FileReader();
        reader.onload = File.on_load.bind(null, reader);
        reader.readAsText(file);
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
