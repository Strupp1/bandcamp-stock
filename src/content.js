window.addEventListener("pageshow", function () {
	console.log("BC Stock Count Extension Loaded!");
	var s = document.createElement('script');
	s.src = browser.runtime.getURL('src/script.js');
	s.onload = function () {
		this.remove();
	};
	(document.head || document.documentElement).appendChild(s);
});
