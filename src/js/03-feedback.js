var throttle = require('lodash.throttle');

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const LOCALSTORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

let formData = {};

function loadForm() {
  formData = load(LOCALSTORAGE_KEY);

  if (formData === undefined) {
    formData = {};
    return;
  }

  refs.input.value = formData.email === undefined ? '' : formData.email;
  refs.textarea.value = formData.message === undefined ? '' : formData.message;
}

loadForm();

refs.input.addEventListener('input', throttle(onFormData, 500));
refs.textarea.addEventListener('input', throttle(onFormData, 500));

function onFormData(e) {
  console.log(formData);
  formData[e.target.name] = e.target.value;
  save(LOCALSTORAGE_KEY, formData);
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  e.currentTarget.reset();

  console.log(formData);

  localStorage.removeItem(LOCALSTORAGE_KEY);
});
