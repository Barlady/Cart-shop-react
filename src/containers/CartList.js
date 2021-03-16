import React from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {
	selectGoods
} from '../store/goodsSlice';
import {
	selectCart
} from '../store/cartSlice';
import Cart from '../components/Cart';
import {increment, minus, delArticul } from '../store/cartSlice';


function CartList() {
	const goods = useSelector(selectGoods);
	const cart = useSelector(selectCart);
	const dispatch = useDispatch();
	//переиндексация массива
	const goodsObj = goods.reduce((accum, item) => {
		accum[item['articul']] = item;
		return accum;
	}, {})
	console.log(goodsObj);

	let clickHandler = (event) => {
	  event.preventDefault();
	  let t = event.target;
	  if(!t.classList.contains("add-to-cart")) return true;
	  dispatch(increment(t.getAttribute("data-key")));
	}
	let minusHandler = (event) => {
	  event.preventDefault();
	  let t = event.target;
	  if(!t.classList.contains("minus-to-cart")) return true;
	  dispatch(minus(t.getAttribute("data-key")));
	}
	let delHandler = (event) => {
	  event.preventDefault();
	  let t = event.target;
	  if(!t.classList.contains("delete")) return true;
	  dispatch(delArticul(t.getAttribute("data-key")));
	}

	return(
      <>
        <table className="table">
        <thead>
        <tr>
        <th>Картинка</th>
        <th>Название</th>
        <th>Цена за один товар</th>
        <th>Количество</th>
        <th>Итого</th>
        <th>-</th>
        <th>X</th>
        </tr>
        </thead>
        <tbody>
           {Object.keys(cart).map(item => <tr onClick={clickHandler} key={item + goodsObj[item]['title']}>
           <td><img className = "min" src={goodsObj[item]["image"]} /></td>
           <td>{goodsObj[item]['title']}</td>
           <td>{goodsObj[item]['cost']}</td>
           <td>{cart[item]}</td>
           <td>{goodsObj[item]['cost'] * cart[item]}</td>
           <td><button className="minus-to-cart" data-key={goodsObj[item]['articul']} onClick={minusHandler}> - </button></td>
           <td><button className="delete" data-key={goodsObj[item]['articul']} onClick={delHandler}> x </button></td>
           </tr>)}
        </tbody>
        <tfoot>
        <tr>
        <td>
        {Object.keys(cart).reduce((accum, item) =>{return accum = accum + goodsObj[item]['cost'] * cart[item]},0)} 
        </td>
        </tr>
        </tfoot>
        </table>
      </>

	);
}

export default CartList;