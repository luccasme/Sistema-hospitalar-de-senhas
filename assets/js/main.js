
    const vSenha = document.getElementById('senha');
    let senhaNormal = 0;
    let senhaPreferencial = 0;
    let ultSenha = 0;
    let audio = new Audio('./audio/senha.mp3');
    let senhas = document.getElementById('ultSenhas');
    let senhasChamadas = [];
    let consult = document.getElementById('consultorio');
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
        let segundo = data.getSeconds().toString().padStart(2, '0')
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
//----------------------------------------------------------------------------------------------------------------------------

    let consultorios = {
    consultorio1:true,
    consultorio2:true,
    consultorio3:true,
    consultorio4:true,
    consultorio5:true
  };
  
  function alterarDisponibilidade(consultorio) {
    consultorios[consultorio] = !consultorios[consultorio];
    let estado = consultorios[consultorio] ? "Dispoível ⬤" : "Indisponivel ⬤";
    let color = consultorios[consultorio] ? "green" : "red";
    document.getElementById(`${consultorio}`).style.color = color;
    return estado;
  } 
  
  function chamarProximoConsultorio() {
    for (let key in consultorios) {
      if (consultorios[key]) {
        document.getElementById(`${key}`).innerHTML =  ` Consultório ${key}: ${alterarDisponibilidade(key)}`;
        document.getElementById("consultorio").innerHTML = `Consultório ${key}`;
      break;
      }
    }
  }
    let total_consultorios = 5;
    for (let i = 1; i <= total_consultorios; i++) {
            
        let disponibilidade = alterarDisponibilidade(`${i}`)
        
        document.getElementById(`${i}`).innerHTML = `Consultório ${i}: ${disponibilidade}`
        
    }
 //-----------------------------------------------------------------------------------------------------------------------------

    
//----------------------------------------------------------------------------------------------------------------------------

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

            chamarProximoConsultorio();

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

        chamarProximoConsultorio();

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

