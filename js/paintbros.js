const canvas_size = 32

class PaintBros {

    static get canvas_size() { return 32 }

    canvas

    canvas_ref

    onclick_pixel = (ev) => {

        
    }

    constructor() {

        this.canvas = document.querySelector('main')
        var pixel_base = document.createElement('div')

        for (var i = 0, ii = this.canvas_size ^ 2; i != ii; ++i) {

                var pixel = clone pixel_base
                pixel.dataset.row = Math.floor(i)
                pixel.dataset.col = j
                pixel.onclick = PB.onclick_pixel

                line.appendChild(pixel)
                ref.push(pixel)
            }

            this.canvas.appendChild(line)
            this.canvas_ref.push(ref)
        }
    }
}

document.onload = () => { return new PaintBros() }