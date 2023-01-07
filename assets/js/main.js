const vSenha = document.getElementById('senha');
let senhaNormal = 0;
let senhaPreferencial = 0;
let ultSenha = 0;
let audio = new Audio('./audio/senha.mp3');

if (!senhaNormal)
    senhaNormal = 0

if (!senhaPreferencial)
    senhaPreferencial = 0

if (!ultSenha)
    ultSenha = 'N'

mostrarSenha();

const btn = document.getElementById("Name");
btn.addEventListener('click', function(e){
    e.preventDefault();
    
})

function sNormal() {
    const name = document.getElementById('Name').value;
    document.getElementById('nome').innerHTML = `${name}`; 
    ultSenha = 'N';
    senhaNormal++;
    audio.play(); 
    mostrarSenha();
}

function sPreferencial() {
    const sPref = document.getElementById('Name').value;
    document.getElementById('nome').innerHTML = `${sPref}`;
    ultSenha = 'P';
    senhaPreferencial++;
    audio.play()
    mostrarSenha();
}



function mostrarSenha() {
    if (ultSenha=='N'){
        vSenha.innerHTML = 'N' + parseInt(senhaNormal).toLocaleString('pt-br' , {minimumIntegerDigits:3});
    } else {
        vSenha.innerHTML = 'P' + parseInt(senhaPreferencial).toLocaleString('pt-br', {minimumIntegerDigits:3})
    }
}

