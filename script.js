const todoList = [
  {
    title: 'do your homework',
  },
  {
    title: 'do your work',
  },
  {
    title: 'make love',
  },
  {
    title: 'not war',
  },
];

// DOM узлы
const todoContainer = document.querySelector('.todo-list');
const form = document.querySelector('.form');
const input = document.querySelector('.form__input');

// Шаблоны
const cardTemplates = document.querySelector('#todo-template').content;
const card = cardTemplates.querySelector('.todo-card');

// Генерация карточки
const handleDelereCard = (event) => {
  event.target.closest('.todo-card').remove();
}

const handleCheckCard = (event) => {
  event.target.closest('.todo-card').classList.toggle('todo-card_checked');
}

const generateCard = (dataCard) => {
  const newCard = card.cloneNode(true);

  const title = newCard.querySelector('.todo-card__title');
  title.textContent = dataCard.title;

  const checkBtn = newCard.querySelector('.todo-card__button_check');
  checkBtn.addEventListener('click', handleCheckCard);

  const deleteBtn = newCard.querySelector('.todo-card__button_delete');
  deleteBtn.addEventListener('click', handleDelereCard);

  return newCard;
}

// Обработчики событий
const handleSubmitAddTodoForm = (event) => {
  event.preventDefault();
  renderCard({ title: input.value });
  input.value = '';
}

//Добавление карточки
const renderCard = (dataCard) => {
  todoContainer.prepend(generateCard(dataCard));
}

// Рендер всех карточек
form.addEventListener('submit', handleSubmitAddTodoForm);

todoList.forEach((dataCard) => {
  renderCard(dataCard);
})



// Перетаскивание
const cards = todoContainer.querySelectorAll('.todo-card');

todoContainer.addEventListener('dragstart', (event) => {
  event.target.classList.add('selected');
})

todoContainer.addEventListener('dragend', (event) => {
  event.target.classList.remove('selected');
})

todoContainer.addEventListener('dragover', (event) => {
  event.preventDefault();

  const activeElement = todoContainer.querySelector('.selected');
  const currentElement = event.target;
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains('todo-card');

  if (!isMoveable) {
    return;
  }

  // Находим элемент, перед которым будем вставлять
  const nextElement = (currentElement === activeElement.nextElementSibling) ?
      currentElement.nextElementSibling :
      currentElement;

  // Вставляем activeElement перед nextElement
  todoContainer.insertBefore(activeElement, nextElement);
})