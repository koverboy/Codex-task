const fs = require('fs');
let input = toArr(fs.readFileSync('Codex-task/input.txt', 'utf-8'));
let output = [];
let height = 0;
let width = 0;
let color;
let list;

function outputRes() {
    if (input !== null && input[0] === "C") {
        input.forEach(function (item, index, arr) {
                let x1 = parseInt(arr[index + 1]);
                let x2 = parseInt(arr[index + 3]);
                let y1 = parseInt(arr[index + 2]);
                let y2 = parseInt(arr[index + 4]);

                switch (item) {
                    case "L": {
                        drawtoRight(x1, x2, y1, "x");
                        drawtoDown(y1, y2, x1, "x");
                    }

                        fs.appendFileSync("output.txt", convertOutput(output) + "\n");
                        break;
                    case
                    "C"
                    : {
                        var n = parseInt(arr[index + 1]) + 2, m = parseInt(arr[index + 2]) + 2;
                        width = n;
                        height = m;
                        for (var i = 0; i < m; i++) {
                            output[i] = [];
                            for (var j = 0; j < n; j++) {
                                output[i][j] = 0;
                            }
                        }
                        drawtoRight(0, n -2, 0, "-");
                        output[0][n - 1] = "\n";
                        drawtoDown(1, m - 1, 0, "|");
                        drawtoDown(1, m - 1, n - 1, "|" + "\n");
                        drawtoRight(0, n-1, m - 1, "-");
                        fs.appendFileSync("output.txt", convertOutput(output) + "\n");
                        break;
                    }


                    case
                    "B"
                    : {
                        color = arr[index + 3];
                        list = [y1, x1, y1, x1, y1, x1, y1, x1];
                        if (output[y1][x1] !== 0) {
                            return;
                        }

                        output[y1][x1] = color;
                        do {
                            fourVectorCheck(list[0], list[1] + 1);
                            fourVectorCheck(list[0] + 1, list[1]);
                            fourVectorCheck(list[0], list[1] - 1);
                            fourVectorCheck(list[0] - 1, list[1]);
                            list.shift();
                            list.shift();
                        }
                        while (list.length !== 0) ;

                        fs.appendFileSync("output.txt", convertOutput(output) + "\n");
                        break;
                    }

                    case
                    "R"
                    : {
                        drawtoRight(x1, x2, y1, "x");
                        drawtoRight(x1, x2, y2, "x");
                        drawtoDown(y1, y2, x1, "x");
                        drawtoDown(y1, y2, x2, "x");

                        fs.appendFileSync("output.txt", convertOutput(output) + "\n");
                        break;
                    }
                }
            }
        )
        ;
    }
}

outputRes();


function drawtoRight(begin, end, cnst, char) {
    for (var i = begin; i <= end; i++) {
        output[cnst][i] = char;
    }
}

function drawtoDown(begin, end, cnst, char) {
    for (var i = begin; i <= end; i++) {
        output[i][cnst] = char;
    }
}

function convertOutput(arr) {
    return arr.toString().replace(/,/g, "").replace(/0/g, " ");
}

function toArr(string) {
    return string.toString().replace(/\r?\n/g, " ").split(" ");

}

function fourVectorCheck(y, x) {
    if (output[y][x] === 0) {
        output[y][x] = color;
        list.push(y, x);
    }
}