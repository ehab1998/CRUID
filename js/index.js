




var Regex = /^[A-Z][a-zA-Z]{3,6}$/;

var productNameInp = document.getElementById("productNameInp");
var currentIndex = 0;
var addBtn =document.getElementById('addBtn');


function validateProductName()
{
    if(  Regex.test(productNameInp.value) == false)
    {
      productNameInp.classList.add("is-invalid");
      productNameInp.classList.remove("is-valid");

      return false;
    }
    else
    {
      productNameInp.classList.add("is-valid");
      productNameInp.classList.remove("is-invalid");

      return true;

    } 
}
productNameInp.addEventListener("keyup" , validateProductName)


var productPriceInp = document.getElementById("productPriceInp");
var productCategoryInp = document.getElementById("productCategoryInp");
var productDescInp = document.getElementById("productDescInp");

var productsList ;//lma y3ml refresh hyfdaaa
if(localStorage.getItem("myProducts") == null )//zbon gdid malo4 7aga
    {
        productsList = [];
    }
else
    {
        productsList = JSON.parse( localStorage.getItem("myProducts") );
        displayProducts();
        //productList malyaan bel7aga bta3 embar7
    }

    addBtn.addEventListener('click',function(){
        if(addBtn.innerHTML == 'add')
        {
            addProduct();
        }
        else
        {
            saveProduct();
        }
    
    })


    function saveProduct()
    {
        var product =
        {
            name:productNameInp.value,
            price:productPriceInp.value,
            category:productCategoryInp.value,
            desc:productDescInp.value
        }
        productsList[currentIndex] = product;
        localStorage.setItem('myProducts',JSON.stringify(productsList));
        displayProducts();
        addBtn.innerHTML='add';
        clearForm();
    
    }
    


function addProduct() {

    if(validateProductName() == true)
    {
        var product =
        {
            name: productNameInp.value,
            price: productPriceInp.value,
            category: productCategoryInp.value,
            desc: productDescInp.value,
        }
        productsList.push(product);//product dllwa2y w products embar7 
        localStorage.setItem("myProducts" , JSON.stringify( productsList ) );
        displayProducts();
        clearForm();

    }
}

function displayProducts() {
    var cont = ``;

    for (var i = 0; i < productsList.length; i++) {
        cont += `<tr>
            <td>`+i+`</td>
            <td>` + productsList[i].name + `</td>
            <td>`+ productsList[i].price + `</td>
            <td>`+ productsList[i].category + `</td>
            <td>`+ productsList[i].desc + `</td>
            <td> <button class='btn btn-warning' onclick='updateProduct(`+i+`)'>update</button>
            <td><button onclick="deleteProduct(`+i+`)" class="btn btn-danger">delete</button></td>
            </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cont;
}

function clearForm() {
    productNameInp.value = "";
    productPriceInp.value = "";
    productDescInp.value = "";
    productCategoryInp.value = "";
}


// function searchProducts(term)
function searchProducts(term)
{
    var con='';
    var newText ='';
    for(var i=0; i<productsList.length;i++)
    {
        if(productsList[i].name.includes(term.trim()) == true)
        {
            
            newText=productsList[i].name.replace(term,`<span style='color:red;'>`+term+`</span>`);
            con+= `<p>`+ newText +`</p>`

        }
    }

    document.getElementById('searchResult').innerHTML = con ;

}

function deleteProduct(index)
{
    productsList.splice(index , 1);
    localStorage.setItem("myProducts" , JSON.stringify( productsList ) );
    displayProducts();
}


function updateProduct(index)
{
    currentIndex = index;
    productNameInp.value = productsList[index].name;
    productPriceInp.value = productsList[index].price;
    productCategoryInp.value = productsList[index].category;
    productDescInp.value = productsList[index].desc;
    
    addBtn.innerHTML ='update';
}

