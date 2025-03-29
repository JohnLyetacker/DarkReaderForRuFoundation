document.addEventListener('DOMContentLoaded', () => {
    applyStyles();
    startGlobalObserver();
});

function startGlobalObserver() {
    function handleMutations(mutationsList, _globalObserver) {
        for (const _mutation of mutationsList) {
            applyStyles();
            return;
        }
    }
    const globalObserver = new MutationObserver(handleMutations);
    globalObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function applyStyles() {
    const contentWrap = document.getElementById('content-wrap');
    const containerWrap = document.getElementById('container-wrap');

    // Check if page should be excluded based on tags
    const pageTagsElement = document.querySelector('.page-tags');
    const pageTagsText = pageTagsElement ? pageTagsElement.innerText.toLowerCase() : '';
    const excludedWords = [
        'назидание',
        'зона_17',
        'визуальная_тема',
        'удаления'
    ];
    const shouldExclude = excludedWords.some(word => pageTagsText.includes(word));
    if (shouldExclude) {
        return;
    }

    // Exclude specific page elements from being darkened, darken all others, whiten their font color
    if (contentWrap) {
        const elements = contentWrap.getElementsByTagName('*');
        for (let i = 0; i < elements.length; i++) {
            if (!elements[i].closest('.canon-block') &&
                !elements[i].closest('iframe') &&
                !elements[i].closest('.archieved-message') &&
                !elements[i].closest('.the-cd-ver2-container') &&
                !elements[i].closest('.apcs-container') &&
                !elements[i].closest('.anom-bar-container') &&
                !elements[i].closest('.random-article-block') &&
                !elements[i].closest('.scp-front-button') &&
                !elements[i].closest('.lb-article-class')) {
                elements[i].style.backgroundColor = "#1a1a1a";
                elements[i].style.color = "#ededed";
            }
        }
    }

    // Change background color, image etc. Check if it's black highlighter and leave.
    if (containerWrap) {
        containerWrap.style.backgroundColor = '#1a1a1a';
        containerWrap.style.backgroundPosition = 'top left';
        containerWrap.style.backgroundRepeat = 'repeat-x';
        containerWrap.style.backgroundImage = 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 1.53333px, rgba(88, 88, 88, 0.1) 2.15px, rgba(88, 88, 88, 0.2) 3.06667px)'
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
    const localObserver = new MutationObserver((mutations) => {
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
    localObserver.observe(document.body, { childList: true, subtree: true });

    // Load CSS file for system css that is not possible to apply via JS
    function loadCSS(filename) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = filename;
        document.head.appendChild(link);
    }
    loadCSS(chrome.runtime.getURL("drfrf.css"));
    localObserver.observe(document.body, { childList: true, subtree: true });
}