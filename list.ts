





var titolo: HTMLInputElement;
var contenuto: HTMLInputElement;
var addBtn: HTMLElement;
var elencoHTML: HTMLElement;
var errore: HTMLElement
var erroreElenco: HTMLElement;
var elenco = [];
var sostituisci: string;

//CARICO IL DOM E FACCIO PARTIRE INIT

window.addEventListener('DOMContentLoaded', init);

//INIT PASSA I VALORI DELLE VARIABILI E RICHIAMA LE DUE FUNZIONI

function init() {
    titolo = document.getElementById('titolo') as HTMLInputElement;
    contenuto = document.getElementById('contenuto') as HTMLInputElement;
    addBtn = document.getElementById('scrivi')!;
    elencoHTML = document.getElementById('elenco')!;
    errore = document.getElementById('errore')!;
    erroreElenco = document.getElementById('erroreElenco')!;
    printData();
    eventHandler();

}

//STAMPA LA LISTA RECUPERANDO IL JSON

function printData(): void {
    fetch('http://localhost:3000/list')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            elenco = data;
            if (elenco.length > 0) {
                errore.innerHTML = '';
                elencoHTML.innerHTML = '';
                elenco.map(function (element: { id: number; titolo: string; contenuto: string; }) {
                    elencoHTML.innerHTML += `<li class="list-group-item"><button type="button" class="btn btn-danger me-1 p-0" onClick="elimina(${element.id})"><i class="bi bi-x-circle-fill"></button></i>
                    ${element.titolo}</li><li class="list-group-item">${element.contenuto}</li>`;
                });
            } else {
                erroreElenco.innerHTML = 'Nessun elemento presente in elenco';
            }
        });
}

function eventHandler() {
    addBtn.addEventListener('click', function () {
        if (sostituisci) {
            overwrite(sostituisci)
        } else {
            controlla();
        }
    });
}

//AGGIUNGE UN VALORE ALL'ELENCO

async function addData(data: string) {
    let response = await fetch('http://localhost:3000/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
    clearForm();
}


function clearForm() {
    titolo.value = '';
    contenuto.value = '';
}





//ELIMINA UN VALORE DALL'ELENCO

async function elimina(i: string) {
    const richiesta = window.confirm('Sei sicuro di voler cancellare?');
    if (richiesta) {
        return fetch('http://localhost:3000/list/' + i, {
            method: 'DELETE'
        });
    }
}

//VERIFICA I VALORI INSERITI NEL FORM

function controlla() {
    if (titolo.value != '' && contenuto.value != '') {
        var data: any = {
            titolo: titolo.value,
            contenuto: contenuto.value,
        };
        addData(data);
    } else {
        errore.innerHTML = 'Compilare correttamente i campi!';
        return;
    }
}

function modifica(i: string) {
    fetch(`http://localhost:3000/elenco/${i}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            titolo.value = data.titolo;
            contenuto.value = data.contenuto;
        });

    return sostituisci = i;
}

function overwrite(i: string) {
	if (titolo.value && contenuto.value) {
	fetch(`http://localhost:3000/elenco/${i}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			"titolo": titolo.value,
			"contenuto": contenuto.value
		}),
	})


	
	clearForm();
	} else {
		errore.innerHTML = 'Compilare correttamente i campi!';
		return;
	}
}






// class Compito {
//     userId: string;
//     id: number;
//     title: string;
//     completed: boolean;

//     constructor(_userId: string, _id: number, _title: string, _completed: boolean) {

//         this.userId = _userId;
//         this.id = _id;
//         this.title = _title;
//         this.completed = _completed;
//     }
// }