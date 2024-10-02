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
    console.log(`4) Exit`);

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
        // Update the status if quantity reaches 0
        if (book.quantity === 0) {
            book.status = "unavailable";
        }
        console.log(`| ${index.toString().padStart(3)} | ${book.name.padEnd(18)} | ${book.price.toString().padStart(5)} | ${book.quantity.toString().padStart(10)} | ${book.status.padStart(8)} |`);
    });

    console.log(`+-----+-------------------+-------+------------+----------+\n`);
    displayMenu();
}

function addBookToCart() {
    const bookIndex = parseInt(readline.question("Enter the index number of the book to add to cart: "));

    if (isNaN(bookIndex) || bookIndex < 0 || bookIndex >= books.length) {
        console.log("Invalid index. Please try again.");
    } else {
        const selectedBook = books[bookIndex];

        
        if (selectedBook.status === "available" && selectedBook.quantity > 0) {
            const quantity = parseInt(readline.question(`Enter quantity for "${selectedBook.name}" (Available: ${selectedBook.quantity}): `), 10);

            if (quantity > 0 && quantity <= selectedBook.quantity) {
                const existingCartItem = cart.find(item => item.name === selectedBook.name);

                
                if (existingCartItem) {
                    existingCartItem.quantity += quantity;
                } else {
                    cart.push({ name: selectedBook.name, price: selectedBook.price, quantity });
                }

              
                selectedBook.quantity -= quantity;

                
                if (selectedBook.quantity === 0) {
                    selectedBook.status = "unavailable";
                }

                console.log(`Added ${quantity} of "${selectedBook.name}" to the cart.`);
            } else {
                console.log("Invalid quantity or not enough stock available.");
            }
        } else {
            console.log(`Book "${selectedBook.name}" is unavailable or out of stock.`);
        }
    }
   
    showAllBooks();
}


function showCart() {
    let totalCartValue = 0;

    if (cart.length === 0) {
        console.log("Your cart is empty.");
    } else {
        console.log("\nYour Cart:");
        console.log(`+-----+-------------------+-------+----------+--------------+`);
        console.log(`| No. | Name              | Price | Quantity | Total Price  |`);
        console.log(`+-----+-------------------+-------+----------+--------------+`);

        cart.forEach((book, index) => {
            const totalPrice = book.price * book.quantity;
            totalCartValue += totalPrice;
            console.log(`| ${index.toString().padStart(3)} | ${book.name.padEnd(18)} | ${book.price.toString().padStart(5)} | ${book.quantity.toString().padStart(8)} | ${totalPrice.toString().padStart(12)} |`);
        });

        console.log(`+-----+-------------------+-------+----------+--------------+`);
        console.log(`Total Cart Value: ${totalCartValue}`);
    }
    displayMenu();
}
