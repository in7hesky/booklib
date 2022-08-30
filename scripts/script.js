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

function refreshShelf() {
    const booksWrapper = document.querySelector(".books-wrapper")
    let counter = 0
    booksWrapper.innerHTML = ""
    shelf.forEach(book => {
        booksWrapper.appendChild(createBookNode(book, counter++))
    })
}

function createBookNode(book, counter) {
    const bookNode = document.createElement("div")
    bookNode.classList.add("book")
    bookNode.setAttribute("data-key", counter)

    const titleNode = document.createElement("h4")
    titleNode.textContent = book.title

    const authorNode = document.createElement("div")
    authorNode.textContent = book.author
    authorNode.classList.add("author")

    const pagesNode = document.createElement("div")
    pagesNode.textContent = book.pages
    pagesNode.classList.add("pages")

    const isReadNode = document.createElement("div")
    isReadNode.classList.add(".is-read")
    isReadNode.textContent = book.isRead ? "Have been read" : "Not read yet"

    return appendChildren(bookNode, titleNode, authorNode, pagesNode, isReadNode)
}

function appendChildren(parent, ...children) {
    children.forEach(child => {
        parent.appendChild(child)
    })
    return parent
}

function toggleOpen(...targets) {
    targets.forEach(target => {
        target.classList.toggle("open")
    })
}