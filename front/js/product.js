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

// function getProductsDetail() {
//   const productsDetail = productFetch();
//   console.log(productsDetail);

//   //Link products to the DOM//

// getProductsDetail();

//Get items from the local Storage//

const cartItems = JSON.parse(localStorage.getItem("items") ?? "[]");

//Selector for color and quantity//

const colorChoice = document.querySelector("#colors");
const quantityChoice = document.querySelector("#quantity");

//Eventlistener click//
let button = document.querySelector("#addToCart");
button.addEventListener("click", addToCart);

//Add to cart function//

function addToCart() {
  //Error message if quantity or color isn't right//
  if (
    colorChoice.value == null ||
    colorChoice.value == "" ||
    quantityChoice.value == null ||
    quantityChoice.value < 1 ||
    quantityChoice.valuelue > 100
  ) {
    alert("veuillez selectionner une couleur et/ou une quantité");
    return;
  }

  //New item creation to add to the local storage//
  const newItem = {
    id: searchParams,
    color: colorChoice.value,
    quantity: parseInt(quantityChoice.value),
  };
  //console.log(newItem);
  //console.log("items", cartItems);

  if (!cartItems.length) {
    const newCart = [...cartItems, newItem];
    localStorage.setItem("items", JSON.stringify(newCart));
  } else {
    cartItems.forEach((item) => {
      console.log("newItem", newItem);
      console.log("item", item);
      if (
        newItem.id !== item.id ||
        (newItem.id === item.id && newItem.color !== item.color)
      ) {
        const newCart = [...cartItems, newItem];
        localStorage.setItem("items", JSON.stringify(newCart));
      } else {
        item.quantity = parseInt(item.quantity) + parseInt(newItem.quantity);
        const newCart = [...cartItems];
        localStorage.setItem("items", JSON.stringify(newCart));
      }
    });
  }
  window.location.href = "../html/cart.html";
}
