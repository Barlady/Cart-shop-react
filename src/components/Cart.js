function Cart(props) {
  return(
    <table>
      <td>{props.image} </td>
      <td>{props.title} </td>
      <td>{props.cost} </td>
     </table>
  	);
}

export default Cart;