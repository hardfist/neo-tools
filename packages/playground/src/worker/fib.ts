(function fib(n) {
  return n >= 1 ? fib(n - 1) + fib(n - 2) : 1;
});
