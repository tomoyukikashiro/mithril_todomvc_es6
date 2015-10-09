
import m from 'mithril';
import storage from './../models/storage';
import TodoModel from './../models/todo';

export default class Todo {
  constructor(){
    this.list = storage.get();
    this.list = this.list.map((item) => {
      return new TodoModel(item);
    });
    this.title = m.prop('');
    this.filter = m.prop(m.route.param('filter') || '');
  }

  add(){
    var title = this.title().trim();
    if (title) {
      this.list.push(new TodoModel({
        title: title
      }));
      storage.put(this.list);
    }
    this.title('');
  }

  isVisible(todo) {
    switch (this.filter()) {
      case 'active':
        return !todo.completed();
      case 'completed':
        return todo.completed();
      default:
        return true;
    }
  }

  complete(todo) {
    if (todo.completed()) {
      todo.completed(false);
    } else {
      todo.completed(true);
    }
    storage.put(this.list);
  }

  edit(todo) {
    todo.previousTitle = todo.title();
    todo.editing(true);
  }

  doneEditing(todo, index) {
    if (!todo.editing()) {
      return;
    }
    todo.editing(false);
    todo.title(todo.title().trim());
    if (!todo.title()) {
      this.list.splice(index, 1);
    }
    storage.put(this.list);
  }

  cancelEditing(todo) {
    todo.title(todo.previousTitle);
    todo.editing(false);
  }

  clearTitle() {
    this.title('');
  }

  remove(key) {
    this.list.splice(key, 1);
    storage.put(this.list);
  }

  clearCompleted() {
    let me = this;
    this.list.forEach(function(item, i){
      if(item.completed()){
        me.list.splice(i, 1);
      }
    });
    storage.put(this.list);
  }

  amountCompleted() {
    let amount = 0;
    this.list.forEach(function(item) {
      if(item.completed()){
        amount++;
      }
    });
    return amount;
  }

  allCompleted() {
    let flg = true;
    this.list.forEach(function(item) {
      if(!item.completed()){
        flg = false;
      }
    });
    return flg;
  }

  completeAll() {
    let allCompleted = this.allCompleted();
    this.list.forEach(function(item) {
      item.completed(!allCompleted);
    });
    storage.put(this.list);
  }
}
