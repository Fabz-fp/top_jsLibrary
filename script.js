const myLibrary = [];
const container = document.getElementById('container');
const newBookBtn = document.getElementById('new-book-btn');
const dialog = document.getElementById('book-dialog');
const form = document.getElementById('book-form');
const cancelBtn = document.getElementById('cancel-btn');

class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        newBook.id = crypto.randomUUID();
    }

    toggleRead() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    container.innerHTML = '';

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.dataset.id = book.id;

        const title = document.createElement('h3');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;

        const read = document.createElement('p');
        read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle Read';
        toggleBtn.classList.add('toggle-btn');

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        const actions = document.createElement('div');
        actions.classList.add('actions');

        actions.append(toggleBtn, removeBtn);
        bookDiv.append(title, author, pages, read, actions);
        container.appendChild(bookDiv);
    });
}

container.addEventListener('click', (e) => {
    const bookDiv = e.target.closest('.book');
    if (!bookDiv) return;

    const bookId = bookDiv.dataset.id;
    const book = myLibrary.find(b => b.id === bookId);

    if (e.target.classList.contains('remove-btn')) {
        const index = myLibrary.findIndex(b => b.id === bookId);
        myLibrary.splice(index, 1);
        displayBooks();
    }
    if (e.target.classList.contains('toggle-btn')) {
        book.toggleRead();
        displayBooks();
    }
});

newBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
    form.reset();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value, 10);
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);
    displayBooks();

    dialog.close();
    form.reset();
});

// Example usage
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180);
addBookToLibrary('1984', 'George Orwell', 328);
displayBooks();