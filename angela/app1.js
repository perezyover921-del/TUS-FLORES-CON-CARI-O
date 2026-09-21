//DIRECION HACIA LA OTRA PAGINA

const inputPAssword =document.getElementById('contraseña');

const botonEnviar = document.getElementById('enviar');

function validarYRedirigir(){
    const password = inputPAssword.value.toLowerCase().trim();
    if (password === "mi mini luna" || 
        password === "mini luna" ||
        password === "niña" ||
        password === "mi niña") {
        
        window.location.href = "index2.html";
    }
    else if ( password === ""){
        alert("Por favor, escribe el apodo");
    }
    else {
        alert("Apodo incorrecto");
    }
}

botonEnviar.addEventListener('click', validarYRedirigir);

inputPAssword.addEventListener('keydown', function(event){
    if (event.key === 'Enter'){
        validarYRedirigir();
    }
})