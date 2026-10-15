# Migração Windsor.ai → APIs diretas

Objetivo: eliminar a dependência do Windsor.ai e manter um dashboard de consulta sem banco de dados.

## Fontes
- WooCommerce REST API `/wp-json/wc/v3/orders`: fonte principal para pedidos, receita, nomes, status, produtos e metadados de atribuição.
- Google Analytics Data API: complemento opcional de aquisição por sessão usando a propriedade `544425295`, especialmente quando a atribuição do WooCommerce estiver ausente.

## Credenciais (somente Cloudflare Secrets)
- `WOO_CONSUMER_KEY`: chave WooCommerce com permissão Read
- `WOO_CONSUMER_SECRET`: segredo WooCommerce
- `GA4_SERVICE_ACCOUNT_JSON`: JSON de conta de serviço Google com acesso de leitura à propriedade
- `DASHBOARD_PASSWORD`: autenticação temporária já existente

Não reaproveitar nem exibir credenciais do Windsor.ai no frontend. Não salvar dados dos compradores no GitHub. Validar autenticação com controle de acesso antes de compartilhar dados pessoais.

## Regra comercial
Considerar pedidos `processing` e `completed` nas métricas comerciais inicialmente, conferindo pagamento e reembolsos antes do uso definitivo. Não contar `pending`, `on-hold`, `cancelled` ou `failed` como vendas confirmadas.

## Origem
Preferir `_wc_order_attribution_utm_source`, `_wc_order_attribution_utm_medium`, `_wc_order_attribution_source_type` do WooCommerce; usar GA4 apenas como fallback identificado.
- `google/cpc`: Google Ads
- `google/organic`: Google Orgânico
- `facebook|ig|instagram/paid`: Meta Ads
- `(direct)`: Direto
- sem metadados: Não identificada
Ao exibir a classificação, indicar a fonte da atribuição, sem duplicar compras entre serviços.

## Migração segura
1. Criar novo Worker independente para conexões diretas, mantendo o antigo sem alteração.
2. Configurar credenciais no painel Cloudflare, nunca no GitHub.
3. Conferir pedidos #7415 e #7417, totais por período e status.
4. Validar CORS, autenticação, paginação e tolerância a falhas.
5. Só então migrar `src/App.tsx` para o endpoint novo.
6. Desativar integração Windsor.ai somente após validação completa.

Status: especificação preparada. Implantação direta e teste ainda pendentes; a atualização Cloudflare pela integração foi bloqueada.
