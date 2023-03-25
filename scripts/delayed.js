// eslint-disable-next-line import/no-cycle
import {sampleRUM} from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// FixMe: workaround to set the fluid/responsiveness typography
setTimeout(() => {
    console.log("setting heihght");
    checkAndSetTypography();
    //document.querySelector('main').style.height = '100%';
}, 2000);

async function checkAndSetTypography() {
    const htmlElement = document.querySelector('html');
    let fontSize = 73;
    while (await isScrollbarHidden(htmlElement)) {
        if (fontSize > 200) {
            break;
        }
        fontSize = fontSize + 1;
        htmlElement.style.fontSize = fontSize + '%';
        window.dispatchEvent(new Event('resize'));
        await delayTimer(500);
    }
}

async function isScrollbarHidden(element) {
    return element.offsetHeight < element.scrollHeight - 2; //threshhold = 2
}


function delayTimer(ms) {
    return new Promise(res => setTimeout(res, ms));
}