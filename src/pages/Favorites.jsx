import React from 'react';
import CartVar from '../component/Cart';
import AppContext from '../context';

const Favorites=()=>{
  const {favorites,onAddToFavorite}=React.useContext(AppContext);

    return(
        <div className="content p-40">
        <div className='d-flex align-center mb-40 justify-between'>
            <h1>Мои закладки</h1>
        </div>  

        <div id='divs' className="sneakers d-flex flex-wrap">
        {favorites
          .map((item,index)=>{
             return (
                 <CartVar 
                key={index}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...item}
                // price={item.price}
                // imageUrl={item.imageUrl} 
                // title={item.title} 
                 />
              )
            })  
          } 
        </div>
      </div>
    )
}
export default Favorites