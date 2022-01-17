let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.info = function () {
        if(this.read){   
            return `${this.title} by ${this.author}, ${this.pages}, read`;
        }
        else {
            return `${this.title} by ${this.author}, ${this.pages}, not read yet`;
        }
}

Book.prototype.setRead = function (read) {
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

let theHobbit = new Book("The Hobbit","J.R.R Tolkien",295,true);
let warAndPeace = new Book("War and Peace","Leo Tolstoy",1225,false);
let harryPotter = new Book("Harry Potter", "JK Rowling", 500,true);


addBookToLibrary(theHobbit);
addBookToLibrary(warAndPeace);
addBookToLibrary(harryPotter);

//display books in library on DOM
const table = document.querySelector("table");

const wipeLibraryDisplay = () => {
    //wipe all rows from display first
    const tableRows = document.querySelectorAll("tr");
    for(let i=1 ; i < tableRows.length ; i++){
        tableRows[i].remove();
    }
}

const displayLibrary = () => {
    wipeLibraryDisplay();
    myLibrary.forEach(book => {
        const tableRow = document.createElement("tr");
        const tableCellTitle =  document.createElement("td");
        const tableCellAuthor =  document.createElement("td");
        const tableCellPages =  document.createElement("td");
        const tableCellRead =  document.createElement("td");
        const tableCellReadFLip = document.createElement("td");
        const tableCellReadButton = document.createElement("button");
        const tableCellRemove = document.createElement("td");
        const tableCellRemoveButton = document.createElement("button");
        tableCellTitle.textContent = book.title;
        tableRow.appendChild(tableCellTitle);
        tableCellAuthor.textContent = book.author;
        tableRow.appendChild(tableCellAuthor);
        tableCellPages.textContent = book.pages;
        tableRow.appendChild(tableCellPages);

        tableCellRead.textContent = book.read;
        tableRow.appendChild(tableCellRead);

        
        tableRow.appendChild(tableCellReadFLip);
        tableCellReadButton.textContent = "Flip to read?";
        tableCellReadButton.classList.toggle("flip");
        tableCellReadButton.setAttribute("id",myLibrary.indexOf(book));
        tableCellReadFLip.appendChild(tableCellReadButton);

        tableRow.appendChild(tableCellRemove);
        tableCellRemoveButton.textContent = "Remove";
        tableCellRemoveButton.classList.toggle("remove");
        tableCellRemoveButton.setAttribute("id",myLibrary.indexOf(book));
        //give button ID of index of book
        // myLibrary.indexOf(book)
        tableCellRemove.appendChild(tableCellRemoveButton);
        table.appendChild(tableRow);         
    })
    resetTableButtons();
};



const submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", () =>{
    const bookTitle = document.querySelector(".title").value;
    const bookAuthor = document.querySelector(".author").value;
    const bookPages = document.querySelector(".pages").value;
    const bookIsRead = document.querySelector(".read").checked;
    let newBook = new Book(bookTitle,bookAuthor,bookPages,bookIsRead);
    addBookToLibrary(newBook);
    wipeLibraryDisplay();
    displayLibrary();
});

const resetTableButtons = () => {
    const removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach(removeButton => removeButton.addEventListener("click", () => {
        myLibrary.splice(myLibrary[removeButton.id],1);
        displayLibrary();
    }));
    const flipButtons = document.querySelectorAll(".flip");
    flipButtons.forEach(flipButton => flipButton.addEventListener("click", () => {
        console.log(!myLibrary[flipButton.id].read);
        myLibrary[flipButton.id].setRead(!myLibrary[flipButton.id].read);
        displayLibrary();
    }));
}

displayLibrary();