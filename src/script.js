let update = new Event('inventoryUpdate');

function extension() {
	waitForVar('TralbumData', () => {
		if (TralbumData.packages != null && typeof TralbumData.packages !== 'undefined') {
			window.addEventListener('inventoryUpdate', debounceEvent(() => buildHTML(TralbumData.packages), 100));
			window.dispatchEvent(update);
		}
	});
}

function buildHTML(parent) {
	console.log('[BANDCAMP REMAINING COPIES EXTENSION]: Inventory update, building new HTML for items in stock');

	let elmt = e({ 'type': 'div', 'class': 'remainingQuantity buyItem', 'id': 'BandcampRemainingCopiesExtension' });
	parent.forEach(element => {
		//watch variable to rebuild HTML in case the page updates
		watchVariable
			(element, 'quantity_available', () => {
				window.dispatchEvent(update);
			});

		let number = element.quantity_available;

		let h3 = e({ 'type': 'h3' }, element.title, ': ');

		let unavailable = { 'type': 'span', 'style': 'font-style: italic; font-weight:normal' };
		let boldRed = { 'type': 'span', 'class': 'notable' };
		let normal = { 'type': 'span', 'style': 'font-weight:normal' };

		if (number == 0)
			h3.a(e(unavailable, 'no copies available'));
		else if (number == null)
			h3.a(e(unavailable, 'no availability info'));
		else if (number == 1)
			h3.a(e(boldRed, '1'), e(normal, ' copy in stock'));
		else
			h3.a(e(boldRed, number), e(normal, ' copies in stock'));

		elmt.a(e({ 'type': 'span', 'class': 'lightweightBreak' }), h3);
	});

	if (document.getElementById('BandcampRemainingCopiesExtension') != null && document.getElementById('BandcampRemainingCopiesExtension') !== 'undefined')
		document.getElementById('BandcampRemainingCopiesExtension').remove();

	document.getElementById('name-section').a(elmt);
}

function insertAfter(newNode, referenceNode) {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * Watches a property of an object for changes and invokes a callback function
 * whenever the property is updated.
 *
 * @param {Object} object - The object containing the property to watch.
 * @param {string} name - The name of the property to be watched.
 * @param {Function} callback - The function to be called when the property changes.
 *                              This function receives the new value as its only argument.
 *
 * @example
 * const data = { name: 'Alice' };
 * 
 * watchVariable(data, 'name', (newValue) => {
 *     console.log(`Name changed to: ${newValue}`);
 * });
 * 
 * data.name = 'Bob'; // Logs: "Name changed to: Bob"
 */
function watchVariable(object, name, callback) {
	let value = object[name];

	Object.defineProperty(object, name, {

		get: () => {
			return value;
		},

		set: (newValue) => {
			value = newValue;
			callback(value);
		},

		enumerable: true,
		configurable: true
	});
}

function waitForVar(variable, callback) {
	if (window[variable] !== undefined) {
		callback();
	}
	else {
		setTimeout(() => {
			waitForVar(variable, callback);
		}, 100);
	}
}

function e(data, ...content) {
	let elmt;

	if (data.type)
		elmt = document.createElement(data.type);
	else
		elmt = document.createElement('div');

	if (data.id)
		elmt.id = data.id;

	if (data.class)
		elmt.className = data.class;

	if (data.style)
		elmt.style.cssText = data.style;

	elmt.a(...content);

	return elmt;
}

HTMLElement.prototype.a = function (...toAppend) {
	let obj = this;
	toAppend.forEach(element => {
		if (typeof element == 'string' || element instanceof String || typeof element == 'number' || element instanceof Number)
			obj.insertAdjacentText('beforeend', element);
		else {
			obj.onload = function () {
				this.remove();
			};
			obj.appendChild(element);
		}
	}
	)
};

HTMLElement.prototype.remove = function () {
	this.parentElement.removeChild(this);
}

function debounceEvent(callback, time = 250) {
    let interval; // Declare the interval variable to hold the timeout ID

    return function(...args) {
        clearTimeout(interval); // Clear the existing timeout
        interval = setTimeout(() => callback(...args), time); // Set a new timeout
    };
}

window.addEventListener('load', extension());
