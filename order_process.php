<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the selected menu items
    if (isset($_POST["items"])) {
        $selectedItems = $_POST["items"];
        // $selectedItems will be an array containing the selected menu item values
        // You can further process this array as needed, such as storing it in the database
    }

    // Get the total items and total price
    $totalItems = $_POST["total-items"];
    $totalPrice = $_POST["total-price"];
    // $totalItems and $totalPrice now contain the total items and total price values
    // You can store them in the database or use them as needed

    // Display the selected items and order details
    if (isset($selectedItems)) {
        echo "<h2>Selected Items:</h2>";
        echo "<ul>";
        foreach ($selectedItems as $item) {
            echo "<li>$item</li>";
        }
        echo "</ul>";
    }

    if (isset($totalItems) && isset($totalPrice)) {
        echo "<p>Total Items: $totalItems</p>";
        echo "<p>Total Price: $totalPrice</p>";
    }
}
?>

