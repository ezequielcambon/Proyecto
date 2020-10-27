//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

infoMissing = false;
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.articles;
            showProductsList(currentProductsArray);
        }
    });

});
currentProductsArray = [];
function showProductsList(currentProductsArray) {
    let htmlContentToAppend = "";
    let htmlContentToAppendEnvio = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let products = currentProductsArray[i];
        currentName = products.name;
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.src + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name + `</h4>
                        </div>
                        <input class="form-control" value="`+ products.count + `"onchange="cambiarTotal(this.value,` + products.unitCost + `)" type="number" id="cant-prod">
                        <h5 class="mb-1">` + products.currency + ` ` + products.unitCost + `</h5>
                        <h5 id="total" class="mb-1">Total:` + products.currency + ` ` + products.unitCost * products.count + `</h5>
                    </div>
                </div>
            </div>
            `
        htmlContentToAppendEnvio = `<div>
            <h2>Tipo de envío</h2>
            </br>
            <input type="radio" id="r15" name="RadioEnvio" value="15" onchange="totalEnvio( this.value,`+ products.unitCost * products.count + `)"> 
            <label for="r15">Premium 2 a 5 días(15%)</label>
            </br>
            <input type="radio" id="r7" name="RadioEnvio" value="7" onchange="totalEnvio( this.value,`+ products.unitCost * products.count + `)"> 
            <label for="r7">Express 5 a 8 días(7%)</label>
            </br>
            <input type="radio" id="r5" name="RadioEnvio" value="5" onchange="totalEnvio( this.value,`+ products.unitCost * products.count + `)"> 
            <label for="r5">Standar 12 a 15 días(5%)</label>  
            </br>  
            </div>`
        htmlContentToAppendEnvioTotal = `<div id= "total-mas-envio"></div>`
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        document.getElementById("total-envio").innerHTML = htmlContentToAppendEnvioTotal;
        document.getElementById("tipo-envio").innerHTML = htmlContentToAppendEnvio;

    }
}

function validar(id) {
    let calle = document.getElementById("calle");
    let numeroDir = document.getElementById("numeroDir");


    if (id == "calle") {
        if (calle.value == "") {
            calle.classList.add('is-invalid');
            infoMissing = true;
        } else {
            calle.classList.remove('is-invalid');
        }
    }
    if (id == "numeroDir") {
        if (numeroDir.value == "") {
            numeroDir.classList.add('is-invalid');
            infoMissing = true;
        } else {
            numeroDir.classList.remove('is-invalid');
        }
    }

}


function cambiarTotal(cantidad, precioUnidad) {

    if (cantidad > 0) {
        let subtotal = cantidad * precioUnidad;
        currentProductsArray[0].count = cantidad;
        document.getElementById("total").innerText = "Total:" + subtotal;
        var porcentajes = document.getElementsByName("RadioEnvio");
        for (let i = 0; i < porcentajes.length; i++) {
            if (porcentajes[i].checked) {
                totalEnvio(porcentajes[i].value, subtotal);
            }
        }
    } else {
        let cantProd = document.getElementById("cant-prod");
        cantProd.classList.add('is-invalid');
    }

}

function totalEnvio(porcentaje, total) {
    total = currentProductsArray[0].unitCost * currentProductsArray[0].count;
    let valorEnvio = (total * porcentaje) / 100
    let totales = total + valorEnvio
    document.getElementById("total-mas-envio").innerText = "Total con envio incluido:" + totales
}
