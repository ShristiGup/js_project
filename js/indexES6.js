class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add() {
        // console.log("Adding to UI");
        let books = localStorage.getItem("books");
        if(books==null){
            booksObj = [];
        }
        else{
            booksObj = JSON.parse(books);
        }
        let tableBody = document.getElementById("tableBody");
        let html = "";
        booksObj.forEach(book => {
            html += `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
        });
        tableBody.innerHTML = html;
    }

    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, msg) {
        let msg_type;
        let message = document.getElementById("message");
        if (type === "success") {
            msg_type = "Hooray!!!"
        }
        else {
            msg_type = "Error!"
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${msg_type}</strong> ${msg}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`;
        setTimeout(() => {
            message.innerHTML = "";
        }, 4000);
    }
}

    // let display = new Display();
    // display.add();

//Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    // console.log("Your form is submitted");
    let name = document.getElementById("name").value;
    let author = document.getElementById("author").value;

    let programming = document.getElementById("programming");
    let fiction = document.getElementById("fiction");
    let cooking = document.getElementById("cooking");
    let type;
    if (programming.checked) {
        type = programming.value;
    }
    else if (fiction.checked) {
        type = fiction.value;
    }
    else {
        type = cooking.value;
    }
    let book = new Book(name, author, type);

    let display = new Display();
    if (display.validate(book)) {
        let books = localStorage.getItem("books");
        if(books==null){
            booksObj = [];
        }
        else{
            booksObj = JSON.parse(books);
        }
        booksObj.push(book);
        localStorage.setItem("books",JSON.stringify(booksObj));
        display.add();
        display.clear();
        display.show("success", "Your book is successfully added.");
    }
    else {
        display.show("danger", "Sorry you can't add this book.");
    }
    // console.log(book);
    e.preventDefault();
}
