//Find the id into the URL//

var str = window.location.href;
var url = new URL(str);
var searchParams = url.searchParams.get("id");
console.log(searchParams);

//Loading product datas//

async function productFetch() {
  const response = await fetch(
    "http://localhost:3000/api/products/" + searchParams
  );
  const data = await response.json();
  console.log(data);

  //Link products to the DOM//

  let productsImageCreation = document.createElement("img");
  let productsImage = document.querySelector(".item__img");
  let productsName = document.querySelector("#title");
  let productsPrice = document.querySelector("#price");
  let productsDescription = document.querySelector("#description");
  let productsColor = document.querySelector("#colors");

  productsImage.appendChild(productsImageCreation);

  // Link datas to the DOM//

  productsImageCreation.src = data.imageUrl;
  productsImageCreation.setAttribute("alt", data.altTxt);
  productsName.textContent = data.name;
  productsPrice.textContent = data.price;
  productsDescription.textContent = data.description;

  //Color values//

  for (let i = 0; i < data.colors.lenght; i++) {
    console.log(i);
    let color = document.createElement("option");
    color.setAttribute("value", data[i].colors);
    color.innerHTML = data[i].colors;
    productsColor.appendChild(color);
  }
}

productFetch();
