let nuevosDatos = {}
function guardarDatos(){
    primerNombre = document.getElementById("inputPnombre");
    segundoNombre = document.getElementById("inputSnombre");
    primerApellido = document.getElementById("inputPapellido");
    segundoApellido = document.getElementById("inputSapellido");
    email = document.getElementById("inputEmail");
    telefonoContacto = document.getElementById("inputTelefono");

     nuevosDatos = {
        primerNombre: primerNombre.value,
        segundoNombre: segundoNombre.value,
        primerApellido: primerApellido.value,
        segundoApellido: segundoApellido.value,
        email: email.value,
        telefonoContacto: telefonoContacto.value

    };
    localStorage.setItem("datosInput",JSON.stringify(nuevosDatos))


}

function ponerDatos(){
    if(localStorage.getItem("datosInput") !== null){
    datosGuardados = JSON.parse(localStorage.getItem("datosInput"));
    document.getElementById("inputPnombre").value = datosGuardados.primerNombre;
    document.getElementById("inputSnombre").value = datosGuardados.segundoNombre;
    document.getElementById("inputPapellido").value = datosGuardados.primerApellido;
    document.getElementById("inputSapellido").value = datosGuardados.segundoApellido;
    document.getElementById("inputEmail").value = datosGuardados.email;
    document.getElementById("inputTelefono").value = datosGuardados.telefonoContacto;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    ponerDatos();
});