# Multimodal Prompting

## O Que É

Multimodal Prompting é a técnica de criar prompts que combinam múltiplas modalidades de dados - texto, imagens, áudio, vídeo, documentos - para análise integrada. Modelos multimodais como GPT-4 Vision, Claude 3 Opus/Sonnet, e Gemini 1.5 conseguem processar e entender múltiplos tipos de mídia simultaneamente.

Isso permite que você faça perguntas sobre imagens, analise gráficos, extraia texto de screenshots, descreva cenas em vídeos, e muito mais - tudo através de prompts textuais naturais.

## Por Que Usar

**Benefícios:**
- **Análise Visual Automatizada**: OCR, descrição de imagens, análise de gráficos
- **Experiências Ricas**: Combinar contexto visual + textual para melhor entendimento
- **Automação de Processos**: Processar documentos escaneados, faturas, formulários
- **Acessibilidade**: Gerar descrições de imagens para deficientes visuais
- **Quality Control**: Análise visual de produtos, inspeção de defeitos
- **Education**: Resolver problemas matemáticos escritos à mão, explicar diagramas

**Quando usar:**
- Processar documentos não-digitais (PDFs escaneados, fotos de docs)
- Análise de imagens (médicas, satélite, produtos)
- Extrair dados de gráficos, charts, infográficos
- Content moderation visual
- UI/UX review e feedback
- Verificação de identidade (KYC)

## Como Funciona

### Modelos Multimodais Disponíveis

| Modelo | Modalidades | Tamanho Máximo Imagem |
|--------|-------------|----------------------|
| Claude 3.5 Sonnet | Texto + Imagens | 5MB, múltiplas imagens |
| GPT-4 Vision (GPT-4V) | Texto + Imagens | 20MB |
| Gemini 1.5 Pro | Texto + Imagens + Vídeo + Áudio | 2GB total |
| GPT-4o | Texto + Imagens + Áudio (futuro) | Varia |

### Anatomia de um Prompt Multimodal

```python
prompt = [
    {
        "type": "text",
        "text": "Analise esta nota fiscal e extraia:"
    },
    {
        "type": "image_url",
        "image_url": "data:image/jpeg;base64,..." # ou URL
    },
    {
        "type": "text",
        "text": "Retorne em JSON: emissor, valor total, data, itens"
    }
]
```

## Exemplos Práticos

### Exemplo 1: OCR de Documento com Estruturação

```python
import base64
from anthropic import Anthropic

with open("invoice.jpg", "rb") as img_file:
    img_data = base64.b64encode(img_file.read()).decode()

client = Anthropic()
response = client.messages.create(
    model="claude-3-5-sonnet-20250219",
    max_tokens=2048,
    messages=[{
        "role": "user",
        "content": [
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/jpeg",
                    "data": img_data
                }
            },
            {
                "type": "text",
                "text": """
                Extraia TODAS as informações desta nota fiscal e retorne em JSON:
                {
                  "emiss

or": {"name": "", "cnpj": "", "address": ""},
                  "recipient": {"name": "", "document": ""},
                  "invoice_number": "",
                  "date": "",
                  "items": [
                    {"description": "", "quantity": 0, "unit_price": 0, "total": 0}
                  ],
                  "subtotal": 0,
                  "taxes": 0,
                  "total": 0
                }
                """
            }
        ]
    }]
)
```

### Exemplo 2: Análise de Gráfico

```python
prompt = """
[Imagem de um gráfico de linha mostrando vendas trimestrais]

Analise este gráfico e responda:
1. Qual foi a tendência geral de vendas ao longo do ano?
2. Em qual trimestre houve o maior crescimento percentual?
3. Identifique qualquer anomalia ou outlier
4. Qual a projeção para o próximo trimestre baseado na tendência?

Seja específico com números que conseguir extrair do gráfico.
"""
```

### Exemplo 3: UI/UX Review

```python
"""
[Screenshot de uma página web]

Avalie esta interface sob perspectiva de UX:

1. **Hierarquia Visual**:
   - Elementos principais estão em destaque?
   - Contraste é adequado?

2. **Acessibilidade**:
   - Texto é legível?
   - Botões têm tamanho adequado?
   - Cores atendem WCAG?

3. **Layout**:
   - Espaçamento é consistente?
   - Alinhamento está correto?
   - Mobile-friendly?

4. **Sugestões**:
   - Liste 3-5 melhorias prioritárias

Para cada ponto, cite especificamente onde na interface você vê o problema.
"""
```

### Exemplo 4: Análise Médica (Disclaimer: não substitui profissional)

