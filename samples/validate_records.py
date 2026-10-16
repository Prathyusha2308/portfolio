"""Standalone synthetic-data example. Run: python validate_records.py."""
from collections import Counter
import json


def validate(records):
    counts = Counter(row.get('record_id') for row in records)
    accepted, quarantined = [], []
    for row in records:
        errors = []
        if not row.get('record_id'):
            errors.append('missing record_id')
        elif counts[row['record_id']] > 1:
            errors.append('duplicate record_id')
        if not str(row.get('member_id') or '').strip():
            errors.append('missing member_id')
        quantity = row.get('quantity')
        if type(quantity) is not int or quantity <= 0:
            errors.append('quantity must be a positive integer')
        if errors:
            quarantined.append({'record': row, 'errors': errors})
        else:
            accepted.append(row)
    return {'accepted': accepted, 'quarantined': quarantined}


if __name__ == '__main__':
    sample = [
        {'record_id': 'DEMO-1', 'member_id': 'SYNTH-1', 'quantity': 30},
        {'record_id': 'DEMO-2', 'member_id': None, 'quantity': 10},
        {'record_id': 'DEMO-3', 'member_id': 'SYNTH-3', 'quantity': -5},
    ]
    print(json.dumps(validate(sample), indent=2))
