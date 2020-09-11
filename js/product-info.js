
var category = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComentsList(array) {
    let htmlContentToAppend = "";  
    for (let i = 0; i < array.length; i++) {
        let coment = array[i];
        let numeroEstrellas = coment.score;
        htmlContentToAppend += `
    <hr class="my-3">
    <div>
    <span><b>Puntuación:`+ cantidadEstrellas(numeroEstrellas) + `</span></b>
    <p id="nombreUsuario"><b>Usuario:</b> `+ coment.user + `</p>
    <p>`+ coment.description + `</p>
    <p>`+ `Se publicó el ` + coment.dateTime + `</p>
    </div>
    `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;

    }

}

function cantidadEstrellas(num){
    let estrellas;
    if(num === 1){
        estrellas ='<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
    }else if (num === 2){
        estrellas = '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
    }else if (num === 3){
        estrellas='<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
    }else if (num === 4){
        estrellas='<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>'
    }else if (num === 5){
        estrellas='<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
    }else{
      estrellas ='<span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>'
    }
    return estrellas;
  }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            category = resultObj.data;

            let categoryNameHTML = document.getElementById("productName");
            let categoryDescriptionHTML = document.getElementById("productDescription");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productCategoryHTML = document.getElementById("productCategory");

            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCurrencyHTML.innerHTML = category.currency + " " + category.cost;
            productCategoryHTML.innerHTML = category.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentArray = resultObj.data;
            showComentsList(comentArray);


        }

    });
});
