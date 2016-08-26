"use strict";

class Jsweled {
    constructor(HTMLCanvasElement) {
        this.canvas = HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.lastTimestamp = 0;
        this.deltaTime = 0;
        this.imageSrcs = new Map([
            ["tile_even", "tile_even.png"],
            ["tile_odd", "tile_odd.png"],
            ["gem01", "gem01.png"],
            ["gem02", "gem02.png"],
            ["gem03", "gem03.png"],
            ["gem04", "gem04.png"],
            ["gem05", "gem05.png"],
            ["gem06", "gem06.png"],
            ["gem07", "gem07.png"],
            ["cursor", "cursor.png"]
        ]);
        this.images = new Map;

        this.loadImages();
    }

    loadImages() {
        let imagesToLoad = this.imageSrcs.size;
        this.imageSrcs.forEach((v, k) => {
            let image = new Image();
            image.onload = () => {
                imagesToLoad--;
                if (!imagesToLoad) {
                    this.animationFrame(0);
                }
            };
            image.src = v;
            this.images.set(k, image);
        });
    }

    drawOnTile(x, y, image) {
        this.ctx.drawImage(this.images.get(image), x * 64, y * 64);
    }

    drawBoard() {
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                this.drawOnTile(x, y, (x + y) % 2 === 0 ? "tile_odd" : "tile_even");
            }
        }
    }

    animationFrame(timestamp) {
        window.requestAnimationFrame(this.animationFrame.bind(this));
        this.updateDeltaTime(timestamp);
        this.drawBoard();

    }

    updateDeltaTime(timestamp) {
        this.deltaTime = (timestamp - this.lastTimestamp) / (1000 / 60);
        this.lastTimestamp = timestamp;
    }
}