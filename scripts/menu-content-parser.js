const posData = 'https://main--caesars-screens--shrotia.hlx.live/screens/caesars/restaurants/menus/pos-data.json';
//const posData = 'http://localhost:3000/screens/caesars/restaurants/menus/pos-data.json';

export const startsWithTemplateLiteral = '{{';
export const endsWithTemplateLiteral = '}}';

// parse value JSON and mutate Menu HTML content
/**
 *
 * @param elements
 * @returns {Promise<void>}
 */
export async function populateValuesContent(elementsMap) {

    fetch(posData)
        .then(response => response.json())
        .then(menu => {
            processMenuSection (elementsMap, menu);
        })
        .catch(error => {
            // Handle any errors that occurred during the HTTP request
            console.log(error);
        });


}

/**
 *
 * @param elements
 * @param beveragesCoffeeEntries
 */
function processMenuSection(elementsMap, menuJsonPayload) {

    elementsMap.forEach(function (targetElement, jsonQuery) {
       const targetValue = jsonpath.query(menuJsonPayload, jsonQuery.replace('{{', '').replace('}}', ''));

       if (targetValue && targetValue.length > 0) {
           targetElement.textContent = targetElement.textContent.replace(jsonQuery, targetValue[0]);
           targetElement.style.display = ''; // un hide after setting the value
       }
    });
}