//#region ok-valued-return.js
function valuedOk() {
	label: {
		console.log("before return");
		return 1;
	}
	console.log("unreachable!");
}
//#endregion
export { valuedOk };
