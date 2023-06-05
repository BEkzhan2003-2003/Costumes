import React from 'react';
import axios from 'axios'

import Info from './info';
import AppContext from '../context';

const delay=(ms)=> new Promise((resolve) => setTimeout(resolve,ms));

const Drawer = ({onClose, onRemove ,items=[]}) => {
  const {cartItems,setCartItems}=React.useContext(AppContext);
  const {orderId,setOrderId}=React.useState(null);
  const [isOrderComplate,setIsOrderComplate]=React.useState(false);
  const [isLoading,setIsLoading]=React.useState(false);
  const totalPrice = cartItems.reduce((sum,obj)=> obj.price +sum,0);

  
const onClickOrder=async ()=>{
    try{
      setIsLoading(true);
    const {data}=await axios.post('https://64450c1f914c816083c4ab5d.mockapi.io/orders',
      {items:cartItems,});
    setOrderId(data.id);
    setIsOrderComplate(true);
    setCartItems([]);

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      await axios.delete('https://6441507c792fe886a8a43ee8.mockapi.io/cart' + item.id);
      await delay(1000);
    }
    }catch(error)
    {alert('Заказ оформлен')}
    finally {
    setIsLoading(false);
  }
}

  return (
        <div className='owerlay'>
        <div>
            <div className="drawer">
        <h2 className='d-flex justify-between'>Корзина
          <img onClick={onClose} className='remoweBtn' src="/img/btn-remowe.svg" alt="" />
        </h2>

    {items.length> 0 ? (
    <div className='d-flex flex-column flex'>
       <div className="items">
          {
            items.map((obj) => (  
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
              <div style={{backgroundImage:`url(${obj.imageUrl})`}} 
              className='cartItemImg'></div>
              
                <div className='ml-10 mr-5'>
                  <p className='mb-5'>{obj.title}</p>
                  <b>{obj.price}</b>
                  {/* obj.priceArr,.titleArr */}
                </div>
                <img onClick={()=>onRemove(obj.id)} className='remoweBtn' src="/img/btn-remowe.svg" alt="" />
              </div>
            ))
          }
        </div>      

      <div className="cartTotalBlock">
      <ul>
        <li>
          <span>Итого:</span>
          <div></div>
          <b>{totalPrice} $. </b>
        </li>
        <li className='d-flex'>
          <span>Налог 5%: </span>
          <div></div>
          <b>{Math.floor(totalPrice / 100 * 5)} $.</b>
        </li>
      </ul>
      <div className='wrapper_btn'>
      <button disabled={isLoading} onClick={onClickOrder} className='greenButton'>
        Оформить заказ
        {/* <img src="/img/logo.png" alt="" /> */}
      </button>
      </div>
      </div>
      </div>
    ):(
      <Info 
      title={isOrderComplate ? 'Заказ оформлен':"Корзина пуста"}
       description={isOrderComplate?`Ваш заказ ${orderId} принят!`:"Добавьте заказ"} 
       image={isOrderComplate?"/img/free-icon-check-list-2298354.png":'/img/free-icon-empty-cart-4555999.png'} />
    )
     }
      </div>  
        </div>
        </div>
    );
}

export default Drawer;
