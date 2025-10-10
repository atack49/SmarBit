"use client";
import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";

const respuestas = [
  { key: "crear cuenta", text: "Para crear una cuenta, ve a la pantalla de inicio, selecciona 'Crear cuenta', completa los datos y acepta los términos." },
  { key: "iniciar sesión", text: "En la pantalla principal ingresa tu correo y contraseña previamente registrados, y presiona 'Iniciar sesión'." },
  { key: "recuperar contraseña", text: "Ve a '¿Olvidaste tu contraseña?', ingresa tu correo y sigue las instrucciones para restablecerla." },
  { key: "ver progreso", text: "En la pantalla principal puedes ver tu progreso: IMC, peso, edad, altura y objetivo." },
  { key: "ver dieta", text: "Desde la pantalla principal toca 'Dietas'. Verás tu plan alimenticio con ingredientes, calorías y proteínas." },
  { key: "ver rutina", text: "En la pantalla principal selecciona 'Rutinas a tu medida' y verás tus ejercicios diarios, series y repeticiones." },
  { key: "como encuentro mi rutina", text: "Ve a 'Rutinas' dentro de la pantalla principal o en el menú; allí podrás ver y personalizar tu rutina." },
  { key: "favoritos", text: "En el menú lateral elige 'Favoritos' para ver tus comidas y ejercicios guardados." },
  { key: "ver favoritos", text: "En el menú lateral elige 'Favoritos' para ver tus comidas y ejercicios guardados." },
  { key: "mis favoritos", text: "En el menú lateral elige 'Favoritos' para ver tus comidas y ejercicios guardados." },
  { key: "historial", text: "En el menú lateral selecciona 'Historial' para ver los cambios en tus rutinas y dietas." },
  { key: "lugares cercanos", text: "Abre el menú lateral y selecciona 'Gym cercanos'. La app pedirá permiso de ubicación y mostrará los gimnasios en un mapa." },
  { key: "quejas", text: "En el menú lateral selecciona 'Quejas y Sugerencias', escribe tu mensaje y correo, y presiona 'Enviar'." },
  { key: "cerrar sesión", text: "Ve al menú lateral y selecciona 'Cerrar sesión'. La app te pedirá confirmación antes de salir." },
  { key: "para que sirves", text: "Soy tu asistente virtual de MyFitGuide 🤖. Puedo ayudarte a encontrar pantallas, explicarte funciones (favoritos, dietas, rutinas), y darte pasos para recuperar contraseña o crear cuenta." },
  { key: "asistente", text: "Soy tu asistente virtual de MyFitGuide 🤖, puedo ayudarte con preguntas sobre el uso de la app." },
];

const fuse = new Fuse(respuestas, {
  keys: ["key", "text"],
  threshold: 0.55,
  includeScore: true,
});

const normalizar = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, "")
    .trim();

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const preguntaUsuario = text || input;
    if (!preguntaUsuario.trim()) return;

    const mensajeUsuario = { sender: "user", text: preguntaUsuario };
    const pregunta = normalizar(preguntaUsuario);

    const resultado = fuse.search(pregunta);
    let respuesta = "Lo siento 😅, no encontré información sobre eso. Intenta preguntar de otra forma.";

    if (resultado.length > 0 && typeof resultado[0].score === "number" && resultado[0].score < 0.7) {
      respuesta = resultado[0].item.text;
    }

    const mensajeBot = { sender: "bot", text: respuesta };
    setMessages((prev) => [...prev, mensajeUsuario, mensajeBot]);
    setInput("");
  };

  const ejemplos = ["Ver dieta", "Recuperar contraseña", "Rutina", "Favoritos", "Cerrar sesión"];

  return (
    <div
      className="flex flex-col w-[300px] h-[450px] bg-gray-200 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 animate-fadeIn"
      style={{ animation: "fadeIn 0.4s ease-out" }}
    >
      {/* Header */}
      <div className="bg-green-600 text-white p-3 font-semibold text-center text-lg shadow-md">
        Asistente MyFitGuide 🤖
      </div>

      {/* Bienvenida con GIF */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-1 bg-gray-200 p-4 text-center animate-slideUp">
          <img
            src="https://static.wixstatic.com/media/41ff43_3c0ec2f6074544d39293ca6396e23396~mv2.gif"
            alt="Asistente MyFitGuide"
            className="w-24 h-24 mb-3 "
          />
          <h3 className="text-base font-semibold text-gray-700 mb-1">
            ¡Hola! Soy tu asistente MyFitGuide 💬
          </h3>
          <p className="text-xs text-gray-500 px-3 mb-4">
            Puedo ayudarte con tus dudas sobre la app: dietas, rutinas, favoritos, progreso y más.
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
      )}

      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-3 bg-gray-50 space-y-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm ${
                  m.sender === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-900 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="flex border-t border-gray-200 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
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