class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}

const musicList = [
    new Music("Mockingbird", "Eminem", "1.jpg", "1.mp3"),
    new Music("Calm Down", "Selena Gomez", "2.jpg", "2.mp3"),
    new Music("Another Love", "Tom Odell", "3.jpg", "3.mp3"),
];
