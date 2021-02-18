self.addEventListener('message', (event) => {
  const [a, b] = event.data;
  self.postMessage(a + b);
});
