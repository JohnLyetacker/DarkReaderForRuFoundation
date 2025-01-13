// ==UserScript==
// @name         D R F R F
// @namespace    Juno
// @version      0.1
// @description  Dark reader for RuFoundation. Adds specific dark theme for scpfoundation.net.
// @author       juno was mad
// @match        https://scpfoundation.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=scpfoundation.net
// ==/UserScript==

/* this version of the addon is only for Tampermonkey */

(function() {
    'use strict';
const pageTagsElement = document.querySelector('.page-tags');
const pageTagsText = pageTagsElement ? pageTagsElement.innerText.toLowerCase() : '';
const excludedWords = ['назидание', 'зона_17', 'word3']; // Add the words you want to exclude
const shouldExclude = excludedWords.some(word => pageTagsText.includes(word));

document.documentElement.style.setProperty('--new-side-bar-color', '#9179e7');

if (!shouldExclude) {
    document.getElementById('container-wrap').style.backgroundColor = "#1a1a1a";
    const elements = Array.from(document.getElementById('content-wrap').getElementsByTagName('*')).filter(el => !el.closest('.apcs-container'));
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#1a1a1a";
        elements[i].style.color = "#ededed";
    }

    document.getElementById('container-wrap').style.backgroundImage = "url('https://files.scpfoundation.net/local--files/theme:night-rush-theme/night-rush-header.png')";
    document.getElementById('container-wrap').style.backgroundPosition = "top left";
    document.getElementById('container-wrap').style.backgroundRepeat = "repeat-x";

    const links = document.getElementById('content-wrap').getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        links[i].style.color = "#9179E7";
        const childElements = links[i].getElementsByTagName('*');
        for (let j = 0; j < childElements.length; j++) {
            childElements[j].style.color = "#9179E7";
        }
    }
}

window.addEventListener('load', () => {
    setTimeout(() => {
        const pageTagsElement = document.querySelector('.page-tags');
        const pageTagsText = pageTagsElement ? pageTagsElement.innerText.toLowerCase() : '';
        const excludedWords = ['назидание', 'зона_17', 'word3']; // Add the words you want to exclude
        const shouldExclude = excludedWords.some(word => pageTagsText.includes(word));

        if (!shouldExclude) {
            document.getElementById('container-wrap').style.backgroundColor = "#1a1a1a";
            const elements = Array.from(document.getElementById('content-wrap').getElementsByTagName('*')).filter(el => !el.closest('.apcs-container'));
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.backgroundColor = "#1a1a1a";
                elements[i].style.color = "#ededed";
            }

            document.getElementById('container-wrap').style.backgroundImage = "url('https://files.scpfoundation.net/local--files/theme:night-rush-theme/night-rush-header.png')";
            document.getElementById('container-wrap').style.backgroundPosition = "top left";
            document.getElementById('container-wrap').style.backgroundRepeat = "repeat-x";

            const links = document.getElementById('content-wrap').getElementsByTagName('a');
            for (let i = 0; i < links.length; i++) {
                links[i].style.color = "#9179E7";
                const childElements = links[i].getElementsByTagName('*');
                for (let j = 0; j < childElements.length; j++) {
                    childElements[j].style.color = "#9179E7";
                }
            }
        }
    }, 2000);
});
})();