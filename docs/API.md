# Integração segura GA4 / Windsor.ai

O dashboard busca apenas dados reais no Cloudflare Worker `meu-jaleco-ga4-api` sem banco de dados. Configure os segredos `WINDSOR_API_KEY` e `DASHBOARD_PASSWORD` diretamente no Cloudflare Worker. Nunca coloque tokens no GitHub, em parâmetros da URL ou no navegador.

Endereço esperado: `https://meu-jaleco-ga4-api.suporte-ffb.workers.dev`. Ative a rota workers.dev no painel Cloudflare. 

API: `GET /sales?from=YYYY-MM-DD&to=YYYY-MM-DD` com cabeçalho `Authorization: Bearer <senha do dashboard>`.

A página de GitHub Pages é pública: use autenticação forte e idealmente migre o frontend para hosting privado autenticado antes de compartilhar dados comerciais.

A consulta depende dos limites do Windsor.ai. Validar contrato do endpoint /googleanalytics4 e parâmetros antes de liberar a clientes.
