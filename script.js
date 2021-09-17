const addBtn = document.getElementById('add').addEventListener('click', () => addNewNote());

// update dom with notes in LS
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes) {
  notes.forEach(note => addNewNote(note));
}


function addNewNote(text = '') {
  const note = document.createElement('div');
  // add class
  note.classList.add('note');

  // inner html
  note.innerHTML = `
  <div class="tools">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
  <div class="main ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>`;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  // pass text to main element
  textArea.value = text;
  main.innerHTML = marked(text);

  // edit button should toggle textArea and main
  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  })

  // delete note using deleteBtn
  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLocalStorage();
  });

  // pass textarea input to main element
  textArea.addEventListener('input', (e) => {
    const {value } = e.target;

    main.innerHTML = marked(value); 

    updateLocalStorage();
  }); 

  document.body.appendChild(note);

}


// Update Local Storage function
function updateLocalStorage() {
  const textAreaItems = document.querySelectorAll('textarea');

  const notes = [];

  textAreaItems.forEach(note => notes.push(note.value));
  
  // set to local storage

  localStorage.setItem('notes', JSON.stringify(notes));
}


