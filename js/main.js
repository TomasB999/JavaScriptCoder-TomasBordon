// Bienvenido a TomCars , Realizamos Prestamos Prendarios de Taza Fija.
// 1. ingresar Nombre. (para poder llamarlo)
// 2. ingrese su Edad. (para verificar que sea mayor de 18)
// 3. Ingrese sus Ingresos Netos. (minimo 1 millon)
// 4. Ingrese anios de experiencia laboral. (minimo 1 anio, 1 a 2 anios = 50% de financiacion, 2 a 3 anios = 60% de financiacion, a partir de 4 anios = 70% de financiacion)
// 5. Ingrese el valor que necesita financiar y le cotizaremos cuanto podemos prestarle. (minimimo financiable = 3 millones. arroja el valor total financiable)
// 6. 4 opciones: minimo 12 cuotas , 24 cuotas , 32 cuotas , hasta 42 cuotas. (divido el valor total financiable en la cantidad de cuotas)
// 7. arrojo los datos de cuanto a financiar, precio y cantidad de las cuotas.

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// function Bienvenido(nombre) {
//     alert("Hola, " + nombre + "\nSomos TomCars, una empresa de Préstamos Prendarios de Tasa Fija.\nSi desea cotizar un Préstamo Prendario para un vehículo, conteste las siguientes preguntas.");
// }

// const nombre = prompt("Bienvenido a TomCars. Ingresa tu nombre");
// Bienvenido(nombre);

// function solicitarEdad() {
//     let edad = prompt("Ingresa tu edad");
//     return Number(edad);
// }

// function solicitarIngresosNetos() {
//     let ingresos = prompt("Ingresa tus Ingresos Netos (mínimo 1 millón)");
//     return Number(ingresos);
// }

// function solicitarExperienciaLaboral() {
//     let años = prompt("Ingrese años de experiencia laboral (mínimo 1 año)");
//     return Number(años);
// }

// function solicitarValorFinanciar() {
//     let valor = prompt("Ingrese el valor que necesita financiar (mínimo financiable: 3 millones)");
//     return Number(valor);
// }


const usuarios = [];


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
    return valorFinanciado / cuotas;
}

document.getElementById("cotizacionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const edad = Number(document.getElementById("edad").value);
    const ingresosNetos = Number(document.getElementById("ingresos").value);
    const añosExperiencia = Number(document.getElementById("experiencia").value);
    const valorAuto = Number(document.getElementById("valorAuto").value);

    if (edad >= 18 && ingresosNetos >= 1000000 && añosExperiencia >= 1 && valorAuto >= 3000000) {
        const financiacionMaxima = calcularFinanciacion(añosExperiencia, valorAuto);

        document.getElementById("cotizacionForm").style.display = "none";
        document.getElementById("formularioFinanciacion").style.display = "block";

        document.getElementById("montoMaximo").textContent = `$${financiacionMaxima.toFixed(2)}`;
        
        
        const datosUsuario = {
            nombre: nombre,
            edad: edad,
            ingresosNetos: ingresosNetos,
            añosExperiencia: añosExperiencia,
            valorAuto: valorAuto,
            financiacionMaxima: financiacionMaxima
        };
        sessionStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));
    } else {
        alert("No cumple con los requisitos mínimos para cotizar un préstamo.");
        document.getElementById("cotizacionForm").reset();
    }
});


document.getElementById("formularioFinanciacionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const montoFinanciar = Number(document.getElementById("montoFinanciar").value);
    const cuotas = Number(document.getElementById("cuotas").value);

    
    const datosUsuario = JSON.parse(sessionStorage.getItem("datosUsuario"));
    const financiacionMaxima = datosUsuario ? datosUsuario.financiacionMaxima : 0;

    if (montoFinanciar <= financiacionMaxima) {
        const valorCuota = calcularCuotas(montoFinanciar, cuotas);

        
        document.getElementById("formularioFinanciacion").style.display = "none";
        document.getElementById("resumenFinal").style.display = "block";

        // resumen final
        document.getElementById("nombreFinal").textContent = `Nombre: ${datosUsuario.nombre}`;
        document.getElementById("edadFinal").textContent = `Edad: ${datosUsuario.edad}`;
        document.getElementById("ingresosFinal").textContent = `Ingresos Netos: $${datosUsuario.ingresosNetos}`;
        document.getElementById("experienciaFinal").textContent = `Años de Experiencia Laboral: ${datosUsuario.añosExperiencia}`;
        document.getElementById("valorAutoFinal").textContent = `Valor del Auto: $${datosUsuario.valorAuto}`;
        document.getElementById("montoFinanciarFinal").textContent = `Monto a Financiar: $${montoFinanciar}`;
        document.getElementById("cuotasFinal").textContent = `Cantidad de Cuotas: ${cuotas}`;
        document.getElementById("valorCuotaFinal").textContent = `Valor de cada Cuota: $${valorCuota.toFixed(2)}`;
    } else {
        alert("El monto a financiar no puede exceder el máximo permitido.");
        document.getElementById("formularioFinanciacionForm").reset();
    }
});

