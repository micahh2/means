
export function updateAccount(payload) {
  return { type: 'UPDATE_ACCOUNT', payload };
}

export function addAccount() {
  return { type: 'ADD_ACCOUNT' };
}

export function toggleAntMenu(payload) {
  return { type: 'TOGGLE_ANT_MENU', payload };
}
