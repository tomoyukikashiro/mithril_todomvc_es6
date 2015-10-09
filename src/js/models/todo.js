import m from 'mithril';

function uniqueId(){
  let count = 0;
  return () => {
    return ++count;
  }
}

export default class TodoModel {
  constructor(data) {
    this.title = m.prop(data.title);
    this.completed = m.prop(data.completed || false);
    this.editing = m.prop(data.editing || false);
    this.key = uniqueId();
  }
}
