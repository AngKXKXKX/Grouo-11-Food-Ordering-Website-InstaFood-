document.addEventListener('DOMContentLoaded', function () {
  // Retrieve cart and subtotal from LocalStorage
  var storedCart = localStorage.getItem('newCart');
  var cart = JSON.parse(storedCart) || [];

  var subtotal = parseFloat(localStorage.getItem('overallTotal')) || 0;
  console.log(subtotal);

  // Check if cart has items
  if (cart.length > 0) {
    updateConfirmOrder(cart, subtotal);
  }

  function calculateTotal(cart, subtotal) {
    var deliveryCost = parseFloat(document.getElementById("delivery").value) || 0;

    var total = 4 + parseFloat(subtotal);
    return total.toFixed(2);
  }

  function updateConfirmOrder(cart, subtotal) {
    var total = calculateTotal(cart, subtotal);
  
    document.getElementById("subtotal").innerHTML = "Subtotal: RM " + subtotal.toFixed(2);
    document.getElementById("total").innerHTML = "Total: RM " + total;
  
    var orderDetailsTable = document.getElementById('orderDetails');
    orderDetailsTable.innerHTML = '';
  
    cart.forEach(function (item) {
      var row = document.createElement('tr');
      row.style.border = "1px solid black";
      row.style.height = "fit-content";
      row.classList.add('dish-card');
  
      var imageCell = document.createElement('td');
      imageCell.style.border = "1px solid black";
      imageCell.style.width = "20%";
      imageCell.classList.add('figure');
      var image = document.createElement('img');
      image.src = item.pic;
      image.alt = item.name;
      image.style.width = "100%";
  
      imageCell.appendChild(image);
  
      var foodDetailsCell = document.createElement('td');
      foodDetailsCell.style.width = "50%";
      foodDetailsCell.classList.add('dish-details');
      foodDetailsCell.style.padding = "10px";
      foodDetailsCell.style.verticalAlign = "top"; // Set vertical alignment to top
      var foodName = document.createElement('p');
      foodName.classList.add('foodName');
      foodName.style.fontWeight = "bolder";
      foodName.style.fontSize = "20px";
      foodName.innerText = item.name;
  
      var quantityElement = document.createElement('div');
      quantityElement.innerHTML = `
        <small class="quantity">Quantity: <span class="count">${item.quantity}</span></small>
        <br>
        <small class="total-price">Price: RM${(item.price * item.quantity).toFixed(2)}</small>
      `;
  
      foodDetailsCell.appendChild(foodName);
      foodDetailsCell.appendChild(quantityElement);
  
      row.appendChild(imageCell);
      row.appendChild(foodDetailsCell);
      orderDetailsTable.appendChild(row);
    });
  
    localStorage.setItem('total', total); 
  }
  
});

function viewStatus() {
  var contactInput = document.getElementById("contact");
  var contact = contactInput.value;
  var pattern = /^[0-9]{3}-[0-9]{7}$/;

  // Check if the entered value matches the pattern
  if (!pattern.test(contact)) {
      alert("Please fill in the required fields with a valid contact format.");
      return false;
  }

  var comment = document.getElementById("comment").value;
  var cutleryRadio = document.querySelector('input[name="cutlery"]:checked');
  var cutlery = cutleryRadio ? cutleryRadio.value : "Not selected";

  var paymentMethodSelect = document.getElementById("paymentMethod");
  var paymentMethod = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].value;
  var total = document.getElementById("total").innerText;
  localStorage.setItem('total',total);

  console.log("Contact:", contact);
  console.log("Comment:", comment);
  console.log("Cutlery:", cutlery);
  console.log("Payment Method:", paymentMethod);
  console.log("Total:", total);

  alert("Your payment is successfully made\n\nContact No: " + contact + "\nComment: " + comment +
      "\nNeed Cutlery? " + cutlery + "\nPayment Method: " + paymentMethod + "\nTotal: " + total);

  window.location.href="foodStatus.html";
  console.log(  window.location.href="foodStatus.html");
  return false;
}
function viewFood(){
  window.location.href="Cart.html";
  return false;
}

