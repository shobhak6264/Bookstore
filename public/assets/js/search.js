
let button = document.getElementsByClassName("btn-submit-filters");
console.log(button);
button.onclick = (x) => {
    console.log(x);
} ;


fetch("https://gwarflbvd2.execute-api.us-west-1.amazonaws.com/dev/whatismyip")
.then((k) => console.log(k));
