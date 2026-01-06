const myLibrary = [];
const container = document.getElementById('container');

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages);
    newBook.id = crypto.randomUUID();

    myLibrary.push(newBook);
}

function displayBooks() {
    container.innerHTML = '';

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const title = document.createElement('h3');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);

        container.appendChild(bookDiv);
    });
}

// Example usage
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180);
addBookToLibrary('1984', 'George Orwell', 328);
displayBooks();