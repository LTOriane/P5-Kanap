function getCartItems() {
  const cart = JSON.parse(localStorage.getItem("items") ?? "[]");
  return cart;
}

// HTML element creation //

function addCartPage() {
  const cartItems = getCartItems();
  const cartItemsElement = document.querySelector("#cart__items");

  cartItems.forEach((cartItem) => {
    console.log(cartItem);

    // Missing data recuperation from API //

    fetch("http://127.0.0.1:3000/api/products/" + cartItem.id)
      .then((rep) => rep.json())
      .then((data) => {
        const cartItemElement = document.createElement("article");
        cartItemElement.classList.add("cart__item");

        const cartItemImageElement = document.createElement("div");
        cartItemImageElement.classList.add("cart__item__img");
        const cartImageElement = document.createElement("img");
        cartImageElement.src = data.imageUrl;
        cartImageElement.setAttribute("alt", data.altTxt);

        const cartItemContentElement = document.createElement("div");
        cartItemContentElement.classList.add("cart__item__content");

        const cartItemContentDescriptionElement = document.createElement("div");
        cartItemContentDescriptionElement.classList.add(
          "cart__item__content__description"
        );

        const itemNameElement = document.createElement("h2");
        itemNameElement.textContent = data.name;
        const itemColorElement = document.createElement("p");
        itemColorElement.textContent = cartItem.color;
        const itemPriceElement = document.createElement("p");
        itemPriceElement.textContent = data.price;

        const cartItemContentSettingsElement = document.createElement("div");
        cartItemContentSettingsElement.classList.add(
          "cart__item__content__settings"
        );

        const itemQuantityElement = document.createElement("p");
        itemQuantityElement.textContent = cartItem.quantity;

        const itemQuantityInputElement = document.createElement("input");
        itemQuantityInputElement.setAttribute("type", "number");
        itemQuantityInputElement.setAttribute("class", "itemQuantity");
        itemQuantityInputElement.setAttribute("name", "itemQuantity");
        itemQuantityInputElement.setAttribute("min", "1");
        itemQuantityInputElement.setAttribute("max", "100");
        itemQuantityInputElement.setAttribute("value", "42");

        const cartItemContentSettingsQuantityElement =
          document.createElement("div");
        cartItemContentSettingsQuantityElement.classList.add(
          "cart__item__content__settings__quantity"
        );

        const cartItemContentSettingsDeleteElement =
          document.createElement("div");
        cartItemContentSettingsDeleteElement.classList.add(
          "cart__item__content__settings__delete"
        );
        const deleteItemElement = document.createElement("p");
        deleteItemElement.classList.add("deleteItem");
        deleteItemElement.textContent = "Supprimer";

        cartItemsElement.appendChild(cartItemElement);
        cartItemsElement.appendChild(cartItemImageElement);
        cartItemsElement.appendChild(cartItemContentElement);
        cartItemImageElement.appendChild(cartImageElement);
        cartItemContentElement.appendChild(cartItemContentDescriptionElement);
        cartItemContentDescriptionElement.appendChild(itemNameElement);
        cartItemContentDescriptionElement.appendChild(itemColorElement);
        cartItemContentDescriptionElement.appendChild(itemPriceElement);
        cartItemContentElement.appendChild(cartItemContentSettingsElement);
        cartItemContentSettingsQuantityElement.appendChild(itemQuantityElement);
        cartItemContentSettingsQuantityElement.appendChild(
          itemQuantityInputElement
        );
        cartItemContentSettingsElement.appendChild(
          cartItemContentSettingsQuantityElement
        );
        cartItemContentSettingsElement.appendChild(
          cartItemContentSettingsDeleteElement
        );
        cartItemContentSettingsDeleteElement.appendChild(deleteItemElement);
      });
  });
}
addCartPage();
