
export function updateTax(payload) {
  return { type: 'UPDATE_TAX', payload };
}

export function addTax() {
  return { type: 'ADD_TAX' };
}

export function deleteTax(payload) {
  return { type: 'DELETE_TAX', payload };
}

export function addTaxBracket(payload) {
  return { type: 'ADD_TAX_BRACKET', payload };
}

export function updateTaxBracket(payload) {
  return { type: 'UPDATE_TAX_BRACKET', payload };
}

export function deleteTaxBracket(payload) {
  return { type: 'DELETE_TAX_BRACKET', payload };
}
