export const useServerContext = async (event) => {
  const _context = event.context;
  const _contextLength = Object.keys(_context).length;
  let _contextIsEmpty = _contextLength === 0;
  if (
    _contextLength === 1 &&
    _context.params &&
    Object.keys(_context.params).length === 0
  ) {
    _contextIsEmpty = true;
  }

  const _query = useQuery(event);
  const _body = event.req.method !== "GET" && (await useBody(event));

  const context = (_context && !_contextIsEmpty && _context) || undefined;
  const query =
    (_query && Object.keys(_query).length > 0 && _query) || undefined;
  const body = (_body && Object.keys(_query).length > 0 && _body) || undefined;

  return {
    context,
    query,
    body,
  };
};
