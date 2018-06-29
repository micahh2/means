
export function updateAccount(payload) {
  return { type: 'UPDATE_ACCOUNT', payload };
}

export function addAccount() {
  return { type: 'ADD_ACCOUNT' };
}

export function deleteAccount(payload) {
  return { type: 'DELETE_ACCOUNT', payload };
}
