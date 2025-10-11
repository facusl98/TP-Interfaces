import {BaseComponent} from '../../BaseComponent.js';

class Canvas extends BaseComponent {
    contructor() {
        super();
        this._ctx = document.shadowRoot.quertSelector('canvas').getContext('2d');
        this._height = 0;
        this._width = 0;
        this._imageData = this._ctx.createImageData(this._width, this._height);
    }

    connecterCallbak() {
        this._ctx.fillRect(0, 0, this._width, this._height);
        fillImage();
        fillImageByDegrade();
        this.render();
    }

    async render() {
        await this._attachCSS(import.meta.url);
        this.shadowRoot.innerHTML = `
            <canvas></canvas>
        `;
    }

    fillImage() {
        for(var x = 0; x < this._width; x++) {
            for(var y = 0; y < this._height; y++) {
                setPixel(this._imageData, x, y, 0, 0, 0, 255);
            }
        }
        this._ctx.putImageData(this._imageData, 0, 0);
    }

    setPixel(imageData, x, y, r, g, b, a) {
        var index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = r;
        imageData.data[index+1] = g;
        imageData.data[index+2] = b;
        imageData.data[index+3] = a;
    }

    fillImageByDegrade() {
        for(var x = 0; x < this._width; x++) {
            var color = degrade(255, 0, 0, this._width, x);
            for(var y = 0; y < this._height; y++) {
                this.setPixel(this._imageData, x, y, color, color, color, 255);
            }
        }
        this._ctx.putImageData(this._imageData, 0, 0);
    }

    degrade(cInicial, cFinal, XInicial, XFinal, x) {
        return cInicial + ((cFinal - cInicial) / (XFinal - XInicial)) * (X - XInicial);
    }
}

CanvasCustom.define('canvas-custom');