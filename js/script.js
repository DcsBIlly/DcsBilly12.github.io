
const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');

hamburger.addEventListener('click', () => {
    navbarNav.classList.toggle('active');
});

document.body.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});

// Get references to the necessary elements
const menuItems = document.querySelectorAll('.menu-item');
const selectedItemsList = document.getElementById('selected-items-list');
const totalItemsElement = document.getElementById('total-items');
const totalPriceElement = document.getElementById('total-price');
const shoppingCartIcon = document.getElementById('shopping-cart');
const orderSummary = document.getElementById("order-summary");

shoppingCartIcon.addEventListener('click', (event) => {
  event.preventDefault();
  const orderSummary = document.getElementById("order-summary");
  
  // toggel visibility
  if (orderSummary.style.display === "block") {
    orderSummary.style.display = "none";
  } else {
    orderSummary.style.display = "block";
  }
    showOrderSummary();
});
// Object to store selected items
const selectedItems = {};
// Function to show the order summary
function showOrderSummary() {
 
}
// Function to hide the order summary
const hideOrderSummary = () => {
  const orderSummary = document.getElementById("order-summary");
  orderSummary.style.display = "none";
 
};
 // hide order summary initially
 hideOrderSummary();


function updateCartBadge(totalQuantity) {
  const cartBadge = document.querySelector('.cart-badge');
  cartBadge.textContent = totalQuantity;
  cartBadge.style.display = totalQuantity > 0 ? 'block' : 'none';
}
// ...
// Function to update the order summary
function updateOrderSummary() {
  selectedItemsList.innerHTML = '';
  let totalItems = 0;
  let totalPrice = 0;
  let totalQuantity = 0;
  for (const itemName in selectedItems) {
    totalQuantity += selectedItems[itemName];
  }

  updateCartBadge(totalQuantity);
  for (const itemName in selectedItems) {
    const quantity = selectedItems[itemName];
    const menuItem = document.querySelector(`[data-name="${itemName}"]`);
    
    if (menuItem) {
      const price = parseFloat(menuItem.getAttribute('data-price'));
      const itemTotal = price * quantity;

      const menuItemElement = document.createElement('li');
      menuItemElement.textContent = `${itemName}: ${quantity} x $${price.toFixed(2)} = $${itemTotal.toFixed(2)}`;
      
      const removeButton = document.createElement('button');
      removeButton.textContent = 'x';
      removeButton.classList.add('remove-button'); // Add the CSS class
      removeButton.addEventListener('click', () => {
        delete selectedItems[itemName];
        updateOrderSummary();
      });
  
      menuItemElement.appendChild(removeButton);
      selectedItemsList.appendChild(menuItemElement);
      totalItems += quantity;
      totalPrice += itemTotal;
    }
  }

  totalItemsElement.textContent = totalItems;
  totalPriceElement.textContent = totalPrice.toFixed(2);
  const orderSummarySection = document.getElementById('order-summary');

  if (totalItems > 0) {
    selectedItemsList.style.display = 'block';
    sendOrderBtn.style.display = 'block';
    orderSummarySection.style.display = 'block';
  } else {
    selectedItemsList.style.display = 'none';
    sendOrderBtn.style.display = 'none';
    orderSummarySection.style.display = 'none';
  }
}
// Add click event listeners to each menu item
menuItems.forEach((menuItem) => {
  const itemName = menuItem.getAttribute('data-name');

  menuItem.addEventListener('click', () => {
    if (selectedItems[itemName]) {
      selectedItems[itemName]++;
    } else {
      selectedItems[itemName] = 1;
    }
    updateOrderSummary();
    hideOrderSummary();
  });
});
// Remove button event listener to remove items from the order summary
selectedItemsList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const itemName = event.target.getAttribute('data-name');
    if (selectedItems[itemName] > 1) {
      selectedItems[itemName]--;
    } else {
      delete selectedItems[itemName];
    }
    updateOrderSummary();
  }
});

// WhatsApp Sendin order code
document.getElementById("send-order-btn").addEventListener("click", function () {
  // Get data from the form
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  // Check if any of the delivery details fields are empty
  if (name === "" || address === "" || phone === "") {
   alert("Please fill in all delivery details before submitting your order.");
   return; // Stop further execution
  }

  // Construct the WhatsApp message using the collected form data and order summary
  let message = `Order Details:\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}\n\nSelected Items:\n`;

  // Get the selected items from the order summary list
  const selectedItemsList = document.getElementById('selected-items-list').querySelectorAll('li');
  selectedItemsList.forEach(item => {
    message += `${item.textContent}\n`;
  });
  // Add total items and total price to the message
  message += `\nTotal Items: ${totalItemsElement.textContent}\nTotal Price: $${totalPriceElement.textContent}`;


  // Replace 'YOUR_PHONE_NUMBER' with the phone number to which you want to send the message
  const phoneNumber = '67074722233';

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Open the WhatsApp link
  window.open(whatsappLink);
});
