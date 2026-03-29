# MBTQ Minimal Agnostic API (Zero Trust Auth Tunnel)

A highly secure, minimal single-node backend for the MBTQ Generative AI platform.

## Base URL
`http://localhost:3001`

## Masked Service Routes (Secure & Obscure)

| Standard Service | Masked Internal Endpoint | Auth Type | Description |
| ---------------- | ------------------------ | --------- | ----------- |
| Health           | `/_health`               | None      | Node Status |
| Auth             | `/_/a`                   | Public    | Auth Tunnel Entrance |
| Generative Engine| `/_/g`                   | ZT-Tunnel | Code/Agnostic Generation |
| PinkSync         | `/_/s`                   | ZT-Tunnel | Sync Estimator & Coordination |
| Visual Auth      | `/_/v`                   | ZT-Tunnel | DeafAUTH Video Challenge |
| A11y Node        | `/_/y`                   | ZT-Tunnel | PinkFlow (A11y Node) Check |
| AI Chat          | `/_/c`                   | ZT-Tunnel | LLM Unified Entrance |
| Video Gateway    | `/_/i`                   | ZT-Tunnel | Video Access & Recognition |

## Zero Trust Auth Tunnel
All `ZT-Tunnel` endpoints require a Bearer token in the Authorization header:
`Authorization: Bearer <zt_tunnel_token>`

The tunnel ensures all service access is strictly authenticated and validated.

## Source Library
The platform continues to use `components/` and `templates/` as a generative source for all AI-driven UI creation.
