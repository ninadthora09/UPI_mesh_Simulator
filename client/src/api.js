import axios from 'axios'

export const getAccounts     = ()     => axios.get('/api/accounts')
export const getTransactions = ()     => axios.get('/api/transactions')
export const getMeshState    = ()     => axios.get('/api/mesh/state')
export const sendPayment     = (data) => axios.post('/api/demo/send', data)
export const runGossip       = ()     => axios.post('/api/mesh/gossip')
export const flushBridge     = ()     => axios.post('/api/mesh/flush')
export const resetMesh       = ()     => axios.post('/api/mesh/reset')