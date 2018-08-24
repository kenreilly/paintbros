import { Palette } from './palette.js';
class PaintBros {
    static build_pallette() {
        Palette.forEach(color => {
            let el = document.createElement('div');
            el.dataset.color = color;
            el.style.backgroundColor = '#' + color;
            PaintBros.pallette_el.appendChild(el);
        });
    }
    static init() {
        PaintBros.pallette_el = document.querySelector('.palette');
        PaintBros.build_pallette();
        // Paintbros.canvas = document.querySelector('canvas')
        // Paintbros.ctx = Paintbros.canvas.getContext('2d')
        // let imagedata = Paintbros.ctx.createImageData(32, 32)
        // let data = imagedata.data
        // for (var i = 0, ii = data.length; i != ii; i += 4) {
        //     data[i + 3] = 255
        //     data[i + 2] = data[i + 1] = data[i] = !(i % 8) ? 255 : 0
        //     console.log(data[i])
        // }
        // Paintbros.ctx.putImageData(imagedata, 20, 20)
        // Paintbros.ctx.fillRect(10, 10, 10, 10)
        // let ix = Paintbros.ctx.getImageData(10, 10, 10, 10)
        // Paintbros.ctx.putImageData(ix, 25, 25)
        // Paintbros.ctx.putImageData(ix, 25, 25)
        // Paintbros.ctx.putImageData(ix, 25, 25)
    }
}
PaintBros.init();
