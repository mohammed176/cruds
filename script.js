let title = document.getElementById("title");
let price = document.getElementById("price");
let tax = document.getElementById("tax");
let adds = document.getElementById("adds");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let table = document.querySelector("tbody");
let search = document.getElementById("search");
let sCategory = document.getElementById("sCategory");
let tCategory = document.getElementById("tCategory");

let mode = "create"; 
let searchMode = "title";

let tmp; 

let products = localStorage.getItem("products") 
    ? JSON.parse(localStorage.getItem("products")) 
    : [];

function getTotal(){
    if(price.value !== ""){
        let result = (+price.value + +tax.value + +adds.value) - +discount.value;
        total.innerText = result;
    } else {
        total.innerText = 0;
        alert("Please enter a price");
        adds.value = ""
        tax.value = ""
        discount.value = ""
    }
    
}


function clearData(){
    title.value = "";
    price.value = "";
    tax.value = "";
    adds.value = "";
    discount.value = "";
    category.value = "";
    total.innerText = 0;
    count.value = 1;
    count.style.display = "block";
}


create.addEventListener("click", () => {
    let newProduct = {
        title: title.value,
        price: price.value,
        tax: tax.value,
        adds: adds.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value,
    };
    if(title.value != "" && price.value != "" && category.value != "" && count.value <= 100){
        if(mode === "create"){

            if (+newProduct.count > 1) {
                for (let x = 0; x < +newProduct.count; x++) {
                    products.push(newProduct);
                }
            } else {
                products.push(newProduct);
            }
        } else { 
            products[tmp] = newProduct;
            mode = "create";
            create.innerHTML = "Create";
            count.style.display = "block";
            clearData();
        }
    }
    

    localStorage.setItem("products", JSON.stringify(products));
    
    addData();
});


function addData(){
    let tableElements = "";
    for (let i = 0; i < products.length; i++) {
        tableElements += `
        <tr>
            <th>${i+1}</th>
            <th>${products[i].title}</th>
            <th>${products[i].price}</th>
            <th>${products[i].tax}</th>
            <th>${products[i].adds}</th>
            <th>${products[i].discount}</th>
            <th>${products[i].total}</th>
            <th>${products[i].category}</th>
            <th><button onclick="updateData(${i})">Update</button></th>
            <th><button onclick="deleteProduct(${i})">Delete</button></th>
        </tr>
        `;
    }
    table.innerHTML = tableElements;

    let btn_delete = document.getElementById("delete_all");
    if (products.length > 0) {
        btn_delete.innerHTML = `<button onclick="delete_all()">Delete All (${products.length})</button>`;
    } else {
        btn_delete.innerHTML = "";
    }
}

addData();

function deleteProduct(i){
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    addData();
}


function delete_all(){
    products = [];
    localStorage.setItem("products", JSON.stringify(products));
    addData();
}


function updateData(i){
    title.value = products[i].title;
    price.value = products[i].price;
    tax.value = products[i].tax;
    adds.value = products[i].adds;
    discount.value = products[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = products[i].category;
    create.innerHTML = "Update";
    mode = "update";
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

function getSearch(id) {
    if (id === "sTitle") {
        searchMode = "title";
    } else {
        searchMode = "category";
    }
    search.focus();
    search.setAttribute("placeholder",`search by ${searchMode}`);
    search.value = "";
    addData()
}

function searchData(value) {
    let tableElements = ""; 
    let searchValue = value.toLowerCase(); // حول قيمة البحث لأحرف صغيرة

    if (searchMode === "title") {
        for (let i = 0; i < products.length; i++) {
            if (products[i].title.toLowerCase().includes(searchValue)) { 
                tableElements += `
                <tr>
                    <th>${i + 1}</th>
                    <th>${products[i].title}</th>
                    <th>${products[i].price}</th>
                    <th>${products[i].tax}</th>
                    <th>${products[i].adds}</th>
                    <th>${products[i].discount}</th>
                    <th>${products[i].total}</th>
                    <th>${products[i].category}</th>
                    <th><button onclick="updateData(${i})">Update</button></th>
                    <th><button onclick="deleteProduct(${i})">Delete</button></th>
                </tr>
                `;
            }
        }
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].category.toLowerCase().includes(searchValue)) { 
                tableElements += `
                <tr>
                    <th>${i + 1}</th>
                    <th>${products[i].title}</th>
                    <th>${products[i].price}</th>
                    <th>${products[i].tax}</th>
                    <th>${products[i].adds}</th>
                    <th>${products[i].discount}</th>
                    <th>${products[i].total}</th>
                    <th>${products[i].category}</th>
                    <th><button onclick="updateData(${i})">Update</button></th>
                    <th><button onclick="deleteProduct(${i})">Delete</button></th>
                </tr>
                `;
            }
        }
    }

    table.innerHTML = tableElements;
}

