// function commencer() {
//     document.getElementById('localstorage').style.display = 'none';
//     document.getElementById('welcome').style.display = 'block';
// }

// verification du formulaire
function validation() {
    var login = document.forms["form"]["login"].value;
    var password = document.forms["form"]["password"].value;

    if (login === "") {
        alert("Login obligatoire");
        return false;
    } else if (login !== "snoussi") {
        alert("Login incorrect");
        return false;
    }

    if (password === "") {
        alert("Mot de passe obligatoire");
        return false;
    } else if (password !== "1234") {
        alert("Mot de passe incorrect");
        return false;
    }
}