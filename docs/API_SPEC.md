# API Specification (v1)

| HTTP | Endpoint | Auth | Description |
|------|----------|------|-------------|
| `GET` | `/api/organizations/:orgId` | bearer | Retrieve organization profile |
| `POST` | `/api/organizations` | bearer | Create new org (admin) |
| `GET` | `/api/units/:unitId` | bearer | Get unit details |
| `PATCH` | `/api/units/:unitId` | bearer | Update unit |
| `POST` | `/api/scenarios` | bearer | Create scenario |
| `POST` | `/api/auth/login` | none | Issued by Auth0 universal login |

All endpoints return JSON:API 1.1 compliant payloads.

Authentication: OAuth 2.0 access tokens issued by Auth0 tenant `northpathstrategies.auth0.com`.
