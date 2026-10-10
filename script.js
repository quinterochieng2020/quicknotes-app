// 1. Select elements using querySelector
const form = document.querySelector('#note-form');
const textInput = document.querySelector('#note-text');
const categorySelect = document.querySelector('#note-category');
const notesContainer = document.querySelector('#notes-container');

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

// 3. Render function using createElement and textContent (never innerHTML for user text)
function render() {
  // Clear the current container contents safely
  notesContainer.textContent = '';

  if (notes.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No notes yet. Add one above!';
    notesContainer.appendChild(emptyMessage);
    return;
  }

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

    // Delete button
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

    // Append card to the main container
    notesContainer.appendChild(card);
  });
}

// 4. Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = textInput.value.trim();
  const category = categorySelect.value;

  if (!text) return;

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

  // Clear input after adding
  textInput.value = '';
});

// Delete note handler
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

// Initial render call
render();