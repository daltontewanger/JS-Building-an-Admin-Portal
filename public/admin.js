
// can use same main() functrions from index.js to bring the book info over
async function main() {

    let response = await fetch('http://localhost:3001/listBooks')
    let books = await response.json()

    let div = document.querySelector('#root');
    div.style.listStyleType = 'none';

    books.forEach(bookQuantity)
}

function bookQuantity(book) {
    let div = document.querySelector('#root')
    let li = document.createElement('li')
    li.textContent = book.title
    let availableInput = document.createElement('input')
    availableInput.value = book.quantity
    let saveButton = document.createElement('button')
    saveButton.textContent = 'Save'

    saveButton.addEventListener('click', () => {
        fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: availableInput.value
            })
        })
    })
    li.append(availableInput, saveButton)

    div.append(li)
}

main();