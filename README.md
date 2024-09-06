# BandcampRemainingCopiesExtension

A browser extension that tells you the number of remaining copies of a record on bandcamp.

## Installation

### Chrome

1. Download this repo as a zip file and unpack it.
2. Rename manifest_chrome.json to just manifest.json and delete manifest_firefox.json
3. In Chrome, go to _Chrome menu/More tools/Extensions_.
4. Enable developer mode in the top right corner.
5. Click on "load unpacked" and navigate to the folder of the unpacked extension, or drag and drop the unpacked folder on the Extensions page

### Firefox

You can install the extension from the [Mozilla Add-Ons page](https://addons.mozilla.org/de/firefox/addon/bandcamp-stock-count/).

Alternatively, you can manually install it following these steps:

1. Download or clone this repo to your machine
2. Rename manifest_firefox.json to just manifest.json and delete manifest_chrome.json
3. Open [about:debugging#/runtime/this-firefox}(about:debugging#/runtime/this-firefox) in Firefox
4. Click on "load temporary add-on" and select one of the files inside the downloaded extension
