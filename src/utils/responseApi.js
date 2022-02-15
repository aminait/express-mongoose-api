export function success(data = null, messages = null) {
  return {
    status: "OK",
    errors: null,
    messages,
    data,
  };
}

export function error(error, messages = null, status = "ERR") {
  return {
    status,
    errors: error,
    messages,
    data: null,
  };
}

export function validation(messages) {
  return {
    status: "INVALID_REQUEST",
    errors: [],
    messages,
    data: null,
  };
}
