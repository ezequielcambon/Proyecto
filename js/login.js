//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});



let botonLogin = document.getElementById('btnlogin');

botonLogin.addEventListener('click', inicioSesion);


function inicioSesion(){

    var user = document.getElementById("login").value;
    var pass = document.getElementById("password").value;
    if(user == "" || pass  == ""){
        document.getElementById("mensaje").innerHTML ="Por favor complete todos los campos";
        sessionStorage.setItem("login","noestalogueado");
    }
    else{

        document.getElementById("mensaje").innerHTML ="";
        sessionStorage.setItem("login", "estalogueado");
        sessionStorage.setItem("user", user);
        document.location.href = "index.html";
    }
}


 