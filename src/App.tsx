import { useReducer } from 'react';
import Guitar from './components/Guitar';
import Header from './components/Header';
import { useCart } from './hooks/useCart';
import { cartReducer, inicialState } from './reducers/cart-reducers';

function App() {
  const { decreaseQuantity, increaseQuantity, clearCart } = useCart();
  const [state, dispatch] = useReducer(cartReducer, inicialState);
  console.log(state);

  return (
    <>
      <Header
        cart={state.cart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        clearCart={clearCart}
        dispatch={dispatch}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {state.data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} dispatch={dispatch} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
