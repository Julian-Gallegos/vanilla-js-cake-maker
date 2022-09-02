// Local Variables
// !TODO Refer to values when referencing radios that are clicked on, 
// check backend list corresponding with value1 and dereference
//  at index corresponding with value
flourIngrediants = [
    [['All-Purpose White Flour', '2 ⅔ Cup'], ['Baking Powder','1 T.'], ['Sea Salt', '½ Tsp']],
    [['Rice Flour', '1 ⅓ Cup'], ['Tapioca Starch','1 Cup'], ['Baking Powder', '3 T.'], ['Sea Salt', '½ Tsp']]
];

sweetenerIngrediants = [
    [['Evaporated Cane Sugar', '1 Cup']],
    [['Allulose ', '1 ⅓ cup']]
];

flavoringsIngrediants = [
    [['Vanilla Extract', '1 T.']],
    [['Cardamom', '½ Tsp']]
];

eggIngrediants = [
    [['Chicken Eggs', '3']],
    [['Applesauce', '¾']]
];

dairyIngrediants = [
    [['Whole Cowmilk', '¾ Cup']],
    [['Hazelnut Milk', '¾ Cup'], ['Apple Cider Vinegar', '2 T.']]
];

shorteningIngrediants = [
    [['Softened Butter', '1 Cup']],
    [['Softened Vegan Buttery Spread (Pressed, No Trans Fatty Acid)', '1 Cup']]
];

whippedIngrediants = [
    [['Whipping Cream (Heavy Cream) Chilled', '2 Cups'], ['Evaporated Cane Sugar', '2 T.'], ['Vanilla Extract (Optional)', '1 Tsp']],
    [['Coconut Cream (Chilled Overnight)', '2-3 Cans'], ['Confectioner\'s Sugar (Optional)', '2 T.'], ['Vanilla Extract (Optional)', '1 Tsp']]
];

decorationIngrediants = [
    [['Strawberries Sliced', '½ Cup']],
    [['Raspberries', '½ Cup']]
];

/*
    Order: FLour Mix, Sweetener, Flavorings, Eggs, Dairy, Shortening, Whippped Topping, Decorations
    Suborder: unordered pairs of ingrediants and amounts
    Pairs Order: [Ingrediant, Amount]
*/
finishedRecipes = [ 
    [
        [flourIngrediants[0]],
        [sweetenerIngrediants[0]],
        [flavoringsIngrediants[0]],
        [eggIngrediants[0]],
        [dairyIngrediants[0]],
        [shorteningIngrediants[0]],
        [whippedIngrediants[0]],
        [decorationIngrediants[0]]
    ],
    [
        [flourIngrediants[1]],
        [sweetenerIngrediants[1]],
        [flavoringsIngrediants[1]],
        [eggIngrediants[1]],
        [dairyIngrediants[1]],
        [shorteningIngrediants[1]],
        [whippedIngrediants[1]],
        [decorationIngrediants[1]]
    ]
]

let customButtonClicked = [0,0,0,0,0,0,0,0] // 0 = custom forms closed, 1 = open
let customFormSizes = [0,0,0,0,0,0,0,0]
// Event Listeners
if (document.URL.includes("ingrediants.html")) {
    let customs = document.querySelectorAll('.custom');
    for (let i = 0; i < customs.length; i++) {
        customs[i].addEventListener('click', handleClickCustom);
    }

    document.querySelector('.submit.custom').addEventListener('click', handleSubmitIngrediants);
}

