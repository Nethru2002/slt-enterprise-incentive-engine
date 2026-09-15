# SLT Enterprise Incentive & Sales Approval Engine

An enterprise-grade, high-throughput backend application engineered for Sri Lanka Telecom (SLT) to automate BSS/CRM data synchronization, enforce multi-stage sales approval workflows (L1 & L2), and calculate performance incentive pools.

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Business Domain & Rules](#business-domain--rules)
3. [Core Architecture & Tech Stack](#core-architecture--tech-stack)
4. [Enterprise Folder Structure](#enterprise-folder-structure)
5. [Database Entity Schema & Relationships](#database-entity-schema--relationships)
6. [Module breakdown & Logic Layer](#module-breakdown--logic-layer)
7. [Environment Configuration](#environment-configuration)
8. [Installation & Local Execution](#installation--local-execution)
9. [API Endpoints & Routing Reference](#api-endpoints--routing-reference)
10. [Production Deployment & Hardening](#production-deployment--hardening)

---

## 🚀 Project Overview

The **SLT Enterprise Incentive & Sales Approval Engine** automates corporate sales performance tracking and compensation workflows. Key operations include:
* **Automated BSS/CRM Ingestion:** Pulls orders periodically via background cron jobs safely via transaction boundaries.
* **Organizational Hierarchy Mapping:** Normalizes structures across Divisions, Sections, Solution Teams, and Employees.
* **Two-Tier Approval Gate:** Restricts revenue calculations strictly to sales items that pass both **L1 (Level 1)** and **L2 (Level 2)** verification clearances.
* **Incentive Calculation Engine:** Computes monthly section compensation pools based on verified sales volume.

---

## 💼 Business Domain & Rules

1. **BSS Data Integration:** Raw records arrive from external billing and CRM platforms via a sync schedule.
2. **Approval State Machine:**
   * Orders are created with a status of `PENDING`.
   * **L1 Approval:** Initial business unit sign-off (`L1_APPROVED`).
   * **L2 Approval:** Final executive clearance (`COMPLETED`). *Rule: L2 cannot proceed unless L1 is fulfilled.*
3. **Incentive Eligibility:** Payout engines query exclusively for fully cleared records (`l1Approved = true` AND `l2Approved = true`).

---

## ⚙️ Core Architecture & Tech Stack

* **Framework:** NestJS (Node.js framework with TypeScript)
* **Database & ORM:** PostgreSQL managed via TypeORM
* **Task Scheduling:** `@nestjs/schedule` (Cron jobs)
* **Security & Authentication:** `@nestjs/jwt`, Passport (`passport-jwt`), `bcrypt`, `helmet`, and `@nestjs/throttler` (Rate Limiting)
* **Observability:** `@nestjs/terminus` (Health check probes)

---

## 📂 Enterprise Folder Structure

```text
slt-enterprise-incentive-engine/
├── .eslintrc.js
├── .prettierrc
├── nest-cli.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── ormconfig.ts
├── docker-compose.yml
├── .env
├── .env.example
└── src/
    ├── main.ts
    ├── app.module.ts
    ├── common/
    │   ├── decorators/
    │   │   ├── current-user.decorator.ts
    │   │   └── roles.decorator.ts
    │   ├── filters/
    │   │   └── http-exception.filter.ts
    │   ├── guards/
    │   │   ├── jwt-auth.guard.ts
    │   │   └── permissions.guard.ts
    │   ├── interceptors/
    │   │   ├── logging.interceptor.ts
    │   │   └── transform.interceptor.ts
    │   ├── middleware/
    │   │   ├── audit-logger.middleware.ts
    │   │   └── correlation-id.middleware.ts
    │   └── pipes/
    │       └── validation.pipe.ts
    ├── config/
    │   ├── database.config.ts
    │   ├── app.config.ts
    │   └── redis.config.ts
    ├── database/
    │   ├── migrations/
    │   │   └── 1710000000000-InitialSchema.ts
    │   └── seeds/
    │       └── initial-seed.ts
    ├── modules/
    │   ├── auth/
    │   │   ├── auth.controller.ts
    │   │   ├── auth.module.ts
    │   │   ├── auth.service.ts
    │   │   └── strategies/jwt.strategy.ts
    │   ├── employee/
    │   │   ├── employee.controller.ts
    │   │   ├── employee.module.ts
    │   │   ├── employee.repository.ts
    │   │   ├── employee.service.ts
    │   │   └── entities/employee.entity.ts
    │   ├── health/
    │   │   ├── health.controller.ts
    │   │   └── health.module.ts
    │   ├── incentives/
    │   │   ├── calculators/commission-formula.calculator.ts
    │   │   ├── entities/monthly-incentive.entity.ts
    │   │   ├── incentive.controller.ts
    │   │   └── incentive.module.ts
    │   ├── organization/
    │   │   ├── controllers/
    │   │   ├── dto/
    │   │   ├── entities/
    │   │   ├── services/
    │   │   └── organization.module.ts
    │   ├── reporting/
    │   │   ├── reporting.controller.ts
    │   │   ├── reporting.module.ts
    │   │   └── reporting.service.ts
    │   ├── sales/
    │   │   ├── dto/submit-sales.dto.ts
    │   │   ├── entities/
    │   │   ├── workflow/approval-state-machine.service.ts
    │   │   ├── sales.controller.ts
    │   │   ├── sales.module.ts
    │   │   └── sales.service.ts
    │   └── sync/
    │       ├── clients/bss-soap-or-rest.client.ts
    │       ├── schedulers/bss-sync.scheduler.ts
    │       ├── sync.controller.ts
    │       ├── sync.module.ts
    │       └── sync.service.ts
    └── shared/
        ├── services/logger.service.ts
        └── shared.module.ts
```

---

## 🗄️ Database Entity Schema & Relationships

* **Divisions (`divisions`):** Top-level corporate division entities, containing a collection of sections.
* **Sections (`sections`):** Sub-units belonging to divisions; mapped via `section_members` to employees.
* **Solution Teams (`solution_teams`):** Cross-functional teams mapped to employees via `solution_team_members`.
* **Employees (`employees`):** Corporate user records containing employee IDs, positions, and account manager (`amCode`) tracking.
* **Sales Approvals (`sales_approvals`):** Stores order references, financial totals, and boolean status tracking for `l1Approved`, `l2Approved`, and workflow states (`PENDING`, `L1_APPROVED`, `COMPLETED`, `REJECTED`).
* **Monthly Incentives (`monthly_incentives`):** Persists calculated compensation distributions per section and period (`YYYY-MM`).

---

## 🧩 Module Breakdown & Logic Layer

* **Auth Module:** Global security context handling token generation, user validation, and JWT strategies.
* **Organization Module:** Manages structural business units, division grouping, and personnel assignments.
* **Employee Module:** Provides data abstraction and repository services for workforce management.
* **Sync Module:** Handles scheduled background integration (`@Cron`) with external BSS platforms, wrapped in TypeORM transaction blocks (`QueryRunner`) to guarantee ACID rollbacks if errors occur.
* **Sales Module:** Governs state transitions for multi-tier order verification.
* **Incentive & Reporting Modules:** Evaluates finalized financial data to build payout pools and metrics reports.

---

## 🔐 Environment Configuration

Create a `.env` file in the root folder based on these variables:

```env
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=postgres

JWT_SECRET=super-secure-enterprise-jwt-secret-key-2026
JWT_EXPIRES_IN=1d
```

---

## ⚙️ Installation & Local Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Start PostgreSQL via Docker Compose
```bash
docker-compose up -d
```

### 3. Run the App in Development Watch Mode
```bash
npm run start:dev
```
The app will automatically start on `http://localhost:3000/api/v1`.

---

## 🌐 API Endpoints Reference Guide

All routes are prefixed with `/api/v1`. Protected routes require a Bearer token (`Authorization: Bearer <JWT>`).

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/auth/login` | Authenticate user & generate JWT token | Public |
| **GET** | `/health` | Check container liveness & database ping status | Public |
| **POST** | `/organizations/divisions` | Create a new corporate division | Protected |
| **GET** | `/organizations/divisions` | Retrieve divisions and related sections | Protected |
| **POST** | `/organizations/sections` | Create a section under a division | Protected |
| **POST** | `/organizations/solution-teams`| Create a solution team | Protected |
| **POST** | `/employees` | Register a new corporate employee | Admin Only |
| **GET** | `/employees` | List all employees | Protected |
| **POST** | `/sales` | Submit a sales order record | Protected |
| **PATCH**| `/sales/:id/approve-l1` | Execute L1 approval gate | Protected |
| **PATCH**| `/sales/:id/approve-l2` | Execute L2 approval gate (Finalizes order) | Protected |
| **GET** | `/sales/approved` | Retrieve fully cleared orders for incentives | Protected |
| **POST** | `/sync/trigger` | Manually invoke BSS data synchronization cron | Protected |
| **GET** | `/reporting/performance/:month`| Generate monthly performance aggregate | Protected |
| **GET** | `/incentives/calculate/:sectionId/:month` | Compute section payout pool | Protected |

---

## 🔒 Production Deployment & Hardening

1. **Environment Flag:** Set `NODE_ENV=production`. This forces `synchronize: false` in TypeORM to protect live schemas from accidental alterations.
2. **Database Migrations:** Manage updates via compiled TypeORM migration files (`npm run build` followed by migration execution commands).
3. **Security Headers & Throttling:** Helmet blocks common web vulnerabilities while built-in rate limiters restrict high-frequency client spam.
4. **Health Monitoring:** Use the `/api/v1/health` endpoint with Kubernetes probes (`livenessProbe` / `readinessProbe`) for production container lifecycle management.