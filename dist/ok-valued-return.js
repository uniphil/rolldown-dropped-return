//#region ok-valued-return.js
(function() {
	label: {
		console.log("before return");
		return 1;
	}
	console.log("unreachable!");
})();
//#endregion
