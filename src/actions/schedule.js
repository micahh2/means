
export function updateEvent(payload) {
  return { type: 'UPDATE_EVENT', payload };
}

export function addEvent() {
  return { type: 'ADD_EVENT' };
}

export function deleteEvent(payload) {
  return { type: 'DELETE_EVENT', payload };
}
