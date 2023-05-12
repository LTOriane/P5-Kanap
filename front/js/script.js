//Fetch API//

async function productFetch() {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  console.log(data);

  //DOM integration//

  let sectionItems = document.getElementById("items");

  for (i = 0; i < data.length; i++) {
    var section = document.createElement("a");
    var article = document.createElement("article");
    var productsImage = document.createElement("img");
    var productsName = document.createElement("h3");
    var productsDescription = document.createElement("p");

    section.href = "./product.html?id=" + data[i]._id;

    productsImage.src = data[i].imageUrl;
    productsImage.setAttribute("alt", data[i].altTxt);

    productsName.setAttribute("class", "productName");
    productsName.textContent = data[i].name;

    productsDescription.setAttribute("class", "productDescription");
    productsDescription.textContent = data[i].description;

    article.appendChild(productsImage);
    article.appendChild(productsName);
    article.appendChild(productsDescription);
    section.appendChild(article);
    sectionItems.appendChild(section);
  }
}

productFetch();
