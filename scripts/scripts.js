import {
  sampleRUM,
  buildBlock,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
  populateValuesContent,
} from './lib-franklin.js';

// Map to hold Elements having templates placeholders
const placeholders = new Map();

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'project-1'; // add your RUM generation information here

function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  await nestedTable(doc);

  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

 // loadHeader(doc.querySelector('header'));
 // loadFooter(doc.querySelector('footer'));
  await layout(doc);
  await hidePlaceholders(doc);
  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.svg`);

  await populateValuesContent(placeholders);

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

/**
 *
 * @param rootDocument
 * @returns {Promise<void>}
 */
const layout = async function createMenusFlexLayout(rootDocument) {
  const beveragesFirstSectionSelector = '.section.beverages-heading';
  const beveragesFirstSectionElement = rootDocument.querySelector(beveragesFirstSectionSelector);

  const beveragesSecondSectionSelector = '.section.beverages-content';
  const beveragesSecondSectionElement = rootDocument.querySelector(beveragesSecondSectionSelector);

  if (beveragesFirstSectionElement && beveragesSecondSectionElement) {
    // create a new root div element for Beverages Menu
    const beveragesMenu = document.createElement("div");
    beveragesMenu.className = 'beverages-menu';
    rootDocument.querySelector(`main`).append(beveragesMenu);

    beveragesMenu.appendChild(beveragesFirstSectionElement);
    beveragesMenu.appendChild(beveragesSecondSectionElement);
  }

  const foodFirstSectionSelector = '.section.sweets';
  const foodFirstSectionElement = rootDocument.querySelector('.section.sweets');

  const foodSecondSectionSelector = '.section.brioche-savory';
  const foodSecondSectionElement = rootDocument.querySelector('.section.brioche-savory');

  const foodThirdSectionSelector = '.section.sides';
  const foodThirdSectionElement = rootDocument.querySelector('.section.sides');

  if (foodFirstSectionElement && foodSecondSectionElement && foodThirdSectionElement) {
    // create a new root div element for Beverages Menu
    const foodMenu = document.createElement("div");
    foodMenu.className = 'food-menu';
    rootDocument.querySelector(`main`).append(foodMenu);

    foodMenu.appendChild(foodFirstSectionElement);
    foodMenu.appendChild(foodSecondSectionElement);
    foodMenu.appendChild(foodThirdSectionElement);
  }

}

/**
 * ToDo
 * @param rootDocument
 * @returns {Promise<void>}
 */
const nestedTable = async function createAlcoholBevarageNestedTable(rootDocument) {
  const rootSelector = '.section.beverages-content';
  const beverageContentDocumentRoot = rootDocument.querySelector(rootSelector);

  if (!beverageContentDocumentRoot) {
    return;
  }

  const tableHeading = beverageContentDocumentRoot.querySelector(`${rootSelector} > div:nth-last-child(-n + 4)`);
  const wineTable = beverageContentDocumentRoot.querySelector(`${rootSelector} > div:nth-last-child(-n + 3)`);
  const champagneTable = beverageContentDocumentRoot.querySelector(`${rootSelector} > div:nth-last-child(-n + 2)`);
  const beerTable = beverageContentDocumentRoot.querySelector(`${rootSelector} > div:nth-last-child(-n + 1)`);

  // create a new nested table div element
  const alcoholBeverageNestedTableDiv = document.createElement("div");
  alcoholBeverageNestedTableDiv.className = 'alcohol-beverages-table';
  rootDocument.querySelector(`${rootSelector}`).append(alcoholBeverageNestedTableDiv);

  // create a new nested table div element
  const wineChampagneNestedTableDiv = document.createElement("div");
  wineChampagneNestedTableDiv.className = 'wine-champagne-left-table';
  wineChampagneNestedTableDiv.appendChild(wineTable);
  wineChampagneNestedTableDiv.appendChild(champagneTable);

  alcoholBeverageNestedTableDiv.appendChild(tableHeading);
  alcoholBeverageNestedTableDiv.appendChild(wineChampagneNestedTableDiv);
  alcoholBeverageNestedTableDiv.appendChild(beerTable);

}

/**
 *
 * @param rootDocument
 * @returns {Promise<void>}
 */
const hidePlaceholders = async function findAndHideTemplatePlaceholders(rootDocument) {

  const startsWithTemplateLiteral = '{{';
  const endsWithTemplateLiteral = '}}';

  // Find all the HTML elements whose text content matches the regular expression
  const matchedElements = [];
  const elements = document.getElementsByTagName('div');
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.textContent.startsWith(startsWithTemplateLiteral) && element.textContent.endsWith(endsWithTemplateLiteral)) {
      placeholders.set(element.textContent, element);
      element.style.display = 'none';
    }
  }

}