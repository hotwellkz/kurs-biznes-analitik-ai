import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ELEVEN_LABS_API_KEY = Deno.env.get('ELEVEN_LABS_API_KEY');
const VOICE_ID = 'onwK4e9ZLuTAKqWW03F9'; // Daniel voice
const MAX_CHUNK_LENGTH = 5000; // Максимальная длина текста для одного запроса

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    
    // Проверяем длину текста
    if (!text || text.length === 0) {
      throw new Error('Text is required');
    }

    console.log(`Processing text of length: ${text.length}`);

    // Если текст слишком длинный, разбиваем его на части
    if (text.length > MAX_CHUNK_LENGTH) {
      console.log('Text is too long, splitting into chunks');
      // Берем только первую часть текста
      const truncatedText = text.slice(0, MAX_CHUNK_LENGTH);
      console.log(`Using truncated text of length: ${truncatedText.length}`);
      
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': ELEVEN_LABS_API_KEY!,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: truncatedText,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', errorText);
        throw new Error(`ElevenLabs API error: ${response.status} ${errorText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
      const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

      return new Response(
        JSON.stringify({ audioUrl }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': ELEVEN_LABS_API_KEY!,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('ElevenLabs API error:', errorText);
        throw new Error(`ElevenLabs API error: ${response.status} ${errorText}`);
      }

      const audioBuffer = await response.arrayBuffer();
      const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
      const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

      return new Response(
        JSON.stringify({ audioUrl }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in text-to-speech function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred during text-to-speech conversion',
        details: error.toString()
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});