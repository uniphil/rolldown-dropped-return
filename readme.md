# rolldown dropped-return repro

When rolldown encounters a value-less return (`return;` or `return undefined;` etc.) in a *labeled block*, it drops it. Any code after the block, which should not normally run after that `return`, gets executed.

It was fun times finding this due to signature verification checks in an app suceeding when run in node, and failing when built with vite 8. The specific valueless-return-in-labeled-block was from atcute: https://github.com/mary-ext/atcute/blob/5474d2d9d502c4f52c8c13162fac8c2cd8613ec6/packages/utilities/cbor/lib/encode.ts#L170-L211

## Repro setup:

```bash
npm i

# or otherwise install rolldown 1.2.1
```

run the repro:

```bash
node run-repro.js
```

The code inputs and outputs are printed to the console; outputs are also in [`dist/`](./dist/).

<details>
  <summary>Printed repro output</summary>

```
###############
# REPRO: return is dropped, we reach unreachable code
#
# input code (repro-bare-return.js):

(function() {
  label: {
    console.log('before return');
    return;
  }
  console.log('unreachable!');
})();


# code after rolldown build:

//#region repro-bare-return.js
(function() {
  label: console.log("before return");
  console.log("unreachable!");
})();
//#endregion


###############
# UNAFFECTED: unlabelled block's return is kept
#
# input code (ok-no-label.js):

(function() {
  {
    console.log('before return');
    return;
  }
  console.log('unreachable!');
})();


# code after rolldown build:

//#region ok-no-label.js
(function() {
  console.log("before return");
})();
//#endregion


###############
# UNAFFECTED: valued return is kept
#
# input code (ok-valued-return.js):

(function() {
  label: {
    console.log('before return');
    return 1;
  }
  console.log('unreachable!');
})();


# code after rolldown build:

//#region ok-valued-return.js
(function() {
  label: {
    console.log("before return");
    return 1;
  }
  console.log("unreachable!");
})();
//#endregion
```
</details>

Three inputs are present:

1. [`repro-bare-return.js`](./repro-bare-return.js): reproduces the issue ([output](./dist/repro-bare-return.js))
2. [`ok-no-label.js`](./ok-no-label.js): shows that the block must be labelled for this to occur (+actuallly eliminates the dead code) ([output](./dist/ok-no-label.js))
3. [`ok-valued-return.js`](./ok-valued-return.js): shows that returning a value prevents the problem (but note that `return undefined;` doesn't work / reproduces) ([output](./dist/ok-valued-return.js))
