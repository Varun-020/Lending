module.exports.generateOTP = () => {
    var add = 1, max = 12 - add;
    let n = 6
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}