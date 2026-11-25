import { useState } from 'react';
import { withDemoFallback } from '../demo/fallback';
import { demoAssistantReply } from '../demo/demoData';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_KEY;

console.log("🔑 API Key:", OPENROUTER_API_KEY);
console.log(import.meta.env);

export function useOpenRouterChat() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [demo, setDemo] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    setError(null);
    setResponse(null); // Limpiar respuesta anterior

    if (!OPENROUTER_API_KEY) {
      setDemo(true);
      setResponse(demoAssistantReply());
      setError(null);
      setLoading(false);
      return;
    }

    try {
      const result = await withDemoFallback(async (signal) => {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        signal,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.href || 'https://https://www.astrotracker.wiki',
          'X-Title': 'AstroTracker Assistant',
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'Eres una asistente virtual femenina del sistema AstroTracker, un sistema de defensa planetaria que rastrea asteroides. Te llamas AstroTracker Assistant. Siempre te refieres a ti misma en femenino (yo soy, yo estoy, yo puedo ayudarte, etc.). Responde de forma breve, técnica pero amigable en español. Mantén tus respuestas concisas (máximo 3-4 oraciones). Eres profesional pero cercana.'
            },
            { 
              role: 'user', 
              content: message 
            }
          ]
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error HTTP:', res.status, errorText);
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      console.log('Respuesta de OpenRouter:', data);

      if (data?.choices?.length > 0) {
        return { data: data.choices[0].message.content };
      }
      return { error: true };
      }, demoAssistantReply);

      setDemo(Boolean(result.demo));
      setResponse(result.demo ? result.data : result.data);
      setError(null);
    } catch (err) {
      console.error('Error en useOpenRouterChat:', err);
      setDemo(true);
      setResponse(demoAssistantReply());
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, response, loading, error, demo };
}