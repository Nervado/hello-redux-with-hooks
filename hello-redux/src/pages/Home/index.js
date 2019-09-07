import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);

  const ammount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.ammount;
      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get(`products`);
      const data = response.data.map(product => ({
        ...product,
        priceFormmatted: formatPrice(product.price),
      }));
      setProducts(data);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormmatted}</span>
          <button type="button" onClick={() => handleAddProduct(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />{' '}
              {ammount[product.id] || 0}
            </div>
            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
