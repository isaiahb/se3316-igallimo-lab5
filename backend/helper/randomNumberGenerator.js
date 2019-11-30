function randomNumberGenerator(digits=6) {
    var numbers = "";
    for (var i = 0; i < digits; i++) {
        var num = parseInt(Math.random() * 10) % 10;
        numbers += num;
    }
    return numbers;
};
module.exports = randomNumberGenerator;
