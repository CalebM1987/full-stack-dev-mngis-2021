def get_columns(table):
    """gets the raw column objects

    Args:
        table: the table

    Returns:
        []: list of column objects
    """
    if not table:
        return []
    return table.__table__.columns if hasattr(table, '__table__') else table.columns

def list_fields(table):
    return [c.name for c in get_columns(table)]

def query_table(table, session, **kwargs):
    conditions = []
    for kwarg, val in kwargs.items():
        print(kwarg)
        if not val:
            continue
        # check for like query
        base = kwarg
        hasWildcard = kwarg.endswith('.$like')
        print('hasWildcard?', kwarg, hasWildcard)
        if hasWildcard:
            base = kwarg.split('.')[0]
        if hasattr(table, base):
            col = getattr(table, base)
            if hasWildcard:
                print(f'setting wildcard: {base} like ${val}')
                conditions.append(col.ilike(f'%{val}%'))
            else:
                conditions.append(col == val)
    if hasattr(table, 'query'):
        res = table.query.filter(*conditions)
    else:
        res = session.query(table).filter(*conditions)

    # check for special query modifier kwargs
    modifiers = [
        '$order_by',
        '$limit',
        '$paginate' # only supported in flask-sqlalchemy
    ]
    for m in modifiers:
        kwargVal = kwargs.get(m)
        mod = m.lstrip('$')
        # check for modifier and chain functions
        if hasattr(res, mod) and kwargVal:
            if mod == 'paginate':
                res = res.paginate(page=kwargs.get('$page', 1), per_page=kwargs.get('$per_page', 20))
            elif mod == 'order_by':
                res = res.order_by(getattr(table, kwargVal))
            else:
                res = getattr(res, mod)(kwargVal)
    
    return res.all()