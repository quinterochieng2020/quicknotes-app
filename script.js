// 1. Select elements using querySelector (updated to match #notes-list)
const form = document.querySelector('#note-form');
const textInput = document.querySelector('#note-text');
const categorySelect = document.querySelector('#note-category');
const notesList = document.querySelector('#notes-list');
const errorMessage = document.querySelector('#error-message');
const noteCountEl = document.querySelector('#note-count');

// 2. Notes array to store note objects
let notes = [];

// Helper function to generate a readable date and time
function getReadableDate() {
  const now = new Date();
  return now.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

// Update note count text dynamically
function updateNoteCount() {
  if (notes.length === 0) {
    noteCountEl.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCountEl.textContent = 'You have 1 note.';
  } else {
    noteCountEl.textContent = `You have ${notes.length} notes.`;
  }
}

// 3. Render function using createElement and textContent (never innerHTML for user text)
function render() {
  // Clear the current list contents safely
  notesList.textContent = '';

  // Update the count display
  updateNoteCount();

  notes.forEach((note) => {
    // Create note card container
    const card = document.createElement('div');
    card.className = 'note-card';

    // Small category label
    const categoryLabel = document.createElement('span');
    categoryLabel.textContent = note.category;
    categoryLabel.className = 'category-label';

    // Note text
    const textEl = document.createElement('p');
    textEl.textContent = note.text;
    textEl.className = 'note-text';

    // Date and time
    const dateEl = document.createElement('small');
    dateEl.textContent = note.createdAt;
    dateEl.className = 'note-date';

    // Delete button (removes its specific note)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
      deleteNote(note.id);
    });

    // Append elements to the card
    card.appendChild(categoryLabel);
    card.appendChild(textEl);
    card.appendChild(dateEl);
    card.appendChild(deleteBtn);

    // Append card to the main list container
    notesList.appendChild(card);
  });
}

// 4. Handle form submission & validation
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = textInput.value.trim();
  const category = categorySelect.value;

  // Validation: Check if empty or only spaces
  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }

  // Validation: Check if over 200 characters
  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  // Clear error message when validation passes
  errorMessage.textContent = '';

  // Create new note object
  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: getReadableDate()
  };

  // Add to array and re-render
  notes.push(newNote);
  render();

  // Clear the input after adding
  textInput.value = '';
});

// Delete note handler
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

// Initial render call
render();
