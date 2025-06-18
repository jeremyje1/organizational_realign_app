# Security Considerations

* **Data Residency:** All PII stored in U.S. data centers (Neon primary region us‑east‑1).  
* **Encryption:** TLS 1.3 for data in transit; AES‑256‑GCM at rest.  
* **Audit Trail:** Immutable event log stored in Postgres `ora_audit` schema.  
* **Least Privilege:** RBAC roles (`ADMIN`, `EDITOR`, `VIEWER`) enforced in JWT claims.  
* **Pen‑Testing:** Annual external penetration test; automated dependency scanning via Snyk.  
