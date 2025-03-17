// fetchHelper.js

export function safeCredentials(options = {}) {
  return Object.assign(options, {
    credentials: 'include',
    mode: 'same-origin',
    headers: Object.assign({}, options.headers, jsonHeader(), authenticityHeader()),
  });
}

export function safeCredentialsFormData(options = {}) {
  return Object.assign(options, {
    credentials: 'include',
    mode: 'same-origin',
    headers: Object.assign({}, options.headers, authenticityHeader()), // No JSON header for form data
  });
}

export function jsonHeader(options = {}) {
  return Object.assign(options, {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
}

// Authentication-related helpers
export function getMetaContent(name) {
  const header = document.querySelector(`meta[name="${name}"]`);
  return header ? header.content : null;
}

export function getAuthenticityToken() {
  return getMetaContent('csrf-token');
}

export function authenticityHeader(options = {}) {
  const token = getAuthenticityToken();
  return token ? Object.assign(options, { 'X-CSRF-Token': token, 'X-Requested-With': 'XMLHttpRequest' }) : options;
}

export function handleErrors(response) {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

// Special version for login that does NOT require CSRF token
export function loginCredentials(options = {}) {
  return Object.assign(options, {
    credentials: 'include',
    mode: 'same-origin',
    headers: Object.assign({}, options.headers, jsonHeader()), // No authenticityHeader to avoid CSRF token requirement
  });
}
