export function oops() {
  label: {
    console.log('before return');
    return;
  }
  console.log('unreachable!');
}
