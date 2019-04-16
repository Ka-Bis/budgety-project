
//BUGET CONTROLLER
let budgetController =  (function(){

    //code

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

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();


// GLOBAL APP CONTROLLER
let controller = (function(budgetCtrl, UICtrl){

    let DOM = UICtrl.getDOMstrings();

    let ctrlAddItem = function(){
        // 1. Get the field input data ==> Obtenir les categories de données d'entrée

        var input = UICtrl.getInput();
        console.log(input);
        
        // 2. Add the item the budget controller ==> Ajouter l'item du budget controller
        // 3. Add the item to the UI ==> Ajouter l'item de l'interface utilisateur(UI)
        // 4. Calculate de budget ==> calculer le budget
        // 5. Display the budget ==> afficher le budget sur UI
        console.log("Ca marche");
        
    }

    document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);
    //va declencher un evenement
    document.addEventListener('keypress',function(event) {
        if (event.keycode == 13 || event.which === 13) {
        // console.log('ENTER KEY pressed');
        //event.wich ==> pour les anciens navigateur mais event.wich = event.keycode
            ctrlAddItem();//on appel la fonction ctrlAddItem()
        } 
        

    })

})(budgetController,UIController); 


