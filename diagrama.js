// Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivo = null;

let winAudio = new Audio('./sound/win.wav');
let loseAudio = new Audio('./sound/lose.wav');
let clickAudio = new Audio('./sound/click.wav');
let rightAudio = new Audio('./sound/right.wav');
let wrongAudio = new Audio('./sound/wrong.wav');

// Apuntando a documento html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostarTiempo = document.getElementById('t-restante')
// generacion de numero aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);
// Funciones
function contarTiempo(){
    tiempoRegresivo = setInterval(()=>{
        timer--;
        mostarTiempo.innerHTML = `Tiempo; ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivo);
            bloquearTarjetas(numeros);
            loseAudio.play();
        }
    },1000);
}
function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./image/${numeros}.png" alt="">`;
        tarjetaBloqueada.disable = true;
    }
}
// Funcion principal
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if(tarjetasDestapadas == 1){
        // Mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = `<img src="./image/${primerResultado}.png" alt="">`;
        clickAudio.play();
        // Desabilitar primer boton
        tarjeta1.disable = true;
    }else if(tarjetasDestapadas == 2){
        // Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./image/${segundoResultado}.png" alt"">`;
        // desabilitar segundo boton
        tarjeta2.disable = true;
        // incremetar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            rightAudio.play()
            // Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;
            // Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                winAudio.play();
                clearInterval (tiempoRegresivo);
                mostrarAciertos.innerHTML `Aciertos: ${aciertos}`;
                mostarTiempo.innerHTML = `Fantastico solo demoraste ${timerInicial = timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
            }

        }else{
            wrongAudio.play();
            // Mostrar valoires y volver a tapar
            setTimeout(()=>{
            tarjeta1.innerHTML = ' ';
            tarjeta2.innerHTML = ' ';
            tarjeta1.disable = false;
            tarjeta2.disable = false;
            tarjetasDestapadas = 0;
            },800);
        }

    }
}