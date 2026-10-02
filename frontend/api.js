/* Padosi Pro API client */
const API = {
  base: window.API_BASE || 'http://localhost:3001/api',
  get token() { return localStorage.getItem('padosi_token'); },
  set token(v) { v ? localStorage.setItem('padosi_token', v) : localStorage.removeItem('padosi_token'); },

  async call(path, opts = {}) {
    const res = await fetch(this.base + path, {
      ...opts,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token ? { Authorization: 'Bearer ' + this.token } : {})
      }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Server error');
    return data;
  },

  requestOtp: email => API.call('/auth/request-otp', { method: 'POST', body: JSON.stringify({ email }) }),
  verifyOtp: (email, code) => API.call('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ email, code }) }),
  fetchTasks: () => API.call('/tasks'),
  fetchMyTasks: () => API.call('/tasks/mine'),
  createTask: payload => API.call('/tasks', { method: 'POST', body: JSON.stringify(payload) }),
  acceptTask: id => API.call(`/tasks/${id}/accept`, { method: 'POST' }),
  counterOffer: (id, amount) => API.call(`/tasks/${id}/counter`, { method: 'POST', body: JSON.stringify({ amount }) }),
  pushPublicKey: () => API.call('/push/public-key'),
  pushSubscribe: subscription => API.call('/push/subscribe', { method: 'POST', body: JSON.stringify({ subscription }) }),
  createOrder: amount => API.call('/payments/create-order', { method: 'POST', body: JSON.stringify({ amount }) }),
  verifyPayment: payload => API.call('/payments/verify', { method: 'POST', body: JSON.stringify(payload) })
};
