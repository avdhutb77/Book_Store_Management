import readline from 'readline-sync';

const books = [
    { name: "Harry Potter", price: 500, status: "available", quantity: 2 },
    { name: "The Hobbit", price: 400, status: "available", quantity: 10 },
    { name: "1984", price: 350, status: "unavailable", quantity: 0 },
];
let cart = [];

displayMenu();

function displayMenu() {
    console.log(`\n**** Book Store Menu ****`);
    console.log(`1) Show available books`);
    console.log(`2) Add book to cart`);
    console.log(`3) Show cart`);
    console.log(`4) Update cart`); 
    console.log(`5) Exit`);

    const option = readline.question("Enter your option: ");

    switch (option) {
        case '1':
            showAllBooks();
            break;
        case '2':
            addBookToCart();
            break;
        case '3':
            showCart();
            break;
        case '4':
            updateCart();
            break;
        case '5':
            console.log("Exiting the book store. Goodbye!");
            return;
        default:
            console.log("Invalid option. Please try again.");
            displayMenu();
    }
}

function showAllBooks() {
    console.log(`\nAll Books:\n`);
    console.log(`+-----+-------------------+-------+------------+----------+`);
    console.log(`| No. | Name              | Price | Quantity   | Status   |`);
    console.log(`+-----+-------------------+-------+------------+----------+`);

    books.forEach((book, index) => {
        console.log(`| ${index.toString().padStart(3)} | ${book.name.padEnd(18)} | ${book.price.toString().padStart(5)} | ${book.quantity.toString().padStart(10)} | ${book.status.padStart(8)} |`);
    });

    console.log(`+-----+-------------------+-------+------------+----------+\n`);
    displayMenu();
}

function addBookToCart() {
    const bookIndex = parseInt(readline.question("Enter the index number of the book to add to cart: "), 10);

    if (isNaN(bookIndex) || bookIndex < 0 || bookIndex >= books.length) {
        console.log("Invalid index. Please try again.");
    } else {
        const selectedBook = books[bookIndex];

        if (selectedBook.status === "available" && selectedBook.quantity > 0) {
            const requestedQuantity = parseInt(readline.question(`Enter the quantity for "${selectedBook.name}": `), 10);
            
            if (requestedQuantity <= selectedBook.quantity) {
                const existingCartItem = cart.find(item => item.name === selectedBook.name);
                
                if (existingCartItem) {
                    existingCartItem.quantity += requestedQuantity;
                    existingCartItem.totalPrice = existingCartItem.price * existingCartItem.quantity;
                } else {
                    cart.push({
                        name: selectedBook.name,
                        price: selectedBook.price,
                        quantity: requestedQuantity,
                        totalPrice: selectedBook.price * requestedQuantity
                    });
                }
                
                selectedBook.quantity -= requestedQuantity;
                if (selectedBook.quantity === 0) selectedBook.status = 'unavailable';

                console.log(`Added "${requestedQuantity}" of "${selectedBook.name}" to the cart.`);
            } else {
                console.log(`Only ${selectedBook.quantity} of "${selectedBook.name}" is available. Please try again.`);
            }
        } else {
            console.log(`Book "${selectedBook.name}" is unavailable or out of stock.`);
        }
    }
    displayMenu();
}

function showCart() {
    let totalCartValue = 0;
    
    if (cart.length === 0) {
        console.log("Your cart is empty.");
    } else {
        console.log("\nYour Cart:");
        console.log(`+-----+-------------------+-------+----------+------------+`);
        console.log(`| No. | Name              | Price | Quantity | TotalPrice |`);
        console.log(`+-----+-------------------+-------+----------+------------+`);

        cart.forEach((book, index) => {
            totalCartValue += book.totalPrice;
            console.log(`| ${index.toString().padStart(3)} | ${book.name.padEnd(18)} | ${book.price.toString().padStart(5)} | ${book.quantity.toString().padStart(8)} | ${book.totalPrice.toString().padStart(10)} |`);
        });

        console.log(`+-----+-------------------+-------+----------+------------+`);
        console.log(`Total Cart Value: ${totalCartValue}`);
    }
    displayMenu();
}

// Task 4: Update Cart
function updateCart() {
    if (cart.length === 0) {
        console.log("Your cart is empty.");
        displayMenu();
        return;
    }

    console.log("\n**** Update Cart Menu ****");
    console.log("1) Increase quantity");
    console.log("2) Decrease quantity");
    console.log("3) Remove item");

    const option = readline.question("Enter your option: ");

    switch (option) {
        case '1':
            updateCartQuantity("increase");
            break;
        case '2':
            updateCartQuantity("decrease");
            break;
        case '3':
            removeFromCart();
            break;
        default:
            console.log("Invalid option. Please try again.");
            updateCart();
    }
}

function updateCartQuantity(action) {
    const cartIndex = parseInt(readline.question("Enter the index of the book in your cart: "), 10);

    if (isNaN(cartIndex) || cartIndex < 0 || cartIndex >= cart.length) {
        console.log("Invalid cart index. Please try again.");
        return;
    }

    const cartItem = cart[cartIndex];
    const bookItem = books.find(book => book.name === cartItem.name);
    
    const quantityChange = parseInt(readline.question(`Enter the quantity to ${action}: `), 10);
    
    if (action === "increase") {
        if (quantityChange <= bookItem.quantity) {
            cartItem.quantity += quantityChange;
            cartItem.totalPrice = cartItem.quantity * cartItem.price;
            bookItem.quantity -= quantityChange;
            if (bookItem.quantity === 0) bookItem.status = 'unavailable';
            console.log(`Increased quantity of "${cartItem.name}" in the cart.`);
        } else {
            console.log(`Only ${bookItem.quantity} available in stock. Please try again.`);
        }
    } else if (action === "decrease") {
        if (quantityChange <= cartItem.quantity) {
            cartItem.quantity -= quantityChange;
            cartItem.totalPrice = cartItem.quantity * cartItem.price;
            bookItem.quantity += quantityChange;
            if (bookItem.status === 'unavailable') bookItem.status = 'available';
            console.log(`Decreased quantity of "${cartItem.name}" in the cart.`);
            if (cartItem.quantity === 0) {
                cart.splice(cartIndex, 1);
                console.log(`Removed "${cartItem.name}" from the cart as quantity became 0.`);
            }
        } else {
            console.log(`You can't decrease more than what's in the cart.`);
        }
    }
    showCart();
    
}

function removeFromCart() {
    const cartIndex = parseInt(readline.question("Enter the index of the book to remove from your cart: "), 10);

    if (isNaN(cartIndex) || cartIndex < 0 || cartIndex >= cart.length) {
        console.log("Invalid cart index. Please try again.");
        return;
    }

    const cartItem = cart[cartIndex];
    const bookItem = books.find(book => book.name === cartItem.name);

    bookItem.quantity += cartItem.quantity;
    if (bookItem.status === 'unavailable') bookItem.status = 'available';

    cart.splice(cartIndex, 1);
    console.log(`Removed "${cartItem.name}" from the cart.`);
    showCart();

    
}
