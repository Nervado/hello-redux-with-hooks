import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

import * as CartActions from '../../store/modules/cart/actions';

export default function Cart() {
  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((total_, product) => {
        return total_ + product.ammount * product.price;
      }, 0)
    )
  );

  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.ammount),
    }))
  );

  const dispatch = useDispatch();

  function incrementAmount(product) {
    dispatch(CartActions.updateAmmount(product.id, product.ammount + 1));
  }

  function decrementAmount(product) {
    dispatch(CartActions.updateAmmount(product.id, product.ammount - 1));
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>Produto</th>
            <th>QTD</th>
            <th>Subtotal</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormmatted}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => decrementAmount(product)}
                    />
                  </button>
                  <input type="number" readOnly value={product.ammount} />
                  <button type="button">
                    <MdAddCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => incrementAmount(product)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(
                      CartActions.removeFromCart({
                        type: 'REMOVE_FROM_CART',
                        id: product.id,
                      })
                    )
                  }
                >
                  <MdDelete color="#7159c1" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar Pedido</button>
        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
