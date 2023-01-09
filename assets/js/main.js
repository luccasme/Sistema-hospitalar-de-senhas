const vSenha = document.getElementById('senha');
let senhaNormal = 0;
let senhaPreferencial = 0;
let ultSenha = 0;
let audio = new Audio('./audio/senha.mp3');
let senhas = document.getElementById('ultSenhas');
let senhasChamadas = [];
let consult = document.getElementById('consultorio');
let consultorios = [];
let pacientes = [];


for (let i = 1; i < 6; i++) {
    consultorios.push(i);
}

if (!senhaNormal)
    senhaNormal = 0

if (!senhaPreferencial)
    senhaPreferencial = 0

if (!ultSenha)
    ultSenha = "N"

mostrarSenha();

const btn = document.getElementById("Name");
btn.addEventListener('click', function(e){
    e.preventDefault();
    
})


// função de chamada de senhas normais
function sNormal() {
    const name = document.getElementById('Name').value;
    document.getElementById('nome').innerHTML = `${name}`;
    
    ultSenha = 'N';
    senhaNormal++;
    audio.play(); 
    mostrarSenha();

    if (consultorios.length > 0) {
        consult.innerHTML = `${consultorios.shift()}`
    } else {
        consult.innerHTML = `Consultórios ocupados!`
    }
}

// função de chamada de senha preferencial
function sPreferencial() {
    const sPref = document.getElementById('Name').value;
    document.getElementById('nome').innerHTML = `${sPref}`;
    ultSenha = 'P';
    senhaPreferencial++;
    audio.play()
    mostrarSenha();

    if (consultorios.length > 0) {
        consult.innerHTML = `${consultorios.shift()}`
    } else {
        consult.innerHTML = `Consultórios ocupados!`
    }
}

// função de vizualização de senhas
function mostrarSenha() {
    senhasChamadas.unshift(vSenha.innerHTML);
    senhasChamadas = senhasChamadas.slice(0,5);
    document.getElementById('ultSenhas').innerHTML = senhasChamadas.join('<br>'); 
    

    if (ultSenha=='N'){
        vSenha.innerHTML = 'N' + parseInt(senhaNormal).toLocaleString('pt-br' , {minimumIntegerDigits:3});
    } else {
        vSenha.innerHTML = 'P' + parseInt(senhaPreferencial).toLocaleString('pt-br', {minimumIntegerDigits:3})
    }
    console.log(`${senhasChamadas}`);
}

