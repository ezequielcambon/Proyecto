//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
currentProductsArray= resultObj.data.articles;           
            showProductsList(currentProductsArray);
        }
    });
});
currentProductsArray = [];
function showProductsList(currentProductsArray){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let products = currentProductsArray[i];

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.src + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name +`</h4>
                        </div>
                        <input class="form-control" value="`+ products.count +`"onchange="cambiarTotal(this.value,` + products.unitCost +`)" type="number" id="cant-prod">
                        <h5 class="mb-1">` + products.currency + ` ` + products.unitCost +`</h5>
                        <h5 id="total" class="mb-1">Total:` + products.currency + ` ` + products.unitCost*products.count +`</h5>
                    </div>
                </div>
            </div>
            `
        
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;  
    }
}

function cambiarTotal(cantidad, precioUnidad){
    let total=cantidad*precioUnidad
    document.getElementById("total").innerText="Total:" + total
}
