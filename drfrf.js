document.addEventListener('DOMContentLoaded', () => {
    applyStyles();
    setTimeout(applyStyles, 4000);
});

function applyStyles() {
    // Check if page should be excluded based on tags
    const pageTagsElement = document.querySelector('.page-tags');
    const pageTagsText = pageTagsElement ? pageTagsElement.innerText.toLowerCase() : '';
    const excludedWords = ['назидание', 'зона_17', 'визуальная_тема']; // Tags to exclude pages with other themes
    const shouldExclude = excludedWords.some(word => pageTagsText.includes(word));
    if (shouldExclude) {
        return;
    }

    // FUCK FUCK THIS PAGE HAS NONSTANDARD HEADER ALL ABANDON SHIP
    const headerElement = document.getElementById('header');
    if (headerElement) {
        const children = headerElement.getElementsByTagName('*');
        for (let i = 0; i < children.length; i++) {
            const beforeStyle = window.getComputedStyle(children[i], '::before');
            const afterStyle = window.getComputedStyle(children[i], '::after');
            if ((beforeStyle.content && beforeStyle.content !== 'none') ||
                (afterStyle.content && afterStyle.content !== 'none')) {
                return;
            }
            
        }
        //do i need this shit?
        /*const headerBeforeStyle = window.getComputedStyle(headerElement, '::before');
        const headerAfterStyle = window.getComputedStyle(headerElement, '::after');
        if ((headerBeforeStyle.content && headerBeforeStyle.content !== 'none') ||
            (headerAfterStyle.content && headerAfterStyle.content !== 'none')) {
            return;
        }*/
        /*const h1Elements = headerElement.getElementsByTagName('h1');
        for (let i = 0; i < h1Elements.length; i++) {
            const aElements = h1Elements[i].getElementsByTagName('a');
            for (let j = 0; j < aElements.length; j++) {
                //const spanElements = aElements[j].getElementsByTagName('span');
                //for (let k = 0; k < spanElements.length; k++) {
                    const aBeforeStyle = window.getComputedStyle(aElements[k], '::before');
                    const aAfterStyle = window.getComputedStyle(aElements[k], '::after');
                    if ((aBeforeStyle.content && aBeforeStyle.content !== 'none') ||
                        (aAfterStyle.content && aAfterStyle.content !== 'none')) {
                        return;
                    }
               // }
            }
        }*/
    }

    // Exclude specific page elements from being darkened
    const contentWrap = document.getElementById('content-wrap');
    if (contentWrap) {
        const elements = contentWrap.getElementsByTagName('*');
        for (let i = 0; i < elements.length; i++) {
            if (!elements[i].closest('.apcs-container') &&
                !elements[i].closest('.anom-bar-container') &&
                !elements[i].closest('.random-article-block') &&
                !elements[i].closest('.scp-front-button') &&
                !elements[i].closest('.lb-article-class')) {
                elements[i].style.backgroundColor = "#1a1a1a";
                elements[i].style.color = "#ededed";
            }
        }
    }

    // Change background color
    const containerWrap = document.getElementById('container-wrap');
    if (containerWrap) {
        containerWrap.style.backgroundColor = "#1a1a1a";

        // Change background image
        containerWrap.style.backgroundImage = "url('https://files.scpfoundation.net/local--files/theme:night-rush-theme/night-rush-header.png')";
        containerWrap.style.backgroundPosition = "top left";
        containerWrap.style.backgroundRepeat = "repeat-x";
    }

    // Change color of links
    if (contentWrap) {
        const links = contentWrap.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
            if (!links[i].closest('.anom-bar-container') && !links[i].closest('.apcs-container') && !links[i].closest('.scp-front-button')) {
                if (links[i].className === 'newpage') {
                    links[i].style.color = "#d61";
                    continue;
                }
                links[i].style.color = "#9179E7";
                const childElements = links[i].getElementsByTagName('*');
                for (let j = 0; j < childElements.length; j++) {
                    childElements[j].style.color = "#9179E7";
                    // Change color of elements with .scp-front-title class
                    const scpFrontTitleElements = document.getElementsByClassName('scp-front-title');
                    if (scpFrontTitleElements.length > 0) {
                        for (let i = 0; i < scpFrontTitleElements.length; i++) {
                            scpFrontTitleElements[i].style.color = "#1a1a1a";
                        }
                    }
                }
            }
        }
    }

    // I hate interwiki
    document.documentElement.style.setProperty('--new-side-bar-color', '#9179e7');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                const interwikiContainer = document.getElementsByClassName('w-interwiki');
                if (interwikiContainer.length > 0) {
                    for (let i = 0; i < interwikiContainer.length; i++) {
                        const sideBlockElements = interwikiContainer[i].getElementsByClassName('side-block');
                        for (let j = 0; j < sideBlockElements.length; j++) {
                            sideBlockElements[j].style.backgroundColor = "#1a1a1a";
                            const links = sideBlockElements[j].getElementsByTagName('a');
                            for (let k = 0; k < links.length; k++) {
                                links[k].style.color = "#9179E7";
                            }
                        }
                    }
                }
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Load CSS file for system css that is not possible to apply via JS
    function loadCSS(filename) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = filename;
        document.head.appendChild(link);
    }
    loadCSS(chrome.runtime.getURL("drfrf.css"));
    observer.observe(document.body, { childList: true, subtree: true });
}