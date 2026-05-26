import axios from 'axios'

const API = import.meta.env.VITE_API_URL

export const getAccounts     = ()     => axios.get(`${API}/api/accounts`)
export const getTransactions = ()     => axios.get(`${API}/api/transactions`)
export const getMeshState    = ()     => axios.get(`${API}/api/mesh/state`)
export const sendPayment     = (data) => axios.post(`${API}/api/demo/send`, data)
export const runGossip       = ()     => axios.post(`${API}/api/mesh/gossip`)
export const flushBridge     = ()     => axios.post(`${API}/api/mesh/flush`)
export const resetMesh       = ()     => axios.post(`${API}/api/mesh/reset`)