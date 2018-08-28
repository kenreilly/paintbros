import { Colors } from './colors.js';
export class Palette {
    static get swatch_data() {
        let data = [Palette.current_color];
        let recent = Palette.recent_el.querySelectorAll('div');
        recent.forEach((item) => {
            debugger;
            data.push(item.dataset.color);
        });
        return data;
    }
    static load_swatch(data) {
        Palette.reset_swatch();
        Palette.current_color = data[0];
        Palette.current_el.appendChild(Palette.make_color_el(Palette.current_color));
        for (var i = 1, ii = data.length; i != ii; ++i) {
            Palette.recent_el.appendChild(Palette.make_color_el(data[i]));
        }
    }
    static init() {
        Palette.pallette_el = document.querySelector('.palette');
        Palette.current_el = document.querySelector('.current-color');
        Palette.recent_el = document.querySelector('.recent-colors');
        Colors.forEach(color => {
            let el = Palette.make_color_el(color);
            el.onclick = Palette.on_pick_color.bind(Palette, color);
            Palette.pallette_el.appendChild(el);
        });
    }
    static reset_swatch() {
        while (Palette.current_el.firstChild) {
            Palette.current_el.removeChild(Palette.current_el.firstChild);
        }
        while (Palette.recent_el.firstChild) {
            Palette.recent_el.removeChild(Palette.recent_el.firstChild);
        }
    }
    static init_swatch() {
        let el = Palette.make_color_el(Colors[0]);
        Palette.current_el.appendChild(el);
        Palette.current_color = Colors[0];
    }
    static make_color_el(color) {
        let el = document.createElement('div');
        el.dataset.color = color;
        el.style.backgroundColor = '#' + color;
        return el;
    }
    static on_pick_color(color) {
        if (Palette.current_el.firstChild.dataset.color == color)
            return;
        for (var i = 0, ii = Palette.recent_el.children.length; i != ii; ++i) {
            try {
                if (Palette.recent_el.children[i].dataset.color == color) {
                    Palette.recent_el.removeChild(Palette.recent_el.childNodes[i]);
                }
            }
            catch (ex) {
                break;
            }
        }
        let current = Palette.current_el.firstChild;
        let current_color = current.dataset.color;
        let next_recent_el = Palette.make_color_el(current_color);
        Palette.current_el.removeChild(current);
        Palette.current_el.appendChild(Palette.make_color_el(color));
        Palette.recent_el.insertBefore(next_recent_el, Palette.recent_el.firstChild);
        while (Palette.recent_el.children.length > 28) {
            var ln = Palette.recent_el.children.length;
            Palette.recent_el.removeChild(Palette.recent_el.childNodes[ln - 1]);
        }
        next_recent_el.onclick = Palette.on_pick_color.bind(Palette, current_color);
        Palette.current_color = color;
    }
}
