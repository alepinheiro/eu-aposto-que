# Eu aposto que…

## 📌 Visão geral

**Eu aposto que…** é uma plataforma social de previsões onde usuários podem criar afirmações em linguagem natural e convidar outras pessoas a concordar, discordar e conversar sobre possíveis desfechos — **sem transações financeiras entre usuários**.

O projeto é intencionalmente construído como **social prediction / entertainment**, priorizando texto, interação social e responsabilidade legal no contexto brasileiro.

---

## 🧱 Stack técnica

* **Framework:** Nuxt v4
* **Linguagem:** TypeScript
* **Estilização:** Tailwind CSS
* **Validação:** Zod
* **Banco de dados:** MongoDB
* **Arquitetura:** Backend orientado a domínio, respeitando princípios **SOLID**

---

## 🏗️ Princípios arquiteturais

### 1. Nuxt-first

* A estrutura de pastas **segue estritamente a documentação oficial do Nuxt v4**.
* Uso de `server/` para backend (Nitro).
* Evitar abstrações externas que conflitem com o ecossistema Nuxt.

### 2. SOLID no backend

* **S — Single Responsibility**
  Cada arquivo tem apenas um motivo para mudar.

* **O — Open/Closed**
  Serviços devem ser extensíveis sem modificação direta.

* **L — Liskov Substitution**
  Interfaces devem permitir substituições seguras.

* **I — Interface Segregation**
  Interfaces pequenas e específicas.

* **D — Dependency Inversion**
  Camadas superiores dependem de abstrações, não de implementações concretas.

---

## 📁 Estrutura de pastas (backend)

```txt
server/
 ├─ api/                 # Controllers (endpoints HTTP)
 │   ├─ bets/
 │   │   ├─ index.post.ts
 │   │   └─ [id].get.ts
 │   └─ users/
 │       └─ index.get.ts
 │
 ├─ domain/              # Regras de negócio puras
 │   ├─ bet/
 │   │   ├─ bet.entity.ts
 │   │   ├─ bet.schema.ts
 │   │   ├─ bet.repository.ts
 │   │   └─ bet.service.ts
 │   └─ user/
 │       ├─ user.entity.ts
 │       ├─ user.schema.ts
 │       └─ user.repository.ts
 │
 ├─ infrastructure/      # Implementações técnicas
 │   ├─ database/
 │   │   └─ mongo.client.ts
 │   └─ repositories/
 │       └─ bet.mongo.repository.ts
 │
 ├─ shared/              # Código reutilizável
 │   ├─ errors/
 │   ├─ validators/
 │   └─ utils/
 │
 └─ types/               # Tipagens globais
```

### Regras importantes

* **Nunca colocar lógica de negócio em `api/`**
* `api/` apenas orquestra request → service → response
* Zod é usado para **validação de entrada e fronteira de domínio**

---

## 🧠 Validação e schemas

* Toda entrada externa (HTTP, forms, payloads) **deve ser validada com Zod**
* Schemas ficam próximos ao domínio (`*.schema.ts`)
* Nunca confiar em dados vindos do client

---

## 🗄️ Banco de dados (MongoDB)

* Uma única instância de conexão reutilizável
* Nenhuma lógica de negócio dentro do client do banco
* Repositórios implementam interfaces do domínio

Exemplo:

```ts
// domain/bet/bet.repository.ts
export interface BetRepository {
  create(data: BetEntity): Promise<BetEntity>
  findById(id: string): Promise<BetEntity | null>
}
```

---

## 🧪 Boas práticas de implementação

* Preferir funções puras no domínio
* Evitar side-effects fora da camada de infraestrutura
* Tipagem explícita sempre que possível
* Não duplicar funcionalidades existentes

  * **Antes de criar algo novo, verificar se já existe algo semelhante**

---

## 🧾 Commits e versionamento

### Padrão de commits

* Commits devem ser **separados por contexto**:

  * feature
  * refactor
  * fix
  * docs

### Regras

* Um commit ≠ várias responsabilidades
* Se uma mudança envolver contextos diferentes, **faça mais de um commit**
* Mensagens claras e objetivas

Exemplo:

```txt
feat(bet): create bet entity and schema
refactor(db): centralize mongo connection
```

---

## 🔐 Considerações legais (by design)

O sistema **não possui**:

* wallet
* saldo
* transações financeiras
* odds
* payout

Isso garante que o produto se mantenha como **plataforma social de previsões**, não como casa de apostas.

---

# 🤖 Copilot Instructions (VS Code)

## Objetivo

Auxiliar no desenvolvimento mantendo:

* padrão arquitetural
* consistência de código
* conformidade legal
* alinhamento com Nuxt v4

---

## Instruções para o Copilot

> You are an assistant working on a Nuxt v4 project using TypeScript, Tailwind CSS, Zod and MongoDB.
>
> Always follow Nuxt v4 official folder structure and conventions.
>
> Backend code lives under `server/` and must respect SOLID principles.
>
> Before creating new files, always check if an existing implementation already satisfies the requirement.
>
> Never place business logic inside API route files.
> API routes should only validate input, call services and return responses.
>
> Business rules belong to the `domain/` layer.
> Database access must be abstracted behind repository interfaces.
>
> Always validate external input using Zod schemas.
>
> Avoid introducing financial concepts (wallets, balances, transactions).
>
> Prefer clarity and explicit typing over cleverness.
>
> When suggesting changes, consider whether the change should be split into multiple commits based on context.
>
> Write code that is easy to read, test and extend.

---

## 📝 Escrita e intenção

* README: visão estratégica e onboarding
* Copilot instructions: regras objetivas e operacionais
* Código: explícito, previsível e sustentável

---

## 🔄 Revisão contínua

Antes de finalizar qualquer implementação:

1. Avalie se a solução respeita SOLID
2. Verifique duplicações
3. Reflita se o nome dos arquivos comunica claramente sua intenção
4. Considere impactos legais e de produto

---

**Este projeto prioriza clareza, responsabilidade e evolução sustentável.**
