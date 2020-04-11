const state = {
    notes: [],
    lastNoteID: 0
}


const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}



const createNewNote = note => {
        const { id, title, text, date, img } = note;

        const noteElem = document.createElement('div');
        noteElem.setAttribute('data-id', id)
        noteElem.classList.add('note', 'rounded', 'm-1', 'd-flex', 'flex-column', 'w-100', 'p-4', 'border', 'col-3');

        noteElem.innerHTML = `
        <button class="note__btn-remove btn btn-transparent align-self-end mt-n3 mr-n3 w-25 fa fa-remove" onclick="removeNote(event)"></button>
        <h2 class="note__title">
            ${title}
        </h2>
        
        <p class="note__text">
            ${text}
        </p>
        ${img ? `<img src=${img} alt="note img" width="100px" class="note__img">` : ''}
        <time class="note__date">${date}</time>
       
    `

    return noteElem;
}

const removeAllNotes = notesContainer => {
    while (notesContainer.hasChildNodes()) {
        notesContainer.removeChild(notesContainer.firstChild);
    }
}


const addBtn = document.querySelector('.add-note');

const notesContainer = document.querySelector('.notes-container');

const popup = document.querySelector('.popup-container');
const popupBtn = document.querySelector('.popup-btn');

const popupSubmit = document.querySelector('.btn-submit');

popupBtn.addEventListener('click', () => {
    popup.classList.contains('hidden')
        ? null
        : popup.classList.add('hidden');
});

addBtn.addEventListener('click', () => {
    popup.classList.remove('hidden');
})

popupSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    
    const form = event.target.parentElement;
    console.log(form);
    const text = form.querySelector('#text').value;
    const title = form.querySelector('#title').value;
    
    const img = form.querySelector('#img').value;
   
    if (!title || !text) {
        alert('Required fields must be filled!');
        return;
    } else {
        const id = state.lastNoteID + 1;
        const date = new Date();

        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getDate();
        const dateString = `${day} ${month}, ${year}`;

        const note = {
            id,
            title,
            text,
            date: dateString,
            img
        }

        state.notes.push(note);

        removeAllNotes(notesContainer);

        state.notes.forEach(note => {
            const noteElem = createNewNote(note);
            notesContainer.appendChild(noteElem);
        })

        state.lastNoteID = id;

        form.querySelector('#title').value = '';
        form.querySelector('#text').value = '';
        form.querySelector('#img').value = '';
        form.parentElement.parentElement.classList.add('hidden');
    }
})

const removeNote = (event) => {
    const targetBtn = event.target;
    const parentNote = targetBtn.parentElement;
    const id = +(parentNote.dataset.id);
    
    state.notes = state.notes.filter(note => note.id !== id);

    removeAllNotes(notesContainer);

    state.notes.forEach(note => {
        const noteElem = createNewNote(note);
        notesContainer.appendChild(noteElem);
    })
}