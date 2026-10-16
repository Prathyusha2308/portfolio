-- Illustrative dbt model. Save as models/stg_transactions.sql.
-- Requires a configured dbt project, warehouse, and raw.transaction_events source.
{{ config(materialized='view') }}

select
    record_id,
    member_id,
    quantity,
    updated_at
from {{ source('raw', 'transaction_events') }}
