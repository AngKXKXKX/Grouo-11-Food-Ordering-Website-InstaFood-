function decrementCount(button) {
  var countElement = button.nextElementSibling;
  var count = parseInt(countElement.innerHTML);
  if (count > 0) {
    count--;
    countElement.innerHTML = count;
  }
}

function incrementCount(button) {
  var countElement = button.previousElementSibling;
  var count = parseInt(countElement.innerHTML);
  count++;
  countElement.innerHTML = count;
}

var cart = [];
function addToCart(itemPic,itemName, price, quantity) {
  var item = {
    pic:itemPic,
    name: itemName,
    price: price,
    quantity: quantity
  };
  cart.push(item);
  updateCart();
  localStorage.setItem('cart', JSON.stringify(cart));

}

function updateCart() {
  var cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  var itemNumberElement = document.querySelector('.item-number');

  if (itemNumberElement) {
    itemNumberElement.textContent = cartItemCount + ' items';
  }

  var cartContainer = document.querySelector('.cart-container');

  if (cartContainer) {
    cartContainer.innerHTML = ''; 

    cart.forEach(item => { 
      var cartItemElement = document.createElement('div');
      cartItemElement.classList.add('dish-card');

      var itemPicElement = document.createElement('img');
      itemPicElement.classList.add('dish-image');
      itemPicElement.src = item.pic;

      var itemNameElement = document.createElement('p');
      itemNameElement.classList.add('foodName');
      itemNameElement.innerText = item.name;

      var quantityElement = document.createElement('div');
      quantityElement.classList.add('counter');
      quantityElement.innerHTML = `
        <button class="btn" onclick="decrementCount(this, ${cart.indexOf(item)})">-</button>
        <div class="count">${item.quantity}</div>
        <button class="btn" onclick="incrementCount(this, ${cart.indexOf(item)})">+</button>
      `;
      var totalPriceElement = document.createElement('div');
      totalPriceElement.classList.add('total-price');
      totalPriceElement.innerText =(item.price * item.quantity).toFixed(2);

      cartItemElement.appendChild(itemPicElement);
      cartItemElement.appendChild(itemNameElement);
      cartItemElement.appendChild(totalPriceElement);
      cartItemElement.appendChild(quantityElement);

      cartContainer.appendChild(cartItemElement);
    });
  }
}


document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM content loaded');
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantName = urlParams.get('restaurant');

  const restaurantNameElement = document.getElementById('restaurantName');
  if (restaurantNameElement) {
    restaurantNameElement.innerHTML = `<b>${restaurantName || "Default Restaurant"}</b>`;
  }

  const addToCartButtons = document.querySelectorAll('.addToCartBtn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const dishCard = this.closest('.dish-card');
      const itemPic = dishCard.querySelector('.dish-image').src;
      const itemName = dishCard.querySelector('.food').innerText;
      const price = parseFloat(dishCard.querySelector('.price').innerText.replace('RM', ''));
      const quantity = parseInt(dishCard.querySelector('.count').innerText);
      if (quantity != 0) {
        addToCart(itemPic, itemName, price, quantity);
        alert(`Added ${quantity} ${itemName}(s) to the cart!`);
      } else {
        alert("Please select the quantity!");
      }
    });
  });
});