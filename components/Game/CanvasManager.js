
export class CanvasManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    createImageData(w, h) {
        this.height = h;
        this.width = w;
        this.imageData = this.ctx.createImageData(w, h);
    }

    putImageData(x, y) {
        this.ctx.putImageData(this.imageData, x, y);
    }

    getCtx() {
        return this.ctx
    }

    fillImage(w, h) {
        const image = this.ctx.createImageData(w, h);
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
        for(var x = 0; x < this.width; x++) {
            var color = degrade(255, 0, 0, this.width, x);
            for(var y = 0; y < this.height; y++) {
                this.setPixel(this.imageData, x, y, color, color, color, 255);
            }
        }
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    degrade(cInicial, cFinal, XInicial, XFinal, x) {
        return cInicial + ((cFinal - cInicial) / (XFinal - XInicial)) * (x - XInicial);
    }

    drawRoundedRect(x, y, w, h, r) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.lineTo(x + w - r, y);
        this.ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        this.ctx.lineTo(x + w, y + h - r);
        this.ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this.ctx.lineTo(x + r, y + h);
        this.ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        this.ctx.lineTo(x, y + r);
        this.ctx.quadraticCurveTo(x, y, x + r, y);
        this.ctx.closePath();
    }

    getRed(x, y) {
        let i = (x * y * this.imageData.width) * 4;
        return this.imageData.data[i + 0]
    }

    getGreen(x, y) {
        let i = (x * y * this.imageData.width) * 4;
        return this.imageData.data[i + 1]
    }

    getBlue(x, y) {
        let i = (x * y * this.imageData.width) * 4;
        return this.imageData.data[i + 2]
    }
}