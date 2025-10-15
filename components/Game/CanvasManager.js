
export class CanvasManager {
    constructor(canvas) {
        this._canvas = canvas;
        this._ctx = canvas.getContext('2d');
    }

    createImageData(w, h) {
        this._height = h;
        this._width = w;
        this._imageData = this._ctx.createImageData(w, h);
    }

    putImageData(x, y) {
        this._ctx.putImageData(this._imageData, x, y);
    }

    getCtx() {
        return this._ctx
    }

    fillImage(w, h) {
        const image = this._ctx.createImageData(w, h);
        for(var x = 0; x < w; x++) {
            for(var y = 0; y < h; y++) {
                setPixel(image, x, y, 0, 0, 0, 255);
            }
        }
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
        return cInicial + ((cFinal - cInicial) / (XFinal - XInicial)) * (x - XInicial);
    }

    drawRoundedRect(x, y, w, h, r) {
        this._ctx.beginPath();
        this._ctx.moveTo(x + r, y);
        this._ctx.lineTo(x + w - r, y);
        this._ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        this._ctx.lineTo(x + w, y + h - r);
        this._ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this._ctx.lineTo(x + r, y + h);
        this._ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        this._ctx.lineTo(x, y + r);
        this._ctx.quadraticCurveTo(x, y, x + r, y);
        this._ctx.closePath();
    }

    getRed(x, y) {
        let i = (x * y * this._imageData.width) * 4;
        return this._imageData.data[i + 0]
    }

    getGreen(x, y) {
        let i = (x * y * this._imageData.width) * 4;
        return this._imageData.data[i + 1]
    }

    getBlue(x, y) {
        let i = (x * y * this._imageData.width) * 4;
        return this._imageData.data[i + 2]
    }
}