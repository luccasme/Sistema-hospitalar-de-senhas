
const vSenha = document.getElementById('senha');
let senhaNormal = 0;
let senhaPreferencial = 0;
let ultSenha = 0;
let audio = new Audio('./audio/senha.mp3');
let senhas = document.getElementById('ultSenhas');
let senhasChamadas = [];
let consult = document.getElementById('consultorio');
let consultorios = {};
var db_paciente_normal = {};
var db_paciente_pref = {};
var db_pacientes = {db_paciente_normal, db_paciente_pref};


//-----------------------------------------------------------------------------------
// Data e hora
    let data = new Date();
    let dia = data.getDate().toString().padStart(2, '0');
    let mes = (data.getMonth() + 1).toString().padStart(2, '0');
    let ano = data.getFullYear();
    let hora = data.getHours().toString().padStart(2, '0');
    let minuto = data.getMinutes().toString().padStart(2, '0');
    let segundo = data.getSeconds().toString().padStart(2, '0');

    let dataAtual = `${dia}.${mes}.${ano}`;
    let horaAtual = `${hora}:${minuto}:${segundo}`;

    document.getElementById("data").innerHTML = `${dataAtual}`;

setInterval(function(){
    let data = new Date();
    let hora = data.getHours().toString().padStart(2, '0');
    let minuto = data.getMinutes().toString().padStart(2, '0');
    let segundo = data.getSeconds().toString().padStart(2, '0');
    document.getElementById('hora').innerHTML = `${hora}:${minuto}:${segundo}`;
    }, 1000);
//-----------------------------------------------------------------------------------

consultorios = {
    consultorio1: true,
    consultorio2: true,
    consultorio3: true,
    consultorio4: true,
    consultorio5: true
  };
  
  function alterarDisponibilidade(consultorio) {
    consultorios[consultorio] = !consultorios[consultorio];
    return consultorios[consultorio] ? "dispoível" : "indisponivel";
  }
    
  
  function chamarProximoConsultorio() {
    for (let key in consultorios) {
      if (consultorios[key] === true) {
        document.getElementById("consultorio").innerHTML = key;
        alterarDisponibilidade(key);
        break;
      }
    }
  }
    document.getElementById("1").innerHTML = "Consultório 1: " + alterarDisponibilidade("consultorio1");
    document.getElementById("2").innerHTML = "Consultório 2: " + alterarDisponibilidade("consultorio2");
    document.getElementById("3").innerHTML = "Consultório 3: " + alterarDisponibilidade("consultorio3");
    document.getElementById("4").innerHTML = "Consultório 4: " + alterarDisponibilidade("consultorio4");
    document.getElementById("5").innerHTML = "Consultório 5: " + alterarDisponibilidade("consultorio5");

    document.getElementById("newSenha").addEventListener("click", chamarProximoConsultorio);
  
/////////////////////////////////////////////////////////////////////////////////////////////

for (let i = 0; i < db_paciente_normal.length; i++) {
    db_paciente_normal.push(i); 
}
for (let i = 0; i < db_paciente_pref.length; i++) {
    db_paciente_pref.push(i);  
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
    
    db_normal(
        `${senhaNormal}`, 
        `${name}`,
        `${consult.innerHTML}`, 
        `${ultSenha}`, 
        `${dataAtual}`, 
        `${horaAtual}`)
        localStorage.setItem("db_paciente_normal", JSON.stringify(db_paciente_normal));
        db_paciente_normal = JSON.parse(localStorage.getItem("db_paciente_normal"));
    console.log(db_paciente_normal);

    alterarDisponibilidade();

}

// função de chamada de senha preferencial
function sPreferencial() {
    const sPref = document.getElementById('Name').value;
    document.getElementById('nome').innerHTML = `${sPref}`;
    ultSenha = 'P';
    senhaPreferencial++;
    audio.play()
    mostrarSenha();

    db_prefencial(
        `${senhaPreferencial}`,
        `${sPref}`, 
        `${consult}`, 
        `${ultSenha}`, 
        `${dataAtual}`, 
        `${horaAtual}`)
         localStorage.setItem("db_paciente_pref", JSON.stringify(db_paciente_pref));
         db_paciente_pref = JSON.parse(localStorage.getItem("db_paciente_pref"));
    console.log(db_paciente_pref);

    alterarDisponibilidade();
}

// função de vizualização de senhas
function mostrarSenha() {
    senhasChamadas.unshift(vSenha.innerHTML);
    senhasChamadas = senhasChamadas.slice(0,4);
    document.getElementById('ultSenhas').innerHTML = senhasChamadas.join('<br>'); 
    

    if (ultSenha=='N'){
        vSenha.innerHTML = 'N' + parseInt(senhaNormal).toLocaleString('pt-br' , {minimumIntegerDigits:3});
    } else {
        vSenha.innerHTML = 'P' + parseInt(senhaPreferencial).toLocaleString('pt-br', {minimumIntegerDigits:3})
    }
    console.log(`${senhasChamadas}`);
}


// funções de adição de pacientes ao banco de dados
function db_normal (senha, nome, consultorio, tipo, data, hora) {
    db_paciente_normal[senha] = {
        nome: nome,
        consultorio: consultorio,
        tipo: tipo,
        data: data,
        hora: hora
    }
}
function db_prefencial (senha, nome, consultorio, tipo, data, hora) {
    db_paciente_pref[senha] = {
        nome: nome,
        consultorio: consultorio,
        tipo: tipo,
        data: data,
        hora: hora
    }
}

// consultar pacientes pelo número da senha
function get_db_normal() {
    return db_paciente_normal;
}
function get_db_pref() {
    return db_paciente_pref;
}
function get_db_pacientes() {
    console.log(db_pacientes);
}

