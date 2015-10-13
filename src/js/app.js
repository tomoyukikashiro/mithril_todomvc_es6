
import m from 'mithril';
import controller from './controllers/todo';
import view from './views/main';

let component = {controller, view};

m.route.mode = 'hash';
m.route(document.getElementById('todoapp'), '/', {
  '/': component,
  '/:filter': component
});
