document.addEventListener('DOMContentLoaded', function () {
  var storedCart = localStorage.getItem('cart');
  var cart = JSON.parse(storedCart) || [];

  var totalAmount=localStorage.getItem('total');
  console.log('totalAmount:', totalAmount);

  // Check if cart has items
  if (cart.length > 0) {
    updateConfirmOrder(cart);
  }

  function updateConfirmOrder(cart) {
    var orderDetailsTable = document.getElementById('order');
    orderDetailsTable.innerHTML = '';

    var headerRow = document.createElement('tr');
    headerRow.style.border = "1px solid black";

    var menu = document.createElement('th');
    menu.innerText = "Menu";
    menu.style.fontWeight = "bolder";

    var quantity = document.createElement('th');
    quantity.innerText = "Quantity";
    quantity.style.fontWeight = "bolder";

    var price = document.createElement('th');
    price.innerText = "Price";
    price.style.fontWeight = "bolder";

    headerRow.appendChild(menu);
    headerRow.appendChild(quantity);
    headerRow.appendChild(price);

    orderDetailsTable.appendChild(headerRow);

    cart.forEach(function (item) {
      var row = document.createElement('tr');
      row.style.border = "1px solid black";
      row.style.height = "fit-content";

      var nameCell = document.createElement('td');
      nameCell.innerText = item.name;

      var quantityCell = document.createElement('td');
      quantityCell.innerText = item.quantity;

      var priceCell = document.createElement('td');
      priceCell.innerText = "RM" + (item.price * item.quantity).toFixed(2);

      row.appendChild(nameCell);
      row.appendChild(quantityCell);
      row.appendChild(priceCell);

      orderDetailsTable.appendChild(row);
    });

    var otherRow = document.createElement('tr');
    otherRow.style.border = "1px solid black";


    var totalCell = document.createElement('td');
    totalCell.colSpan = "3";
    totalCell.style.fontWeight = "bolder"; 
    totalCell.innerText =totalAmount;

    otherRow.appendChild(totalCell);
    orderDetailsTable.appendChild(otherRow);

  }
});
let intervalId;

function updateDateTime() {
    const now = new Date();

    now.setMinutes(now.getMinutes() + 45);

    const currentDateTime = now.toLocaleString();

    document.querySelector('#datetime').textContent = currentDateTime;

    if (now >= endTime) {
        clearInterval(intervalId);
    }
}

const endTime = new Date();
endTime.setMinutes(endTime.getMinutes() + 45);

// Start the timer
intervalId = setInterval(updateDateTime, 1000);