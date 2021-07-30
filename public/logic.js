num1 = document.getElementById("num1");
num2 = document.getElementById("num2");
answer = document.getElementById("answer");
minput = document.getElementById("inputans");
points = document.getElementById("points");
var score = 0;
var min = 100;
var max = 999;
var operationCode = 'addition';
newnumber();
var tablelen = 5;
randomTableAdd(tablelen);

function getrandomnum(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function setopration(t) {
    operationCode = t.innerHTML;
    document.getElementById('1').innerHTML = t.innerHTML;
    document.getElementById('dropdownId1').innerHTML = t.innerHTML;
    randomTableAdd(tablelen);

}
var tabledifficulty = document.getElementById('tabledifficulty');
tabledifficulty.addEventListener('change', function() {
    var difficultyname = document.getElementById('difficultyname');
    if (tabledifficulty.value == 1) {
        difficultyname.innerText = 'kid';
        min = 1;
        max = 9;
    } else if (tabledifficulty.value == 2) {
        difficultyname.innerText = 'noob';
        min = 10;
        max = 99;
    } else if (tabledifficulty.value == 3) {
        difficultyname.innerText = 'average';
        min = 100;
        max = 999;
    } else if (tabledifficulty.value == 4) {
        difficultyname.innerText = 'above avg';
        min = 1000;
        max = 9999;
    } else if (tabledifficulty.value == 5) {
        difficultyname.innerText = 'difficult';
        min = 10000;
        max = 99999;
    } else {
        difficultyname.innerText = 'extreme';
        min = 100000;
        max = 999999;
    }
});

function operation(col, row) {
    if (operationCode == 'addition') {
        return (row + col);
    } else if (operationCode == 'subtraction') {
        return (row - col);

    } else if (operationCode == 'multiplication') {
        return (row * col);

    } else if (operationCode == 'division') {
        return (row / col);

    } else if (operationCode == 'remainder') {
        return (row % col);

    } else if (operationCode == 'power') {
        return (row ** col);

    } else {
        return (0);
    }
}

function newnumber() {
    num1.value = getrandomnum(min, max);
    num2.value = getrandomnum(min, max);
    num1.innerHTML = num1.value;
    num2.innerHTML = num2.value;
}
minput.addEventListener("keyup", function(event) {
    if (minput.value != "" && minput.value.trim() !== "") {
        if (event.keyCode === 13) {
            event.preventDefault();
            ans = operation(num1.value, num2.value);
            if (minput.value == ans) {
                minput.classList.add("greenout");
                minput.classList.remove("redout");
                score += 1;
                points.innerHTML = score;
                newnumber();
                minput.value = "";
            } else {
                minput.classList.add("redout");
                minput.classList.remove("greenout");
                // answer.innerHTML = ans;
            }
        }
    }
});

function randomTableAdd(len) {
    if (operationCode == 'addition' || operationCode == 'subtraction') {
        for (let i = 2; i < (len * 2); i++) {
            var ele = document.getElementById(i);
            val = getrandomnum(min, max);
            ele.value = val;
            ele.innerHTML = val;
        }
    } else if (operationCode == 'multiplication') {
        for (let i = 2; i < (len * 2); i++) {
            var ele = document.getElementById(i);
            val = getrandomnum(min, max);
            ele.value = val;
            ele.innerHTML = val;
        }

    } else if (operationCode == 'division' || operationCode == 'remainder') {
        for (let i = 2; i <= len; i++) {
            var ele = document.getElementById(i);
            val = getrandomnum(min / 100, max / 10);
            ele.value = val;
            ele.innerHTML = val;
        }
        for (let i = len + 1; i < (len * 2); i++) {
            var ele = document.getElementById(i);
            val = getrandomnum(min, max);
            ele.value = val;
            ele.innerHTML = val;
        }

    } else if (operationCode == 'power') {
        for (let i = 2; i <= len; i++) {
            var ele = document.getElementById(i);
            val = getrandomnum(2, 10);
            ele.value = val;
            ele.innerHTML = val;
        }
        for (let i = len + 1; i < (len * 2); i++) {
            var ele = document.getElementById(i);
            val = getrandomnum(min / 10, max / 10);
            ele.value = val;
            ele.innerHTML = val;
        }

    } else {
        return (0);
    }

    for (let i = (len * 2); i <= (len * len); i++) {
        var ele = document.getElementById(i);
        ele.classList.remove("bg-danger");
        ele.classList.remove("bg-success");
        ele.value = "";
    }
}

function getParent(eleid) {
    var x, y = 0;
    x = (eleid - (tablelen * 2 - 1)) % (tablelen - 1)
    if (x == 0) {
        x = tablelen - 1;
    }
    x += 1;
    y = Math.ceil((eleid - (tablelen * 2 - 1)) / (tablelen - 1));
    y += tablelen;
    return ([x, y]);
}

function navigateCell(ele, input) {
    input.addEventListener("keydown", function(event) {
        if (event.keyCode === 37) {
            event.preventDefault();
            document.getElementById(ele.id - 1).focus();
        } else if (event.keyCode === 39) {
            try {
                document.getElementById(parseInt(ele.id) + 1).focus();
            } catch (error) {}
        } else if (event.keyCode === 38) {
            document.getElementById(ele.id - (tablelen - 1)).focus();
        } else if (event.keyCode === 40) {
            try {
                document.getElementById(parseInt(ele.id) + (tablelen - 1)).focus();
            } catch (error) {}
        }
    });
}

function checkTable() {
    for (let i = tablelen * 2; i <= (tablelen * tablelen); i++) {
        var ele = document.getElementById(i);
        if (ele.value != "" && ele.value.trim() !== "") {
            var val = getParent(i);
            const valx = document.getElementById(val[0]);
            const valy = document.getElementById(val[1]);
            ans = operation(valx.value, valy.value);
            if (ele.value == ans) {
                ele.classList.add("bg-success");
                ele.classList.remove("bg-danger");
            } else {
                ele.classList.add("bg-danger");
                ele.classList.remove("bg-success");

            }
        }
    }
}

function clrTable() {
    for (let i = tablelen * 2; i <= (tablelen * tablelen); i++) {
        var ele = document.getElementById(i);
        ele.classList.remove("bg-danger");
        ele.classList.remove("bg-success");
        ele.value = '';
    }
}

function getIdandCheck(ele) {
    input = document.getElementById(ele.id);
    var next = parseInt(ele.id) + 1;
    navigateCell(ele, input);
    input.addEventListener("keyup", function(event) {
        if (input.value != "" && input.value.trim() !== "") {
            if (event.keyCode === 13) {
                event.preventDefault();
                var val = getParent(ele.id);
                const valx = document.getElementById(val[0]);
                const valy = document.getElementById(val[1]);
                ans = valx.value + valy.value;
                if (input.value == ans) {
                    // input.classList.add("bg-success");
                    input.classList.remove("bg-danger");
                    if (next > (tablelen * tablelen)) {
                        document.getElementById("randbtn").focus();
                    } else {
                        document.getElementById(next).focus();
                    }
                } else {
                    input.classList.add("bg-danger");
                    // input.classList.remove("bg-success");

                }
            }
        }
    });
}