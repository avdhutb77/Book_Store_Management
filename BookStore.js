import readline from 'readline-sync';


const books = [
    { name: "Harry Potter", price: 500, status: "available", quantity: 2 },
    { name: "The Hobbit", price: 400, status: "available", quantity: 10 },
    { name: "1984", price: 350, status: "unavailable", quantity: 0 },
]

displayMenu();

function displayMenu() {
    console.log(`\n**** Book Store Menu ****`);
    console.log(`1) Show available books`);
    console.log(`2) Add book to store`);
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