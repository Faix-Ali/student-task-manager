const form = document.getElementById('task-form');
const titleInput = document.getElementById('task-title');
const descInput = document.getElementById('task-desc');

const list = document.createElement('div');
list.id = 'task-list';
document.body.appendChild(list);

let tasks = [];

function render() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card' + (task.done ? ' completed' : '');

    const title = document.createElement('h3');
    title.textContent = task.title;
    const desc = document.createElement('p');
    desc.textContent = task.desc;

    const doneBtn = document.createElement('button');
    doneBtn.textContent = task.done ? 'Undo' : 'Complete';
    doneBtn.onclick = () => { tasks[index].done = !tasks[index].done; render(); };

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => { tasks.splice(index, 1); render(); };

    card.append(title, desc, doneBtn, delBtn);
    list.appendChild(card);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;
  tasks.push({ title: title, desc: descInput.value.trim(), done: false });
  form.reset();
  render();
});