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
const sendOrderBtn = document.getElementById('send-order-btn');

// Object to store selected items
const selectedItems = {};
// Function to show the order summary
const showOrderSummary = () => {
  const orderSummary = document.getElementById("order-summary");
  orderSummary.style.display = "block";
};

// Function to hide the order summary
const hideOrderSummary = () => {
  const orderSummary = document.getElementById("order-summary");
  orderSummary.style.display = "none";
};

// hide order summary initially
hideOrderSummary();

// ...
// Function to update the order summary
function updateOrderSummary() {
  selectedItemsList.innerHTML = '';
  let totalItems = 0;
  let totalPrice = 0;

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

    showOrderSummary();
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

// Handle the "Send Order" button click event
sendOrderBtn.addEventListener('click', () => {
  // Create an array to store the selected items for order submission
  const orderItems = [];
  
  // Iterate through the selectedItems object
  for (const itemName in selectedItems) {
    const quantity = selectedItems[itemName];
    const price = parseFloat(menuItems.querySelector(`[data-name="${itemName}"]`).getAttribute('data-price'));
    
    // Calculate the total price for each item
    const totalPrice = price * quantity;
    
    // Create an object to represent each selected item
    const orderItem = {
      name: itemName,
      quantity: quantity,
      totalPrice: totalPrice
    };
    // Push the order item to the array
    orderItems.push(orderItem);
  }
  // Now you can use the orderItems array to send the order to a server or display a confirmation message
  // For this example, we'll just display a confirmation message
  let confirmationMessage = 'You have ordered:\n';
  orderItems.forEach((item) => {
    confirmationMessage += `${item.quantity}x ${item.name} - $${item.totalPrice.toFixed(2)}\n`;
  });
  
  confirmationMessage += `Total: $${totalPriceElement.textContent}`;
  alert(confirmationMessage);

  alert('Order submitted! Thank you.');
});

// WhatsApp Sendin order code
// Event listener for the "Submit Order" button
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

  // Replace 'YOUR_PHONE_NUMBER' with the phone number to which you want to send the message
  const phoneNumber = '67074722233';

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Open the WhatsApp link
  window.open(whatsappLink);
});
// Function to update the visibility of the "Submit Order" button container
function updateSubmitButtonVisibility() {
  const submitOrderContainer = document.getElementById("submit-order-container");

  // Check if there are selected items and all delivery details are filled
  const hasSelectedItems = orderSummary.length > 0;
  const isDeliveryDetailsFilled = !formFields.some(field => field.value.trim() === "");

  // Show or hide the "Submit Order" button container
  if (hasSelectedItems && isDeliveryDetailsFilled) {
      submitOrderContainer.style.display = "block";
  } else {
      submitOrderContainer.style.display = "none";
  }
}
// Get the "Order Agora" button element
const orderButton = document.getElementById("order-button");

// Get the menu section element
const menuSection = document.getElementById("menu");

// Function to toggle the visibility of the button based on scroll position
function toggleOrderButtonVisibility() {
    const menuSectionTop = menuSection.getBoundingClientRect().top;

    if (menuSectionTop <= 0) {
        orderButton.style.display = "none";
    } else {
        orderButton.style.display = "block";
    }
}

// Event listener to handle scroll and update button visibility
window.addEventListener("scroll", toggleOrderButtonVisibility);

// Initial call to set the initial visibility of the button
toggleOrderButtonVisibility();


document.getElementById("send-message-btn").addEventListener("click", function() {
  // Get form input values
  var naran = document.getElementById("naran").value;
  var suggestions = document.getElementById("comment").value;
  var number = document.getElementById("no").value;

  // Construct the WhatsApp message
  var whatsappMessage = `Name: ${naran}\nSuggestions: ${suggestions}\nPhone: ${number}`;

  // Encode the message for the WhatsApp link
  var encodedMessage = encodeURIComponent(whatsappMessage);

  // Replace 'YOUR_PHONE_NUMBER' with the actual phone number
  var phoneNumber = '67074722233';

  // Construct the WhatsApp link
  var whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  // Open WhatsApp chat
  window.open(whatsappLink);
});
