-- Illustrative Snowflake-compatible SQL; not employer source code.
-- Source contract: transaction_events has these four columns.
-- event_sequence must break ties for each record_id deterministically.
with ranked as (
    select
        record_id,
        member_id,
        quantity,
        updated_at,
        row_number() over (
            partition by record_id
            order by updated_at desc, event_sequence desc
        ) as row_rank
    from transaction_events
    where record_id is not null
)
select record_id, member_id, quantity, updated_at
from ranked
where row_rank = 1
  and member_id is not null
  and quantity > 0;
