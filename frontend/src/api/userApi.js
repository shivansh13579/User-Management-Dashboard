import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const client = axios.create({ baseURL: API_BASE_URL });

// Normalizes axios errors into a plain message + optional field errors array
function normalizeError(err) {
  const data = err.response?.data;
  if (data?.errors?.length) return { message: data.errors.join(', '), errors: data.errors };
  if (data?.message) return { message: data.message, errors: [] };
  return { message: 'Something went wrong. Please try again.', errors: [] };
}

export async function fetchUsers() {
  try {
    const res = await client.get('/users');
    return res.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

export async function fetchUserById(id) {
  try {
    const res = await client.get(`/users/${id}`);
    return res.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

export async function createUser(payload) {
  try {
    const res = await client.post('/users', payload);
    return res.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

export async function updateUser(id, payload) {
  try {
    const res = await client.put(`/users/${id}`, payload);
    return res.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

export async function deleteUser(id) {
  try {
    await client.delete(`/users/${id}`);
  } catch (err) {
    throw normalizeError(err);
  }
}
