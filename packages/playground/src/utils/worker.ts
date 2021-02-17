import Worker from 'worker:../worker/add.ts';
import './fn';
const worker = Worker();
worker.postMessage([2, 3]);
worker.onmessage = (evt) => {
  console.log('sum result:', evt.data);
};
