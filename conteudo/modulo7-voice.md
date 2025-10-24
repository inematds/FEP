# Voice AI & Multimodal Agents

## O Que É

Voice AI e Multimodal Agents são sistemas que integram capacidades de voz (speech-to-text, text-to-speech) com LLMs multimodais para criar experiências conversacionais ricas que processam e geram múltiplos tipos de mídia: voz, texto, imagens e até vídeo.

**Componentes principais:**

1. **Speech-to-Text (STT)**: Transcreve áudio em texto
2. **LLM Multimodal**: Processa texto, imagens, áudio
3. **Text-to-Speech (TTS)**: Sintetiza fala natural
4. **Visão Computacional**: Analisa imagens/vídeo em tempo real
5. **Orquestração**: Gerencia fluxo entre modalidades

**Exemplo de fluxo:**
```
Usuário fala → STT → Texto → Claude (multimodal) → Texto de resposta → TTS → Áudio de resposta
```

## Por Que Usar

### Vantagens de Agentes de Voz

1. **Acessibilidade**
   - Mãos livres (enquanto dirige, cozinha, etc.)
   - Pessoas com deficiências visuais ou motoras
   - Maior inclusão

2. **Naturalidade**
   - Conversas mais humanas
   - Menos fricção que digitar
   - Melhor para contextos móveis

3. **Contexto Rico**
   - Entonação revela intenção
   - Processamento simultâneo de ambiente (câmera + voz)
   - Interações mais complexas

4. **Casos de Uso Únicos**
   - Assistentes médicos que veem ferimentos E ouvem sintomas
   - Tutores que veem escrita do aluno E explicam verbalmente
   - Guias turísticos que veem pontos turísticos E narram história

### Quando Usar

**✅ Use Voice/Multimodal quando:**
- Usuário está em movimento ou mãos ocupadas
- Contexto visual é crucial (ex: "o que é isso?")
- Interação natural é prioritária
- Acessibilidade é importante

**❌ Use apenas texto quando:**
- Privacidade é crítica (voz pode ser ouvida)
- Precisão textual é necessária (código, comandos)
- Ambiente é ruidoso
- Latência deve ser mínima

## Como Funciona

### Arquitetura Básica

```
┌─────────────┐
│   Usuário   │
└─────┬───────┘
      │ (fala)
      ↓
┌─────────────┐
│ Microfone   │
└─────┬───────┘
      │ (áudio)
      ↓
┌─────────────────┐
│ STT (Whisper)   │ ← Transcrição
└─────┬───────────┘
      │ (texto)
      ↓
┌──────────────────────┐
│ Claude (multimodal)  │ ← Processamento
│ - Analisa texto      │
│ - Processa imagens   │
│ - Gera resposta      │
└─────┬────────────────┘
      │ (texto resposta)
      ↓
┌─────────────────┐
│ TTS (ElevenLabs)│ ← Síntese de voz
└─────┬───────────┘
      │ (áudio)
      ↓
┌─────────────┐
│  Alto-falante│
└─────────────┘
```

### Stack Tecnológico

**1. Speech-to-Text:**
- **OpenAI Whisper**: Open source, multi-língua, preciso
- **Google Speech-to-Text**: Streaming, baixa latência
- **AssemblyAI**: Boa para português, speaker diarization
- **Deepgram**: Ultra-baixa latência (ideal para conversações)

**2. LLM Multimodal:**
- **Claude Sonnet/Opus**: Melhor visão + raciocínio
- **GPT-4 Vision**: Alternativa competente
- **Gemini Pro Vision**: Bom custo-benefício

**3. Text-to-Speech:**
- **ElevenLabs**: Vozes mais naturais, clonagem de voz
- **OpenAI TTS**: Bom equilíbrio qualidade/preço
- **Google Cloud TTS**: Muitas vozes, boa em português
- **Amazon Polly**: Integra bem com AWS

## Exemplos Práticos

### Exemplo 1: Assistente de Voz Básico

