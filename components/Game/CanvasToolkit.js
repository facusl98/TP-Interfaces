
export class CanvasToolkit {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.filters = {
            "Black & White": (r, g, b, a) => {
                const gray = r * .299 + g * .587 + b * .114;
                return [
                    gray,
                    gray,
                    gray,
                    a
                ]
            },
            "Brightness": (r, g, b, a) => {
                const multiplier = .3; // > 1 to increase brightness. < to darken
                return [
                    Math.min(255, r * multiplier),
                    Math.min(255, g * multiplier),
                    Math.min(255, b * multiplier),
                    a
                ]
            },
            "Negative": (r, g, b, a) => {
                return [
                    255 - r,
                    255 - g,
                    255 - b,
                    a
                ]
            }, 
            "Sepia": (r, g, b, a) => {
                const sr = 0.393 * r + 0.769 * g + 0.189 * b
                const sg = 0.349 * r + 0.686 * g + 0.168 * b
                const sb = 0.272 * r + 0.534 * g + 0.131 * b
                return [sr, sg, sb, a]
            },
            "Posterize": (r, g, b, a) => {
                const levels = 4;
                const step = 256 / levels;
                const f = v => Math.min(255,
                    Math.floor(v / step) * step + (step / 2)
                );
                return [f(r), f(g), f(b), a];
            },
            "High Contrast": (r, g, b, a, contrast = 70) => {
                // Contrast = -100 to 100
                const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
                
                const cr = Math.min(255, Math.max(0, factor * (r - 128) + 128));
                const cg = Math.min(255, Math.max(0, factor * (g - 128) + 128));
                const cb = Math.min(255, Math.max(0, factor * (b - 128) + 128));

                return [cr, cg, cb, a];
            },
            "Low Contrast": (r, g, b, a) => {
                const pixel = this.filters["HIGHCONTRAST"](r, g, b, a, -90);
                return pixel;
            },
            "No Greens": (r, g, b, a) => {
                return [r, 0, b, a];
            },
            "Only Green": (r, g, b, a) => {
                return [0, g, 0, a]
            }, 
            "Low Opacity": (r, g, b, a) => {
                return [r, g, b, Math.floor(a / 2)]
            }
        }
    }

    getCtx() {
        return this.ctx
    }

    drawImageRounded(image, x, y, w, h, r) {
        this.ctx.save(); 
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, w, h, r); 
        this.ctx.clip(); 
        this.ctx.drawImage(image, x, y, w, h); 
        this.ctx.restore(); 
    }

    applyFilter(canvas, level) {
        const w = canvas.width, h = canvas.height;
        const filter = this.filters[Object.keys(this.filters)[level]];
        const copy = new OffscreenCanvas(w, h);
        const ctx = copy.getContext("2d");
        ctx.drawImage(canvas, 0, 0);
        const imageData = ctx.getImageData(0, 0, w, h);

        for(var x = 0; x < w; x++) {
           for(var y = 0; y < h; y++) {
                this.applyFilterPixel(imageData, x, y, filter);
            }
        }

        ctx.putImageData(imageData, 0, 0);
        return copy;
    }

    applyFilterPixel(imageData, x, y, filter) {
        const pixels = imageData.data;
        var index = (x + y * imageData.width) * 4;
        const r = pixels[index+0];
        const g = pixels[index+1];
        const b = pixels[index+2];
        const a = pixels[index+3];
        const newPixel = filter(r, g, b, a);
        pixels[index+0] = newPixel[0];
        pixels[index+1] = newPixel[1];
        pixels[index+2] = newPixel[2];
        pixels[index+3] = newPixel[3];
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