export function success({ data = null, messages = null, status = 'OK' }) {
  return {
    status,
    errors: [],
    messages,
    data,
  };
}

export function error({ errors = [], messages = null, status = 'ERR' }) {
  return {
    status,
    errors,
    messages,
    data: null,
  };
}

export function validation(messages) {
  return {
    status: 'INVALID_REQUEST',
    errors: [],
    messages,
    data: null,
  };
}
