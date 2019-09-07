export function addToCart(product) {
  return {
    type: '@cart/ADD',
    product,
  };
}

export function removeFromCart(product) {
  return {
    type: '@cart/REMOVE',
    id: product.id,
  };
}

export function updateAmmount(id, ammount) {
  return {
    type: '@cart/UPDATE_AMMOUNT',
    id,
    ammount,
  };
}
