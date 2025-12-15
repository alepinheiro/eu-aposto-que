# Copilot Instructions

## Objetivo

Auxiliar no desenvolvimento do projeto "Eu aposto que…" mantendo:
- Padrão arquitetural Nuxt v4
- Consistência de código
- Conformidade legal (sem apostas financeiras)
- Alinhamento com as melhores práticas de TypeScript, Tailwind CSS, Zod e MongoDB

## Regras Gerais

- Sempre siga a estrutura oficial de pastas do Nuxt v4.
- Código backend deve estar em `server/` e respeitar princípios SOLID.
- Antes de criar novos arquivos, verifique se já existe implementação semelhante.
- Nunca coloque lógica de negócio em rotas de API (`server/api/`).
- Rotas de API devem apenas validar entrada, chamar serviços e retornar respostas.
- Regras de negócio pertencem à camada `domain/`.
- Acesso ao banco deve ser abstraído por interfaces de repositório.
- Sempre valide entradas externas usando Zod.
- Evite conceitos financeiros (wallet, saldo, transações, odds, payout).
- Prefira clareza e tipagem explícita a "cleverness".
- Considere dividir mudanças em múltiplos commits por contexto.
- Escreva código fácil de ler, testar e estender.

## Checklist de Implementação

1. A solução respeita SOLID?
2. Há duplicação de código?
3. O nome dos arquivos comunica claramente sua intenção?
4. Há impacto legal ou de produto?
5. Toda entrada externa é validada com Zod?
6. O backend está isolado em `server/`?
7. O acesso ao banco está abstraído?
8. Não há lógica de negócio em rotas de API?

## Exemplo de fluxo correto

- API recebe request → valida com Zod → chama service → service usa repositório → retorna resposta

## Observações

- Priorize funções puras no domínio.
- Evite side-effects fora da infraestrutura.
- Tipagem explícita sempre que possível.
- Não duplique funcionalidades existentes.
- Antes de criar algo novo, verifique se já existe algo semelhante.

---

**Este projeto prioriza clareza, responsabilidade e evolução sustentável.**
