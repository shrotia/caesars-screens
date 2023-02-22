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
            // Accessing specific items in the menu
            const beveragesCoffeeEntries = menu['Beverages']['data'];
            const foodSidesEntries = menu['Food']['data'];

            processMenuSection (elementsMap, beveragesCoffeeEntries);
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
function processMenuSection(elementsMap, dataEntries) {

    dataEntries.forEach(function (value) {
        const potentialKey1 =  `{{${value.SKU}/Variant1_price\}\}`;
        const potentialKey2 =  `{{${value.SKU}/Variant2_price\}\}`;

        const targetEntries = [];
        if (elementsMap.has(potentialKey1)) {
            targetEntries.push(elementsMap.get(potentialKey1));
        }

        if (elementsMap.has(potentialKey2)) {
            targetEntries.push(elementsMap.get(potentialKey2));
        }

        // Out Of Stock handling
        if (Object.prototype.hasOwnProperty.call(value,'isOutOfStock')) {
            const isOutOfStock = value['isOutOfStock'].toUpperCase() === 'TRUE' || value['isOutOfStock'].toUpperCase() === 'YES';
            if (targetEntries.length > 0 && isOutOfStock) {
                targetEntries[0].parentElement.style.display = 'none';
            }
        }

        targetEntries.forEach(function(targetElement){
            let targetValue = '';

            if (targetElement.textContent.includes(potentialKey1)) {
                targetValue = targetElement.textContent.replace(potentialKey1, `${value['Variant1_price']}`);
            }

            if (targetElement.textContent.includes(potentialKey2)) {
                targetValue = targetElement.textContent.replace(potentialKey2, `${value['Variant1_price']}`);
            }

            targetElement.textContent = targetValue;
            targetElement.style.display = ''; // un hide after setting the value
        });
    });

}