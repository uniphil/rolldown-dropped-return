(function() {
  label: {
    console.log('before return');
    return;
  }
  console.log('unreachable!');
})();
