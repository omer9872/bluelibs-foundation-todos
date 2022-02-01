import {
  Kernel,
} from '@bluelibs/core';
import { AppBundle } from './bundles/App.bundle';
import { todoRoute } from './routes/todo.route';
import './env';

const kernel = new Kernel({
  bundles: [
    new AppBundle(),
    todoRoute
  ]
});

kernel.init().then(() => {
  console.log("kernel is active...");
});