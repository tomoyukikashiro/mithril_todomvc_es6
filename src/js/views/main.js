
let m = require('mithril');
let footer = require('./footer');
let ENTER_KEY = 13;
let ESCAPE_KEY = 27;

// view util
function watchInput(onenter, onescape) {
  return function(e)  {
    m.redraw.strategy('none');
    if (e.keyCode === ENTER_KEY) {
      onenter();
      m.redraw.strategy('diff');
    } else if (e.keyCode === ESCAPE_KEY) {
      onescape();
      m.redraw.strategy('diff');
    }
  }
}

function itemList(ctrl) {
  return ctrl.list.filter(ctrl.isVisible.bind(ctrl)).map(function(task, index) {
    return {tag: "li", attrs: {class:function(){
      let classes = '';
      classes += task.completed() ? 'completed' : '';
      classes += task.editing() ? ' editing' : '';
      return classes;}(), key:"{task.key}"}, children: [
      {tag: "div", attrs: {class:"view"}, children: [
        {tag: "input", attrs: {class:"toggle", type:"checkbox", onclick:m.withAttr('checked', ctrl.complete.bind(ctrl, task)), checked:task.completed()}}, 
        {tag: "label", attrs: {ondblclick:ctrl.edit.bind(ctrl, task)}, children: [task.title()]}, 
        {tag: "button", attrs: {class:"destroy", onclick:ctrl.remove.bind(ctrl, index)}}
      ]}, 
      {tag: "input", attrs: {class:"edit", 
        type:"text", 
        value:task.title(), 
        onblur:ctrl.doneEditing.bind(ctrl, task, index), 
        onkeyup:watchInput(
          ctrl.doneEditing.bind(ctrl, task, index),
          ctrl.cancelEditing.bind(ctrl, task)
        ), 
        oninput:m.withAttr('value', function(value) {
          m.redraw.strategy('none');
          task.title(value);
        }), 
        config:function(element){
          if (task.editing()) {
            element.focus();
          }
        }}}
      ]}
  });
}

module.exports = function(ctrl) {
  let focused = false;
  return {tag: "div", attrs: {}, children: [{tag: "header", attrs: {}, children: [
           {tag: "h1", attrs: {}, children: ["todos"]}, 
           {tag: "input", attrs: {id:"new-todo", type:"text", placeholder:"What needs to be done?", value:ctrl.title(), 
            onkeyup:watchInput(ctrl.add.bind(ctrl), ctrl.clearTitle.bind(ctrl)), 
            oninput:m.withAttr('value', ctrl.title), 
            config:function(element) {
              if (!focused) {
                element.focus();
                focused = true;
              }
            }}}]}, 
    {tag: "section", attrs: {id:"main"}, children: [
      {tag: "input", attrs: {id:"toggle-all", type:"checkbox", 
        onclick:ctrl.completeAll.bind(ctrl), 
        checked:ctrl.allCompleted()}}, 
      {tag: "ul", attrs: {id:"todo-list"}, children: [
        itemList(ctrl)
      ]}
    ]}, 
    ctrl.list.length === 0 ? '' : footer(ctrl)]}
};
