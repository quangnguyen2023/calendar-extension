# Copilot Instructions for Calendar Extension

## Core Behavior

**Always proactively use skills** from `.github/skills/` folder when answering questions or performing tasks. Don't wait for explicit requests - automatically detect the task type and read the appropriate skill file(s).

## Available Skills (38 total)

### Web Development

- `nextjs-react-expert` - React/Next.js performance optimization (Vercel Engineering best practices)
- `tailwind-patterns` - Tailwind CSS v4 patterns and configuration
- `frontend-design` - Design principles and decision-making for UI
- `mobile-design` - Mobile-first design thinking for iOS/Android
- `web-design-guidelines` - UI audit for accessibility and best practices
- `i18n-localization` - Internationalization and localization patterns
- `seo-fundamentals` - SEO, E-E-A-T, Core Web Vitals
- `geo-fundamentals` - Generative Engine Optimization for AI search

### Backend & Architecture

- `nodejs-best-practices` - Node.js framework selection and patterns
- `python-patterns` - Python development and framework selection
- `rust-pro` - Rust 1.75+ advanced programming
- `api-patterns` - API design (REST vs GraphQL vs tRPC)
- `database-design` - Schema design and ORM selection
- `architecture` - Architecture decision-making framework
- `mcp-builder` - Model Context Protocol server building

### Testing & Quality

- `testing-patterns` - Unit, integration, mocking strategies
- `tdd-workflow` - Test-Driven Development RED-GREEN-REFACTOR
- `webapp-testing` - E2E testing with Playwright
- `clean-code` - Pragmatic coding standards
- `code-review-checklist` - Code review guidelines
- `lint-and-validate` - Quality control and static analysis

### DevOps & Operations

- `deployment-procedures` - Production deployment principles
- `server-management` - Process management and monitoring
- `performance-profiling` - Measurement and optimization techniques

### Security

- `vulnerability-scanner` - OWASP 2025, supply chain security, attack surface mapping
- `red-team-tactics` - MITRE ATT&CK adversary simulation

### Development Process

- `plan-writing` - Structured task planning with verification
- `systematic-debugging` - 4-phase debugging methodology
- `documentation-templates` - README, API docs templates
- `brainstorming` - Socratic questioning for complex features
- `parallel-agents` - Multi-agent orchestration patterns
- `intelligent-routing` - Automatic agent selection
- `behavioral-modes` - AI operational modes (implement, debug, review, etc.)

### Platform Specific

- `bash-linux` - Bash/Linux terminal patterns
- `powershell-windows` - PowerShell patterns and pitfalls
- `game-development` - Game development orchestrator

### Meta

- `app-builder` - Application building orchestrator

## Workflow

1. **Analyze** the user's question or task
2. **Identify** relevant skill(s) from the 38 available
3. **Read** the skill SKILL.md file(s)
4. **Apply** the skill framework + codebase context
5. **Answer** with best practices from the skill

## Common Patterns

- **Performance question** → Read `performance-profiling` + `nextjs-react-expert`
- **Security audit** → Read `vulnerability-scanner` (run scripts if available)
- **New feature** → Read `plan-writing` + relevant domain skill
- **Bug investigation** → Read `systematic-debugging`
- **Code review** → Read `clean-code` + `code-review-checklist` + domain skill
- **Refactoring** → Read `clean-code` + relevant domain skill
- **Testing strategy** → Read `testing-patterns` or `tdd-workflow`
- **Unknown task** → Read `intelligent-routing` for guidance

## Priority Rules

- Use skills as **primary knowledge source** for domain-specific questions
- Combine multiple skills when appropriate (e.g., security + performance)
- For complex tasks, create a plan using `plan-writing` skill first
- Always verify changes using `lint-and-validate` after code modifications

## Project Context

This is a **React/TypeScript calendar extension** using:

- React 19
- TypeScript
- Tailwind CSS v4
- Vite

Prioritize skills: `nextjs-react-expert`, `tailwind-patterns`, `clean-code`, `testing-patterns`
