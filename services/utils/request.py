
def parse_args(rq):
    kwargs = {}
    if hasattr(rq, 'parsed_args'):
        for k,v in rq.parsed_args.items():
            if v:
                kwargs[k] = v
    if hasattr(rq, 'args'):
        kwargs.update(rq.args)
    return kwargs