/* Padosi Pro API client */
const API = {
  base: window.API_BASE || 'http://localhost:3001/api',
  get token() { return localStorage.getItem('padosi_token'); },
  set token(v) { v ? localStorage.setItem('padosi_token', v) : localStorage.removeItem('padosi_token'); },

  async call(path, opts = {}) {
    let res;
    try {
      res = await fetch(this.base + path, {
        ...opts,
        // free server so jaaye to pehli request 30-50s leti hai; usse zyada ho to ruk jao
        signal: AbortSignal.timeout(60000),
        headers: {
          'Content-Type': 'application/json',
          ...(this.token ? { Authorization: 'Bearer ' + this.token } : {})
        }
      });
    } catch (e) {
      throw new Error(e.name === 'TimeoutError' ? 'Server jawab nahi de raha, thodi der baad try karo' : 'Internet ya server se connection nahi ban raha');
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { const err = new Error(data.error || 'Server error'); err.status = res.status; throw err; }
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
