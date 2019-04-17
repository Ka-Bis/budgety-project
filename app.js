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

    //tableau pour stocker toutes les données des depenses et gains + TOT
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            /*selectionne le type (exp) ou (inc).
            Si type = exp => creation tableau avec ID, Descrip, valeur
            Sinon si type = inc => idem 
            chaque valeur créé sera ajouté la fin du tableau*/
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }
            //ajout des données dans le tableau
            data.allItems[type].push(newItem)

            // return the Element
            return newItem;
        },

        calculateBudget:function () {

        },

        testing: function () {
            console.log(data);

        }
    };
})();


//2- UI CONTROLLER ======
let UIController = (function () {

    // remplace les classes du fichier HTML par des valeur
    let DOMstrings = { 
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // le type => soit gain(+/inc) soit depense(-/exp)
                description: document.querySelector(DOMstrings.inputDescription).value, // description de la depnse ou du gain
                value: parseFloat( document.querySelector(DOMstrings.inputValue).value)//valeur de la depense ou du gain
            };
        },

        addListItem: function (obj, type) { //ajoute les données dans l'UI
            // Create texte HTML avec placeholder
            let html, newhtml, element;

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html = '<div class="item clearfix" id="TOTO-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            // Replace placeholder text
            newhtml = html.replace('%id%', obj.id);
            newhtml = newhtml.replace('%description%', obj.description);
            newhtml = newhtml.replace('%value%', obj.value);
            // Inserer le HTML dans le DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);


        },

        clearFields: function() { //efface le texte dans le champs à chaque validation
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            fieldsArr[0].focus(); //permet de se positionner dans le premier champ à chaque validation
        },



        getDOMstrings: function () { // retourne l'object DOMstring
            return DOMstrings;
        }
    };

})();


//3- GLOBAL APP CONTROLLER ======
let controller = (function (budgetCtrl, UICtrl) {

    let setupEventListenners = function () {
        let DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        //va declencher un evenement du click
        document.addEventListener('keypress', function (event) {
        // Si la touche ENTER est préssé => on appelle la fontion ctrlAddItem()
            if (event.keycode == 13 || event.which === 13) {
                ctrlAddItem(); //on appelle la fonction ctrlAddItem()
            }
        });
    };

    let updateBudget = function () { 
        // 1. Calcule le budget

        // 2. return the Budget

        // 3. Affiche le budget sur UI
    };

    let ctrlAddItem = function () {
        let input, newItem;

        // 1. Obtenir les categories de données d'entrée
        input = UICtrl.getInput();
        console.log(input);//affiche les données dans la console

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
        }
    };

    return {
        init: function () {
            console.log("Initialisation de l'application ...");
            setupEventListenners();
        }
    }

})(budgetController, UIController);

controller.init();