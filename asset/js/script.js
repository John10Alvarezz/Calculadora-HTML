// Variables para almacenar el estado de la calculadora
let primerNumero = '';    // Almacena el primer operando
let segundoNumero = '';   // Almacena el segundo operando
let operacionActual = null;   // Almacena la operación seleccionada (+, -, *, /)
let resetPantalla = false;    // Indica si se debe reiniciar la pantalla al ingresar un nuevo dígito

/**
 * Actualiza el contenido de la pantalla según el estado actual
 * de la calculadora (primer número, segundo número, etc.)
 */
function actualizarPantalla() {
    const pantalla = document.getElementById('pantalla');
    if (operacionActual !== null) {
        // Si hay una operación seleccionada
        if (segundoNumero === '') {
            // Pero aún no se ha ingresado el segundo número
            pantalla.textContent = primerNumero;
        } else {
            // Si ya se está ingresando el segundo número
            pantalla.textContent = segundoNumero;
        }
    } else {
        // Si no hay operación, mostrar el primer número o '0' si está vacío
        pantalla.textContent = primerNumero || '0';
    }
}

/**
 * Agrega un dígito o punto decimal al número actual
 * @param {string} digito - El dígito (0-9) o punto (.) a agregar
 */
function agregarDigito(digito) {
    if (operacionActual !== null) {
        // Si hay una operación seleccionada, estamos trabajando con el segundo número
        if (resetPantalla) {
            // Si se debe reiniciar la pantalla, reemplazar el valor completo
            segundoNumero = digito;
            resetPantalla = false;
        } else {
            // Evitar múltiples puntos decimales en el mismo número
            if (digito === '.' && segundoNumero.includes('.')) return;
            // Agregar el dígito al final del número
            segundoNumero += digito;
        }
    } else {
        // Si no hay operación, estamos trabajando con el primer número
        if (resetPantalla) {
            // Si se debe reiniciar la pantalla, reemplazar el valor completo
            primerNumero = digito;
            resetPantalla = false;
        } else {
            // Evitar múltiples puntos decimales en el mismo número
            if (digito === '.' && primerNumero.includes('.')) return;
            // Agregar el dígito al final del número
            primerNumero += digito;
        }
    }
    actualizarPantalla(); // Actualizar la pantalla con el nuevo valor
}

/**
 * Establece la operación a realizar
 * @param {string} operacion - La operación a realizar (+, -, *, /)
 */
function setOperacion(operacion) {
    if (primerNumero === '') {
        // Si no hay primer número, usar 0 como valor predeterminado
        primerNumero = '0';
    }

    if (operacionActual !== null && segundoNumero !== '') {
        // Si ya había una operación y un segundo número,
        // calcular el resultado antes de establecer la nueva operación
        calcular();
    }

    // Establecer la nueva operación y marcar para reiniciar la pantalla
    operacionActual = operacion;
    resetPantalla = true;
}

/**
 * Realiza el cálculo según la operación seleccionada
 * y actualiza el primer número con el resultado
 */
function calcular() {
    // Si no hay operación o segundo número, no hacer nada
    if (operacionActual === null || segundoNumero === '') return;

    let resultado;
    // Convertir strings a números para realizar operaciones matemáticas
    const a = parseFloat(primerNumero);
    const b = parseFloat(segundoNumero);

    // Realizar la operación según el operador seleccionado
    switch (operacionActual) {
        case '+':
            resultado = a + b; // Suma
            break;
        case '-':
            resultado = a - b; // Resta
            break;
        case '*':
            resultado = a * b; // Multiplicación
            break;
        case '/':
            // Manejo de división por cero
            if (b === 0) {
                limpiar();
                document.getElementById('pantalla').textContent = 'Error';
                return;
            }
            resultado = a / b; // División
            break;
    }

    // Actualizar el estado de la calculadora con el resultado
    primerNumero = resultado.toString();
    operacionActual = null;
    segundoNumero = '';
    resetPantalla = true;
    actualizarPantalla();
}

/**
 * Limpia todos los valores y reinicia la calculadora
 */
function limpiar() {
    primerNumero = '';
    segundoNumero = '';
    operacionActual = null;
    resetPantalla = false;
    actualizarPantalla();
}

/**
 * Borra el último dígito del número actual
 */
function borrarUltimo() {
    if (operacionActual !== null && segundoNumero !== '') {
        // Si hay una operación y un segundo número, borrar el último dígito del segundo número
        segundoNumero = segundoNumero.slice(0, -1);
    } else {
        // De lo contrario, borrar el último dígito del primer número
        primerNumero = primerNumero.slice(0, -1);
    }
    actualizarPantalla();
}