// Event Handlers
function handleClickCustom(e) {
    let indexNum = Number(e.target.value); 
    if (customButtonClicked[indexNum]) { // custom button form already opened
        document.getElementById('ul'+(indexNum+1)).innerHTML = '';
        document.querySelector('[value="addcustom'+(indexNum+1)+'"]').remove();
        document.querySelector('[value="submitcustom'+(indexNum+1)+'"]').remove();
        let removeButton = document.querySelector('[value="removecustom'+(indexNum+1)+'"]');
        if (removeButton) {
            removeButton.remove();
        }
        customButtonClicked[indexNum] = 0;
        customFormSizes[indexNum] = 0;
        e.target.innerText = 'CUSTOM MIX';
    } else { // custom button form has not been opened yet
        let ul = document.getElementById('ul'+(indexNum+1));
        let li = document.createElement('li');
        li.innerHTML = `
            <form>
                <input type="text" placeholder="Ingrediant ..." name="customInputIngrediant1">
                <input type="text" placeholder="Amount ..." name="customInputAmount1">
            </form>
        `;
        customButtonClicked[indexNum] = 1;
        customFormSizes[indexNum] = 1;
        li.classList.add('input' + indexNum + 'li' + customFormSizes[indexNum]);
        ul.appendChild(li);

        let buttonAdd = document.createElement('button');
        let buttonSubmit = document.createElement('button');
        buttonAdd.type = 'button';
        buttonSubmit.type = 'submit';
        buttonAdd.value = 'addcustom' + (indexNum+1);
        buttonSubmit.value = 'submitcustom' + (indexNum+1);
        buttonAdd.index = ''+indexNum;
        buttonSubmit.index = ''+indexNum;
        buttonAdd.innerText = 'Add To Mix';
        buttonSubmit.innerText = 'Submit Mix';
        buttonAdd.classList.add('custombuttons');
        buttonSubmit.classList.add('custombuttons');
        buttonAdd.addEventListener('click', handleClickCustomAddRemoveOrSubmit);
        buttonSubmit.addEventListener('click', handleClickCustomAddRemoveOrSubmit);
        ul.insertAdjacentElement('afterend', buttonSubmit);
        ul.insertAdjacentElement('afterend', buttonAdd);
        e.target.innerText = 'CANCEL';
    }
}

function handleClickCustomAddRemoveOrSubmit(e) {
    let indexNum = Number(e.target.index);
    if (e.target.value == 'addcustom'+(indexNum+1)) { // If Add To Mix Clicked
        let ul = document.getElementById('ul'+(indexNum+1));
        let li = document.createElement('li');
        if (!document.querySelector('[value="removecustom'+(indexNum+1)+'"]')) { // If there is no Remove From Mix button
            let buttonRemove = document.createElement('button');
            buttonRemove.type = 'button';
            buttonRemove.value = 'removecustom' + (indexNum+1);
            buttonRemove.index = ''+indexNum;
            buttonRemove.innerText = 'Remove From Mix';
            buttonRemove.classList.add('custombuttons');
            buttonRemove.addEventListener('click', handleClickCustomAddRemoveOrSubmit);
            ul.insertAdjacentElement('afterend', buttonRemove);
        }
        li.innerHTML = `
            <form>
                <input type="text" placeholder="Ingrediant ..." name="customInputIngrediant` + customFormSizes[indexNum] + `">
                <input type="text" placeholder="Amount ..." name="customInputAmount` + customFormSizes[indexNum] + `">
            </form>
        `;
        customFormSizes[indexNum]++;
        li.classList.add('input' + indexNum + 'li' + customFormSizes[indexNum]);
        ul.appendChild(li);
    } else if (e.target.value == 'removecustom'+(indexNum+1)) { // If Remove From Mix Clicked
        console.log('.' + indexNum + 'li' + customFormSizes[indexNum]);
        document.querySelector('.input' + indexNum + 'li' + customFormSizes[indexNum]).remove();
        customFormSizes[indexNum]--;
        if (customFormSizes[indexNum] == 1) {
            e.target.remove();
        }
    } else { // If Submit Mix Clicked
        
    }
}

function handleSubmitIngrediants() {

}

// Helper Functions
function store(key, value) {
    //local storage
    localStorage.setItem(key,JSON.stringify(value));
}
function retrieve(key){
    let value = JSON.parse(localStorage.getItem(key));
    return value;
}
//on start
(function(){
    let test = localStorage.getItem('cakes');
    if (test) {
        if (document.URL.includes("index.html")) {
            let h2 = document.createElement('h2');
            let body = document.querySelector('body');
            h2.innerHTML = 'Welcome back!';
            h2.className = 'index';
            body.appendChild(h2);
        }
    } else if (document.URL.includes("index.html")) {
        let h2 = document.createElement('h2');
        let body = document.querySelector('body');
        h2.innerHTML = 'Make your first cake!';
        h2.className = 'index';
        body.appendChild(h2);
    }
})();