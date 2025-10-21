'use client';
import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { X } from 'lucide-react';

const respuestas = [
  { key: 'crear cuenta', text: "Para crear una cuenta, ve a la pantalla de inicio, selecciona 'Crear cuenta', completa los datos y acepta los términos." },
  { key: 'iniciar sesión', text: "En la pantalla principal ingresa tu correo y contraseña previamente registrados, y presiona 'Iniciar sesión'." },
  { key: 'recuperar contraseña', text: "Ve a '¿Olvidaste tu contraseña?' que se encuentra en la pantalla de inicio de sesion, ingresa tu correo y sigue las instrucciones para restablecerla." },
  { key: 'progreso', text: 'En la pantalla principal puedes ver tu progreso: IMC, peso, edad, altura y objetivo.' },
  { key: 'dieta', text: "Desde la pantalla principal toca 'Dietas', que se encuentra en el menú de abajo. Verás tu plan alimenticio con ingredientes, calorías y proteínas." },
  //{ key: 'ver rutina', text: "En la pantalla principal selecciona 'Rutinas', que se encuentra en el menú de abajo y verás tus ejercicios diarios, series y repeticiones." },
  { key: 'rutina', text: "En la pantalla principal selecciona 'Rutinas', que se encuentra en el menú de abajo y verás tus ejercicios diarios, series y repeticiones." },
  { key: 'favoritos', text: "En el menú lateral elige 'Favoritos' para ver tus comidas y ejercicios guardados." },
  //{ key: 'ver favoritos', text: "En el menú lateral elige 'Favoritos' para ver tus comidas y ejercicios guardados." },
  //{ key: 'mis favoritos', text: "En el menú lateral elige 'Favoritos' para ver tus comidas y ejercicios guardados." },
  { key: 'historial', text: "En el menú lateral selecciona 'Historial' para ver los cambios en tus rutinas y dietas." },
  { key: 'lugares cercanos', text: "Abre el menú lateral y selecciona 'Lugares cercanos'. La app pedirá permiso de ubicación y mostrará los gimnasios y parques en un mapa." },
  { key: 'gym cercanos', text: "Abre el menú lateral y selecciona 'Lugares cercanos'. La app pedirá permiso de ubicación y mostrará los gimnasios y parques en un mapa." },
  { key: 'gimnasios cercanos', text: "Abre el menú lateral y selecciona 'Lugares cercanos'. La app pedirá permiso de ubicación y mostrará los gimnasios y parques en un mapa." },
  { key: 'parques cercanos', text: "Abre el menú lateral y selecciona 'Lugares cercanos'. La app pedirá permiso de ubicación y mostrará los gimnasios y parques en un mapa." },
  { key: 'quejas', text: "En el menú lateral selecciona 'Quejas y Sugerencias', escribe tu mensaje y correo, y presiona 'Enviar'." },
  { key: 'cerrar sesión', text: "Ve al menú lateral y selecciona 'Cerrar sesión'. La app te pedirá confirmación antes de salir." },
  { key: 'cierro sesión', text: "Ve al menú lateral y selecciona 'Cerrar sesión'. La app te pedirá confirmación antes de salir." },
  { key: 'para que sirves', text: "Soy tu asistente virtual de MyFitGuide 🤖. Puedo ayudarte a encontrar pantallas, explicarte funciones (favoritos, dietas, rutinas), y darte pasos para recuperar contraseña o crear cuenta." },
  { key: 'asistente', text: "Ve al menú lateral y selecciona 'Asistente IA', escribe cualquier duda que tengas en la aplicación y presiona enviar." },
];

const fuse = new Fuse(respuestas, {
  keys: ['key', 'text'],
  threshold: 0.55,
  includeScore: true,
});

const normalizar = (texto: string) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[¿?¡!.,]/g, '')
    .trim();

interface ChatbotProps {
  initialQuestion?: string;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ initialQuestion, onClose }) => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const initialQuestionRef = useRef(initialQuestion);

  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: '¡Hola! Soy tu asistente MyFitGuide 💬. ¿En qué puedo ayudarte hoy?',
      },
    ]);
  }, []);

  const handleSend = (text?: string) => {
    const preguntaUsuario = text || input;
    if (!preguntaUsuario.trim()) return;

    const mensajeUsuario = { sender: 'user', text: preguntaUsuario };
    const pregunta = normalizar(preguntaUsuario);

    const resultado = fuse.search(pregunta);

    let respuesta = '';

    if (resultado.length > 0 && resultado[0].score! < 0.7) {
      respuesta = resultado[0].item.text;
    } else {
      let coincidencia = respuestas.find((r) => {
        const keyNorm = normalizar(r.key);
        return pregunta.includes(keyNorm) || keyNorm.includes(pregunta);
      });

      if (!coincidencia) {
        const palabrasUsuario = pregunta.split(' ');
        coincidencia = respuestas.find((r) => {
          const keyNorm = normalizar(r.key);
          return palabrasUsuario.some(
            (p) =>
              keyNorm.includes(p) ||
              p.includes(keyNorm) ||
              (p.length > 3 && keyNorm.startsWith(p.slice(0, 4)))
          );
        });
      }

      respuesta = coincidencia
        ? coincidencia.text
        : 'Lo siento 😅, no encontré información sobre eso. Intenta preguntar de otra forma.';
    }

    const mensajeBot = { sender: 'bot', text: respuesta };
    setMessages((prev) => [...prev, mensajeUsuario, mensajeBot]);
    setInput('');
  };

  useEffect(() => {
    if (initialQuestion && initialQuestion !== initialQuestionRef.current) {
      handleSend(initialQuestion);
      initialQuestionRef.current = initialQuestion;
    }
  }, [initialQuestion]);

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const ejemplos = ['Ver dieta', 'Recuperar contraseña', 'Rutina', 'Favoritos', 'Cerrar sesión'];
  const showWelcomeScreen = messages.length === 1 && messages[0].sender === 'bot';

  return (
    <div
      className="flex flex-col w-[300px] h-[450px] bg-gray-200 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 animate-fadeIn"
      style={{ animation: 'fadeIn 0.4s ease-out' }}
    >
      {/* Header */}
      <div className="relative flex items-center justify-center bg-green-600 text-white p-3 font-semibold text-lg shadow-md">
        <span>Asistente MyFitGuide 🤖</span>
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-4">
        {showWelcomeScreen ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center animate-slideUp h-full">
            <img
              src="https://static.wixstatic.com/media/41ff43_3c0ec2f6074544d39293ca6396e23396~mv2.gif"
              alt="Asistente MyFitGuide"
              className="w-24 h-24 mb-3"
            />
            <h3 className="text-base font-semibold text-gray-700 mb-1">
              {messages[0].text}
            </h3>
            <p className="text-xs text-gray-500 px-3 mb-4">
              Puedes preguntarme sobre dietas, rutinas, favoritos y más.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {ejemplos.map((ejemplo, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(ejemplo)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs hover:bg-green-200 transition"
                >
                  {ejemplo}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm ${
                  m.sender === 'user'
                    ? 'bg-green-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex border-t border-gray-200 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu pregunta..."
          className="flex-1 p-2 text-sm outline-none text-gray-700"
        />
        <button
          onClick={() => handleSend()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-sm font-semibold transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
