# cloudflare-prototype — Repo organization

Brief: high-level overview of the repository layout and purpose of each top-level item.

## Top-level layout
- src/ — application or worker source code
- edge/ or workers/ — Cloudflare Workers, Pages, or edge logic
- infra/ — infrastructure-as-code (Terraform, Cloudflare configs)
- config/ — environment/config templates (example.env, .env.example)
- scripts/ — helper scripts (build, deploy, maintenance)
- tests/ — unit, integration, and e2e tests
- docs/ — design docs, architecture, usage guides
- examples/ — sample deployments, usage examples
- .github/ — CI/CD workflows, issue/PR templates
- Dockerfile, Makefile — local build and containerization helpers
- package.json / pyproject.toml / go.mod — language-specific metadata
- README.md, CONTRIBUTING.md, LICENSE — project metadata and policies

## Quick start (example)
- Clone: git clone <repo>
- Install: follow language-specific file (npm install | pip install -r requirements.txt)
- Run tests: make test | npm test | pytest
- Deploy: scripts/deploy.sh or infra/ workflow

## Development notes
- Keep edge logic isolated in edge/ or workers/.
- Store secrets in vault/secret manager; keep only templates in repo.
- Follow CI workflows in .github/ for linting, testing, and deployment.

## Contribution
- See CONTRIBUTING.md for branching, PR, and review guidelines.

## License
- See LICENSE for terms.