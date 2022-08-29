const addButton = document.querySelector(".add-button")

const modalWrapper = document.querySelector(".modal-wrapper")
const modal = document.querySelector(".modal")

addButton.addEventListener("click", () => {
    toggleOpen(modalWrapper, modal)
})

modalWrapper.addEventListener("click", () => {
    toggleOpen(modalWrapper, modal)
})

modal.addEventListener("click", (e) => {
    e.stopPropagation()
})

function toggleOpen(...targets) {
    targets.forEach(target => {
        target.classList.toggle("open")
    })
}