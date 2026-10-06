// Curriculum Data Array
const curriculum = [
  { 
    id: 'python-0', 
    title: 'Python 0: The Basics', 
    status: 'completed', 
    message: 'Syntax mastered. You survived the initial Python plunge.',
    gameLink: 'https://github.com/42School/minilibx-linux',
    gameName: 'Play ft_snake'
  },
  { 
    id: 'data-science', 
    title: 'Data Science Bootcamp', 
    status: 'unlocked', 
    message: 'Pandas and NumPy conquered. Data bends to your will.',
    gameLink: 'https://github.com/42School',
    gameName: 'Play ft_pong'
  },
  { 
    id: 'machine-learning', 
    title: 'Machine Learning Core', 
    status: 'locked', 
    message: 'You are not prepared... yet.',
    gameLink: '#',
    gameName: '???'
  },
  { 
    id: 'ai-ethics', 
    title: 'AI Ethics & Alignment', 
    status: 'locked', 
    message: 'Module locked.',
    gameLink: '#',
    gameName: '???'
  }
];

const moduleList = document.getElementById('module-list');
const modal = document.getElementById('reward-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalLink = document.getElementById('modal-link');
const closeModalBtn = document.getElementById('close-modal-btn');

// 1. Render Curriculum
function renderModules() {
  curriculum.forEach(mod => {
    const li = document.createElement('li');
    li.className = `module-item ${mod.status}`;
    // Store data in the DOM element for easy retrieval
    li.dataset.id = mod.id;

    let statusText = mod.status === 'completed' ? '[ DONE ]' : 
                     mod.status === 'unlocked'  ? '[ START ]' : '[ LOCKED ]';

    li.innerHTML = `
      <span class="title">${mod.title}</span>
      <span class="status">${statusText}</span>
    `;

    moduleList.appendChild(li);
  });
}

// 2. Handle Module Clicks via Event Delegation
moduleList.addEventListener('click', (e) => {
  const item = e.target.closest('.module-item');
  if (!item) return;

  const modData = curriculum.find(m => m.id === item.dataset.id);
  
  if (modData.status === 'locked') {
    // Optional: Add a CSS shake animation class here for feedback
    return; 
  }

  // Populate Modal Data
  modalMessage.textContent = modData.message;
  modalLink.href = modData.gameLink;
  modalLink.textContent = modData.gameName;

  // Change title based on status
  modalTitle.textContent = modData.status === 'completed' ? 'MEMORY ACCESSED' : 'QUEST COMPLETE';

  // Use the native HTML5 dialog method to open it securely
  modal.showModal();
});

// 3. Close Modal Logic
closeModalBtn.addEventListener('click', () => {
  modal.close();
});

// Close modal if user clicks outside the content box
modal.addEventListener('click', (e) => {
  const dialogDimensions = modal.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close();
  }
});

// Initialize
renderModules();
