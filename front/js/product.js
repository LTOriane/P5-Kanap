//Find the product's id into the URL//

let str = window.location.href;
let url = new URL(str);
let searchParams = url.searchParams.get("id");
console.log(searchParams);

//Loading product datas form API//

async function productFetch() {
  const response = await fetch(
    "http://localhost:3000/api/products/" + searchParams
  );
  const data = await response.json();
  console.log(data);

  //Link products to the DOM//

  const productsImageCreation = document.createElement("img");
  const productsImage = document.querySelector(".item__img");
  const productsName = document.querySelector("#title");
  const productsPrice = document.querySelector("#price");
  const productsDescription = document.querySelector("#description");
  const productsColor = document.querySelector("#colors");

  productsImage.appendChild(productsImageCreation);

  // Link datas' product to the DOM//

  productsImageCreation.src = data.imageUrl;
  productsImageCreation.setAttribute("alt", data.altTxt);
  productsName.textContent = data.name;
  productsPrice.textContent = data.price;
  productsDescription.textContent = data.description;

  //Color values//
  let color = data.colors;
  for (let i = 0; i < color.length; i++) {
    listColors = document.createElement("option");
    listColors.setAttribute("value", color[i]);
    listColors.textContent = color[i];
    productsColor.appendChild(listColors);
  }
}

productFetch();

//Get items from the local Storage//

const getCart = () => JSON.parse(localStorage.getItem("items") ?? "[]");

//Add to cart function//

const colorChoice = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");

let addToCart = document.querySelector("#addToCart");
addToCart.addEventListener("click", function () {
  const newItem = {
    id: searchParams,
    color: colorChoice.value,
    quantity: quantityChoice.value,
  };
  const newCart = [...getCart(), newItem];
  localStorage.setItem("items", JSON.stringify(newCart));

  // window.location.href = "../html/cart.html";
});
