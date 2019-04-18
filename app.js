/*SUMMARY

    1- BUGET CONTROLLER ======
    2- UI CONTROLLER ======
    3- GLOBAL APP CONTROLLER ======

*/

//1- BUGET CONTROLLER ======
let budgetController = (function () { 
    let Expense = function (id, description, value) { // depenses
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function (id, description, value) { // revenus
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let calculateTotal = function(type) { //total des depenses et recettes
        let sum = 0; //initialise la somme à 0

// s'ajoutera la valeur initiale + la valeur actuel, la sommme deviendra la valeur initiale et on recommence l'operation pour chaque valeur
        data.allItems[type].forEach(function(cur) { 
            sum += cur.value; // sum = sum + cur.value;
        });
        data.totals[type] = sum;  //total
        // console.log("somme "+sum);
    };

    let data = { // tableau pour stocker toutes les données des depenses et gains + TOT
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;
            
            if (data.allItems[type].length > 0) { // Create new ID
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            if (type === 'exp') { //selectionne le type (exp) ou (inc)
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            //ajout des données dans le tableau
            data.allItems[type].push(newItem)
            // console.log(newItem); //affiche un tableau avec le type => (+/-)
            // console.log('ID: '+ID);

            // return the Element
            return newItem;     
        },

        deleteItem:function(type, id) {
            let ids,index;

            ids = data.allItems[type].map(function(current){
                return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index,1);
            }
        },

        calculateBudget:function () { // calcule le depense et recette + total
            // total depense et recette
            calculateTotal('exp');
            calculateTotal('inc');

            // difference entre totale recettes et total depenses
            data.budget = data.totals.inc - data.totals.exp;
            console.log("total budget: " + data.budget+"€");
            

            // pourcentage du revenu depensé arrondis à l'entier proche
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc ) * 100);
                console.log("pourcentage: " + data.percentage+"%");
            } else {
                data.percentage = -1;
                // console.log("calcul pourcentage impossible...");
                // alert("Calcul du pourcentage impossible...");
                
            }    
        },

        getBudget: function () { // affiche le budget, totalrevenu,totaldepensense et pourcentage dans un array
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);

        }
    };
})();


//2- UI CONTROLLER ======
let UIController = (function () {

    
    let DOMstrings = { // remplace les classes du fichier HTML par des valeur
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel:'.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        deleteBtn:'.item__delete--btn'
    }

    return {
        getInput: function () { 
            return {
                type: document.querySelector(DOMstrings.inputType).value, // le type => soit gain(+/inc) soit depense(-/exp)
                description: document.querySelector(DOMstrings.inputDescription).value,// description de la depense ou du gain
                value: parseFloat( document.querySelector(DOMstrings.inputValue).value)//valeur de la depense ou du gain
            };
        },

        addListItem: function (obj, type) { //ajoute les données dans l'UI
            // Create texte HTML avec placeholder
            let html, newhtml, element;

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            // Replace placeholder text
            newhtml = html.replace('%id%', obj.id);
            newhtml = newhtml.replace('%description%', obj.description);
            newhtml = newhtml.replace('%value%', obj.value);
            // console.log(newhtml);
            

            // Inserer le HTML dans le DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);
            // console.log(element);    

        },

        deleteListItem:function(selectorID) {
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
 
        },

        clearFields: function() { //efface le texte dans le champs à chaque validation
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArr[0].focus(); // permet de se positionner dans le premier champ à chaque validation

            // console.log(fieldsArr);
        },

        displayBudget: function(obj) { //affiche le TOT des données dans l'UI
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
            
            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage+'%';
            }else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            

        },

        getDOMstrings: function () { // retourne l'objet DOMstring
            return DOMstrings;
        }
    };

})();


//3- GLOBAL APP CONTROLLER ======
let controller = (function (budgetCtrl, UICtrl) {

    let setupEventListenners = function () { // declencheur 
        let DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        //va declencher un evenement du click
        document.addEventListener('keypress', function (event) {
        // Si la touche ENTER est préssé => on appelle la fontion ctrlAddItem()
            if (event.keycode == 13 || event.which === 13) {
                ctrlAddItem(); //on appelle la fonction ctrlAddItem()
            }
        });

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };


    let updateBudget = function () {  //Mise a jour du budget
        // 1. Calcule le budget
        budgetCtrl.calculateBudget();
        // 2. return the Budget
        let budget = budgetCtrl.getBudget();
        // 3. Affiche le budget sur UI
        console.log(budget);//liste avc budget,pourcentage,TOT(+/-)
        UICtrl.displayBudget(budget);
        
    };

    let ctrlAddItem = function () { // AJout des item dasn l'UI
        let input, newItem;

        // 1. Obtenir les categories de données d'entrée
        input = UICtrl.getInput();
        console.log(input);//affiche les données dans la console dans une liste

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. Ajoute des items dans le budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value); 
            // 3. Ajoute les items dans l'interface utilisateur(UI)
            UICtrl.addListItem(newItem,input.type);//affiche les données dans l'interface
            // 4. Efface le champ
            UICtrl.clearFields();

            // 5. calcule et met à jour le budget
            updateBudget();

            //---
            console.log("Ça marche");
            //le message ci contre s'affichera dans la console si le programme fonctionne
        } else {
            console.log('Veuillez entrer des valeurs correcte dans les deux champs');
            alert('Veuillez entrer des valeurs correcte dans les deux champs')
        }
    };

    let ctrlDeleteItem = function(event) {
        let itemID,splitID,type,ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);

        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1.supprimer les items dans le data structure
            budgetCtrl.deleteItem(type, ID);

            //2. supprimer les items dasn l'UI
            UICtrl.deleteListItem(itemID);

            //3. Mettre à jour le nouveau budget
            updateBudget();

        }
    };

    return { 
        init: function () {  //Initialisation de ma l'application
            console.log("Initialisation de l'application ...");
            UICtrl.displayBudget({ //initialise toutes les données à 0 sauf pourcentage => -1
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListenners();
        }
    };

})(budgetController, UIController);

controller.init();