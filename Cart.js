document.addEventListener('DOMContentLoaded', function () {
  var storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
});

function updateCart() {
  var cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.item-number').textContent = cartItemCount + ' items';

  var totalContainer = document.querySelector('.total');

  var cartContainer = document.querySelector('.cart-container');
  cartContainer.innerHTML = ''; 

  cart.forEach((item, index) => {
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
        <button class="btn" onclick="decrementCount(${index})">-</button>
        <div class="count">${item.quantity}</div>
        <button class="btn" onclick="incrementCount(${index})">+</button>
    `;

    var totalPriceElement = document.createElement('div');
    totalPriceElement.classList.add('total-price');
    totalPriceElement.innerText = 'RM' + (item.price * item.quantity).toFixed(2);

    cartItemElement.appendChild(itemPicElement);
    cartItemElement.appendChild(itemNameElement);
    cartItemElement.appendChild(quantityElement);
    cartItemElement.appendChild(totalPriceElement);

    cartContainer.appendChild(cartItemElement);
  });

  var overallTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  totalContainer.textContent = 'Overall Total: RM' + overallTotalPrice.toFixed(2);
  localStorage.setItem('overallTotal', overallTotalPrice.toFixed(2));
  console.log(overallTotalPrice);
  localStorage.setItem('newCart', JSON.stringify(cart)); // Update the stored cart
}

function decrementCount(index) {
  var count = cart[index].quantity;
  if (count > 0) {
    count--;
    cart[index].quantity = count;
    updateCart();
  }
  if (count == 0) {
    var result = confirm("Do you sure want to remove this item?");
    if (result) {
      cart = cart.filter(item => item.quantity > 0);
      updateCart();
    } else {
      cart[index].quantity = 1;
      updateCart();
    }
  }
}

function incrementCount(index) {
  var count = cart[index].quantity;
  count++;
  cart[index].quantity = count;
  updateCart();

}
function viewConfirmPage() {
  // Update the stored cart
  localStorage.setItem('newCart', JSON.stringify(cart));

  // Calculate and update the overall total
  var overallTotalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  localStorage.setItem('overallTotal', overallTotalPrice.toFixed(2));

  // Redirect to the confirm order page
  window.location.href = "ConfirmOrder.html";
  return false;
}



