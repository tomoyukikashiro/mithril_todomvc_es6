
let m = require('mithril');

module.exports = function(ctrl) {
  var amountCompleted = ctrl.amountCompleted();
  var amountActive = ctrl.list.length - amountCompleted;

  return {tag: "footer", attrs: {id:"footer"}, children: [
    {tag: "span", attrs: {id:"todo-count"}, children: [{tag: "strong", attrs: {}, children: [amountActive]}, " item", amountActive !== 1 ? 's' : '', " left"]}, 
    {tag: "ul", attrs: {id:"filters"}, children: [
      {tag: "li", attrs: {}, children: [
        {tag: "a", attrs: {
          config:m.route, 
          class:ctrl.filter() === '' ? 'selected' : '', 
          href:"/"}, children: ["ALL"]}
      ]}, 
      {tag: "li", attrs: {}, children: [
        {tag: "a", attrs: {
          config:m.route, 
          class:ctrl.filter() === 'active' ? 'selected' : '', 
          href:"/active"}, children: ["Active"]}
      ]}, 
      {tag: "li", attrs: {}, children: [
        {tag: "a", attrs: {
          config:m.route, 
          class:ctrl.filter() === 'completed' ? 'selected' : '', 
          href:"/completed"}, children: ["Completed"]}
      ]}
    ]}, 
    amountCompleted == 0 ? '' : {tag: "button", attrs: {id:"clear-completed", onclick:ctrl.clearCompleted.bind(ctrl)}, children: ["Clear completed (", amountCompleted, ")"]}
  ]}
};
