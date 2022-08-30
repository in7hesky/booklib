const IS_READ_STATUS = "Has been read"
const NOT_READ_STATUS = "Not read yet"

const addButton = document.querySelector(".add-button")

const modalWrapper = document.querySelector(".modal-wrapper")
const modal = document.querySelector(".modal")

const shelf = []

function Book(title, author, pages, isRead) {
    this.title = title,
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.toggleStatus = function () {
    this.isRead = !this.isRead
}

modal.addEventListener("submit", (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const book = new Book(data.get("title"), data.get("author"),
        data.get("pages"), data.get("isRead"))
    shelf.push(book)
    refreshShelf()
    toggleOpen(modalWrapper, modal)
})

addButton.addEventListener("click", () => {
    toggleOpen(modalWrapper, modal)
})

modalWrapper.addEventListener("click", () => {
    toggleOpen(modalWrapper, modal)
})

modal.addEventListener("click", (e) => {
    e.stopPropagation()
})

function refreshBookStatus(bookNode) {
    const isRead = shelf[getBookIndex(bookNode)].isRead
    bookNode.querySelector(".read-status").textContent = isRead ? IS_READ_STATUS : NOT_READ_STATUS
}

function refreshShelf() {
    const booksWrapper = document.querySelector(".books-wrapper")
    booksWrapper.innerHTML = ""

    let counter = 0
    shelf.forEach(book => {
        booksWrapper.appendChild(createBookNode(book, counter++))
    })

    wireCloseButtons()
    wireStatusButtons()
}

function wireCloseButtons() {
    const closeButtons = document.querySelectorAll(".close-button")

    closeButtons.forEach( button => {
        button.addEventListener("click", (e) => {
            shelf.splice(getBookIndex(e.target.parentElement), 1)
            refreshShelf()
        })
    })
}

function wireStatusButtons() {
    const statusButtons = document.querySelectorAll(".status-button")
    
    statusButtons.forEach( button => {
        button.addEventListener("click", (e) => {
            const bookIndex = getBookIndex(e.target.parentElement)
            shelf[bookIndex].toggleStatus()
            refreshBookStatus(e.target.parentElement)
        })
    })
}

function createBookNode(book, counter) {
    const bookNode = document.createElement("div")
    bookNode.classList.add("book")
    bookNode.setAttribute("data-key", counter)
    bookNode.innerHTML = 
                `<input type="image" src="./icons/eye.svg" class="status-button">
                <button type="button" class="close-button"></button>
                <h4>${book.title}</h4>
                <div class="author">${book.author}</div>
                <div class="pages">${book.pages}</div>
                <div class="read-status">${book.isRead ? IS_READ_STATUS : NOT_READ_STATUS}</div>`
    return bookNode
}

function toggleOpen(...targets) {
    targets.forEach(target => {
        target.classList.toggle("open")
    })
}

function getBookIndex(bookNode) {
    return +bookNode.getAttribute("data-key")
}