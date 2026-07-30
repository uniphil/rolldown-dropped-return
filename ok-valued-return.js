export function valuedOk() {
  label: {
    console.log('before return');
    return 1;
  }
  console.log('unreachable!');
}
