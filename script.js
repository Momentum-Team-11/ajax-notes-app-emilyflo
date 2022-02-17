const url = 'http://localhost:3000/notes/'
const notesOutput = document.getElementById('notes-output')
const notesForm = document.getElementById('notes-input')

// get a list of all notes with a GET request

function myNotes() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        for (let noteObj of data) {
            renderNoteItem(noteObj)
            console.log(noteObj)
        }
        })
}

notesForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const noteTitle = document.querySelector('#note-title').value
    const noteBody = document.querySelector('#note-body').value
    fetch(url, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: noteTitle,
            body: noteBody,
    })
})
    .then((res) => res.json())
    .then((data) => {
        renderNoteItem(data)
    })
})

notesOutput.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
    if (event.target.classList.contains('edit')) {
        editNote(event.target)
    }
})

function renderNoteItem(noteObj) {
    const noteCard = document.createElement('span')
    noteCard.id = noteObj.id
    noteCard.innerHTML = `
    <h2>${noteObj.title}</h2>
    <p>${noteObj.body}</p>
    <span class="material-icons-outlined delete">delete</span>
    <span class="material-icons edit">edit</span>
    `
    notesOutput.appendChild(noteCard)
}

function renderNoteText(noteItem, noteObj) {
    noteItem.innerHTML = `
    ${todoObj.item}
    `
}

function deleteNote(element) {
    const noteId = element.parentElement.id
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'DELETE',
    }).then(function () {
        element.parentElement.remove()
    })
}

function editNote(element) {
    const noteId = element.parentElement.id
    const noteText = document.querySelector('.edit-note')
        // const noteTitle = document.querySelector('#note-title').value
    // const noteBody = document.querySelector('#note-body').value
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            body: noteText,
        })
    })
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log(data)
        renderNoteItem(element.parentElement, data)
    })
}

function showEditInput(noteItem) {
    noteItem.innerHTML =   `
    <textarea class="edit-text" value="${noteItem.textContent}" autofocus>
    <button class="update-note" data-note=${noteBody.id}>save</button>
    <button class="cancel">nevermind</button>
    `
    noteItem.querySelector('input').select()
}

myNotes();

// moment().calendar(); 