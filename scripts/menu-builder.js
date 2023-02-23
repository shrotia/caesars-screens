/**
 *
 * @param rootDocument
 * @returns {Promise<void>}
 */
export const layout = async function createMenusFlexLayout(rootDocument) {
    await nestedBeveragesTable(rootDocument);
    await nestedFoodTable(rootDocument);
}

/**
 * ToDo
 * @param rootDocument
 * @returns {Promise<void>}
 */
const nestedBeveragesTable = async function createAlcoholBevarageNestedTable(rootDocument) {
    const beveragesHeadingSection = '.section.beverages-heading';
    const beveragesCoffeeSection = '.section.beverages-coffee';
    const beveragesAlcoholicSection = '.section.beverages-alcoholic';

    const beveragesHeadingDocumentRoot = rootDocument.querySelector(beveragesHeadingSection);
    const beveragesCoffeeDocumentRoot = rootDocument.querySelector(beveragesCoffeeSection);
    const beveragesAlcoholicDocumentRoot = rootDocument.querySelector(beveragesAlcoholicSection);

    if (beveragesHeadingDocumentRoot && beveragesCoffeeDocumentRoot && beveragesAlcoholicDocumentRoot) {
        const parentElement = beveragesHeadingDocumentRoot.parentElement;
        // create a new nested table div element for Beverages Table
        const alcoholBeverageNestedTableDiv = document.createElement("div");
        alcoholBeverageNestedTableDiv.className = 'beverages-table';
        parentElement.append(alcoholBeverageNestedTableDiv);

        alcoholBeverageNestedTableDiv.append(beveragesHeadingDocumentRoot);
        alcoholBeverageNestedTableDiv.append(beveragesCoffeeDocumentRoot);
        alcoholBeverageNestedTableDiv.append(beveragesAlcoholicDocumentRoot);
    }
}

/**
 *
 * @param rootDocument
 * @returns {Promise<void>}
 */
const nestedFoodTable = async function createFoodNestedTable(rootDocument) {
    const foodHeadingSection = '.section.food-heading';
    const foodSweetsSection = '.section.sweets';
    const foodBriocheSavorySection = '.section.brioche-savory';
    const foodSidesSection = '.section.sides';

    const foodHeadingDocumentRoot = rootDocument.querySelector(foodHeadingSection);
    const foodSweetsDocumentRoot = rootDocument.querySelector(foodSweetsSection);
    const foodBriocheSavoryDocumentRoot = rootDocument.querySelector(foodBriocheSavorySection);
    const foodSidesDocumentRoot = rootDocument.querySelector(foodSidesSection);

    if (foodHeadingDocumentRoot && foodSweetsDocumentRoot && foodBriocheSavoryDocumentRoot && foodSidesDocumentRoot) {
        const parentElement = foodHeadingDocumentRoot.parentElement;
        // create a new nested table div element for Food Table
        const foodNestedTableDiv = document.createElement("div");
        foodNestedTableDiv.className = 'food-table';
        parentElement.append(foodNestedTableDiv);

        foodNestedTableDiv.append(foodHeadingDocumentRoot);
        foodNestedTableDiv.append(foodSweetsDocumentRoot);
        foodNestedTableDiv.append(foodBriocheSavoryDocumentRoot);
        foodNestedTableDiv.append(foodSidesDocumentRoot);
    }

}

/**
 *
 * @param rootDocument
 * @returns {Promise<void>}
 */
export const hidePlaceholders = async function findAndHideTemplatePlaceholders(rootDocument, elementsMap) {

    const startsWithTemplateLiteral = '{{';
    const endsWithTemplateLiteral = '}}';

    // Find all the HTML elements whose text content matches the regular expression
    const matchedElements = [];
    const elements = document.getElementsByTagName('div');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (!element.querySelector('div') && element.textContent.includes(startsWithTemplateLiteral) && element.textContent.includes(endsWithTemplateLiteral)) {
            elementsMap.set(element.textContent.substring(element.textContent.indexOf(startsWithTemplateLiteral), element.textContent.indexOf(endsWithTemplateLiteral) + 2), element);
            element.style.display = 'none';
        }
    }

}