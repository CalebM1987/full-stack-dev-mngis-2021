from sqlalchemy import Numeric, Float, Integer, SmallInteger, BigInteger
from ..utils import get_columns
from flask import jsonify

modifiers = [
    dict(name='$order_by', type=str, help='field name to order results by'),
    dict(name='$limit', type=str, help='limit query to specific number of records'),
    #TODO: paginate
]

def get_query_model(table):
    args = []
    for col in get_columns(table):
        argType = str
        if issubclass(col.type.__class__, (Integer, SmallInteger, BigInteger)):
            argType = int
        elif issubclass(col.type.__class__, (Numeric, Float)):
            argType = float
        args.append(
            dict(
                name=col.name,
                type=argType,
                help=col.doc
            )
        )

    args.extend(modifiers)
    return args

def success(**kwargs):
    kwargs.update({ 'status': 'success' })
    return jsonify(kwargs)

def dynamic_error(**kwargs):
    if not kwargs.get('message'):
        kwargs['message'] = 'there was an error with this request, please contact the system administrator'
    kwargs.update({ 'status': 'error' })
    return jsonify(kwargs)


def success_response(*args):
    args += (dict(name="status", type=str, choices=['success', 'error'], help='the status of the request'),)
    return args

def error_response(*args):
    args += (
        dict(name="status", type=str, choices=['success', 'error'], help='the status of the request'),
        dict(name="message", type=str, help='the error message')
    )

    return args

def create_response(*args):
    args += (
        dict(name="message", type=str, help='the response message'),
        dict(name="id", type=int, help='the new resource id')
    )
    return success_response(*args)

def update_response(*args):
    args += (
        dict(name="message", type=str, help='the response message'),
    )
    return success_response(*args)
    
def delete_response(*args):
    args += (
        dict(name="message", type=str, help='the response message'),
        dict(name="id", type=int, help='the deleted resource id')
    )
    return success_response(*args)


