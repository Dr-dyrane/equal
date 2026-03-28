# Database Migrations

Equal is intentionally using a small set of squashed bootstrap migrations.

Reserved migration plan:

1. `0000_core_identity`
2. `0001_people_structure`
3. `0002_scheduling_core`
4. `0003_rules_fairness_audit`
5. `0004_rls_and_indexes`

During bootstrap, prefer updating the schema and regenerating these core migrations over
adding many small migrations for every naming or modeling change.
