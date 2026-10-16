# Illustrative code samples

These samples use synthetic records and demonstrate engineering patterns. They are not employer source code or proof of a production deployment.

- validate_records.py: standalone Python; run with Python 3. It quarantines all occurrences of duplicate keys rather than choosing an arbitrary winner.
- latest_transactions.sql: Snowflake-compatible SQL; create transaction_events with record_id, member_id, quantity, updated_at, and event_sequence. The sequence breaks timestamp ties. Latest records are selected before checking member/quantity so stale valid records do not silently replace invalid latest events.
- stg_transactions.sql and schema.yml: require an existing dbt project, adapter, warehouse, and raw source table. Run dbt run and dbt test. Tests report quality failures; they do not themselves quarantine rows. No credentials are included.

After uploading this samples folder to your GitHub Pages repository, browse its source through your GitHub repository's Code tab.
