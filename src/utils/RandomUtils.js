class RandomUtils {
    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; // max is exclusive, min is inclusive
    }

    static getRandomElement(arr) {
        if (!Array.isArray(arr)) return null;
        return arr[this.getRandomInt(0, arr.length)];
    }
}

module.exports = RandomUtils;