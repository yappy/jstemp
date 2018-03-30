
export function assert(expr) {
  if (!(expr)) {
    throw new Error("Assertion failed");
  }
}

function obj2str(obj, limit) {
  let str = "{";
  let once = true;
  for (const key in obj) {
    if (once) {
      once = false;
    }
    else {
      str += ", ";
    }
    str += inspect0(key, limit);
    str += ": ";
    str += inspect0(obj[key], limit);
  }
  str += "}";
  return str;
}

function array2str(obj, limit) {
  let str = "[";
  let once = true;
  for (const v of obj) {
    if (once) {
      once = false;
    }
    else {
      str += ", ";
    }
    str += inspect0(v, limit);
  }
  str += "]";
  return str;
}

function inspect0(obj, limit) {
  if (limit <= 0) {
    return "[...]";
  }
  if (Array.isArray(obj)) {
    return array2str(obj, limit - 1);
  }
  switch (typeof(obj)) {
  case "undefined":
    return "undefined";
  case "null":
    return "null";
  case "object":
    return obj2str(obj, limit - 1);
  default:
    return obj.toString();
  }
}

export function inspect(obj) {
  return inspect0(obj, 5);
}
