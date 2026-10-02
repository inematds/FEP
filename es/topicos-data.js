// Conteúdo completo dos tópicos para modal de detalhamento
const topicosData = {
    // ==============================================
    // NÍVEL INICIANTE - MÓDULO 1: Fundamentos
    // ==============================================

    'llm-basics': {
        titulo: '¿Qué son los LLM?',
        nivel: 'Principiante',
        modulo: 1,
        icon: '🤖',
        introducao: `Los Large Language Models (LLMs) son modelos de inteligencia artificial entrenados con enormes cantidades de texto para entender y generar lenguaje natural. Comprender qué son y cómo funcionan es fundamental para usar prompts de forma eficaz.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-llm-basics.md',

        conteudoCompleto: `## ¿Qué es un LLM?

Un LLM es un modelo de IA que se entrenó con miles de millones de palabras de internet, libros, artículos y otras fuentes. Con este entrenamiento, aprende patrones de lenguaje, conocimientos factuales, razonamiento y mucho más.

### ¿Cómo funciona un LLM?

1. **Entrenamiento:** El modelo lee millones de textos y aprende a predecir la siguiente palabra
2. **Patrones:** Identifica patrones de gramática, hechos, razonamiento y estilo
3. **Generación:** Cuando le das un prompt, genera texto palabra por palabra según los patrones aprendidos

### Características principales

- **No tiene conciencia:** Es una herramienta matemática; no piensa ni siente
- **Se basa en probabilidades:** Elige palabras según cuál es más probable que aparezca a continuación
- **No tiene memoria persistente:** Cada conversación es independiente (excepto por el historial de la conversación actual)
- **Entrenado hasta una fecha:** Sus conocimientos son limitados y llegan hasta la fecha de corte del entrenamiento

## Modelos populares

### Claude (Anthropic)
- Fuerte en razonamiento y en seguir instrucciones complejas
- Bueno para analizar documentos largos
- Enfocado en la seguridad y en respuestas útiles

### GPT-4 (OpenAI)
- Versátil para diversos tipos de tareas
- Amplio conocimiento general
- Bueno para la creatividad

### Gemini (Google)
- Integrado con los servicios de Google
- Fuerte en investigación e información actualizada`,

        exemplos: [
            {
                titulo: 'Como o LLM Responde',
                contexto: 'Comprender el proceso de generación',
                semDecomposicao: `Preguntas: "¿Cuál es la capital de Brasil?"

El LLM NO hace lo siguiente:
❌ Buscar en una base de datos
❌ Consultar internet
❌ "Recordar" una conversación anterior`,
                comDecomposicao: `EL LLM HACE:
✅ Analiza tu prompt
✅ Basándose en los patrones del entrenamiento, identifica que es una pregunta factual
✅ Genera los tokens (palabras) más probables: "A", "capital", "do", "Brasil", "é", "Brasília"
✅ Continúa hasta completar la respuesta

¡Por eso los prompts claros ayudan: guías al modelo hacia los patrones correctos!`,
                resultado: 'El modelo no "sabe" las cosas: reconoce patrones y genera respuestas probables.'
            }
        ],

        casosDeUso: [
            {
                area: 'Escrita',
                aplicacao: 'Generación de contenido',
                detalhes: 'Artículos, correos electrónicos, publicaciones en redes sociales'
            },
            {
                area: 'Código',
                aplicacao: 'Programación asistida',
                detalhes: 'Escribir, depurar y explicar código'
            },
            {
                area: 'Análise',
                aplicacao: 'Procesar información',
                detalhes: 'Resumir textos, extrair insights, responder perguntas'
            }
        ],

        dicasPraticas: [
            '✓ Los LLM son mejores en tareas con ejemplos de su entrenamiento',
            '✓ Cuanto más claro sea tu prompt, mejor será la respuesta',
            '✓ Los LLM pueden "alucinar": inventar información que parece real',
            '✓ Usa los LLM como asistentes, no como fuentes definitivas de verdad',
            '✓ Los distintos modelos tienen distintos puntos fuertes'
        ],

        errosComuns: [
            {
                erro: 'Tratar o LLM como onisciente',
                exemplo: 'Preguntar sobre eventos posteriores a la fecha de entrenamiento',
                solucao: 'Proporciona contexto si la información es reciente o específica'
            },
            {
                erro: 'Asumir que el LLM «entiende»',
                exemplo: 'Esperar que el modelo tenga sentido común como los humanos',
                solucao: 'Sé explícito en tus instrucciones, no des nada por sentado'
            }
        ],

        recursosAdicionais: [
            '📖 Investiga sobre "transformer architecture" para entender la tecnología',
            '🎓 Lee sobre el entrenamiento de modelos de lenguaje',
            '🔗 Experimenta con diferentes modelos para ver las diferencias'
        ]
    },

    'tokens': {
        titulo: 'Tokens e Context Window',
        nivel: 'Principiante',
        modulo: 1,
        icon: '🔤',
        introducao: `Los tokens son las unidades básicas que procesan los LLM: no son palabras, sino fragmentos de texto. Entender los tokens es esencial para conocer los límites de lo que puedes hacer con un LLM.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-tokens.md',

        conteudoCompleto: `## ¿Qué son los tokens?

Los tokens son como el LLM «lee» el texto. Una palabra puede ser 1 token o varios tokens.

### Ejemplos de tokenización

- «Olá» = 1 token
- «Brasília» = 2 tokens (Bras + ília)
- «ChatGPT» = 2 tokens (Chat + GPT)
- ¡Los espacios y la puntuación también son tokens!

**Regla general:** ~4 caracteres = 1 token en portugués

## Ventana de contexto

La «ventana de contexto» es la cantidad máxima de tokens que el modelo puede procesar a la vez.

### Tamaños comunes

- **Claude 3.5 Sonnet:** 200.000 tokens (~150.000 palabras)
- **GPT-4 Turbo:** 128.000 tokens (~96.000 palabras)
- **GPT-3.5:** 16.000 tokens (~12.000 palabras)

### ¿Qué cuenta dentro de la ventana de contexto?

✅ Tu prompt
✅ Todo el historial de la conversación
✅ La respuesta del modelo
✅ Los ejemplos y el contexto que proporcionas

## ¿Por qué importan los tokens?

### 1. Límites físicos
Si superas la ventana de contexto, el modelo no funciona.

### 2. Costo
Las API cobran por token, tanto por la entrada como por la salida.

### 3. Rendimiento
Los prompts muy largos pueden afectar la calidad y la velocidad.`,

        exemplos: [
            {
                titulo: 'Calculando Tokens',
                contexto: 'Estimar si tu prompt cabe en el límite',
                semDecomposicao: `Texto de 1000 palabras en portugués
≈ 1.300 tokens

Si el límite es 4.000 tokens:
- Tu texto: 1.300 tokens
- Tu pregunta: ~50 tokens
- Respuesta esperada: ~500 tokens
Total: ~1.850 tokens ✅ ¡Cabe sin problema!`,
                comDecomposicao: `Documento de 50.000 palabras
≈ 65.000 tokens

Si el límite es de 16.000 tokens (GPT-3.5):
❌ NO CABE

Soluciones:
1. Usa un modelo con una context window más grande (Claude)
2. Divide el documento en partes
3. Primero resume y luego analiza`,
                resultado: '¡Verifica siempre que tu contenido quepa en la ventana de contexto!'
            }
        ],

        casosDeUso: [
            {
                area: 'Análisis de documentos',
                aplicacao: 'Processar documentos longos',
                detalhes: 'Usa modelos con una ventana de contexto grande para libros, informes, etc.'
            },
            {
                area: 'Desenvolvimento',
                aplicacao: 'Revisar código',
                detalhes: 'Las bases de código grandes deben dividirse o procesarse con modelos de contexto amplio'
            },
            {
                area: 'Conversas Longas',
                aplicacao: 'Manter contexto',
                detalhes: 'Conversas muito longas podem exceder o limite'
            }
        ],

        dicasPraticas: [
            '✓ Usa herramientas como tiktoken (OpenAI) para contar tokens exactos',
            '✓ Para portugués, estima 1.3x el número de palabras',
            '✓ Deja siempre margen para la respuesta (no uses el 100% del contexto)',
            '✓ Si superas el límite, divide la tarea en partes más pequeñas',
            '✓ Recuerda: ¡el historial de conversación también cuenta!'
        ],

        errosComuns: [
            {
                erro: 'Ignorar el recuento de tokens',
                exemplo: 'Colar documento gigante sem verificar',
                solucao: 'Siempre estima los tokens antes de enviar'
            },
            {
                erro: 'Usar todo o context window',
                exemplo: 'Prompt de 15.900 tokens en un modelo de 16k',
                solucao: 'Deja al menos 20-30% para la respuesta'
            }
        ],

        recursosAdicionais: [
            '🔗 OpenAI Tokenizer: plataforma.openai.com/tokenizer',
            '📖 Lee sobre tokenización BPE (Byte-Pair Encoding)',
            '🧮 Crea una hoja de cálculo de costos basada en tokens'
        ]
    },

    'anatomia': {
        titulo: 'Anatomía de un prompt',
        nivel: 'Principiante',
        modulo: 1,
        icon: '📝',
        introducao: `Un prompt bien estructurado tiene componentes específicos que trabajan en conjunto. Entender la anatomía de un prompt es el primer paso para crear instrucciones eficaces.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-anatomia.md',

        conteudoCompleto: `## Componentes de un prompt eficaz

### 1. Contexto (Quién/Qué)
Define el escenario y el rol del modelo.

Ejemplo:
"Eres un profesor de física que explica el tema a estudiantes de secundaria."

### 2. Tarea (Haz esto)
La instrucción clara de lo que quieres.

Ejemplo:
"Explica el concepto de gravedad."

### 3. Especificaciones (Cómo)
Detalles sobre el formato, el tono y la extensión.

Ejemplo:
"Usa analogías de la vida cotidiana. Máximo 3 párrafos."

### 4. Ejemplos (Opcional)
Muestra el tipo de respuesta que quieres.

### 5. Restricciones (No hagas)
Qué debes evitar.

Ejemplo:
"No uses ecuaciones matemáticas complejas."

## Plantilla básica

\`\`\`
[CONTEXTO]
Eres un [rol/especialista].

[TAREA]
[Acción clara que quieres].

[ESPECIFICACIONES]
- Formato: [cómo presentar]
- Tono: [formal/casual/técnico]
- Extensión: [corta/media/larga]

[RESTRICCIONES]
NO hagas:
- [cosa 1]
- [cosa 2]
\`\`\``,

        exemplos: [
            {
                titulo: 'Prompt Mal Estruturado vs Bem Estruturado',
                contexto: 'Comparar abordagens',
                semDecomposicao: `❌ Prompt malo:
"Háblame sobre marketing digital"

Problemas:
- Muy vago
- Sin contexto
- Sin especificaciones
- La respuesta será genérica`,
                comDecomposicao: `✅ Buen prompt:

[CONTEXTO]
Eres un consultor de marketing digital con 10 años de experiencia en comercio electrónico.

[TAREA]
Crea un plan de acción de marketing digital para una tienda online de ropa sostenible que está empezando.

[ESPECIFICACIONES]
- Enumera 5 acciones prioritarias
- Para cada acción: objetivo, canal y métrica de éxito
- Enfócate en estrategias de bajo costo
- Público objetivo: mujeres de 25-40 años con conciencia ambiental

[RESTRICCIONES]
NO incluyas:
- Tácticas que requieran un presupuesto >R$5.000/mes
- Jerga técnica sin explicación`,
                resultado: 'Respuesta específica, práctica y alineada con la necesidad real.'
            }
        ],

        casosDeUso: [
            {
                area: 'Creación de contenido',
                aplicacao: 'Publicaciones de blog',
                detalhes: 'Contexto: nicho y audiencia | Tarea: escribir | Especificaciones: extensión y tono'
            },
            {
                area: 'Análise',
                aplicacao: 'Revisión de datos',
                detalhes: 'Contexto: tipo de datos | Tarea: analizar | Especificaciones: formato del informe'
            },
            {
                area: 'Código',
                aplicacao: 'Generar funciones',
                detalhes: 'Contexto: lenguaje | Tarea: implementar | Especificaciones: requisitos técnicos'
            }
        ],

        dicasPraticas: [
            '✓ Empieza siempre con contexto: eso "enmarca" la respuesta',
            '✓ Sé específico con la tarea: usa verbos de acción claros',
            '✓ Las especificaciones evitan idas y vueltas',
            '✓ Los ejemplos valen más que las explicaciones largas',
            '✓ Usa formato (saltos de línea, viñetas) para dar claridad'
        ],

        errosComuns: [
            {
                erro: 'Prompt vago de una línea',
                exemplo: '«Ayúdame con marketing»',
                solucao: 'Agrega contexto, una tarea clara y especificaciones'
            },
            {
                erro: 'Mezclar varias tareas',
                exemplo: '«Analiza esto Y escribe un resumen Y crea un plan»',
                solucao: 'Una tarea principal por prompt (o divídela)'
            }
        ],

        recursosAdicionais: [
            '📖 Estude frameworks: RTF (Role-Task-Format), CARE, RISEN',
            '🎓 Practica cómo transformar preguntas vagas en prompts estructurados',
            '📝 Crea plantillas reutilizables para tus tareas habituales'
        ]
    },

    'clareza': {
        titulo: 'Clareza e Especificidade',
        nivel: 'Principiante',
        modulo: 1,
        icon: '🎯',
        introducao: `La claridad es el principio más importante de la ingeniería de prompts. Cuanto más específico y claro seas, mejores serán los resultados. La ambigüedad lleva a respuestas genéricas e imprecisas.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo1-clareza.md',

        conteudoCompleto: `## ¿Por qué importa la claridad?

Los LLM interpretan literalmente lo que escribes. No «adivinan» lo que quieres: siguen las palabras que usas.

### Principios de claridad

1. **Sé específico:** Detalles > Generalidades
2. **Sé directo:** Ve al grano
3. **Sé explícito:** No des por sentado que hay conocimientos previos
4. **Sé estructurado:** Usa formato para destacar las partes importantes

## Técnicas para aumentar la claridad

### 1. Usa verbos de acción precisos

❌ Vago: «Habla sobre SEO»
✅ Claro: «Enumera 5 técnicas de SEO on-page con ejemplos prácticos»

### 2. Define parámetros

❌ Vago: «Escribe un texto»
✅ Claro: «Escribe un párrafo de 100 palabras»

### 3. Especifica el público

❌ Vago: «Explica blockchain»
✅ Claro: «Explica blockchain a un gerente de banco sin conocimientos técnicos»

### 4. Da ejemplos de lo que quieres

❌ Vago: «Crea títulos creativos»
✅ Claro: «Crea títulos con este estilo: 'Cómo X Revolucionó Y en Z Días'»

## Lista de verificación de claridad

Antes de enviar tu prompt, pregúntate:
- [ ] ¿La tarea está clara?
- [ ] ¿Está definido el formato esperado?
- [ ] ¿Está especificado el tono/estilo?
- [ ] ¿Están delimitados la extensión/el alcance?
- [ ] ¿Está identificado el público objetivo?`,

        exemplos: [
            {
                titulo: 'Transformar prompts vagos en claros',
                contexto: 'Melhorar especificidade',
                semDecomposicao: `❌ VAGO:
"Ayúdame a escribir un correo electrónico"

¿Qué falta?
- ¿A quién va dirigido el correo?
- ¿Sobre qué tema?
- ¿Qué tono debe tener?
- ¿Cuál es el objetivo?`,
                comDecomposicao: `✅ CLARO:
"Escribe un correo para mi gerente solicitando aprobación para asistir a una conferencia.

Detalles:
- Conferencia: Web Summit 2024 en Lisboa
- Costo: R$15.000 (pasaje + hotel + inscripción)
- Beneficios: networking, aprendizaje sobre IA, oportunidades de colaboración
- Tono: profesional, pero persuasivo
- Extensión: 3 párrafos cortos

Incluye:
1. Contexto de la conferencia
2. Beneficios para la empresa
3. Solicitud de aprobación y disponibilidad para conversar"`,
                resultado: 'Correo electrónico específico, adecuado y listo para enviar (con pequeños ajustes).'
            },
            {
                titulo: 'Especificidad en el análisis',
                contexto: 'Pedir análisis de datos',
                semDecomposicao: `❌ VAGO:
"Analiza estas ventas" [pega la hoja de cálculo]

Resultado: análisis genérico y superficial`,
                comDecomposicao: `✅ CLARO:
"Analiza estos datos de ventas del Q1 2024 [pega la hoja de cálculo]

Preguntas específicas:
1. ¿Qué producto tuvo el mejor desempeño? ¿Por qué?
2. ¿Hubo estacionalidad? ¿Cuándo fueron los picos?
3. ¿Qué región vendió más? ¿Hay patrones geográficos?
4. Compara con la meta de R$500k: ¿la alcanzamos? ¿Cuál fue la desviación?

Formato de la respuesta:
- Responde cada pregunta por separado
- Usa cifras y porcentajes específicos
- Cita evidencias de los datos
- Máximo 2 párrafos por pregunta"`,
                resultado: 'Análisis estructurado, con conclusiones específicas y prácticas.'
            }
        ],

        casosDeUso: [
            {
                area: 'Todas las áreas',
                aplicacao: 'Cualquier interacción con un LLM',
                detalhes: 'La claridad es universal: siempre es importante'
            }
        ],

        dicasPraticas: [
            '✓ Pregúntate: "¿Otra persona entendería exactamente lo que quiero?"',
            '✓ Sustituye los adjetivos vagos por especificaciones: "bueno" → "con una tasa de conversión >5%"',
            '✓ Usa números siempre que sea posible: "algunos" → "3-5"',
            '✓ Define lo que NO quieres (tan importante como lo que quieres)',
            '✓ Prueba: si la respuesta no es buena, probablemente el prompt no fue claro'
        ],

        errosComuns: [
            {
                erro: 'Asumir que el modelo «entiende» el contexto implícito',
                exemplo: '«Mejora esto» [sin decir qué mejorar]',
                solucao: 'Sé explícito: «Mejora la claridad de este párrafo reduciendo la jerga técnica»'
            },
            {
                erro: 'Usar adjetivos sin definición',
                exemplo: '"Escreva algo criativo e interessante"',
                solucao: 'Define: "Creativo = usa metáforas inesperadas; Interesante = incluye estadísticas sorprendentes"'
            },
            {
                erro: 'Prompts de una frase sin contexto',
                exemplo: '"Como fazer marketing?"',
                solucao: 'Contextualiza: «¿Cómo hacer marketing digital para un SaaS B2B con un precio promedio de R$500/mes?»'
            }
        ],

        recursosAdicionais: [
            '📖 Estudia el principio "Show, don\'t tell" aplicado a prompts',
            '🎓 Practica: toma prompts vagos y reescríbelos con la máxima claridad',
            '📝 Mantén una lista de "palabras vagas que debes evitar" vs "especificaciones claras"'
        ]
    },

    // ==============================================
    // NÍVEL INICIANTE - MÓDULO 2: Técnicas Básicas
    // ==============================================

    'zero-shot': {
        titulo: 'Zero-Shot Prompting',
        nivel: 'Principiante',
        modulo: 2,
        icon: '🎯',
        introducao: `Zero-shot consiste en pedirle al modelo que haga algo sin darle ejemplos. Es la forma más sencilla de prompting: solo instrucciones directas. Funciona bien para tareas comunes que el modelo ya conoce.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-zero-shot.md',

        conteudoCompleto: `## ¿Qué es Zero-Shot?

«Zero-shot» significa «cero ejemplos». Simplemente describes la tarea y el modelo intenta ejecutarla según su entrenamiento.

### Estructura básica

\`\`\`
[Instrucción clara sobre qué hacer]
[Especificaciones opcionales]
[Entrada/contexto si es necesario]
\`\`\`

### ¿Cuándo usar Zero-Shot?

✅ Tareas comunes y bien definidas
✅ Cuando el modelo ya conoce la tarea
✅ Para ahorrar tiempo (no hace falta crear ejemplos)
✅ Cuando la tarea se explica por sí sola

### Limitaciones

❌ Tareas muy específicas o poco comunes
❌ Formatos muy particulares
❌ Cuando necesitas un estilo muy específico
❌ Tareas ambiguas

## Ejemplos de buen uso

### Traducción
«Traduce este texto al inglés: [texto]»
→ Tarea común, el modelo sabe hacerla

### Resumen
«Resume este artículo en 3 frases: [artículo]»
→ Tarea directa y conocida

### Extracción
«Extrae todos los correos electrónicos de este texto: [texto]»
→ Patrón claro y reconocible`,

        exemplos: [
            {
                titulo: 'Zero-Shot Funcionando Bem',
                contexto: 'Tareas adecuadas para zero-shot',
                semDecomposicao: `Tarea: Clasificar el sentimiento

Prompt:
«Clasifica el sentimiento de esta reseña como positivo, negativo o neutro:

“El producto llegó rápido, pero la calidad es inferior a la esperada. La atención fue buena.”»

Respuesta del modelo:
«Neutro (aspectos positivos y negativos equilibrados)»`,
                comDecomposicao: `✅ Funcionó porque:
- Es una tarea común (análisis de sentimientos)
- Las opciones son claras (positivo/negativo/neutro)
- La entrada está bien definida (una reseña específica)
- No necesita ejemplos: el modelo ya sabe qué son los sentimientos`,
                resultado: 'Zero-shot es eficaz para tareas como esta.'
            },
            {
                titulo: 'Cuándo Zero-Shot no es suficiente',
                contexto: 'Limitaciones del zero-shot',
                semDecomposicao: `Tarea: Dar formato a citas según el estilo específico de la empresa

Prompt:
«Dale a esta cita nuestro estilo estándar:
John dijo que aumentó las ventas en un 40 %»

Respuesta:
«John: “Aumenté las ventas en un 40 %”»

❌ Problema: El modelo no conoce tu «estilo estándar»`,
                comDecomposicao: `Solución: Agregar ejemplos (few-shot)
O ser mucho más específico:

«Dale este formato:
[NOMBRE EN MAYÚSCULAS] | [Empresa] | [Cargo]
“[Cita]”
↳ [Métrica destacada]»`,
                resultado: 'Para formatos específicos, zero-shot no basta.'
            }
        ],

        casosDeUso: [
            {
                area: 'Procesamiento de texto',
                aplicacao: 'Traducción, resumen, extracción',
                detalhes: 'Las tareas lingüísticas estándar funcionan bien en zero-shot'
            },
            {
                area: 'Clasificación simple',
                aplicacao: 'Clasificar en grupos conocidos',
                detalhes: 'Sentimiento, temas generales, tipo de contenido'
            },
            {
                area: 'Q&A Direto',
                aplicacao: 'Perguntas factuais',
                detalhes: 'Cuando la respuesta está en el conocimiento del modelo'
            }
        ],

        dicasPraticas: [
            '✓ Empieza con zero-shot: es más rápido',
            '✓ Si el resultado no es bueno, agrega especificaciones antes de probar con few-shot',
            '✓ Zero-shot funciona mejor con modelos más grandes o avanzados',
            '✓ Sé aún más claro en zero-shot (sin ejemplos que te guíen)',
            '✓ Prueba si la tarea es lo bastante "común" para zero-shot'
        ],

        errosComuns: [
            {
                erro: 'Usar zero-shot para formatos muy específicos',
                exemplo: 'Esperar que el modelo conozca la plantilla interna de la empresa',
                solucao: 'Usa few-shot con ejemplos del formato deseado'
            },
            {
                erro: 'Asumir que la tarea es «obvia»',
                exemplo: '«Haz lo correcto con este texto»',
                solucao: 'Sé explícito incluso en zero-shot'
            }
        ],

        recursosAdicionais: [
            '📖 Compara zero-shot vs few-shot para la misma tarea',
            '🎓 Estudia las capacidades de diferentes modelos en zero-shot',
            '🧪 Experimenta: cuándo zero-shot es suficiente y cuándo no'
        ]
    },

    'few-shot': {
        titulo: 'Few-Shot Prompting',
        nivel: 'Principiante',
        modulo: 2,
        icon: '📚',
        introducao: `Few-shot consiste en proporcionar algunos ejemplos de lo que quieres antes de realizar la tarea. Es una de las técnicas más poderosas y sencillas: «muéstrale al modelo» en vez de solo explicarle.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-few-shot.md',

        conteudoCompleto: `## ¿Qué es Few-Shot?

Few-shot significa «pocos ejemplos». Muestras 2-5 ejemplos de la entrada→salida deseada y luego das la entrada real.

### Estructura

\`\`\`
[Instrucción de la tarea]

Ejemplo 1:
Entrada: [ejemplo 1]
Salida: [respuesta deseada 1]

Ejemplo 2:
Entrada: [ejemplo 2]
Salida: [respuesta deseada 2]

Ahora hazlo:
Entrada: [tarea real]
Salida:
\`\`\`

### ¿Por qué funciona Few-Shot?

- **Aprendizaje de patrones:** Los LLM son excelentes para reconocer patrones
- **Claridad mediante demostración:** Un ejemplo vale más que una explicación
- **Control del formato:** Defines exactamente cómo quieres la respuesta
- **Reduce la ambigüedad:** Los ejemplos resuelven dudas

## ¿Cuántos ejemplos?

- **1-2 ejemplos:** Para tareas sencillas o formatos directos
- **3-5 ejemplos:** Para tareas más complejas (ideal)
- **6+ ejemplos:** Rara vez son necesarios (y consumen tokens)

## Tipos de Few-Shot

### 1. Few-Shot de formato
Muestra la estructura de la respuesta

### 2. Few-Shot de estilo
Muestra el tono y el lenguaje

### 3. Few-Shot de razonamiento
Muestra el proceso de pensamiento`,

        exemplos: [
            {
                titulo: 'Few-Shot para la extracción de información',
                contexto: 'Extraer datos estructurados de texto libre',
                semDecomposicao: `❌ Sin ejemplos:

"Extrae el nombre, el cargo y la empresa de esta biografía:
'Maria Silva trabaja como directora de Marketing en TechCorp desde 2020'"

Problema: el modelo puede usar un formato incoherente`,
                comDecomposicao: `✅ Con few-shot:

"Extrae la información en formato JSON:

Ejemplo 1:
Bio: "João Santos es CEO de StartupX desde hace 3 años"
{
  "nome": "João Santos",
  "cargo": "CEO",
  "empresa": "StartupX"
}

Ejemplo 2:
Bio: "Ana Costa, desarrolladora senior en Google"
{
  "nome": "Ana Costa",
  "cargo": "Desenvolvedora Senior",
  "empresa": "Google"
}

Ahora extrae:
Bio: "Maria Silva trabaja como Directora de Marketing en TechCorp desde 2020"
{`,
                resultado: 'Respuesta consistente en el formato JSON exacto que definiste.'
            },
            {
                titulo: 'Few-Shot para clasificación personalizada',
                contexto: 'Categorías específicas de tu negocio',
                semDecomposicao: `Tarea: Clasificar tickets de soporte en las categorías de la empresa

Categorías: Técnico, Facturación, Consulta, Queja

Ejemplos:
«No puedo iniciar sesión» → Técnico
«¿Por qué me cobraron dos veces?» → Facturación
«¿Cómo funciona la función X?» → Consulta
«¡El producto llegó roto!» → Queja

Ahora clasifica:
«Mi contraseña no funciona y ya intenté restablecerla 3 veces»`,
                comDecomposicao: `→ Técnico

✅ Few-shot le enseñó al modelo tus categorías específicas y cómo distinguirlas.`,
                resultado: 'Clasificación precisa con una taxonomía personalizada.'
            }
        ],

        casosDeUso: [
            {
                area: 'Formatação',
                aplicacao: 'Estructuras específicas',
                detalhes: 'JSON, XML, templates customizados - mostre o formato exato'
            },
            {
                area: 'Clasificación personalizada',
                aplicacao: 'Categorías específicas del negocio',
                detalhes: 'Los ejemplos enseñan los matices de cada categoría'
            },
            {
                area: 'Estilo de escritura',
                aplicacao: 'Tom e voz consistentes',
                detalhes: 'Los ejemplos definen el "estilo" de escritura'
            },
            {
                area: 'Transformación de datos',
                aplicacao: 'Converter formato A → B',
                detalhes: 'Mostre alguns pares input→output'
            }
        ],

        dicasPraticas: [
            '✓ Usa ejemplos REALES de lo que quieres (no genéricos)',
            '✓ Varía los ejemplos (que no sean muy similares entre sí)',
            '✓ 3 ejemplos suelen ser el punto ideal',
            '✓ Muestra casos límite en los ejemplos si es relevante',
            '✓ Mantén los ejemplos concisos (no uses textos enormes)',
            '✓ Formato consistente entre exemplos'
        ],

        errosComuns: [
            {
                erro: 'Exemplos muito similares',
                exemplo: 'Los 3 ejemplos tienen una estructura idéntica',
                solucao: 'Varía los ejemplos para cubrir distintos escenarios de la tarea'
            },
            {
                erro: 'Demasiados ejemplos innecesarios',
                exemplo: '10 ejemplos para una tarea sencilla',
                solucao: 'Empieza con 2-3 y agrega más solo si es necesario'
            },
            {
                erro: 'Exemplos inconsistentes',
                exemplo: 'Exemplo 1 usa JSON, exemplo 2 usa texto livre',
                solucao: 'Mantén el formato idéntico en todos los ejemplos'
            }
        ],

        recursosAdicionais: [
            '📖 Estudia "in-context learning", la base teórica del few-shot',
            '🎓 Practica: toma un zero-shot que falló y agrega ejemplos',
            '🧪 A/B teste: 2 exemplos vs 5 exemplos - qual melhor?'
        ]
    },

    'cot': {
        titulo: 'Chain-of-Thought',
        nivel: 'Principiante',
        modulo: 2,
        icon: '💭',
        introducao: `Chain-of-Thought (cadena de pensamiento) hace que el modelo «muestre su razonamiento» antes de dar la respuesta final. Es especialmente potente para problemas que requieren varias etapas de razonamiento.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-cot.md',

        conteudoCompleto: `## ¿Qué es Chain-of-Thought (CoT)?

En vez de pedir solo la respuesta, le pides al modelo que «piense en voz alta» y explique el razonamiento paso a paso.

### Cómo funciona

**Sin CoT:**
Pregunta → Respuesta

**Con CoT:**
Pregunta → Razonamiento paso a paso → Respuesta

### ¿Por qué usar CoT?

✅ **Mejora la precisión:** Especialmente en problemas complejos
✅ **Detecta errores:** Ves dónde falló el razonamiento
✅ **Aumenta la confiabilidad:** Respuestas más reflexionadas
✅ **Permite depurar:** Puedes corregir pasos específicos

## Tipos de CoT

### 1. CoT explícito
Indicas directamente: «Piensa paso a paso»

\`\`\`
Resuelve este problema paso a paso:
[problema]
\`\`\`

### 2. Few-Shot CoT
Muestras ejemplos con razonamiento

\`\`\`
Ejemplo:
Pregunta: [pregunta]
Razonamiento: [paso 1], [paso 2], [paso 3]
Respuesta: [respuesta]

Ahora resuelve:
[nueva pregunta]
\`\`\`

### 3. Zero-Shot CoT
Simplemente agrega «Vamos a pensar paso a paso»

## ¿Cuándo usar CoT?

- Problemas matemáticos
- Razonamiento lógico
- Análisis multifactorial
- Decisiones complejas
- Resolución de problemas`,

        exemplos: [
            {
                titulo: 'CoT en un problema matemático',
                contexto: 'Resolver problemas de palabras',
                semDecomposicao: `❌ Sin CoT:

"Una tienda vendió 15 camisetas a R$50 cada una e hizo un descuento del 20%. ¿Cuál es la facturación?"

Respuesta: R$600

❌ Problema: el descuento se aplicó mal (¿o la respuesta es correcta, pero no muestra el razonamiento?)`,
                comDecomposicao: `✅ Con CoT:

"Resuelve paso a paso:
Una tienda vendió 15 camisetas a R$50 cada una y aplicó un descuento del 20%. ¿Cuál fue la facturación?"

Respuesta:
Paso 1: Calcular el valor sin descuento
15 camisetas × R$50 = R$750

Paso 2: Calcular el descuento
20% de R$750 = R$150

Paso 3: Aplicar el descuento
R$750 - R$150 = R$600

Respuesta final: R$600`,
                resultado: 'Ves exactamente el razonamiento y puedes validar cada paso.'
            },
            {
                titulo: 'CoT en análisis de negocio',
                contexto: 'Decisión estratégica',
                semDecomposicao: `Pregunta: "¿Debemos lanzar el producto ahora o esperar 3 meses?"

Sin CoT, la respuesta puede ser superficial o basarse en apenas 1-2 factores.`,
                comDecomposicao: `Con CoT:

«Analiza paso a paso si debemos lanzar ahora o dentro de 3 meses:

Contexto: producto SaaS B2B, 80% listo, un competidor lanzó algo similar la semana pasada»

Razonamiento:

1. Análisis del momento de mercado
   - Un competidor lanzó recientemente = la ventana de oportunidad se está reduciendo
   - Pero lanzar un producto incompleto puede perjudicar la reputación

2. Evaluación del nivel de preparación
   - 80% listo = funciona, pero faltan características importantes
   - 3 meses = tiempo para pulirlo y agregar elementos diferenciadores

3. Impacto competitivo
   - Lanzar ahora = evita perder mercado
   - Esperar 3 meses = el competidor gana impulso

4. Riesgo frente a oportunidad
   - Riesgo de lanzar temprano: errores, mala experiencia
   - Riesgo de esperar: perder el momento de mercado

Recomendación: lanzar una versión beta AHORA para los primeros usuarios + una hoja de ruta pública con mejoras para los próximos 3 meses.`,
                resultado: 'Decisión fundamentada con razonamiento multidimensional transparente.'
            }
        ],

        casosDeUso: [
            {
                area: 'Matemáticas y lógica',
                aplicacao: 'Problemas de razonamiento',
                detalhes: 'CoT mejora notablemente la precisión en problemas complejos'
            },
            {
                area: 'Análisis y toma de decisiones',
                aplicacao: 'Elecciones estratégicas',
                detalhes: 'Ver el razonamiento ayuda a validar la recomendación'
            },
            {
                area: 'Debugging',
                aplicacao: 'Encontrar erros',
                detalhes: 'El razonamiento paso a paso permite identificar dónde está el problema'
            },
            {
                area: 'Educação',
                aplicacao: 'Explicar conceitos',
                detalhes: 'Mostrar el razonamiento enseña, no solo responde'
            }
        ],

        dicasPraticas: [
            '✓ Con solo agregar "piensa paso a paso" ya puedes mejorar los resultados',
            '✓ Para problemas numéricos, usa siempre CoT',
            '✓ Combina CoT con few-shot para lograr el máximo efecto',
            '✓ Pide que numere los pasos (facilita la referencia)',
            '✓ Usa CoT cuando una respuesta incorrecta pueda tener consecuencias graves',
            '✓ Revisa el razonamiento, no solo la respuesta final'
        ],

        errosComuns: [
            {
                erro: 'Usar CoT para preguntas triviales',
                exemplo: '«¿Cuál es la capital de Brasil? Piensa paso a paso»',
                solucao: 'CoT es para problemas complejos. Las preguntas simples no lo necesitan.'
            },
            {
                erro: 'No especifiques el formato del razonamiento',
                exemplo: 'Pedir CoT sin decir cómo estructurarlo',
                solucao: 'Especifica: "Enumera cada paso" o "Analiza 3 dimensiones: X, Y, Z"'
            },
            {
                erro: 'Ignorar el razonamiento y solo ver la respuesta final',
                exemplo: 'Saltar directamente a la conclusión',
                solucao: 'El valor del CoT está EN EL RAZONAMIENTO: valida cada paso'
            }
        ],

        recursosAdicionais: [
            '📖 Leia paper original Chain-of-Thought Prompting (Google Research)',
            '🎓 Estudia variaciones: Tree-of-Thought, Graph-of-Thought',
            '🧪 Prueba: la misma pregunta con/sin CoT; compara la precisión'
        ]
    },

    'role': {
        titulo: 'Role Prompting (Personas)',
        nivel: 'Principiante',
        modulo: 2,
        icon: '🎭',
        introducao: `Role Prompting consiste en asignar una «persona» o un papel al modelo. Al decir «Eres un [especialista X]», activas conocimientos y estilos específicos, y adaptas la respuesta al contexto deseado.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo2-role.md',

        conteudoCompleto: `## ¿Qué es Role Prompting?

Defines quién «es» el modelo antes de hacer la pregunta. Eso contextualiza la respuesta.

### Estructura básica

\`\`\`
Eres un [rol/especialista] con [características].
[Tu tarea/pregunta]
\`\`\`

### ¿Por qué funciona?

El modelo se entrenó con textos de diversos especialistas. Al definir un rol, «activas» patrones de lenguaje, conocimiento y estilo asociados a ese rol.

## Tipos de roles

### 1. Rol por experiencia
«Eres un médico especialista en cardiología»
→ Activa conocimientos médicos y terminología técnica

### 2. Rol por estilo
«Eres un profesor que explica a niños de 10 años»
→ Activa un lenguaje sencillo, analogías y paciencia

### 3. Rol por perspectiva
«Eres un crítico escéptico que analiza este argumento»
→ Activa el pensamiento crítico y la búsqueda de fallas

### 4. Rol por contexto
«Eres un consultor de ventas B2B»
→ Activa conocimientos de ventas y un enfoque en ROI

## Elementos de un buen rol

1. **Específico:** «Nutricionista deportiva» > «especialista en salud»
2. **Con contexto:** «...con 15 años de experiencia»
3. **Con objetivo:** «...que ayuda a atletas profesionales»
4. **Con estilo:** «...conocido por sus explicaciones prácticas»`,

        exemplos: [
            {
                titulo: 'Role para explicación técnica',
                contexto: 'Explicar conceito complexo',
                semDecomposicao: `❌ Sin rol:

"Explica qué es una API REST"

Resultado: explicación genérica, que puede ser muy técnica o muy superficial`,
                comDecomposicao: `✅ Con un rol específico:

OPCIÓN 1 (Público técnico):
"Eres un arquitecto de software senior que explica conceptos a desarrolladores junior.
Explica qué es una API REST y cuándo usarla."

→ Resultado: explicación técnica, pero didáctica, con ejemplos de código

OPCIÓN 2 (Público no técnico):
"Eres un consultor de tecnología que explica conceptos a CEO sin formación técnica.
Explica qué es una API REST y por qué es importante para el negocio."

→ Resultado: analogías de negocio, enfoque en el valor y cero jerga`,
                resultado: 'La misma pregunta, respuestas totalmente diferentes según el rol.'
            },
            {
                titulo: 'Role para análisis desde una perspectiva',
                contexto: 'Obtener diferentes puntos de vista',
                semDecomposicao: `Tarea: Analizar la decisión de aumentar el precio del producto

Sin role: Análisis genérico

Con distintos roles:`,
                comDecomposicao: `ROL 1:
"Eres el CFO enfocado en el margen y la rentabilidad.
Analiza el aumento del 20% en el precio del producto."
→ Enfoque: impacto financiero, proyecciones de ingresos

ROL 2:
"Eres el head de Customer Success preocupado por la tasa de cancelación.
Analiza el aumento del 20% en el precio del producto."
→ Enfoque: retención, satisfacción del cliente, valor percibido

ROL 3:
"Eres el VP de Ventas que necesita cumplir la meta este trimestre.
Analiza el aumento del 20% en el precio del producto."
→ Enfoque: impacto en la conversión, objeciones, estrategias de venta`,
                resultado: 'Múltiples perspectivas revelan distintos aspectos de la decisión.'
            }
        ],

        casosDeUso: [
            {
                area: 'Educação',
                aplicacao: 'Ajustar el nivel de explicación',
                detalhes: 'Role de «profesor» + nivel del estudiante = explicación adecuada'
            },
            {
                area: 'Creación de contenido',
                aplicacao: 'Definir voz e tom',
                detalhes: 'Role de copywriter, periodista, poeta, etc.'
            },
            {
                area: 'Análisis y consultoría',
                aplicacao: 'Perspectiva especializada',
                detalhes: 'Un role de consultor X activa conocimientos específicos'
            },
            {
                area: 'Brainstorming',
                aplicacao: 'Ideas desde diferentes ángulos',
                detalhes: 'Múltiples roles generan ideas diversas'
            }
        ],

        dicasPraticas: [
            '✓ Sé específico con el rol: "nutricionista deportiva" > "persona que sabe de nutrición"',
            '✓ Añade contexto al rol: "...con 10 años ayudando a startups..."',
            '✓ Combina el rol con el público objetivo: "Tú eres X y se lo explicas a Y"',
            '✓ Prueba distintos roles para la misma pregunta (muestra la versatilidad)',
            '✓ Usa roles reales que existan (el modelo tiene más ejemplos)',
            '✓ No exageres: el rol debe ser relevante, no "eres un maestro jedi ninja"'
        ],

        errosComuns: [
            {
                erro: 'Role muito vago',
                exemplo: '«Eres un especialista»',
                solucao: 'Especifica: "Eres especialista en marketing de contenidos B2B SaaS"'
            },
            {
                erro: 'Role irrelevante para la tarea',
                exemplo: '«Eres chef. Explica blockchain.»',
                solucao: 'El role debe tener experiencia relevante para la pregunta'
            },
            {
                erro: 'Role que entra en conflicto con la tarea',
                exemplo: '«Eres imparcial. Convénceme de que X es mejor que Y.»',
                solucao: 'Alinea el rol con el objetivo de la tarea'
            }
        ],

        recursosAdicionais: [
            '📖 Estudia "persona-based prompting" en marketing',
            '🎓 Crea una biblioteca de roles útiles para tus tareas habituales',
            '🧪 Experimenta combinando múltiples roles: "Tú eres X Y Y"'
        ]
    },

    'contextualizacao': {
        titulo: 'Contextualización efectiva',
        nivel: 'Principiante',
        modulo: 2,
        icon: '🎯',
        introducao: `Contextualizar consiste en proporcionar información de contexto que orienta la respuesta del modelo en la dirección correcta. El contexto transforma prompts genéricos en otros específicos y útiles.`,
        conteudoArquivo: 'conteudo/modulo2-contextualizacao.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Comunicação',
                aplicacao: 'Emails e mensagens',
                detalhes: 'El contexto sobre el público, la situación y el objetivo mejora el tono y la relevancia'
            },
            {
                area: 'Ensino',
                aplicacao: 'Explicaciones didácticas',
                detalhes: 'El contexto sobre el nivel de conocimientos adapta la profundidad'
            },
            {
                area: 'Técnico',
                aplicacao: 'Depuración y código',
                detalhes: 'El contexto sobre la tecnología, el error específico y los intentos realizados acelera la solución'
            }
        ],
        dicasPraticas: [
            '✓ Usa la plantilla: Público + Situación + Objetivo + Restricciones',
            '✓ El contexto del público cambia el lenguaje y la profundidad',
            '✓ El contexto del objetivo cambia el enfoque (teórico vs. práctico)',
            '✓ Elimina la información irrelevante (sin exagerar)',
            '✓ El contexto es fundamental en tareas ambiguas o decisiones'
        ],
        errosComuns: [
            {
                erro: 'Contexto insuficiente',
                exemplo: '«Necesito ayuda con Python»',
                solucao: 'Agrega: nivel, objetivo, problema específico'
            },
            {
                erro: 'Contexto excessivo e irrelevante',
                exemplo: 'Incluir detalles personales no relacionados con la tarea',
                solucao: 'Enfócate en el contexto que afecta la respuesta'
            }
        ],
        recursosAdicionais: [
            '📖 Pratique adicionar contexto a prompts vagos',
            '🎓 Crea una plantilla personal de contexto para tus tareas',
            '🧪 Compara los resultados con/sin contexto'
        ]
    },

    'empoderamento': {
        titulo: 'Prompt de empoderamiento (EXPERTO)',
        nivel: 'Principiante',
        modulo: 2,
        icon: '⚡',
        introducao: `Framework EXPERT que permite que la IA piense de forma autónoma y profunda sobre problemas complejos. Transforma respuestas superficiales en análisis ricos, multidimensionales y realmente útiles.`,
        conteudoArquivo: 'conteudo/modulo2-empoderamento.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Consultoria',
                aplicacao: 'Análisis estratégicos',
                detalhes: 'Soluciones profundas en lugar de respuestas superficiales'
            },
            {
                area: 'Educação',
                aplicacao: 'Ensino complexo',
                detalhes: 'Explicaciones multidimensionales adaptadas al aprendiz'
            }
        ],
        dicasPraticas: [
            '✓ Usa EXPERT para problemas que requieren un razonamiento profundo',
            '✓ Combínalo con role prompting para potenciar la experiencia',
            '✓ El framework activa la autonomía de la IA',
            '✓ Ideal para consultorías, análisis y planificación'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'meta-prompting': {
        titulo: 'Ingeniero de prompts interactivo',
        nivel: 'Principiante',
        modulo: 2,
        icon: '🔧',
        introducao: `Meta-prompting que transforma la IA en un ingeniero especializado en crear y refinar prompts. Automatiza la creación de prompts optimizados mediante un proceso iterativo de preguntas y refinamiento.`,
        conteudoArquivo: 'conteudo/modulo2-engenheiro-interativo.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Automação',
                aplicacao: 'Creación de prompts',
                detalhes: 'IA faz perguntas e cria prompt perfeito'
            },
            {
                area: 'Aprendizado',
                aplicacao: 'Ensinar prompting',
                detalhes: 'Meta-prompt que enseña las mejores prácticas'
            }
        ],
        dicasPraticas: [
            '✓ Deja que la IA haga preguntas antes de generar',
            '✓ El proceso iterativo es más eficiente',
            '✓ Úsalo para tareas complejas o recurrentes',
            '✓ Guarda los prompts generados para reutilizarlos'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'prompts-iterativos': {
        titulo: 'Prompts Conversacionais (Iterativo)',
        nivel: 'Principiante',
        modulo: 2,
        icon: '🔄',
        introducao: `Técnica para refinar respuestas mediante múltiples interacciones en lugar de buscar la perfección en el primer prompt. Es más natural y eficiente que intentar crear el prompt perfecto de inmediato.`,
        conteudoArquivo: 'conteudo/modulo2-prompts-interativos.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Escrita',
                aplicacao: 'Refinamiento de textos',
                detalhes: 'Empieza de forma simple + preguntas de seguimiento («más técnico», «agrega ejemplos»)'
            },
            {
                area: 'Brainstorming',
                aplicacao: 'Ideación progresiva',
                detalhes: 'Explorar ideas y desarrollar las mejores'
            }
        ],
        dicasPraticas: [
            '✓ Comece simples, refine depois',
            '✓ Use comandos curtos: "expandir", "simplificar", "exemplos"',
            '✓ Más rápido que crear un megaprompt inicial',
            '✓ Natural e conversacional'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'skeleton-of-thought': {
        titulo: 'Skeleton of Thought',
        nivel: 'Principiante',
        modulo: 2,
        icon: '🦴',
        introducao: `Técnica que primero pide un esquema (outline) de la respuesta antes del contenido completo. Acelera las respuestas largas y permite validar la estructura antes de generar todo.`,
        conteudoArquivo: 'conteudo/modulo2-skeleton-of-thought.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Contenido extenso',
                aplicacao: 'Artigos e reports',
                detalhes: 'Validar la estructura antes de generar el contenido completo'
            },
            {
                area: 'Otimização',
                aplicacao: 'Reducción de latencia',
                detalhes: 'Respuestas más rápidas en 2 pasos'
            }
        ],
        dicasPraticas: [
            '✓ Úsalo para respuestas largas y estructuradas',
            '✓ Valida el esquema antes de ampliarlo',
            '✓ Puedes paralelizar la ampliación de los puntos',
            '✓ Reduce la latencia perceptible'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    '24-dimensoes-persona': {
        titulo: '24 dimensiones de persona',
        nivel: 'Principiante',
        modulo: 2,
        icon: '👤',
        introducao: `Framework de 24 atributos para crear personas profundas y multifacéticas que la IA pueda asumir. Crea simulaciones mucho más ricas y auténticas que el role prompting simple.`,
        conteudoArquivo: 'conteudo/modulo2-24-dimensoes-persona.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Criatividade',
                aplicacao: 'Personagens complexos',
                detalhes: 'Narrativas, guiones y juegos con personas profundas'
            },
            {
                area: 'Simulação',
                aplicacao: 'Especialistas realistas',
                detalhes: 'Consultores con experiencia, valores y estilos únicos'
            }
        ],
        dicasPraticas: [
            '✓ No hace falta usar las 24 dimensiones',
            '✓ Elige dimensiones relevantes para el contexto',
            '✓ Cuantos más detalles, más auténtica será la persona',
            '✓ Combínalo con role prompting'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'humanizacao': {
        titulo: 'Humanización de texto',
        nivel: 'Principiante',
        modulo: 2,
        icon: '✍️',
        introducao: `Técnicas para hacer que el texto generado por IA parezca escrito por personas, con naturalidad e imperfecciones estratégicas. Aumenta la autenticidad y la participación, y reduce la detección por herramientas anti-IA.`,
        conteudoArquivo: 'conteudo/modulo2-humanizacao.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Conteúdo',
                aplicacao: 'Blogs e redes sociais',
                detalhes: 'Textos auténticos que generan interés'
            },
            {
                area: 'Comunicação',
                aplicacao: 'Emails e mensagens',
                detalhes: 'Tom natural e conversacional'
            }
        ],
        dicasPraticas: [
            '✓ Usa contracciones y lenguaje coloquial',
            '✓ Varía la estructura de las oraciones (cortas + largas)',
            '✓ Añade opiniones y emociones',
            '✓ Las imperfecciones sutiles aumentan la autenticidad',
            '✓ No exageres: mantén el profesionalismo'
        ],
        errosComuns: [],
        recursosAdicionais: []
    },

    'refinamento': {
        titulo: 'Refinamento Iterativo',
        nivel: 'Técnico',
        modulo: 3,
        icon: '🔄',
        introducao: `El refinamiento iterativo es la habilidad de mejorar prompts mediante ciclos de prueba, evaluación y ajuste. Rara vez acertamos a la primera, ¡y está bien! El proceso iterativo es la clave.`,
        conteudoArquivo: 'conteudo/modulo3-refinamento.md',
        exemplos: [],
        casosDeUso: [
            {
                area: 'Conteúdo',
                aplicacao: 'Escrita e copy',
                detalhes: 'Refinar progresivamente el tono, la extensión y elementos específicos'
            },
            {
                area: 'Código',
                aplicacao: 'Code generation',
                detalhes: 'Iterar en los requisitos, edge cases y optimizaciones'
            },
            {
                area: 'Análise',
                aplicacao: 'Reports e dashboards',
                detalhes: 'Ajustar la profundidad, el formato y las conclusiones específicas'
            }
        ],
        dicasPraticas: [
            '✓ 2-3 refinamientos son suficientes para más del 90% de las tareas',
            '✓ La retroalimentación específica > la retroalimentación vaga ("muy formal" vs. "no me gustó")',
            '✓ Mantén lo que funciona; cambia solo el problema',
            '✓ Aprende cuándo parar: "suficientemente bueno" > perfección',
            '✓ Documenta los prompts exitosos para reutilizarlos'
        ],
        errosComuns: [
            {
                erro: 'Abandonar después de que V1 no funcione',
                exemplo: 'Pensar que «no soy bueno para escribir prompts»',
                solucao: 'El refinamiento es normal y esperado, no es un fracaso'
            },
            {
                erro: 'Reescribir desde cero en vez de refinar',
                exemplo: 'Jogar fora V1 e criar prompt totalmente diferente',
                solucao: 'Ajuste incrementalmente: V1 → V2 → V3'
            },
            {
                erro: 'Refinar infinitamente (perfecionismo)',
                exemplo: 'V5, V6, V7 buscando una mejora del 1%',
                solucao: 'Ley de los rendimientos decrecientes: detente en el 90-95%'
            }
        ],
        recursosAdicionais: [
            '📖 Crea una biblioteca de prompts refinados con el "antes y después"',
            '🎓 Identifica tus patrones personales de refinamiento',
            '🧪 Pratique ciclo: V1 → Avaliar → V2 → Avaliar → V3'
        ]
    },

    // ==============================================
    // NÍVEL TÉCNICO - MÓDULO 3
    // ==============================================

    'decomposicao': {
        titulo: 'Descomposición de tareas',
        nivel: 'Técnico',
        modulo: 3,
        icon: '📋',
        introducao: `La descomposición de tareas es una técnica fundamental de ingeniería de prompts que consiste en dividir problemas complejos en subtareas más pequeñas, específicas y manejables. Este enfoque permite que los modelos de lenguaje procesen cada parte con la máxima concentración y precisión.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-decomposicao.md',

        exemplos: [
            {
                titulo: 'Ejemplo 1: Creación de una estrategia de marketing',
                contexto: 'Necesitas crear una estrategia completa de marketing digital',
                semDecomposicao: `Mal prompt (sin descomposición):
"Crea una estrategia de marketing digital completa para mi startup SaaS B2B que vende software de gestión de proyectos."

Problema: es demasiado amplio; el resultado será superficial en todas las áreas.`,
                comDecomposicao: `Buen prompt (con descomposición):

**PROMPT 1 - Análisis de audiencia:**
Analiza el público objetivo de una startup SaaS B2B de gestión de proyectos:
1. Identifica 3 personas principales (cargo, problemas, objetivos)
2. Para cada persona, enumera 5 canales digitales en los que está activa
3. Identifica patrones de comportamiento de compra

**PROMPT 2 - Posicionamiento:**
Con base en las personas identificadas: [pega el resultado del Prompt 1]
Define:
1. Propuesta de valor única para cada persona
2. Mensaje principal de marketing
3. Diferenciadores frente a la competencia

**PROMPT 3 - Tácticas de canales:**
Usando el posicionamiento: [pega el resultado del Prompt 2]
Crea tácticas específicas para:
1. LinkedIn (contenido + ads)
2. Google Ads (palabras clave + copy)
3. Email marketing (secuencia de nurturing)

**PROMPT 4 - Métricas:**
Para las tácticas definidas: [pega el resultado del Prompt 3]
Establece:
1. KPIs para cada canal
2. Metas mensuales realistas
3. Asignación del presupuesto por canal`,
                resultado: 'Cada etapa genera un resultado profundo y específico. El resultado final es una estrategia completa y práctica.'
            },
            {
                titulo: 'Ejemplo 2: Análisis de datos',
                contexto: 'Analizar los resultados de una encuesta de satisfacción con 500 respuestas',
                semDecomposicao: `«Analiza esta encuesta de satisfacción y dame conclusiones»
Resultado: Análisis genérico y superficial`,
                comDecomposicao: `**ETAPA 1 - Limpieza:**
Identifica y enumera:
- Respuestas inconsistentes
- Patrones sospechosos
- Datos faltantes significativos

**ETAPA 2 - Segmentación:**
Agrupa a los encuestados por:
- Perfil demográfico
- Nivel de satisfacción (promotores/neutros/detractores)
- Frecuencia de uso del producto

**ETAPA 3 - Análisis cualitativo:**
Para los comentarios abiertos:
- Extrae temas recurrentes
- Categoriza los comentarios (producto/atención/precio)
- Identifica las citas más representativas

**ETAPA 4 - Correlaciones:**
Cruza datos para identificar:
- Qué factores tienen mayor impacto en la satisfacción
- Perfiles con mayor/menor satisfacción
- Patrones no evidentes

**ETAPA 5 - Recomendaciones:**
Con base en todo lo anterior:
- 3 acciones a corto plazo
- 2 iniciativas a mediano plazo
- 1 cambio estratégico a largo plazo`,
                resultado: 'Análisis profundo, estructurado y práctico.'
            }
        ],

        casosDeUso: [
            {
                area: 'Desarrollo de software',
                aplicacao: 'Planificación de features complejas',
                detalhes: 'Descomponer en: arquitectura → backend → frontend → pruebas → documentación'
            },
            {
                area: 'Creación de contenido',
                aplicacao: 'Escribir un artículo técnico extenso',
                detalhes: 'Descomponer en: outline → investigación → borrador de cada sección → revisión → SEO'
            },
            {
                area: 'Business Analysis',
                aplicacao: 'Análisis de viabilidad de un producto nuevo',
                detalhes: 'Descomponer en: mercado → técnico → financiero → riesgos → recomendación'
            }
        ],

        dicasPraticas: [
            '✓ Empieza identificando los "bloques principales" del problema',
            '✓ Cada subtarea debe tener un objetivo claro y medible',
            '✓ Mantenha contexto entre etapas (cole resultados anteriores)',
            '✓ No exageres: generalmente, lo ideal son 3-5 etapas',
            '✓ Documenta el output de cada etapa como referencia futura',
            '✓ Permite iterar: puedes volver y perfeccionar una etapa específica'
        ],

        errosComuns: [
            {
                erro: 'Decompor demais',
                exemplo: 'Crear 15 subtareas minúsculas',
                solucao: 'Busca el equilibrio: cada etapa debe aportar un valor significativo'
            },
            {
                erro: 'Perder el hilo',
                exemplo: 'Etapas desconectadas que no se integran',
                solucao: 'Ten siempre clara la visión general y cómo se conectan las partes'
            },
            {
                erro: 'No transfieras contexto',
                exemplo: 'Cada prompt empieza desde cero',
                solucao: 'Copia los resultados relevantes de las etapas anteriores'
            }
        ],

        recursosAdicionais: [
            '📖 Lee sobre "Divide and Conquer" en algoritmos',
            '🎓 Estudia metodologías ágiles (dividir en sprints/stories)',
            '🔗 Explora "prompt chaining" para automatizar la descomposición'
        ]
    },

    'chaining': {
        titulo: 'Prompt Chaining',
        nivel: 'Técnico',
        modulo: 3,
        icon: '🔗',
        introducao: `Prompt Chaining es la técnica de conectar múltiples prompts en secuencia, donde la salida de uno alimenta la entrada del siguiente. Es como crear un pipeline de procesamiento en el que cada etapa refina y amplía el trabajo anterior.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-chaining.md',

        exemplos: [
            {
                titulo: 'Cadena para crear contenido',
                contexto: 'Crear una publicación de blog optimizada para SEO',
                chainCompleto: `**PROMPT 1 - Investigación de keywords:**
Entrada: Tema «automatización de marketing»
Salida: Lista de 10 keywords + volumen de búsqueda + dificultad

**PROMPT 2 - Esquema:**
Entrada: Keywords del Prompt 1 + tema
Salida: Esquema con H1, H2 y H3 que incluya keywords estratégicamente

**PROMPT 3 - Borrador:**
Entrada: Esquema del Prompt 2
Salida: Texto completo que siga el esquema

**PROMPT 4 - Optimización SEO:**
Entrada: Texto del Prompt 3
Salida: Texto optimizado (densidad de keywords, meta description, alt texts)

**PROMPT 5 - Edición final:**
Entrada: Texto optimizado del Prompt 4
Salida: Versión pulida, corregida, con CTA`,
                beneficio: 'Cada etapa se centra en un aspecto. El resultado final es muy superior al de un único prompt: «escribe una publicación sobre automatización de marketing».'
            }
        ],

        casosDeUso: [
            {
                area: 'Data Analysis',
                aplicacao: 'Pipeline de análisis',
                detalhes: 'Raw data → Cleaning → Analysis → Visualization code → Insights report'
            },
            {
                area: 'Customer Support',
                aplicacao: 'Resposta automatizada',
                detalhes: 'Classify issue → Find solution in KB → Draft response → Add personalization → Send'
            }
        ],

        dicasPraticas: [
            '✓ Documenta claramente qué debe producir cada etapa del chain',
            '✓ Valida los resultados intermedios antes de continuar',
            '✓ Usa formatos estructurados (JSON, XML) entre etapas para el parsing',
            '✓ Implementa el manejo de errores: ¿qué hacer si falla una etapa?',
            '✓ Considera usar una temperature diferente en cada etapa'
        ],

        errosComuns: [
            {
                erro: 'Chain muito longo',
                exemplo: '10+ pasos con mucha información',
                solucao: 'Mantén las chains con 3-5 etapas. Si necesitas más, crea sub-chains'
            }
        ],

        recursosAdicionais: [
            '🔗 LangChain: framework para chains complejos',
            '📖 Explore "Sequential Chains" vs "Map-Reduce Chains"',
            '🎓 Estudia los "Prompt Pipelines" en producción'
        ]
    },

    'negative': {
        titulo: 'Instrucciones negativas',
        nivel: 'Técnico',
        modulo: 3,
        icon: '🚫',
        introducao: `Las instrucciones negativas son pautas explícitas que especifican lo que el modelo NO debe hacer. Esta técnica es crucial para evitar comportamientos no deseados y orientar las respuestas con mayor precisión.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-negative.md',

        exemplos: [
            {
                titulo: 'Ejemplo 1: Explicación técnica accesible',
                contexto: 'Explicar un concepto técnico a un público no especializado',
                semDecomposicao: `Sin negativas:
«Explica qué es blockchain.»

Resultado: Texto lleno de jerga técnica (hash, node, consensus, etc.)`,
                comDecomposicao: `Con instrucciones negativas:
«Explícale qué es la blockchain a alguien sin conocimientos técnicos.

NO uses:
- Jerga técnica (hash, node, consensus, etc.)
- Términos en inglés sin traducir
- Analogías muy complejas

HAZ lo siguiente:
- Usa analogías cotidianas
- Explica con ejemplos concretos
- Mantén un lenguaje sencillo»

Resultado: explicación clara y accesible con analogías como «cuaderno compartido» en lugar de términos técnicos.`,
                resultado: 'Texto mucho más accesible y comprensible para el público objetivo.'
            },
            {
                titulo: 'Ejemplo 2: Informe factual',
                contexto: 'Análisis de datos sin especulaciones',
                semDecomposicao: `«Analiza estos datos de ventas y dame conclusiones»

Problema: El modelo puede especular sobre las causas sin evidencia`,
                comDecomposicao: `«Analiza estos datos de ventas [datos aquí].

IMPORTANTE - NO hagas lo siguiente:
❌ Especular sobre las causas sin evidencia en los datos
❌ Hacer predicciones sin fundamento estadístico
❌ Inventar datos o porcentajes que no aparecen
❌ Dar recomendaciones sin fundamento

HAZ únicamente lo siguiente:
✅ Describir patrones observables en los datos
✅ Citar cifras y porcentajes exactos
✅ Señalar correlaciones evidentes
✅ Indicar cuándo los datos son insuficientes para llegar a una conclusión»

Resultado: Análisis puramente factual, sin especulaciones.`,
                resultado: 'Informe preciso y confiable, basado únicamente en evidencias.'
            }
        ],

        casosDeUso: [
            {
                area: 'Contenido educativo',
                aplicacao: 'Material didáctico',
                detalhes: 'NO uses ejemplos controvertidos, NO des por sentado que tienes conocimientos previos'
            },
            {
                area: 'Atención al cliente',
                aplicacao: 'Respuestas de soporte',
                detalhes: 'NO hacer promesas, NO especular sobre plazos, NO usar lenguaje técnico'
            },
            {
                area: 'Análisis de datos',
                aplicacao: 'Reports executivos',
                detalhes: 'NO inventar datos, NO especular sobre causas, NO usar jerga estadística compleja'
            }
        ],

        dicasPraticas: [
            '✓ Sé específico con las negativas: en lugar de "no seas técnico", di "no uses términos como API, endpoint, payload"',
            '✓ Combina instrucciones positivas y negativas: indica qué hacer Y qué no hacer',
            '✓ Usa negativas para romper patrones comunes del modelo',
            '✓ Prioriza las 2-3 restricciones más importantes',
            '✓ Prueba: a veces "haz X" funciona mejor que "no hagas Y"'
        ],

        errosComuns: [
            {
                erro: 'Negativas vagas',
                exemplo: '«No seas aburrido» o «No exageres»',
                solucao: 'Sé específico: «NO uses párrafos de más de 4 líneas» o «NO repitas la misma información»'
            },
            {
                erro: 'Muitas negativas',
                exemplo: 'Lista de 15 cosas que no debes hacer',
                solucao: 'Enfócate en las 3-5 restricciones más críticas'
            },
            {
                erro: 'Negativas contradictorias',
                exemplo: '«Sé detallado» + «NO seas verboso»',
                solucao: 'Alinea las instrucciones positivas y negativas'
            }
        ],

        recursosAdicionais: [
            '📖 Estude "constraint-based prompting"',
            '🎓 Aprende sobre "guardrails" en los LLM',
            '🔗 Combínalo con output prefilling para tener el máximo control'
        ]
    },

    'parameters': {
        titulo: 'Ajuste de parámetros',
        nivel: 'Técnico',
        modulo: 3,
        icon: '🎚️',
        introducao: `El ajuste de parámetros permite controlar el comportamiento del modelo más allá del texto del prompt. Temperature, top-p, max tokens y otros parámetros permiten ajustar el equilibrio entre creatividad y precisión.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-parameters.md',

        exemplos: [
            {
                titulo: 'Ejemplo 1: Análisis de datos vs. lluvia de ideas',
                contexto: 'Diferentes tareas requieren diferentes parámetros',
                semDecomposicao: `Usar los mismos parámetros para todo:
Temperature: 0.7 (predeterminado)

Problema: el análisis de datos se vuelve inconsistente y la lluvia de ideas, genérica`,
                comDecomposicao: `**Task 1: Análisis de datos de ventas**
Parámetros:
- Temperature: 0.1
- Top-P: 0.1
- Max Tokens: 500

Resultado: Análisis preciso, coherente y factual.

---

**Task 2: Lluvia de ideas de nombres para un producto**
Parámetros:
- Temperature: 0.9
- Top-P: 0.95
- Max Tokens: 200
- Presence Penalty: 0.6

Resultado: Ideas creativas, diversas e inesperadas.`,
                resultado: 'Cada tarea se optimiza con los parámetros adecuados.'
            }
        ],

        casosDeUso: [
            {
                area: 'Código y programación',
                aplicacao: 'Generación de código',
                detalhes: 'Temperature: 0.1-0.2 para código correcto y determinista'
            },
            {
                area: 'Escrita Criativa',
                aplicacao: 'Historias y narrativas',
                detalhes: 'Temperature: 0.8-1.0 para creatividad y originalidad'
            },
            {
                area: 'Sumarização',
                aplicacao: 'Resúmenes de documentos',
                detalhes: 'Temperature: 0.3, Max Tokens ajustado al tamaño deseado'
            }
        ],

        dicasPraticas: [
            '✓ Empieza con valores predeterminados y ajusta iterativamente',
            '✓ Para producción, usa una temperature baja (<0.3) para mantener la consistencia',
            '✓ Documenta los parámetros que funcionan para cada tipo de tarea',
            '✓ Haz pruebas A/B: el mismo prompt, con parámetros diferentes',
            '✓ Recuerda: los parámetros no sustituyen un prompt bien escrito',
            '✓ max tokens debe tener margen: si necesitas 100 tokens, configura 150'
        ],

        errosComuns: [
            {
                erro: 'Temperature demasiado alta para tareas basadas en hechos',
                exemplo: 'Temperature 0.9 para análisis de datos',
                solucao: 'Usa 0.1-0.3 para tareas que requieren precisión'
            },
            {
                erro: 'Ajustar varios parámetros al mismo tiempo',
                exemplo: 'Cambiar temperature, top-p y penalties al mismo tiempo',
                solucao: 'Ajusta un parámetro a la vez para entender el efecto'
            },
            {
                erro: 'Max tokens muito baixo',
                exemplo: 'Configurar 50 tokens y cortar la respuesta a la mitad',
                solucao: 'Siempre agrega un margen al máximo de tokens estimado'
            }
        ],

        recursosAdicionais: [
            '📖 Lee la documentación de la API del modelo que usas',
            '🧪 Crea un "parameter playground" para experimentar',
            '📊 Mantén un registro de parámetros x resultados como referencia'
        ]
    },

    'prefilling': {
        titulo: 'Output Prefilling',
        nivel: 'Técnico',
        modulo: 3,
        icon: '✍️',
        introducao: `Output Prefilling es la técnica de comenzar la respuesta del modelo con texto predefinido. Esto te da control directo sobre el formato, el tono y la estructura de la respuesta, y guía al modelo desde la primera palabra.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-prefilling.md',

        exemplos: [
            {
                titulo: 'Ejemplo 1: Forzar el formato JSON',
                contexto: 'Garantizar que la respuesta siempre sea JSON válido',
                semDecomposicao: `User: Extrae el nombre, la edad y la ciudad de este texto: "João tiene 30 años y vive en São Paulo"

Problema: el modelo puede responder en texto libre, lo que dificulta el análisis`,
                comDecomposicao: `User: Extrae el nombre, la edad y la ciudad de este texto: "João tiene 30 años y vive en São Paulo". Devuelve el resultado en JSON.
Assistant: {
  "nome": "João",
  "idade": 30,
  "cidade": "São Paulo"
}`,
                resultado: 'JSON válido garantizado'
            }
        ],

        casosDeUso: [
            {
                area: 'APIs',
                aplicacao: 'Respostas estruturadas',
                detalhes: 'Prefill garante formato consistente'
            }
        ],

        dicasPraticas: [
            '✓ Úsalo para forzar formatos (JSON, XML)',
            '✓ Controla el tono desde el inicio',
            '✓ Combínalo con instrucciones claras'
        ],

        errosComuns: [
            {
                erro: 'Prefill muito longo',
                exemplo: 'Completar párrafos enteros',
                solucao: 'Usa solo el inicio necesario'
            }
        ],

        recursosAdicionais: [
            '📖 Documentación de Claude sobre prefilling',
            '🔗 Combínalo con structured outputs'
        ]
    },

    'formatting': {
        titulo: 'Formato y estructuración',
        nivel: 'Técnico',
        modulo: 3,
        icon: '📝',
        introducao: `Estructurar prompts con delimitadores y una jerarquía clara mejora la comprensión del modelo y la separación entre instrucciones y datos.`,

        // Conteúdo completo em arquivo externo (abordagem híbrida)
        conteudoArquivo: 'conteudo/modulo3-formatting.md',

        exemplos: [
            {
                titulo: 'Estructuración clara',
                contexto: 'Separar las partes del prompt',
                semDecomposicao: `Prompt confuso sem estrutura`,
                comDecomposicao: `<task>Analise sentimento</task>
<data>Review aqui</data>`,
                resultado: 'Una estructura clara facilita la comprensión'
            }
        ],

        casosDeUso: [
            {
                area: 'Prompts Complexos',
                aplicacao: 'Múltiples secciones',
                detalhes: 'Separa el contexto, las instrucciones y los datos'
            }
        ],

        dicasPraticas: [
            '✓ Claude prefere XML',
            '✓ Sé coherente con el estilo',
            '✓ Usa nombres descriptivos para las etiquetas'
        ],

        errosComuns: [
            {
                erro: 'Misturar estilos',
                exemplo: 'XML + Markdown juntos',
                solucao: 'Elige uno y mantenlo'
            }
        ],

        recursosAdicionais: [
            '📖 Guia XML prompting Claude',
            '🎓 Estude structured prompting'
        ]
    },

    // ==============================================
    // NÍVEL TÉCNICO - MÓDULO 4: Técnicas Avançadas
    // ==============================================

    'structured': {
        titulo: 'Structured Outputs (JSON/XML)',
        nivel: 'Técnico',
        modulo: 4,
        icon: '🏗️',
        introducao: `Structured Outputs permiten forzar a los LLM a devolver respuestas en formatos estructurados y validados, como JSON o XML, algo esencial para la integración con sistemas.`,
        conteudoArquivo: 'conteudo/modulo4-structured.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'longcontext': {
        titulo: 'Long Context Management',
        nivel: 'Técnico',
        modulo: 4,
        icon: '📚',
        introducao: `Técnicas para trabajar con contextos largos (200k+ tokens), incluidas estrategias de chunking, summarization y contexto relevante.`,
        conteudoArquivo: 'conteudo/modulo4-longcontext.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'multimodal': {
        titulo: 'Multimodal Prompting',
        nivel: 'Técnico',
        modulo: 4,
        icon: '🖼️',
        introducao: `Trabajar con múltiples modalidades (texto + imagen + audio) para crear experiencias más ricas y completas.`,
        conteudoArquivo: 'conteudo/modulo4-multimodal.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'optimization': {
        titulo: 'Model-Specific Optimization',
        nivel: 'Técnico',
        modulo: 4,
        icon: '⚡',
        introducao: `Optimizaciones específicas para diferentes modelos (Claude, GPT-4, Gemini) que aprovechan los puntos fuertes de cada uno.`,
        conteudoArquivo: 'conteudo/modulo4-optimization.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'testing': {
        titulo: 'Prompt Testing & A/B',
        nivel: 'Técnico',
        modulo: 4,
        icon: '🧪',
        introducao: `Metodologías para probar prompts sistemáticamente, incluidas las pruebas A/B, las métricas de evaluación y la mejora continua.`,
        conteudoArquivo: 'conteudo/modulo4-testing.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    // ==============================================
    // NÍVEL TÉCNICO - MÓDULO 5: Engenharia de Contexto e RAG
    // ==============================================

    'context-arch': {
        titulo: 'Arquitectura del contexto',
        nivel: 'Técnico',
        modulo: 5,
        icon: '🏛️',
        introducao: `Diseño de arquitecturas de contexto eficientes que maximizan la información relevante dentro de las limitaciones de tokens.`,
        conteudoArquivo: 'conteudo/modulo5-context-arch.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'rag': {
        titulo: 'RAG (Retrieval-Augmented Generation)',
        nivel: 'Técnico',
        modulo: 5,
        icon: '🔍',
        introducao: `RAG combina búsqueda semántica con generación de LLM para ofrecer respuestas basadas en conocimientos específicos y actualizados.`,
        conteudoArquivo: 'conteudo/modulo5-rag.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'vectordb': {
        titulo: 'Vector Databases',
        nivel: 'Técnico',
        modulo: 5,
        icon: '🗄️',
        introducao: `Bases de datos vectoriales (Pinecone, Weaviate, Chroma) para almacenar y buscar embeddings de forma eficiente.`,
        conteudoArquivo: 'conteudo/modulo5-vectordb.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'embeddings': {
        titulo: 'Embeddings e Similarity',
        nivel: 'Técnico',
        modulo: 5,
        icon: '📊',
        introducao: `Los embeddings representan texto como vectores numéricos, lo que permite la búsqueda semántica y la medición de similitud.`,
        conteudoArquivo: 'conteudo/modulo5-embeddings.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    // ==============================================
    // NÍVEL MASTERCLASS - MÓDULO 6: Agentes Fundamentos
    // ==============================================

    'react': {
        titulo: 'Loops agénticos (ReAct, ReWOO)',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🔄',
        introducao: `Patrones de loops agénticos que permiten a los LLM razonar, actuar y observar de forma iterativa para resolver problemas complejos.`,
        conteudoArquivo: 'conteudo/modulo6-react.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'tools': {
        titulo: 'Tool Design e Function Calling',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🛠️',
        introducao: `Diseño de tools/functions que los LLM pueden llamar para interactuar con APIs, bases de datos y sistemas externos.`,
        conteudoArquivo: 'conteudo/modulo6-tools.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'mcp': {
        titulo: 'Model Context Protocol (MCP)',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🔌',
        introducao: `MCP es el protocolo abierto de Anthropic para conectar LLMs con fuentes de datos y herramientas de forma estandarizada.`,
        conteudoArquivo: 'conteudo/modulo6-mcp.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'memory': {
        titulo: 'Memory Systems',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🧠',
        introducao: `Los sistemas de memoria permiten que los agentes mantengan el contexto entre sesiones y aprendan de interacciones pasadas.`,
        conteudoArquivo: 'conteudo/modulo6-memory.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'planning': {
        titulo: 'Planning & Reasoning',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🎯',
        introducao: `Técnicas para que los agentes planifiquen acciones de varios pasos y razonen sobre problemas complejos.`,
        conteudoArquivo: 'conteudo/modulo6-planning.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'error': {
        titulo: 'Error Handling & Recovery',
        nivel: 'Masterclass',
        modulo: 6,
        icon: '🔧',
        introducao: `Estrategias para que los agentes detecten y gestionen errores y se recuperen de forma adecuada ante fallas.`,
        conteudoArquivo: 'conteudo/modulo6-error.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    // ==============================================
    // NÍVEL MASTERCLASS - MÓDULO 7: Agentes Avançados
    // ==============================================

    'skills': {
        titulo: 'Claude Skills',
        nivel: 'Masterclass',
        modulo: 7,
        icon: '⚙️',
        introducao: `Las skills son capacidades especializadas que se pueden combinar para crear agentes complejos y modulares.`,
        conteudoArquivo: 'conteudo/modulo7-skills.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'extended': {
        titulo: 'Extended Thinking',
        nivel: 'Masterclass',
        modulo: 7,
        icon: '🤔',
        introducao: `Extended Thinking permite a Claude razonar con mayor profundidad sobre problemas complejos antes de responder.`,
        conteudoArquivo: 'conteudo/modulo7-extended.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'multiagent': {
        titulo: 'Sistemas Multi-Agente',
        nivel: 'Masterclass',
        modulo: 7,
        icon: '👥',
        introducao: `Arquitecturas donde varios agentes especializados trabajan en colaboración para resolver problemas complejos.`,
        conteudoArquivo: 'conteudo/modulo7-multiagent.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'voice': {
        titulo: 'Voice AI & Multimodal Agents',
        nivel: 'Masterclass',
        modulo: 7,
        icon: '🎙️',
        introducao: `Integración de voz (STT/TTS) con agentes multimodales que procesan texto, imagen y audio simultáneamente.`,
        conteudoArquivo: 'conteudo/modulo7-voice.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    // ==============================================
    // NÍVEL MASTERCLASS - MÓDULO 8: Masterclasses Especializadas
    // ==============================================

    'production': {
        titulo: 'Production Systems',
        nivel: 'Masterclass',
        modulo: 8,
        icon: '🚀',
        introducao: `Arquitecturas robustas para llevar aplicaciones LLM a producción con alta disponibilidad, escalabilidad y confiabilidad.`,
        conteudoArquivo: 'conteudo/modulo8-production.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'security': {
        titulo: 'Seguridad e inyección de prompts',
        nivel: 'Masterclass',
        modulo: 8,
        icon: '🔒',
        introducao: `Prácticas de seguridad para proteger los sistemas LLM contra prompt injection, data poisoning y otros ataques.`,
        conteudoArquivo: 'conteudo/modulo8-security.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'observability': {
        titulo: 'Observabilidade e Monitoring',
        nivel: 'Masterclass',
        modulo: 8,
        icon: '📊',
        introducao: `Logs, métricas y tracing para entender el comportamiento, optimizar costos y garantizar la calidad de los sistemas LLM.`,
        conteudoArquivo: 'conteudo/modulo8-observability.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    },

    'ethics': {
        titulo: 'IA ética y alignment',
        nivel: 'Masterclass',
        modulo: 8,
        icon: '⚖️',
        introducao: `Principios y prácticas para construir sistemas de IA responsables, justos, transparentes y alineados con los valores humanos.`,
        conteudoArquivo: 'conteudo/modulo8-ethics.md',
        exemplos: [],
        casosDeUso: [],
        dicasPraticas: [],
        errosComuns: [],
        recursosAdicionais: []
    }
};
