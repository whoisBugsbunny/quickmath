num1 = document.getElementById("num1");
num2 = document.getElementById("num2");
answer = document.getElementById("answer");
input = document.getElementById("inputans");
points = document.getElementById("points");
var score = 0;
newnumber();

function getrandomnum(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function newnumber() {
    num1.value = getrandomnum(100, 999);
    num2.value = getrandomnum(100, 999);
    num1.innerHTML = num1.value;
    num2.innerHTML = num2.value;
}
input.addEventListener("keyup", function(event) {
    if (input.value != "" && input.value.trim() !== "") {
        if (event.keyCode === 13) {
            event.preventDefault();
            ans = num1.value + num2.value;
            if (input.value == ans) {
                input.classList.add("greenout");
                input.classList.remove("redout");
                score += 1;
                points.innerHTML = score;
                newnumber();
                input.value = "";
            } else {
                input.classList.add("redout");
                input.classList.remove("greenout");
                // answer.innerHTML = ans;
            }
        }
    }
});