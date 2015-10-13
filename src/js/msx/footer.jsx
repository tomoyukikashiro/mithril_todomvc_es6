
let m = require('mithril');

module.exports = function(ctrl) {
  var amountCompleted = ctrl.amountCompleted();
  var amountActive = ctrl.list.length - amountCompleted;

  return <footer id="footer">
    <span id="todo-count"><strong>{amountActive}</strong> item{amountActive !== 1 ? 's' : ''} left</span>
    <ul id="filters">
      <li>
        <a
          config={m.route}
          class={ctrl.filter() === '' ? 'selected' : ''}
          href="/">ALL</a>
      </li>
      <li>
        <a
          config={m.route}
          class={ctrl.filter() === 'active' ? 'selected' : ''}
          href="/active">Active</a>
      </li>
      <li>
        <a
          config={m.route}
          class={ctrl.filter() === 'completed' ? 'selected' : ''}
          href="/completed">Completed</a>
      </li>
    </ul>
    {amountCompleted == 0 ? '' : <button id="clear-completed" onclick={ctrl.clearCompleted.bind(ctrl)}>Clear completed ({amountCompleted})</button>}
  </footer>
};
