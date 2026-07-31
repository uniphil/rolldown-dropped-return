(function() {
  {
    console.log('before return');
    return;
  }
  console.log('unreachable!');
})();