```python
import anthropic
import openai
from elevenlabs import generate, play

class VoiceAssistant:
    def __init__(self):
        self.anthropic_client = anthropic.Anthropic()
        self.openai_client = openai.OpenAI()
        self.conversation_history = []

    def listen(self):
        """Captura áudio e transcreve"""
        audio_file = self.record_audio()  # Implementação omitida

        # Transcrição com Whisper
        with open(audio_file, "rb") as f:
            transcript = self.openai_client.audio.transcriptions.create(
                model="whisper-1",
                file=f,
                language="pt"
            )

        return transcript.text

    def think(self, user_message):
        """Processa com Claude"""
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })

        response = self.anthropic_client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system="Você é um assistente de voz prestativo. Seja conciso.",
            messages=self.conversation_history
        )

        assistant_message = response.content[0].text
        self.conversation_history.append({
            "role": "assistant",
            "content": assistant_message
        })

        return assistant_message

    def speak(self, text):
        """Sintetiza e reproduz voz"""
        audio = generate(
            text=text,
            voice="Rachel",  # Voz da ElevenLabs
            model="eleven_multilingual_v2"
        )
        play(audio)

    def run(self):
        """Loop principal"""
        print("Assistente de voz ativo. Diga 'sair' para encerrar.")

        while True:
            # 1. Ouvir
            user_input = self.listen()
            print(f"Você: {user_input}")

            if "sair" in user_input.lower():
                self.speak("Até logo!")
                break

            # 2. Processar
            response = self.think(user_input)
            print(f"Assistente: {response}")

            # 3. Falar
            self.speak(response)

# Uso
assistant = VoiceAssistant()
assistant.run()
```

### Exemplo 2: Agente Multimodal (Voz + Visão)

```python
import base64
from PIL import Image
import io

class MultimodalAssistant:
    def __init__(self):
        self.client = anthropic.Anthropic()

    def process_with_vision(self, audio_input=None, image_input=None):
        """Processa voz E imagem simultaneamente"""

        # 1. Transcrever áudio se houver
        if audio_input:
            transcript = self.transcribe(audio_input)
        else:
            transcript = "Analise esta imagem."

        # 2. Preparar imagem
        with open(image_input, "rb") as f:
            image_data = base64.standard_b64encode(f.read()).decode("utf-8")

        # Detectar tipo de imagem
        image_media_type = "image/jpeg"
        if image_input.endswith(".png"):
            image_media_type = "image/png"

        # 3. Enviar para Claude com visão
        response = self.client.messages.create(
            model="claude-opus-4-20250514",
            max_tokens=2048,
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": image_media_type,
                            "data": image_data
                        }
                    },
                    {
                        "type": "text",
                        "text": transcript
                    }
                ]
            }]
        )

        return response.content[0].text

    def transcribe(self, audio_file):
        # Implementação STT
        ...

# Uso: "O que você vê nesta imagem?"
assistant = MultimodalAssistant()
result = assistant.process_with_vision(
    audio_input="pergunta.mp3",
    image_input="foto.jpg"
)
print(result)
```

### Exemplo 3: Assistente Médico com Visão

```python
class MedicalAssistant:
    """
    Assistente que:
    1. Ouve descrição de sintomas
    2. Vê foto de ferimento/erupção cutânea
    3. Fornece orientação inicial (não diagnóstico!)
    """

    def __init__(self):
        self.client = anthropic.Anthropic()

    def analyze(self, symptom_audio, wound_image):
        # Transcrever sintomas
        symptoms_text = self.transcribe(symptom_audio)

        # Preparar imagem
        image_b64 = self.encode_image(wound_image)

        # Claude analisa ambos
        response = self.client.messages.create(
            model="claude-opus-4-20250514",
            max_tokens=2000,
            system="""Você é um assistente médico. Baseado em sintomas
            verbais e imagem visual, forneça orientação inicial.

            IMPORTANTE:
            - Não faça diagnósticos definitivos
            - Sempre sugira consultar profissional
            - Identifique sinais de urgência
            """,
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": f"Sintomas relatados: {symptoms_text}"
                    },
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/jpeg",
                            "data": image_b64
                        }
                    },
                    {
                        "type": "text",
                        "text": "Qual a orientação inicial?"
                    }
                ]
            }]
        )

        guidance = response.content[0].text

        # Retorna em voz
        self.speak(guidance)

        return guidance
```

### Exemplo 4: Tutor Interativo

```python
class InteractiveTutor:
    """
    Tutor que:
    - Vê a escrita do aluno (foto do caderno)
    - Ouve dúvidas verbalmente
    - Explica correções em voz
    """

    def __init__(self):
        self.client = anthropic.Anthropic()

    def tutor_session(self, student_question_audio, notebook_photo):
        # Transcrever pergunta
        question = self.transcribe(student_question_audio)

        # Analisar escrita no caderno
        notebook_b64 = self.encode_image(notebook_photo)

        response = self.client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            system="""Você é um tutor paciente e encorajador.
            Analise a escrita do aluno na imagem e responda a pergunta.
            Seja claro e pedagógico.""",
            messages=[{
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/jpeg",
                            "data": notebook_b64
                        }
                    },
                    {
                        "type": "text",
                        "text": f"Pergunta do aluno: {question}"
                    }
                ]
            }]
        )

        explanation = response.content[0].text

        # Explicação em voz
        self.speak(explanation)

        return explanation
```

## Casos de Uso Reais

### 1. **Assistente de Cozinha**

