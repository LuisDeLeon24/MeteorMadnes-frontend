import { useState } from 'react';

const OPENROUTER_API_KEY = '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';

export function useOpenRouterChat() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const sendMessage = async (message) => {
    setLoading(true);
    setError(null);
    setResponse(null); // Limpiar respuesta anterior

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
        setResponse(data.choices[0].message.content);
      } else if (data?.error) {
        throw new Error(data.error.message || 'Error desconocido de la API');
      } else {
        throw new Error('No se recibió respuesta válida de la API');
      }
    } catch (err) {
      console.error('Error en useOpenRouterChat:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, response, loading, error };
}