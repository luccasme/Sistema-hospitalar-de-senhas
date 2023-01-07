const vSenha = document.getElementById('senha');
let senhaNormal = localStorage.getItem('senhaNormal');
let senhaPreferencial = localStorage.getItem('senhaPreferencial');
let ultSenha = localStorage.getItem('ultSenha');
let audio = new Audio('./audio/senha.mp3');

if (!senhaNormal)
    senhaNormal = 0

if (!senhaPreferencial)
    senhaPreferencial = 0

if (!ultSenha)
    ultSenha = 'N'

mostrarSenha();

window.addEventListener('keydown', function(e){
    if (e.key == 'F1') {
        senhaNormal++;
        ultSenha = 'N'
        audio.play();
    } else if (e.key == 'F2') {
        senhaPreferencial++;
        ultSenha = 'P'
        audio.play();
    } else if (e.key == 'F3') {
        senhaNormal = 0;
        senhaPreferencial = 0;
        ultSenha = 'N';

    }

    localStorage.getItem('senhaNormal', senhaNormal);
    localStorage.getItem('senhaPreferencial', senhaPreferencial);
    localStorage.getItem('ultSenha', ultSenha);

    mostrarSenha();
})

function mostrarSenha() {
    if (ultSenha=='N'){
        vSenha.innerHTML = 'N' + parseInt(senhaNormal).toLocaleString('pt-br' , {minimumIntegerDigits:3});
    } else {
        vSenha.innerHTML = 'P' + parseInt(senhaPreferencial).toLocaleString('pt-br', {minimumIntegerDigits:3})
    }
}

const btn = document.getElementById("Name");
btn.addEventListener('click', function(e){
    e.preventDefault();
    console.log(btn);
})



function mostrarNome() {
    const name = document.getElementById('Name').value;
    document.getElementById('nome').innerHTML = `${name}`;
    console.log(name);
}