```python
"""
[Imagem de raio-X]

IMPORTANTE: Esta é uma análise preliminar para fins educacionais.
NÃO substitui avaliação médica profissional.

Com essa ressalva, analise esta imagem e:
1. Identifique estruturas anatômicas visíveis
2. Aponte qualquer anormalidade óbvia
3. Sugira próximos passos de investigação se houver achados
4. Indique nível de urgência aparente (baixo/médio/alto)

Sempre qualifique sua resposta com nível de confiança.
"""
```

### Exemplo 5: Multi-Image Comparison

```python
"""
Imagem 1: [Produto A]
Imagem 2: [Produto B]
Imagem 3: [Produto C]

Compare estes três produtos side-by-side:

| Aspecto | Produto A | Produto B | Produto C |
|---------|-----------|-----------|-----------|
| Design  |           |           |           |
| Materiais aparentes |  |        |           |
| Qualidade percebida | |        |           |
| Inovações visíveis |  |        |           |

Qual você recomendaria para:
- Usuário focado em estética?
- Usuário focado em durabilidade?
- Usuário com budget limitado?

Justifique cada recomendação com observações visuais específicas.
"""
```

## Casos de Uso Reais

- **Finance**: Processar cheques, faturas, extratos bancários escaneados
- **Healthcare**: Análise preliminar de imagens médicas, OCR de prescrições
- **E-commerce**: Análise de qualidade de fotos de produtos, detecção de defeitos
- **Real Estate**: Avaliação de imóveis a partir de fotos, identificação de problemas
- **Education**: Resolver problemas matemáticos escritos, corrigir redações
- **Legal**: Análise de documentos assinados, contratos escaneados
- **Retail**: Planogram compliance, shelf auditing via foto

## Dicas Práticas

1. **Qualidade da Imagem**: Alta resolução melhora resultados, mas cuidado com limites de tamanho

2. **Instruções Específicas**: Diga exatamente o que procurar na imagem
   ```
   ❌ "Descreva a imagem"
   ✅ "Identifique todos os números visíveis na imagem e sua localização"
   ```

3. **Região de Interesse**: Se a imagem é grande, indique onde focar
   ```
   "Foque no canto superior direito do documento, onde está o carimbo"
   ```

4. **Formato de Output**: Especifique estrutura da resposta
   ```
   "Retorne os dados extraídos em formato JSON válido"
   ```

5. **Validação**: Cross-check outputs multimodais quando possível
   ```python
   # Processar mesma imagem 2x e comparar resultados
   result1 = analyze_image(img)
   result2 = analyze_image(img)
   if result1 != result2:
       # Provável ambiguidade ou erro
       handle_discrepancy()
   ```

6. **Combine Modalidades Estrategicamente**:
   ```
   "Imagem: [logo da empresa]
    Contexto textual: Esta empresa atua no setor de tecnologia educacional

    Baseado no logo E no contexto, sugira..."
   ```

## Erros Comuns e Como Evitar

### ❌ Erro 1: Imagem Muito Pequena/Pixelada
OCR e análise detalhada falham.

### ✅ Solução
- Mínimo 1000x1000px para OCR
- Se imagem é pequena, avise o modelo: "Imagem de baixa resolução, faça seu melhor"

### ❌ Erro 2: Perguntas Ambíguas
"O que você vê?" retorna descrição genérica inútil.

### ✅ Solução
Seja específico: "Quantas pessoas estão na sala? Liste cor da roupa de cada uma."

### ❌ Erro 3: Confiar Cegamente em OCR
Texto extraído pode ter erros, especialmente com handwriting.

### ✅ Solução
- Peça ao modelo indicar nível de confiança
- Valide campos críticos manualmente
- Use checksums quando disponível (ex: dígito verificador de CPF)

### ❌ Erro 4: Não Considerar Privacidade
Enviar imagens sensíveis sem cuidado.

### ✅ Solução
- Redact informações sensíveis antes de enviar
- Use models on-premises para dados críticos
- Verifique data retention policies do provider

## Recursos Adicionais

- **Claude Vision Examples**: Cookbook oficial da Anthropic
- **OpenAI Vision Guide**: Documentação GPT-4V
- **Roboflow**: Dataset e tools para computer vision + LLM
- **LlamaIndex Multimodal**: Integração de imagens em RAG
- **LangChain ImageLoader**: Utilities para processar imagens

---

**Resumo**: Multimodal Prompting expande capacidades de LLMs além de texto, permitindo análise visual, OCR, e compreensão integrada de múltiplas fontes de dados. É essencial para automação de processos que envolvem documentos, imagens ou mídia rica.
