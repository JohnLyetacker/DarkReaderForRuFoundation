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

    // FUCK FUCK THIS PAGE HAS NONSTANDARD HEADER ABORT
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
        const headerBeforeStyle = window.getComputedStyle(headerElement, '::before');
        const headerAfterStyle = window.getComputedStyle(headerElement, '::after');
        if ((headerBeforeStyle.content && headerBeforeStyle.content !== 'none') ||
            (headerAfterStyle.content && headerAfterStyle.content !== 'none')) {
            return;
        }
    }



    // Exclude specific page elements from being darkened
    const contentWrap = document.getElementById('content-wrap');
    if (contentWrap) {
        const elements = contentWrap.getElementsByTagName('*');
        for (let i = 0; i < elements.length; i++) {
            if (!elements[i].closest('.apcs-container') &&
                !elements[i].closest('.anom-bar-container') &&
                !elements[i].closest('.random-article-block') &&
                !elements[i].closest('.scp-front-button')) {
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

    /* fix this shit it doesnt work and also stops the whole script from continuing after this
        // Change color of footer links
        const pageOptionsBottom = document.getElementsByClassName('page-options-bottom');
        if (pageOptionsBottom) {
            const footerLinks = pageOptionsBottom.getElementsByTagName('a');
            for (let i = 0; i < footerLinks.length; i++) {
                footerLinks[i].style.color = "#9179E7";
            }
        }
    */

    // I hate interwiki
    document.documentElement.style.setProperty('--new-side-bar-color', '#9179e7');
    setTimeout(() => {
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
    }, 1000);
}