export default function Cart({ cart }) {
  return (
    <tr>
      <td>
        <img
          className="img-fluid"
          src="./img/guitarra_02.jpg"
          alt="imagen guitarra"
        />
      </td>
      <td>SRV</td>
      <td className="fw-bold">${cart.price}</td>
      <td className="flex align-items-start gap-4">
        <button type="button" className="btn btn-dark">
          -
        </button>
        1
        <button type="button" className="btn btn-dark">
          +
        </button>
      </td>
      <td>
        <button className="btn btn-danger" type="button">
          X
        </button>
      </td>
    </tr>
  );
}
