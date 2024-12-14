# Teste Técnico Yooga

Este projeto é uma aplicação backend desenvolvida para calcular distâncias e encontrar locais próximos com base nas coordenadas fornecidas. Ele integra a API do Google Maps para buscar lojas próximas.

## Funcionalidades

- **Cálculo de Distâncias**: Calcula as distâncias entre coordenadas fornecidas e pontos predefinidos.
- **Busca de Locais Próximos**: Encontra as 5 lojas mais próximas de coordenadas específicas utilizando a API do Google Maps.

## Tecnologias

- **Node.js**
- **TypeScript**
- **Express.js**
- **Class-validator**: Para validação de DTOs.
- **Class-transformer**: Para transformar e validar dados de entrada.
- **Google Maps API**: Para buscar lojas próximas.

## Instalação

1. Clone the repository:
    ```bash
    git clone https://github.com/IgorNCosta14/teste-yooga.git
    cd teste-yooga
    ```

2. Instale as dependências do projeto:
    ```bash
    npm install
    ```

3. Crie um arquivo `.env` na raiz do projeto e configure a chave de API do Google Maps:
    ```env
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    PORT=3000
    ```

4. Compile o projeto:
   ```bash
   npm run build
    ```

5. Inicie o servidor:
   ```bash
   npm start
    ```

## Teste os endpoints disponíveis:

#### **1º Desafio - Cálculo de Distâncias**

**Input:**
Faça uma requisição `GET` para o endpoint `/distances` com as coordenadas fornecidas:
```bash
    curl -X GET "http://localhost:3000/distances?lat=-20.316635319330466&lon=-40.29026198968673"
```
**Output:**
Exemplo de resposta em JSON para o **1º Desafio - Cálculo de Distâncias**:

    {
        "status": "success",
        "message": "Distances calculated successfully.",
        "distances": [
            "Ponto 1 (Latitude -22.951321545009705, Longitude -43.21040413125191) - Distância 420600m"
        ]
    }
