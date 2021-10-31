const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);

//constantes
const idRegistro=document.getElementById('idRegistro');
const nombre=document.getElementById('nombre');
const bRegistro=document.getElementById('bRegistrar');
const idVotacion=document.getElementById('idVotacion');
const bVotacion= document.getElementById('bVotar');

const verCandidatos= document.getElementById('verCandidatos');
const verVotacion= document.getElementById('verVotaciones');


//Database
const database=firebase.database();

//votos de los candidatos
let votosC;

let idV;

//Objeto
let objetoCandidato

//Arrays de candidatos y votos
let listCandidatos=[];
let listVotos= [];


registrar= ()=> {

    //inputs
    let idR=idRegistro.value;
    let nombreC= nombre.value;
    
    if(idR===listCandidatos){
        alert("El candidato con el ID que acaba de ingresar ya esta registrado");
        return;
    }
    

    objetoCandidato={
        ID:idR,
        Nombre:nombreC,
    }

    database.ref('candidatos/'+objetoCandidato.ID).set(objetoCandidato);
    console.log(objetoCandidato);

}

votar= ()=>{
    //input 
    idV=idVotacion.value;

    objetoVoto={
        IDV: idV,
    }

    //para enviar el voto
    database.ref('votos/').push().set(objetoVoto);
}




verCandi=()=>{
    database.ref('candidatos').on('value',
    function(data){

        var arrayCandi=[];
        data.forEach(
        candidato =>{ 

        arrayCandi.push(candidato.val().Nombre+'\n');
    });
    alert(arrayCandi);
    });
}

verVotes=()=>{

let listCandidatos=[];
let listVotos= [];

//Obtengo el candidato de firebase
database.ref('candidatos').on('value',
function(data){

    var arrayCandi=[];
    data.forEach(
    candidato =>{ 

    arrayCandi.push(candidato.val());
    listCandidatos=arrayCandi;
});
});


database.ref('votos').on('value',
function(data){

    var arrayVotos=[];
    data.forEach(
    votes=>{
    arrayVotos.push(votes.val());
    listVotos=arrayVotos;
    });

    contadorVotes(listCandidatos,listVotos);
});
}

contadorVotes=(arrayCandi,arrayVotos)=>{

    let listVotosFinal= [];
    let totalVotos=arrayVotos.length;
    
    arrayCandi.forEach(candidato=>{
        votosC=0;

        arrayVotos.forEach(votes=>{
            if(candidato.ID==votes.IDV){
                votosC++;
            
            }
        }); 

        if(votosC!==0){
          porcentaje= (votosC/totalVotos)*100;
        }

        listVotosFinal.push(candidato.Nombre +" "+porcentaje+ "% "+'\n');  
        console.log(totalVotos); 
    });
    
    alert(listVotosFinal); 
    console.log(listVotosFinal);  
    
}

bRegistro.addEventListener('click',registrar);
bVotacion.addEventListener('click', votar);
verCandidatos.addEventListener('click', verCandi);
verVotacion.addEventListener('click', verVotes);