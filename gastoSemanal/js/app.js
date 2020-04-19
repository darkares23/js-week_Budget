// variables
const userbudget = prompt("Whtas your budget this week?");
const form = document.getElementById('agregar-gasto');
let budgetQuanty;

// Classes
class Budget {
    constructor(budget, rest) {
            this.budget = Number(budget);
            this.rest = Number(budget);
        }
        //Method
    leftbudget(quanty = 0) {
        return this.rest -= Number(quanty);
    }
}
// Class relted to the DOM
class Interfaz {
    budgetInsertion(quanty) {
        const budgetSpan = document.querySelector('span#total');
        const left = document.querySelector('span#restante');

        // insert top Dom
        budgetSpan.innerHTML = `${quanty}`
        left.innerHTML = `${quanty}`
    }
    printMessage(mjs, type) {
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('text-center', 'alert');
            if (type === 'error') {
                // boostrap class danger
                divMensaje.classList.add('alert-danger');
            } else {
                divMensaje.classList.add('alert-success');
            }
            divMensaje.appendChild(document.createTextNode(mjs));
            //Insert in the Dom
            document.querySelector('.primario').insertBefore(divMensaje, form);
            //Remove msj after 4 seconds
            setTimeout(function() {
                document.querySelector('.primario .alert').remove();
                form.reset();
            }, 2500);
        }
        //Add spents to list
    addSpentlist(spentname, spentQuanty) {
        const spentsList = document.querySelector('#gastos ul');
        // Create list
        const li = document.createElement('li');
        li.classList = 'list-group-item d-flex justify-content-between align-items-center';
        // Insert spent
        li.innerHTML = `
		${spentname}
		<span class="badge badge-primary badge-pill">${spentQuanty}</span>
		`;
        //insert in the DOM
        spentsList.appendChild(li);

        // Review the left budget
    }
    newBudget(quanty) {
        const left = document.querySelector('span#restante');
        //read left budget
        const userLeftBudget = budgetQuanty.leftbudget(quanty);
        left.innerHTML = `${userLeftBudget}`;
        this.reviewBudget();
    }

    // Change rest budget color:
    reviewBudget() {
        console.log(budgetQuanty);

        const totalBudget = budgetQuanty.budget;
        const lestBudget = budgetQuanty.rest;

        if ((totalBudget / 4) > lestBudget) {
            const rest = document.querySelector('.restante');
            rest.classList.remove('alert-success', 'alert-warning');
            rest.classList.add('alert-danger');
        } else if ((totalBudget / 2) > lestBudget) {
            const rest = document.querySelector('.restante');
            rest.classList.remove('alert-success');
            rest.classList.add('alert-warning');
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    if (userbudget === null || userbudget === '') {
        window.location.reload();
    } else {
        //Insert budget instance
        budgetQuanty = new Budget(userbudget);
        //Insert budget instance
        const ui = new Interfaz();
        ui.budgetInsertion(budgetQuanty.budget)
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    // read from spents form
    const spentName = document.querySelector('#gasto').value;
    const quantySpent = document.querySelector('#cantidad').value;

    //Intance interfaz
    const ui = new Interfaz();
    if (spentName === '' | quantySpent === '') {
        ui.printMessage('There was an Error!', 'error');
    } else {
        ui.printMessage('Success!', 'correcto');
        ui.addSpentlist(spentName, quantySpent);
        ui.newBudget(quantySpent);
    }
});