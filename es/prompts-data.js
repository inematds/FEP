// Dados dos 100 Prompts Essenciais
const promptsData = [
    // CATEGORIA 1: Métodos Fundamentais (1-15)
    {
        id: 1,
        category: 'fundamentais',
        categoryName: 'Métodos fundamentales',
        title: 'Método de descomposición',
        subtitle: 'Deconstruction Method',
        description: 'Dividir una tarea compleja en subtareas más pequeñas y manejables, procesando cada una por separado.',
        template: `Tarea principal: [Objetivo final]

Desglosa esta tarea en las siguientes etapas:
1. [Subtarea 1]
2. [Subtarea 2]
3. [Subtarea 3]

Realiza cada etapa por separado y luego integra los resultados.`,
        example: `Tarea principal: Crear una estrategia completa de marketing digital

Desglosa esta tarea en las siguientes etapas:
1. Análisis del público objetivo (demografía, intereses, problemas)
2. Definición de los canales de comunicación más efectivos
3. Creación de un calendario mensual de contenido
4. Definición de métricas de éxito e indicadores clave de rendimiento (KPI)

Realiza cada etapa por separado y proporciona un análisis detallado de cada una.`,
        why: 'Evita la sobrecarga cognitiva del modelo, permite enfocarse en cada aspecto y facilita la revisión y los ajustes.',
        tags: ['decomposição', 'organização', 'complexidade', 'etapas']
    },
    {
        id: 2,
        category: 'fundamentais',
        categoryName: 'Métodos fundamentales',
        title: 'Método de acumulación',
        subtitle: 'Stacking Method',
        description: 'Construir el prompt por capas, agregando contexto, restricciones y especificaciones de forma progresiva.',
        template: `CAPA 1 - Rol:
Eres [definición del rol/especialidad]

CAPA 2 - Contexto:
[Información de contexto relevante]

CAPA 3 - Tarea:
[Lo que quieres que se haga]

CAPA 4 - Restricciones:
- [Restricción 1]
- [Restricción 2]

CAPA 5 - Formato:
[Cómo quieres la respuesta]`,
        example: `CAPA 1 - Rol:
Eres un copywriter especializado en e-commerce de moda

CAPA 2 - Contexto:
Estamos lanzando una nueva colección de verano para mujeres de 25-40 años, de estilo casual-chic

CAPA 3 - Tarea:
Escribe la descripción de un vestido midi floral

CAPA 4 - Restricciones:
- Máximo 150 palabras
- Tono: sofisticado pero accesible
- Incluir beneficios (no solo características)
- Evitar clichés de moda

CAPA 5 - Formato:
Un solo párrafo fluido, con un call-to-action sutil al final`,
        why: 'Cada capa agrega precisión sin confundir al modelo, permite hacer ajustes detallados y facilita la replicación gracias a una estructura clara.',
        tags: ['camadas', 'estrutura', 'contexto', 'precisão']
    },
    {
        id: 3,
        category: 'fundamentais',
        categoryName: 'Métodos fundamentales',
        title: 'Método Tell and Show',
        subtitle: 'Demonstração',
        description: 'Combinar instrucciones explícitas con ejemplos concretos del resultado deseado.',
        template: `INSTRUCCIÓN (Tell):
[Explica lo que quieres]

EJEMPLO (Show):
[Proporciona 1-3 ejemplos del resultado ideal]

AHORA CREA:
[Tu caso específico]`,
        example: `INSTRUCCIÓN (Tell):
Crea títulos para artículos de blog que sean específicos, prometan un valor claro y usen números cuando sea posible.

EJEMPLO (Show):
✓ "7 estrategias comprobadas para aumentar las conversiones en e-commerce en 30 días"
✓ "Cómo reducir los costos de adquisición de clientes en un 40%: guía práctica con casos reales"
✓ "El framework completo de SEO local: 12 pasos para dominar tu región"

AHORA CREA:
5 títulos para artículos sobre productividad para emprendedores digitales`,
        why: 'Los ejemplos eliminan la ambigüedad, el modelo aprende el patrón exacto y se reducen las iteraciones necesarias.',
        tags: ['exemplos', 'demonstração', 'clareza', 'padrão']
    },
    {
        id: 4,
        category: 'fundamentais',
        categoryName: 'Métodos fundamentales',
        title: 'Método Talent Show',
        subtitle: 'Bom vs Ruim',
        description: 'Muestra ejemplos de lo que es BUENO y de lo que es MALO para crear un contraste claro.',
        template: `Tarea: [Objetivo]

BUEN EJEMPLO (sigue este patrón):
[Ejemplo de calidad]

MAL EJEMPLO (evita este patrón):
[Ejemplo de lo que no se debe hacer]

Ahora crea: [Tu solicitud específica]`,
        example: `Tarea: Crear un texto para Instagram de una cafetería artesanal

BUEN EJEMPLO (sigue este patrón):
«El aroma del café recién hecho por la mañana puede transformar un día común en algo especial. Cada taza que preparamos lleva consigo la dedicación de quien eligió los granos, los tostó con precisión y los extrajo con cuidado. Ven a sentir la diferencia. ☕»

MAL EJEMPLO (evita este patrón):
«☕🔥 ¡EL MEJOR CAFÉ DE LA CIUDAD! 💯 ¡Ven ya! #cafe #coffee #cafeteria #buenosdias #desayuno #instacafe #coffeelovers #coffeetime»

Ahora crea: Texto para una publicación que promocione el nuevo método de extracción cold brew`,
        why: 'El contraste visual entre lo bueno y lo malo es más eficaz que dar solo instrucciones; el modelo entiende los matices de calidad.',
        tags: ['contraste', 'qualidade', 'exemplos', 'padrão']
    },
    {
        id: 5,
        category: 'fundamentais',
        categoryName: 'Métodos fundamentales',
        title: 'Método de importación',
        subtitle: 'Import Method',
        description: 'Hacer referencia e importar el contexto de conversaciones o documentos anteriores.',
        template: `CONTEXTO IMPORTADO:
[Pega información relevante de fuentes anteriores]

BASÁNDOTE EN EL CONTEXTO ANTERIOR:
[Nueva tarea que depende de este contexto]`,
        example: `CONTEXTO IMPORTADO:
En nuestra última conversación, definimos el público objetivo así:
- Edad: 28-45 años
- Profesión: Emprendedores digitales y freelancers
- Principal dificultad: Falta de tiempo para crear contenido de forma constante
- Objetivo: Automatizar el marketing sin perder autenticidad

BASÁNDOTE EN EL CONTEXTO ANTERIOR:
Crea 5 titulares para anuncios de Facebook que se dirijan directamente a las dificultades de este público y presenten nuestra herramienta de automatización como solución.`,
        why: 'Mantiene la coherencia entre interacciones, evita repetir el contexto y permite construir de forma incremental.',
        tags: ['contexto', 'continuidade', 'referência', 'consistência']
    },
    {
        id: 6,
        category: 'fundamentais',
        categoryName: 'Métodos fundamentales',
        title: 'Chain of Thought',
        subtitle: 'Cadena de pensamiento',
        description: 'Pedirle al modelo que muestre su razonamiento paso a paso antes de dar la respuesta final.',
        template: `[Problema o pregunta]

Antes de responder, piensa en voz alta:
1. Analiza el problema
2. Considera diferentes enfoques
3. Evalúa los pros y los contras
4. Llega a una conclusión fundamentada

Muestra todo tu razonamiento.`,
        example: `Problema: Mi tasa de apertura de correos electrónicos es del 15%, pero la tasa de clics es de apenas 1,2%. ¿Cómo puedo mejorarla?

Antes de responder, piensa en voz alta:
1. Analiza dónde está el cuello de botella (apertura vs. clic)
2. Identifica las posibles causas de cada métrica
3. Prioriza qué problema abordar primero
4. Sugiere soluciones específicas y justifícalas

Muestra todo tu razonamiento antes de dar las recomendaciones finales.`,
        why: 'Fomenta un análisis profundo, permite verificar la lógica y mejora la calidad de las respuestas complejas.',
        tags: ['raciocínio', 'análise', 'lógica', 'passo-a-passo']
    },
    {
        id: 7,
        category: 'fundamentais',
        categoryName: 'Métodos fundamentales',
        title: 'Método Anti-Keyword Staining',
        subtitle: 'Prevención de palabras clave',
        description: 'Indica explícitamente qué NO incluir para evitar patrones indeseados.',
        template: `Tarea: [Objetivo]

QUÉ INCLUIR:
- [Elemento deseado 1]
- [Elemento deseado 2]

QUÉ NO INCLUIR:
- [Elemento que se debe evitar 1]
- [Elemento que se debe evitar 2]
- [Patrón específico que se debe evitar]`,
        example: `Tarea: Escribir una publicación profesional en LinkedIn sobre liderazgo

QUÉ INCLUIR:
- Experiencia personal auténtica
- Idea práctica y específica
- Tono vulnerable, pero profesional

QUÉ NO INCLUIR:
- Jerga corporativa vacía («sinergia», «pensar fuera de la caja»)
- Demasiados hashtags
- Preguntas genéricas al final («¿Qué opinas?»)
- Emojis (excepto 1 o 2 estratégicos)
- Listas con viñetas`,
        why: 'Las instrucciones negativas son tan importantes como las positivas: previenen patrones cliché y refinan la calidad.',
        tags: ['restrições', 'negativas', 'qualidade', 'evitar']
    },
    {
        id: 8,
        category: 'fundamentais',
        categoryName: 'Métodos fundamentales',
        title: 'Método de encadenamiento',
        subtitle: 'Chaining Method',
        description: 'Conectar varios prompts para que la respuesta de uno alimente la entrada del siguiente.',
        template: `PROMPT 1 (Análisis):
[Primera etapa: generalmente análisis o recopilación]

PROMPT 2 (Procesamiento):
Usa los resultados del Prompt 1 para: [Segunda etapa]

PROMPT 3 (Síntesis):
Con base en los Prompts 1 y 2, crea: [Resultado final]`,
        example: `PROMPT 1 (Análisis):
Analiza este texto de ventas e identifica: 1) Público objetivo, 2) Principales objeciones, 3) Beneficios destacados

PROMPT 2 (Procesamiento):
Usa los resultados del Prompt 1 para crear 3 variantes de encabezado, cada una enfocada en una objeción diferente identificada

PROMPT 3 (Síntesis):
Con base en los Prompts 1 y 2, crea un correo electrónico completo de seguimiento usando el encabezado más convincente e incorporando todos los beneficios`,
        why: 'Permite llevar a cabo procesos complejos en etapas manejables; cada prompt se enfoca en una función específica.',
        tags: ['sequência', 'etapas', 'workflow', 'processo']
    },

    // CATEGORIA 2: Criação de Conteúdo (16-30)
    {
        id: 16,
        category: 'conteudo',
        categoryName: 'Creación de contenido',
        title: 'Email de ventas de alta conversión',
        subtitle: 'AIDA Framework',
        description: 'Estructura AIDA (Atención, Interés, Deseo, Acción) personalizada para emails de ventas.',
        template: `Crea un email de ventas siguiendo esta estructura:

ATENCIÓN (Asunto + primera frase):
- Problema específico o dato sorprendente
- Máximo 10 palabras en el asunto

INTERÉS (Cuerpo - párrafos 1-2):
- Ampliar el problema
- Demostrar que entiendes la dificultad

DESEO (Cuerpo - párrafo 3):
- Presentar la solución
- Beneficio principal + prueba social sutil

ACCIÓN (CTA):
- Pedido claro y de bajo compromiso
- Reducir la fricción

Producto: [Tu producto]
Público: [Tu público objetivo]
Principal dificultad: [Problema que resuelve]

Restricciones:
- Máximo 150 palabras
- Tono consultivo, no vendedor
- Solo 1 CTA`,
        example: `Producto: Software de gestión de proyectos para trabajadores independientes
Público: Trabajadores independientes que gestionan varios clientes
Problema: Incumplimiento de plazos y desorganización

ASUNTO: ¿Incumpliste el plazo de un cliente esta semana?

María, el 73% de los trabajadores independientes incumple al menos 1 plazo al mes. Sé lo frustrante que es: un cliente insatisfecho y la reputación en riesgo.

El problema no eres tú. Es gestionar 5 proyectos diferentes, cada uno en una herramienta distinta, sin tener una visión clara de lo que vence mañana.

ProTask centraliza todo: plazos, archivos y comunicación. Puedes ver toda la semana en un solo panel.
Ana, diseñadora, evitó 3 retrasos solo durante el primer mes.

Pruébalo gratis durante 14 días, sin tarjeta. ¿Te parece que vale la pena ver si te funciona?`,
        why: 'Estructura de copywriting probada, enfocada en el problema antes que en la solución; un CTA de bajo compromiso aumenta la conversión.',
        tags: ['email', 'vendas', 'AIDA', 'conversão', 'copywriting']
    },
    {
        id: 17,
        category: 'conteudo',
        categoryName: 'Creación de contenido',
        title: 'Publicación viral para LinkedIn',
        subtitle: 'Gancho + Historia + Idea clave',
        description: 'Análisis de elementos virales + aplicación estructurada para crear publicaciones atractivas.',
        template: `Crea una publicación para LinkedIn con potencial viral usando esta fórmula:

GANCHO (Primeras 2 líneas):
- Afirmación polémica O
- Pregunta provocadora O
- Estadística sorprendente

HISTORIA (Cuerpo):
- Breve relato personal (3-4 líneas)
- Conflicto o desafío que enfrentaste
- Resolución o aprendizaje

IDEA CLAVE (Conclusión):
- Lección práctica
- Aplicación concreta para quien lee

FORMATO:
- Párrafos cortos (1-2 líneas cada uno)
- Sin emojis excesivos (máximo 2)
- Sin hashtags en el cuerpo
- Tono: auténtico y vulnerable

Tema: [Tu tema]
Público: [Tu público objetivo]`,
        example: `Tema: Gestión del tiempo
Público: Emprendedores

PUBLICACIÓN:
Cancelé el 40% de mis reuniones esta semana.
¿El resultado? Dupliqué mi productividad.

Durante años, acepté todas las reuniones. «Pensaba que hacer contactos era importante». Mi agenda se convirtió en un Tetris imposible.

Hasta que me di cuenta: una reunión sin agenda clara es una pérdida de tiempo disfrazada de trabajo.

Ahora aplico la regla de los 3 criterios:
1. ¿Hay una agenda previa?
2. ¿Soy indispensable o puedo delegar?
3. ¿Se puede resolver por correo electrónico?

Si no cumple los 3, la rechazo con amabilidad.

El tiempo que proteges es el tiempo que inviertes en lo que realmente importa.`,
        why: 'Fórmula basada en el análisis de publicaciones virales; el storytelling personal genera conexión y una idea práctica aporta valor.',
        tags: ['linkedin', 'viral', 'storytelling', 'engajamento', 'social media']
    },
    {
        id: 18,
        category: 'conteudo',
        categoryName: 'Creación de contenido',
        title: 'Descripción de producto que convierte',
        subtitle: 'Beneficios + experiencia',
        description: 'Enfoque en los beneficios, no en las características, con storytelling sutil para e-commerce.',
        template: `Escribe la descripción de un producto siguiendo esta estructura:

PÁRRAFO 1 - Problema/Deseo:
Empieza con la situación o el deseo del cliente
(aún no menciones el producto)

PÁRRAFO 2 - Solución:
Presenta el producto como solución
Enfócate en 2-3 beneficios principales (no en características técnicas)

PÁRRAFO 3 - Experiencia:
Describe la experiencia de usar el producto
Usa lenguaje sensorial cuando corresponda

PÁRRAFO 4 - Llamado a la acción:
CTA sutil + garantía o diferencial

Producto: [Nombre y categoría]
Público: [Datos demográficos y psicográficos]
Principal diferencial: [Qué lo hace único]

Restricciones:
- 120-150 palabras en total
- Tono: [Define el tono adecuado]
- Evitar: Superlativos exagerados, jerga técnica`,
        example: `Producto: Silla ergonómica de oficina
Público: Profesionales que trabajan desde casa, de 30 a 45 años
Diferencial: Ajuste personalizado en 12 puntos

Trabajar 8 horas sentado no debería significar terminar el día con dolor de espalda. Pero esa es exactamente la realidad de muchos profesionales que trabajan a distancia.

La silla ErgoFlex está diseñada para adaptarse a tu cuerpo, no al revés. Ajusta la altura, la profundidad del asiento, el soporte lumbar y la inclinación hasta encontrar tu posición ideal. Un soporte que acompaña tu cuerpo durante todo el día.

Imagina terminar la jornada sin esa tensión en los hombros ni esa pesadez en la zona lumbar. Solo tú, concentrado, cómodo y productivo.

Pruébala durante 30 días. Si no notas la diferencia, te devolvemos el 100% del importe. Tu columna te lo agradecerá.`,
        why: 'Empieza con empatía, pasa naturalmente a la solución y usa lenguaje sensorial para crear una conexión emocional.',
        tags: ['e-commerce', 'produto', 'copywriting', 'conversão', 'benefícios']
    },

    // CATEGORIA 3: Marketing e Vendas (31-45)
    {
        id: 31,
        category: 'marketing',
        categoryName: 'Marketing e Vendas',
        title: 'Análisis de competidores',
        subtitle: 'Competitive Intelligence',
        description: 'Framework para analizar estrategias de competidores e identificar oportunidades.',
        template: `Analiza al competidor [Nombre] siguiendo este framework:

1. POSICIONAMIENTO:
   - Propuesta de valor principal
   - Diferencial que comunica
   - Público objetivo aparente

2. ESTRATEGIA DE CONTENIDO:
   - Principales canales que utiliza
   - Frecuencia de publicación
   - Temas recurrentes
   - Tono y estilo de comunicación

3. OFERTAS Y PRECIOS:
   - Estructura de precios
   - Paquetes/planes ofrecidos
   - Promociones e incentivos

4. PUNTOS FUERTES:
   - Qué hacen muy bien
   - Ventajas competitivas evidentes

5. OPORTUNIDADES (brechas que podemos aprovechar):
   - Qué no están haciendo
   - Puntos débiles aparentes
   - Audiencias desatendidas

Competidor: [Nombre y URL]
Tu negocio: [Breve descripción]`,
        example: `Competidor: Empresa X de cursos en línea
Tu negocio: Plataforma de cursos en portugués

ANÁLISIS:

Posicionamiento: "Aprende tecnología en 30 días"
Diferencial: Garantía de empleo o devolución del dinero
Público: Jóvenes de 18-25 años que buscan su primer empleo en tecnología

Contenido: YouTube (3x/semana), Instagram a diario, LinkedIn rara vez
Tono: Motivacional, informal, con mucho uso de jerga

Ofertas: R$ 997 al contado o 12x, sin opciones intermedias

Puntos fuertes: Comunidad activa, testimonios auténticos, soporte 24/7

OPORTUNIDADES:
- No atienden a profesionales mayores de 30 que buscan cambiar de carrera
- No tienen presencia en LinkedIn (donde está ese público)
- No ofrecen una opción de pago flexible (mensual)
- El contenido demasiado juvenil aleja al público adulto`,
        why: 'El análisis estructurado revela brechas de mercado e identifica oportunidades sin explorar; sirve de base para diferenciarse.',
        tags: ['concorrência', 'análise', 'estratégia', 'marketing', 'posicionamento']
    },

    // CATEGORIA 4: Análise e Pesquisa (46-55)
    {
        id: 46,
        category: 'analise',
        categoryName: 'Análisis e investigación',
        title: 'Análisis SWOT en profundidad',
        subtitle: 'Strategic Analysis',
        description: 'Análisis SWOT (Fortalezas, Debilidades, Oportunidades y Amenazas) detallado para la planificación estratégica.',
        template: `Haz un análisis SWOT de: [Tu negocio/proyecto]

FORTALEZAS (Strengths) - Factores internos positivos:
Enumera 5-7 ventajas competitivas o recursos únicos que tienes
Para cada uno, explica: ¿Por qué es una fortaleza? ¿Cómo podemos potenciarla?

DEBILIDADES (Weaknesses) - Factores internos negativos:
Enumera 5-7 limitaciones o áreas que necesitan mejorar
Para cada una, explica: ¿Cuál es el impacto? ¿Cómo podemos minimizarla o eliminarla?

OPORTUNIDADES (Opportunities) - Factores externos positivos:
Enumera 5-7 tendencias del mercado o situaciones que podemos aprovechar
Para cada una, explica: ¿Cómo podemos capitalizarla? ¿Cuál es el momento ideal?

AMENAZAS (Threats) - Factores externos negativos:
Enumera 5-7 riesgos o desafíos externos
Para cada uno, explica: ¿Cuál es la probabilidad? ¿Cómo podemos prepararnos?

ACCIONES ESTRATÉGICAS:
Basándote en el análisis, sugiere 3-5 acciones prioritarias que combinen:
- Fortaleza + Oportunidad (crecimiento)
- Fortaleza para defenderse de una Amenaza (protección)
- Mejorar una Debilidad para aprovechar una Oportunidad (desarrollo)`,
        example: `Negocio: Consultoría de marketing digital para pequeños negocios locales

FORTALEZAS:
- Conocimiento profundo del SEO local → Amplificar creando contenido educativo
- Red de socios (diseñadores, desarrolladores) → Ofrecer soluciones completas

DEBILIDADES:
- Equipo pequeño (solo yo) → Limita el número de clientes simultáneos
- Sin casos de éxito documentados → Dificulta las ventas

OPORTUNIDADES:
- Auge de los negocios locales que se digitalizan después de la pandemia
- Google da prioridad a los negocios locales en los resultados

AMENAZAS:
- Grandes agencias que bajan los precios para captar pymes
- Herramientas DIY cada vez más accesibles

ACCIONES:
1. Crear un minicurso «SEO Local en 7 Días» (Fortaleza+Oportunidad)
2. Documentar en video los resultados de los 3 mejores clientes (Corregir debilidad)
3. Especializarse en un nicho específico (restaurantes) para diferenciarse de las grandes agencias`,
        why: 'Visión de 360° del negocio: identifica prioridades estratégicas y combina el análisis interno y externo para tomar decisiones informadas.',
        tags: ['swot', 'análise', 'estratégia', 'planejamento', 'negócios']
    },

    // CATEGORIA 5: Comunicação Profissional (56-65)
    {
        id: 56,
        category: 'comunicacao',
        categoryName: 'Comunicación profesional',
        title: 'Email profesional delicado',
        subtitle: 'Difficult Conversations',
        description: 'Estructura para redactar emails sobre temas delicados manteniendo el profesionalismo.',
        template: `Escribe un email profesional sobre una situación delicada:

CONTEXTO:
[Describe la situación que requiere el email]

ESTRUCTURA DEL EMAIL:

APERTURA (Tono positivo):
Empieza reconociendo algo positivo o dando contexto de manera neutral

SITUACIÓN (Hechos objetivos):
Describe la situación con hechos, no con emociones ni juicios
Evita: "Tú siempre...", "Tú nunca..."
Usa: "Observé que...", "Noté que..."

IMPACTO (Consecuencias claras):
Explica cómo afecta la situación al proyecto/equipo/resultados
Enfócate en consecuencias objetivas

SOLUCIÓN (Propuesta constructiva):
Propón un camino a seguir
Sé específico sobre los próximos pasos

CIERRE (Tono colaborativo):
Reafirma la colaboración y tu disponibilidad para conversar

Tono general: [Asertivo pero respetuoso / Empático pero firme]
Relación: [Superior-subordinado / Colegas / Cliente-proveedor]`,
        example: `Situación: Un trabajador independiente no entregó el proyecto a tiempo por tercera vez

CORREO ELECTRÓNICO:

Hola, João:

Gracias por el trabajo que has estado haciendo en los diseños de la campaña. La calidad siempre ha sido excelente.

Me gustaría hablar sobre los plazos. En los últimos tres proyectos, las entregas se realizaron 5, 7 y 4 días después de la fecha acordada. Esto afectó nuestro calendario con el cliente y necesitamos reajustar las expectativas en toda la cadena.

Para seguir trabajando juntos, necesito previsibilidad. Te propongo que definamos plazos más realistas desde el inicio o que me avises con 48h de anticipación si algo indica que habrá un retraso.

¿Estás dispuesto a hacer este ajuste? ¿Podemos tener una llamada breve esta semana para ponernos de acuerdo?

Un abrazo,
Maria`,
        why: 'Un enfoque constructivo evita la actitud defensiva, los hechos objetivos reducen los conflictos y centrarse en las soluciones mantiene una relación profesional.',
        tags: ['email', 'comunicação', 'feedback', 'profissional', 'conflito']
    },

    // CATEGORIA 6: Educação e Aprendizado (66-75)
    {
        id: 66,
        category: 'educacao',
        categoryName: 'Educación y aprendizaje',
        title: 'Plan de estudio personalizado',
        subtitle: 'Learning Roadmap',
        description: 'Crear una hoja de ruta de aprendizaje estructurada para dominar una nueva habilidad.',
        template: `Crea un plan de estudios personalizado para: [Habilidad/Área]

PERFIL DEL APRENDIZ:
- Nivel actual: [Principiante/Intermedio/Avanzado]
- Tiempo disponible: [X horas/semana]
- Objetivo final: [Lo que quieres lograr]
- Plazo deseado: [Tiempo para completar]

ESTRUCTURA DEL PLAN:

FASE 1 - FUNDAMENTOS (Semanas 1-X):
- Conceptos esenciales que debes dominar
- Recursos: [Cursos/Libros/Videos específicos]
- Proyecto práctico para afianzar lo aprendido
- Criterio de finalización (cómo saber si lo dominaste)

FASE 2 - INTERMEDIO (Semanas X-Y):
- Habilidades que debes desarrollar
- Recursos recomendados
- Proyecto práctico más complejo
- Criterio de finalización

FASE 3 - AVANZADO (Semanas Y-Z):
- Temas especializados
- Recursos
- Proyecto final capstone
- Criterio de finalización

RUTINA SEMANAL SUGERIDA:
[Distribución del tiempo por actividad]

HITOS DE PROGRESO:
[Puntos de control para validar el aprendizaje]`,
        example: `Habilidad: Prompt Engineering
Nivel: Principiante (conoce conceptos básicos de IA)
Tiempo: 5h/semana
Objetivo: Crear prompts profesionales para automatizar el marketing
Plazo: 8 semanas

FASE 1 - FUNDAMENTOS (Semanas 1-3):
Conceptos: Tokens, contexto, temperatura, few-shot vs zero-shot
Recursos: Curso "Prompt Engineering FEP" (Nivel Principiante) + Documentación de OpenAI
Proyecto: Crear 10 prompts para tareas cotidianas de marketing
Finalización: Obtener resultados consistentes con 8 de 10 prompts

FASE 2 - INTERMEDIO (Semanas 4-6):
Habilidades: Chain of thought, structured outputs, prompt chaining
Recursos: FEP Nivel Técnico + Experimentar con Claude y GPT-4
Proyecto: Automatizar la creación de un calendario mensual de contenido
Finalización: Sistema funcional que genera el 80% del calendario

FASE 3 - AVANZADO (Semanas 7-8):
Temas: RAG, function calling, agentes autónomos
Recursos: FEP Masterclass + Documentación de Anthropic
Proyecto final: Sistema para generar campañas completas (copy + estrategia)

RUTINA:
Lunes/Miércoles (2h cada día): Estudio teórico
Sábado (1h): Práctica y experimentos`,
        why: 'La estructura reduce la sobrecarga, los hitos claros mantienen la motivación y los proyectos prácticos garantizan la aplicación en situaciones reales.',
        tags: ['educação', 'aprendizado', 'plano', 'roadmap', 'estudos']
    },

    // CATEGORIA 7: Criatividade e Brainstorming (76-85)
    {
        id: 76,
        category: 'criatividade',
        categoryName: 'Criatividade e Brainstorming',
        title: 'Brainstorming SCAMPER',
        subtitle: 'Creative Ideation',
        description: 'Técnica SCAMPER para generar ideas creativas desde 7 ángulos diferentes.',
        template: `Usa la técnica SCAMPER para generar ideas sobre: [Tu producto/servicio/problema]

S - SUBSTITUTE (Sustituir):
¿Qué podemos sustituir? (Materiales, procesos, personas, reglas)
Genera 3-5 ideas que sustituyan elementos clave

C - COMBINE (Combinar):
¿Qué podemos combinar? (Productos, servicios, procesos, públicos)
Genera 3-5 ideas de combinaciones inusuales

A - ADAPT (Adaptar):
¿Qué podemos adaptar de otras industrias/contextos?
Genera 3-5 ideas inspiradas en otros sectores

M - MODIFY (Modificar):
¿Qué podemos modificar? (Tamaño, forma, color, sonido, movimiento)
Genera 3-5 ideas para hacer modificaciones

P - PUT TO OTHER USE (Darle otro uso):
¿Cómo se puede usar esto de otra manera?
Genera 3-5 usos alternativos

E - ELIMINATE (Eliminar):
¿Qué podemos eliminar o simplificar?
Genera 3-5 ideas para eliminar o simplificar

R - REVERSE/REARRANGE (Invertir/Reorganizar):
¿Qué pasa si lo invertimos o reorganizamos?
Genera 3-5 ideas para invertir o reordenar

SELECCIÓN:
De las ideas generadas, elige las 3 más prometedoras y explica por qué`,
        example: `Producto: App de entrega de comida

SUSTITUIR:
- Sustituir los restaurantes por cocineros locales que cocinan en casa
- Sustituir a los repartidores por drones en las zonas permitidas

COMBINAR:
- Entrega + Clases de cocina (el chef entrega los ingredientes y enseña por video)
- Entrega + Nutricionista (análisis nutricional de cada pedido)

ADAPTAR:
- Adaptar el modelo de Netflix: suscripción mensual, comidas ilimitadas
- Adaptar Spotify: listas de comidas personalizadas con IA

MODIFICAR:
- Pedidos por voz en lugar de usar una app
- Envases comestibles/sin desperdicio

DARLE OTRO USO:
- La app se convierte en un mercado de ingredientes frescos
- Plataforma para crear redes de contactos entre chefs

ELIMINAR:
- Eliminar el menú: el chef decide según los ingredientes frescos del día
- Eliminar la elección: una excelente comida sorpresa al día

INVERTIR:
- El cliente cocina y el chef evalúa y da su opinión
- El restaurante te pide comida a ti (economía colaborativa)

LAS MÁS PROMETEDORAS:
1. Modelo de suscripción de Netflix
2. Cocineros locales que cocinan en casa
3. Eliminar el menú fijo`,
        why: 'Estimula el pensamiento lateral; múltiples perspectivas aumentan la creatividad y la estructura previene el bloqueo creativo.',
        tags: ['criatividade', 'brainstorming', 'ideação', 'SCAMPER', 'inovação']
    },

    // CATEGORIA 8: Técnicas Avançadas (86-100)
    {
        id: 86,
        category: 'avancadas',
        categoryName: 'Técnicas avanzadas',
        title: 'Prompt Constitucional (Constitutional AI)',
        subtitle: 'Ethical Constraints',
        description: 'Agregar principios éticos y restricciones al comportamiento del modelo.',
        template: `PRINCIPIOS CONSTITUCIONALES:

Debes seguir rigurosamente estos principios:

1. HONESTIDAD:
   - Si no lo sabes, admítelo
   - No inventes datos ni estadísticas
   - Cita fuentes cuando hagas afirmaciones fácticas

2. SEGURIDAD:
   - No proporciones información que pueda causar daño
   - Advierte sobre los riesgos cuando corresponda
   - Prioriza el bienestar del usuario

3. IMPARCIALIDAD:
   - Presenta múltiples perspectivas
   - Evita sesgos políticos/religiosos/culturales
   - Reconoce las limitaciones y los matices

4. PRIVACIDAD:
   - No pidas información sensible innecesaria
   - Respeta la confidencialidad

5. [Principio personalizado adicional]:
   [Regla específica para tu contexto]

TAREA:
[Tu tarea aquí]

VALIDACIÓN:
Antes de responder, verifica si tu respuesta infringe alguno de los principios anteriores. Si es así, reformúlala.`,
        example: `PRINCIPIOS:

1. HONESTIDAD: Si no lo sabes, admítelo explícitamente
2. SEGURIDAD: No sugieras prácticas financieras arriesgadas
3. IMPARCIALIDAD: Presenta los pros y los contras de cada opción
4. PRIVACIDAD: No pidas cifras específicas del patrimonio
5. CLARIDAD: Usa un lenguaje accesible, sin exceso de jerga financiera

TAREA:
Aconséjame sobre cómo invertir R$ 10.000 como principiante

RESPUESTA (siguiendo los principios):

«Voy a presentar algunas opciones con sus pros y contras:

TESOURO DIRETO:
Pros: Seguro (respaldado por el gobierno), bajo riesgo, accesible
Contras: Rentabilidad moderada

FONDOS INDEXADOS (ETFs):
Pros: Diversificación, bajo costo
Contras: Mayor volatilidad, requieren más estudio

IMPORTANTE: No soy asesor financiero certificado. Cada situación es única y depende de la tolerancia al riesgo, el plazo y los objetivos. Considera consultar a un profesional certificado antes de decidir.»`,
        why: 'Garantiza respuestas éticas y responsables, reduce el riesgo de resultados problemáticos y aumenta la confiabilidad.',
        tags: ['ética', 'segurança', 'constitutional-ai', 'avançado', 'responsabilidade']
    }

    // NOTA: Este arquivo contém 15 prompts de exemplo distribuídos pelas 8 categorias
    // Para ter os 100 prompts completos, adicione os demais seguindo o mesmo padrão
];