**Cenário:**
- Usuário está cozinhando (mãos sujas/ocupadas)
- Pergunta: "Como corto cebola em cubos?"
- Sistema mostra vídeo E explica verbalmente passo a passo

**Implementação:**
```python
class CookingAssistant:
    def help_cook(self, voice_question, current_ingredient_photo=None):
        # Processa pergunta + foto do ingrediente
        # Retorna instruções em voz
        # Pode mostrar imagem de referência
        ...
```

### 2. **Guia Turístico AR**

**Cenário:**
- Usuário aponta câmera para monumento
- Pergunta: "O que é isso?"
- Sistema identifica visualmente E narra história

**Diferencial:** Combina visão (identifica monumento) + conhecimento (Claude) + narrativa (TTS)

### 3. **Suporte Técnico Visual**

**Cenário:**
- Cliente liga com problema técnico
- Envia foto da tela de erro
- Atendente (IA) VÊ o erro E explica solução verbalmente

**Vantagem:** Reduz fricção ("clique no botão azul" → IA vê onde está)

### 4. **Personal Trainer Virtual**

**Cenário:**
- Usuário faz exercício
- Câmera filma postura
- IA corrige em tempo real via voz: "Abaixe mais o quadril"

**Componentes:**
- Visão: Análise de postura
- Voz: Feedback imediato
- Conhecimento: Biomecânica correta

### 5. **Acessibilidade para Deficientes Visuais**

**Cenário:**
- Pessoa cega aponta celular para produto
- IA descreve verbalmente: "Lata de ervilha, marca X, validade 2026"

**Impacto social:** Autonomia em supermercados, bibliotecas, etc.

## Dicas Práticas

### 1. **Otimização de Latência**

**Problema:** Voice AI precisa ser rápido ou fica artificial.

**Soluções:**

```python
# A) Streaming de áudio (não espera áudio completo)
async def stream_transcription(audio_stream):
    async for chunk in audio_stream:
        partial_text = await stt.transcribe_chunk(chunk)
        yield partial_text  # Processa enquanto usuário ainda fala

# B) Respostas em chunks
def stream_response(text):
    # Não espera Claude terminar toda resposta para começar TTS
    async for chunk in claude.stream(prompt):
        tts.speak_async(chunk)  # Fala enquanto Claude ainda pensa
```

**Meta de latência:**
- STT: < 500ms
- LLM: < 2s para primeira palavra
- TTS: < 300ms

**Total ideal:** < 3s do fim da fala do usuário até início da resposta

### 2. **Gestão de Interrupções**

```python
class InterruptibleAssistant:
    def __init__(self):
        self.is_speaking = False
        self.stop_speaking = False

    def speak_with_interrupt(self, text):
        self.is_speaking = True
        self.stop_speaking = False

        for sentence in text.split('.'):
            if self.stop_speaking:
                print("Interrompido!")
                break

            self.speak_sentence(sentence)

        self.is_speaking = False

    def on_user_speech_detected(self):
        """Callback quando usuário começa a falar"""
        if self.is_speaking:
            self.stop_speaking = True  # Para de falar
```

### 3. **Detecção de Intenção de Fala**

```python
# VAD - Voice Activity Detection
from webrtcvad import Vad

vad = Vad(3)  # Agressividade 0-3

def is_user_speaking(audio_chunk):
    """Detecta se chunk contém voz humana"""
    return vad.is_speech(audio_chunk, sample_rate=16000)

# Evita processar ruído de fundo
```

### 4. **Contexto Conversacional**

```python
class ContextualVoiceAgent:
    def __init__(self):
        self.recent_images = []  # Últimas 3 imagens mostradas
        self.conversation = []

    def process(self, voice_input, new_image=None):
        if new_image:
            self.recent_images.append(new_image)
            self.recent_images = self.recent_images[-3:]  # Mantém só 3

        # Usuário pode referenciar imagem anterior
        # "E aquela primeira foto?" → Sistema sabe qual é
        ...
```

### 5. **Síntese de Voz Expressiva**

```python
# ElevenLabs permite controlar emoção
from elevenlabs import generate, Voice, VoiceSettings

def speak_with_emotion(text, emotion="neutral"):
    settings = VoiceSettings(
        stability=0.5,  # Menos estável = mais expressivo
        similarity_boost=0.75
    )

    if emotion == "excited":
        settings.stability = 0.3  # Mais variação

    audio = generate(
        text=text,
        voice=Voice(voice_id="...", settings=settings)
    )
```

## Erros Comuns e Como Evitar

### ❌ Erro 1: Ignorar Ruído de Fundo

**Problema:**
```python
# STT transcreve ruído como comando
transcription = whisper.transcribe(audio)  # "Cachorro latindo" → comando?
```

