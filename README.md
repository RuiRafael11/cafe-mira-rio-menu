# Café Mira Rio — Menu digital

Menu digital bilingue do Café Mira Rio, em Mesão Frio, preparado para publicação no Cloudflare Workers.

## Desenvolvimento

Requer Node.js 22 ou superior.

```bash
npm install
npm run dev
```

## Cloudflare Workers

No painel do Cloudflare, use este repositório com:

- Build command: deixar vazio
- Deploy command: `npm run deploy`

O comando de publicação do vinext cria a configuração necessária, compila a aplicação e publica-a no Cloudflare Workers.
