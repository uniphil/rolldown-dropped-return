//#region repro-bare-return.js
function oops() {
	label: console.log("before return");
	console.log("unreachable!");
}
//#endregion
export { oops };
