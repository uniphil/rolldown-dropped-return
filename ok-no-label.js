export function noLableOk() {
  {
    console.log('before return');
    return;
  }
  console.log('unreachable!');
}