### ✅ Solução: Pre-processamento de Áudio

```python
import noisereduce as nr
import soundfile as sf

def clean_audio(audio_file):
    # Carregar áudio
    data, rate = sf.read(audio_file)

    # Reduzir ruído
    reduced_noise = nr.reduce_noise(y=data, sr=rate)

    # Salvar limpo
    sf.write("clean_audio.wav", reduced_noise, rate)

    return "clean_audio.wav"

# Transcrever áudio limpo
clean = clean_audio("noisy_input.wav")
transcription = whisper.transcribe(clean)
```

### ❌ Erro 2: Respostas Longas Demais

**Problema:**
```python
# Claude responde com 3 parágrafos
# Usuário perde interesse esperando TTS terminar
```

### ✅ Solução: Prompts para Concisão

```python
system_prompt = """Você é assistente de VOZ.
Regras importantes:
1. Respostas CURTAS (máximo 2-3 frases)
2. Se perguntarem mais detalhes, aí você expande
3. Prefira bullet points falados: "Primeiro... Segundo... Terceiro..."
4. Evite jargões complexos em voz
"""

# Ou pós-processamento
def make_voice_friendly(text):
    # Corta se > 100 palavras e adiciona "Quer mais detalhes?"
    words = text.split()
    if len(words) > 100:
        return ' '.join(words[:100]) + "... Quer que eu continue?"
    return text
```

### ❌ Erro 3: Não Validar Imagens

**Problema:**
```python
# Usuário envia imagem borrada/escura
# Claude não consegue analisar mas tenta
```

### ✅ Solução: Validação de Qualidade

```python
from PIL import Image
import numpy as np

def validate_image(image_path):
    img = Image.open(image_path)

    # Check 1: Resolução mínima
    if img.size[0] < 200 or img.size[1] < 200:
        return False, "Imagem muito pequena. Tire foto mais próxima."

    # Check 2: Brilho (detecta imagens muito escuras)
    img_array = np.array(img.convert('L'))  # Grayscale
    brightness = np.mean(img_array)

    if brightness < 30:
        return False, "Imagem muito escura. Aumente iluminação."

    # Check 3: Blur detection
    variance = cv2.Laplacian(img_array, cv2.CV_64F).var()
    if variance < 100:
        return False, "Imagem borrada. Tire foto mais nítida."

    return True, "Imagem OK"

# Uso
valid, message = validate_image(user_photo)
if not valid:
    speak(message)
    return
```

### ❌ Erro 4: Latência Alta

**Problema:**
```python
# 10s entre pergunta e resposta → frustração
```

### ✅ Solução: Pipeline Assíncrono

```python
import asyncio

async def low_latency_assistant(audio_input):
    # Executa STT, LLM e TTS em paralelo quando possível

    # 1. STT (necessariamente primeiro)
    transcript = await asyncio.to_thread(stt.transcribe, audio_input)

    # 2. LLM + TTS em streaming (começar TTS antes de LLM terminar)
    async def stream_response():
        async for chunk in claude.stream(transcript):
            await tts.speak_async(chunk)  # Fala chunk enquanto próximo é gerado

    await stream_response()

# asyncio.run(low_latency_assistant(audio))
```

## Recursos Adicionais

### APIs e Serviços

**STT:**
- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [Deepgram](https://deepgram.com/) - Baixíssima latência
- [AssemblyAI](https://www.assemblyai.com/) - Ótimo para português

**TTS:**
- [ElevenLabs](https://elevenlabs.io/) - Vozes mais naturais
- [OpenAI TTS](https://platform.openai.com/docs/guides/text-to-speech)
- [Google Cloud TTS](https://cloud.google.com/text-to-speech)

**Multimodal:**
- [Claude Vision](https://docs.anthropic.com/claude/docs/vision) - Visão + raciocínio
- [GPT-4 Vision](https://platform.openai.com/docs/guides/vision)

### Tutoriais e Exemplos
- [Building Voice Assistants](https://github.com/anthropics/voice-assistant-demo)
- [Multimodal Agent Tutorial](https://www.anthropic.com/tutorials/multimodal)

### Ferramentas Open Source
- [Whisper](https://github.com/openai/whisper) - STT local
- [Coqui TTS](https://github.com/coqui-ai/TTS) - TTS open source
- [WebRTC VAD](https://github.com/wiseman/py-webrtcvad) - Voice activity detection

### Benchmarks e Comparações
- [TTS Quality Comparison 2024](https://example.com/tts-comparison)
- [STT Accuracy by Language](https://example.com/stt-benchmark)
- [Multimodal LLM Leaderboard](https://huggingface.co/spaces/opencompass/multimodal-leaderboard)
