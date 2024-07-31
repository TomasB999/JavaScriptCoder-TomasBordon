// Bienvenido a TomCars , Realizamos Prestamos Prendarios de Taza Fija.
// 1. ingresar Nombre. (para poder llamarlo)
// 2. ingrese su Edad. (para verificar que sea mayor de 18)
// 3. Ingrese sus Ingresos Netos. (minimo 1 millon)
// 4. Ingrese anios de experiencia laboral. (minimo 1 anio, 1 a 2 anios = 50% de financiacion, 2 a 3 anios = 60% de financiacion, a partir de 4 anios = 70% de financiacion)
// 5. Ingrese el valor que necesita financiar y le cotizaremos cuanto podemos prestarle. (minimimo financiable = 3 millones. arroja el valor total financiable)
// 6. 4 opciones: minimo 12 cuotas , 24 cuotas , 32 cuotas , hasta 42 cuotas. (divido el valor total financiable en la cantidad de cuotas)
// 7. arrojo los datos de cuanto a financiar, precio y cantidad de las cuotas.



// function Bienvenido(nombre) {
//     alert("Hola, " + nombre + "\nSomos TomCars, una empresa de Préstamos Prendarios de Tasa Fija.\nSi desea cotizar un Préstamo Prendario para un vehículo, conteste las siguientes preguntas.");
// }

// const nombre = prompt("Bienvenido a TomCars. Ingresá tu nombre");
// Bienvenido(nombre);


// let edad = prompt("Ingresá tu edad");
// edad = Number(edad);

// if (edad >= 18) {
//     console.log('Es mayor de edad');
// } else {
//     console.log('Es menor de edad');
// }




function Bienvenido(nombre) {
    alert("Hola, " + nombre + "\nSomos TomCars, una empresa de Préstamos Prendarios de Tasa Fija.\nSi desea cotizar un Préstamo Prendario para un vehículo, conteste las siguientes preguntas.");
}

const nombre = prompt("Bienvenido a TomCars. Ingresa tu nombre");
Bienvenido(nombre);

function solicitarEdad() {
    let edad = prompt("Ingresa tu edad");
    return Number(edad);
}

function solicitarIngresosNetos() {
    let ingresos = prompt("Ingresa tus Ingresos Netos (mínimo 1 millón)");
    return Number(ingresos);
}

function solicitarExperienciaLaboral() {
    let años = prompt("Ingrese años de experiencia laboral (mínimo 1 año)");
    return Number(años);
}

function solicitarValorFinanciar() {
    let valor = prompt("Ingrese el valor que necesita financiar (mínimo financiable: 3 millones)");
    return Number(valor);
}


function calcularFinanciacion(añosExperiencia, valorFinanciar) {
    let financiacion = 0;
    if (añosExperiencia >= 4) {
        financiacion = valorFinanciar * 0.7;
    } else if (añosExperiencia >= 2) {
        financiacion = valorFinanciar * 0.6;
    } else {
        financiacion = valorFinanciar * 0.5;
    }
    return financiacion;
}

function calcularCuotas(valorFinanciado, cuotas) {
    let valorCuota = valorFinanciado / cuotas;
    return valorCuota;
}

const usuario = {
    edad: 0,
    ingresosNetos: 0,
    añosExperiencia: 0,
    valorFinanciar: 0
};

const minimoIngresos = 1000000;
const minimoValorFinanciar = 3000000;
const opcionesCuotas = [12, 24, 36, 48];

function cotizarPrestamo() {
    usuario.edad = solicitarEdad();

    if (usuario.edad >= 18) {
        usuario.ingresosNetos = solicitarIngresosNetos();
        usuario.añosExperiencia = solicitarExperienciaLaboral();
        usuario.valorFinanciar = solicitarValorFinanciar();

        while (!(usuario.ingresosNetos >= minimoIngresos && usuario.añosExperiencia >= 1 && usuario.valorFinanciar >= minimoValorFinanciar)) {
            alert("No cumple con los requisitos mínimos para cotizar un préstamo. Por favor, intentelo nuevamente.");
            const opcion = prompt("¿Qué desea hacer?\n1. Reingresar datos\n2. Salir");

            if (opcion === "2") {
                alert("Gracias por visitar TomCars. Hasta luego.");
                return; // salir
            }

            // volver a solicitar los datos
            if (opcion === "1") {
                if (!(usuario.ingresosNetos >= minimoIngresos)) {
                    usuario.ingresosNetos = solicitarIngresosNetos();
                }
                if (!(usuario.añosExperiencia >= 1)) {
                    usuario.añosExperiencia = solicitarExperienciaLaboral();
                }
                if (!(usuario.valorFinanciar >= minimoValorFinanciar)) {
                    usuario.valorFinanciar = solicitarValorFinanciar();
                }
            }
        }

        // Solicitar cantidad de cuotas
        const cuotasInput = prompt("Elija la cantidad de cuotas:\n1. 12 cuotas\n2. 24 cuotas\n3. 36 cuotas\n4. 48 cuotas");

        //el array
        const index = parseInt(cuotasInput, 10) - 1;
        const cantidadCuotas = opcionesCuotas[index] || 12; // Seleccionar cuotas o 12 por defecto

        const financiacion = calcularFinanciacion(usuario.añosExperiencia, usuario.valorFinanciar);
        const valorCuota = calcularCuotas(financiacion, cantidadCuotas);

        // resultados
        alert(`Detalles de la cotización:\n\nValor a financiar: ${financiacion}\nValor de cada cuota (${cantidadCuotas} cuotas): ${valorCuota}`);
    } else {
        alert("Lo siento, se requiere ser mayor de edad para cotizar un préstamo.");
    }
}

cotizarPrestamo()
