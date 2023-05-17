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

function getCart() {
  getCart = localStorage.getItem("cart");
  console.log(getCart);
  if (getCart === null) {
    return [];
  } else {
    return JSON.parse(getCart);
  }
}
getCart();

//Add to cart function//

const colorChoice = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");

let addToCart = document.querySelector("#addToCart");
addToCart.addEventListener("click", function () {
  let cart = getCart;
  let items = new Object();
  items.id = "id";
  items.color = colorChoice.value;
  items.quantity = parseInt(quantityChoice.value);
  let sameItems = false;
  for (let object of "cart") {
    if (object.id == items.id && object.color == items.color) {
      object.quantity >= items.quantity;
      sameItems = true;
    }
    if ((sameItems = false)) {
      cart.push(items);
    }
    localStorage.setItem(cart, JSON.stringify(items));
    if (confirm("Article ajouté au panier"));
  }
});
