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