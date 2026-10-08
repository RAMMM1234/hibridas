// 1. IMPORTACIONES
// Importamos el Hook useState de React para manejar variables de estado que actualizan la pantalla
import { useState } from 'react';
// Importamos los estilos globales
import './App.css';

function App() {
  // 2. DECLARACIÓN DE ESTADOS (useState)
  // Estado para guardar el texto que el usuario escribe en el campo de entrada (input)
  const [calificacion, setCalificacion] = useState('');
  
  // Estado para guardar el objeto con el resultado final (mensaje, estado y lista de criterios)
  // Inicia en 'null' para no mostrar nada en pantalla hasta que se evalúe
  const [resultado, setResultado] = useState(null);

  // 3. FUNCIÓN PRINCIPAL DE CONTROL
  // Esta función se ejecuta cuando el usuario presiona el botón del formulario
  const evaluarAlumno = (e) => {
    // Evita que la página se recargue automáticamente al enviar el formulario
    e.preventDefault();

    // Convierte el valor ingresado en el input (que es texto) a un número flotante/decimal
    const nota = parseFloat(calificacion);

    // =========================================================================
    // ESTRUCTURA SELECTIVA 1: Validación de entrada (if con condiciones compuestas)
    // =========================================================================
    // Verifica si la entrada NO es un número (isNaN) o está fuera del rango permitido (0 a 100)
    if (isNaN(nota) || nota < 0 || nota > 100) {
      // Guarda un mensaje de error en el estado para notificar al usuario
      setResultado({
        error: true,
        mensaje: 'Por favor, ingresa una calificación válida entre 0 y 100.'
      });
      // Detiene la ejecución del resto de la función
      return;
    }

    // =========================================================================
    // ESTRUCTURA SELECTIVA 2: Determinación de estado (Operador Ternario / if-else)
    // =========================================================================
    // Variable booleana (true/false) que evalúa si la nota es mayor o igual a 70
    const estaAprobado = nota >= 70;

    // Asigna el texto a mostrar dependiendo de la condición booleana
    const mensajeStatus = estaAprobado 
      ? `🟢 APROBADO (${nota}/100) - ¡Mensaje actualizado para probar el workflow!` 
      : `🔴 REPROBADO (${nota}/100) - Necesita regularización.`;

    // =========================================================================
    // ESTRUCTURA ITERATIVA: Recorrido y generación de datos (Bucle for)
    // =========================================================================
    // Arreglo con los criterios de evaluación de la asignatura
    const criterios = [
      'Asistencia y Participación (10%)',
      'Examen Teórico (30%)',
      'Prácticas de laboratorio (40%)',
      'Proyecto Integrador (20%)'
    ];

    // Arreglo vacío donde guardaremos los elementos procesados paso a paso
    const desglose = [];

    // Bucle 'for' que se repite iterativamente desde i = 0 hasta recorrer todo el arreglo de criterios
    for (let i = 0; i < criterios.length; i++) {
      // En cada iteración, agrega un elemento formateado al arreglo 'desglose'
      desglose.push(`Módulo ${i + 1}: ${criterios[i]}`);
    }

    // 4. ACTUALIZACIÓN DEL ESTADO FINAL
    // Guarda toda la información procesada en la variable 'resultado' para renderizarla en la interfaz
    setResultado({
      error: false,
      mensaje: mensajeStatus,
      aprobado: estaAprobado,
      desglose // Contiene el arreglo llenado mediante la estructura iterativa
    });
  };

  // 5. ESTRUCTURA Y VISTA INTERACTIVA (JSX)
  return (
    <div style={{
      maxWidth: '450px',
      margin: '50px auto',
      padding: '25px',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#333'
    }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 8px 0', color: '#1a1a1a' }}>
        Evaluador de Calificaciones
      </h2>
      <p style={{ textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '24px' }}>
        Práctica de Estructuras Controladas - React
      </p>

      {/* FORMULARIO DE CAPTURA */}
      <form onSubmit={evaluarAlumno}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '14px' }}>
            Ingresa la calificación del alumno (0 - 100):
          </label>
          
          {/* INPUT CONTROLADO: Sincroniza su valor con la variable de estado 'calificacion' */}
          <input
            type="number"
            placeholder="Ejemplo: 85"
            value={calificacion}
            // Al cambiar el contenido del input, actualiza la variable de estado inmediatamente
            onChange={(e) => setCalificacion(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: '#4f46e5',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Evaluar Calificación
        </button>
      </form>

      {/* =========================================================================
          RENDERIZADO CONDICIONAL: Solo muestra el bloque si 'resultado' no es null
          ========================================================================= */}
      {resultado && (
        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #eee' }}>
          
          {/* Evalúa si hubo un error en la captura de datos */}
          {resultado.error ? (
            <p style={{ color: '#dc2626', fontWeight: 'bold', textAlign: 'center' }}>
              {resultado.mensaje}
            </p>
          ) : (
            <>
              {/* Estilo dinámico: Cambia el color de fondo y borde según el resultado de 'aprobado' */}
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: resultado.aprobado ? '#ecfdf5' : '#fef2f2',
                border: `1px solid ${resultado.aprobado ? '#a7f3d0' : '#fecaca'}`,
                color: resultado.aprobado ? '#065f46' : '#991b1b',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                {resultado.mensaje}
              </div>

              <h4 style={{ margin: '12px 0 8px 0', fontSize: '14px', color: '#4b5563' }}>
                Criterios evaluados en la práctica (Estructura Iterativa):
              </h4>

              {/* =========================================================================
                  RENDERIZADO ITERATIVO EN JSX: Mapeo del arreglo de datos (.map)
                  ========================================================================= */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {/* Recorre iterativamente cada elemento del arreglo 'desglose' y genera un <li> */}
                {resultado.desglose.map((item, index) => (
                  <li key={index} style={{
                    padding: '8px 12px',
                    backgroundColor: '#f9fafb',
                    marginBottom: '6px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    borderLeft: '4px solid #4f46e5'
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Exporta el componente para poder ser usado en main.jsx
export default App;