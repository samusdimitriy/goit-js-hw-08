import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const email = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const form = document.querySelector('.feedback-form');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInputChange, 500));

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

email.value = savedData.email || '';
textarea.value = savedData.message || '';

function onInputChange(event) {
  const dataForm = { email: email.value, message: textarea.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
}

function onFormSubmit(event) {
  event.preventDefault();
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log(savedData);
  localStorage.removeItem(STORAGE_KEY);
  event.currentTarget.reset();
}
