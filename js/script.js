const navbarNav= document.querySelector ('.navbar-nav');
 document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle ('active');
 };
 const hamburger = document.querySelector ('#hamburger-menu');

 document.addEventListener ('click',function(e){
    if (!hamburger.contains(e.target)&& !navbarNav.contains
    (e.target)) {
        navbarNav.classList.remove('active');
    }
 });

  // Get the "Order Agora" button element
  const orderButton = document.querySelector('.cta');

  // Get the "Place Your Order" section element
  const orderSection = document.getElementById('order');

  // Function to toggle the visibility of the button based on scroll position
  function toggleOrderButtonVisibility() {
      const orderSectionTop = orderSection.getBoundingClientRect().top;
      const orderButtonHeight = orderButton.offsetHeight;

      if (orderSectionTop <= orderButtonHeight) {
          orderButton.style.display = 'none';
      } else {
          orderButton.style.display = 'block';
      }
  }

  // Event listener to handle scroll and update button visibility
  window.addEventListener('scroll', toggleOrderButtonVisibility);

  // Initial call to set the initial visibility of the button
  toggleOrderButtonVisibility();



 // JavaScript code for placing order
document.addEventListener("DOMContentLoaded", () => {
   const menuItems = document.querySelectorAll(".menu-item");
 
   let orderSummary = [];
   let totalItems = 0;
   let totalPrice = 0;
 
   // Function to update the order summary display
   const updateOrderSummary = () => {
      const orderList = document.getElementById("selected-items-list");
      orderList.innerHTML = "";
  
      orderSummary.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - Quantity: ${item.quantity} - Price: $${(item.price * item.quantity).toFixed(2)}`;
  
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("remove-btn");
  
        // Event listener to handle item removal
        removeBtn.addEventListener("click", () => {
          totalItems -= item.quantity;
          totalPrice -= item.price * item.quantity;
          orderSummary.splice(index, 1);
          updateOrderSummary();
        });
  
        listItem.appendChild(removeBtn);
        orderList.appendChild(listItem);
      });
  
      document.getElementById("total-items").textContent = totalItems;
      document.getElementById("total-price").textContent = totalPrice.toFixed(2);
    };

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
  // hide order summary
  hideOrderSummary();
   // Event listener for the menu items
   menuItems.forEach((menuItem) => {
     menuItem.addEventListener("click", () => {
       const name = menuItem.dataset.name;
       const price = parseFloat(menuItem.dataset.price);
 
       // Check if the item is already in the order summary
       const existingItem = orderSummary.find((item) => item.name === name);
       if (existingItem) {
         existingItem.quantity++;
       } else {
         orderSummary.push({ name, price, quantity: 1 });
       }
 
       totalItems++;
       totalPrice += price;

      //  update order Summary
       updateOrderSummary();

   // Show the order summary
      showOrderSummary();
     });
   });
 
   // Event listener for the Submit Order button
   const sendOrderBtn = document.getElementById("send-order-btn");
   sendOrderBtn.addEventListener("click", () => {
     // Here, you can submit the order to the server or process it as needed
     // You can access the order details from the "orderSummary" array
     // along with the delivery details from the form fields "name", "address", and "phone"
     console.log("Order Summary:", orderSummary);
     console.log("Delivery Details:", {
       name: document.getElementById("name").value,
       address: document.getElementById("address").value,
       phone: document.getElementById("phone").value,
     });
   });
 });

  document.getElementById("send-order-btn").addEventListener("click", function () {
   // Get data from the form
   const name = document.getElementById("name").value;
   const address = document.getElementById("address").value;
   const phone = document.getElementById("phone").value;
   const totalItems = document.getElementById("total-items").innerText;
   const totalPrice = document.getElementById("total-price").innerText;


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

   message += `\nTotal Items: ${totalItems}\nTotal Price: $${totalPrice}`;

   // Replace 'YOUR_PHONE_NUMBER' with the phone number to which you want to send the message
   const phoneNumber = '67074722233';

   const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

   // Open the WhatsApp link
   window.open(whatsappLink);
 });
