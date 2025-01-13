document.addEventListener('DOMContentLoaded', () => {
    applyStyles();
    setTimeout(applyStyles, 2000);
});

const applyStyles = () => {
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
            const style = window.getComputedStyle(children[i], '::before');
            if (style.content && style.content !== 'none') {
                return;
            }
        }
    }

    // Exclude specific page elements from being darkened
    const elements = Array.from(document.getElementById('content-wrap').getElementsByTagName('*')).filter(el => !el.closest('.apcs-container') && !el.closest('.anom-bar-container') && !el.closest('.random-article-block')/* Figure out the way to do sum sex to this element later */);
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "#1a1a1a";
        elements[i].style.color = "#ededed";
    }

    // Apply dark color to background cuz this element annoys me
    document.getElementById('container-wrap').style.backgroundColor = "#1a1a1a";

    // Change background image
    document.getElementById('container-wrap').style.backgroundImage = "url('https://files.scpfoundation.net/local--files/theme:night-rush-theme/night-rush-header.png')";
    document.getElementById('container-wrap').style.backgroundPosition = "top left";
    document.getElementById('container-wrap').style.backgroundRepeat = "repeat-x";

    // Change link colors but exclude anom-bar links
    const links = document.getElementById('content-wrap').getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
        if (!links[i].closest('.anom-bar-container') && !links[i].closest('.apcs-container')) {
            links[i].style.color = "#9179E7";
            const childElements = links[i].getElementsByTagName('*');
            for (let j = 0; j < childElements.length; j++) {
                childElements[j].style.color = "#9179E7";
            }
        }
    }
};