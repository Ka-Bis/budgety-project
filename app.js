
//BUGET CONTROLLER
let budgetController =  (function(){
    let Expense = function (id,descriptionn,value) {
        this.id = id;
        this.description = descriptionn;
        this.value = value;
    };

    let Income = function (id,descriptionn,value) {
        this.id = id;
        this.description = descriptionn;
        this.value = value;
    };

    //tableau pour stocker toutes les données des depenses et gains
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
        addItem: function(type,des,val) {
            let newItem,ID;

            // Create new ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            /*selectionne le type (exp) ou (inc).
            Si type = exp => creation tableau avec ID, Descrip, valeur
            Sinon si type = inc => idem 
            chaque valeur créé sera ajouté la fin du tableau*/
            if (type === 'exp') {
                newItem = new Expense(ID,des,val)
            } else if (type === 'inc'){
                newItem = new Income(ID,des,val)
            }
            //ajout des données dans le tableau
            data.allItems[type].push(newItem)

            // return the Element
            return newItem;
        },

        testing: function()  {
            console.log(data);
            
        }
    };
})();


// UI CONTROLLER 
let UIController = (function(){  

    // appelle les classes du fichier HTML
    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function() {
            return {
                 type : document.querySelector(DOMstrings.inputType).value, // le type => soit gain(+/inc) soit depense(-/exp)
                 description : document.querySelector(DOMstrings.inputDescription).value, // description de la depnse ou du gain
                 value : document.querySelector(DOMstrings.inputValue).value //valeur de la depense ou du gain
            };

            
        },

        addListItem: function (obj, type) {
            // Create texte HTML

            // Create placeholder text

            // Inserer le HTML dans le DOM

        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


// GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl){

    let setupEventListenners = function() {
        let DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
        //va declencher un evenement du click
        document.addEventListener('keypress',function(event) {
            if (event.keycode == 13 || event.which === 13) {
            // Si la touche ENTER est préssé => on appelle la fontion ctrlAddItem()
            //event.wich ==> pour les anciens navigateur mais event.wich = event.keycode
                ctrlAddItem();//on appelle la fonction ctrlAddItem()
            } 
        });
    };

    

    let ctrlAddItem = function(){
        let input,newItem;

        // 1. Get the field input data ==> Obtenir les categories de données d'entrée
        input = UICtrl.getInput();
        // console.log(input);
        
        // 2. Add the item the budget controller ==> Ajouter l'item du budget controller
        newItem = budgetCtrl.addItem(input.type,input.description,input.value);
        // 3. Add the item to the UI ==> Ajouter l'item de l'interface utilisateur(UI)
        // 4. Calculate de budget ==> calculer le budget
        // 5. Display the budget ==> afficher le budget sur UI
        console.log("Ça marche");
        
    };

    return {
        init: function(){
            console.log("Initialisation de l'application ...");
            setupEventListenners();
        }
    }

})(budgetController,UIController); 

controller.init();