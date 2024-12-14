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
    git clone https://github.com/yourusername/nearby-locations-api.git
    cd nearby-locations-api

2. Instale as dependências do projeto:
    ```bash
    npm install

3. Crie um arquivo `.env` na raiz do projeto e configure a chave de API do Google Maps:
    ```env
    GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    PORT=3000

4. Compile o projeto:
   ```bash
   npm run build

5. Inicie o servidor:
   ```bash
   npm start

6. Teste os endpoints disponíveis:

- **Cálculo de Distâncias**:
    Faça uma requisição para o endpoint `/distances` com as coordenadas de latitude e longitude:
    ```bash
    curl -X GET "http://localhost:3000/distances?lat=-20.316635319330466&lon=-40.29026198968673"
    ```

- **Busca de Locais Próximos**:
    Faça uma requisição para o endpoint `/nearby` com as coordenadas de latitude e longitude:
    ```bash
    curl -X GET "http://localhost:3000/nearby?lat=-20.316635319330466&lon=-40.29026198968673"
    ```