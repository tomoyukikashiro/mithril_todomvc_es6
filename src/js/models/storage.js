const STORAGE_ID = 'todos-mithril';

export default {
  get() {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  },
  put(todo) {
    localStorage.setItem(STORAGE_ID, JSON.stringify(todo));
  }
};
