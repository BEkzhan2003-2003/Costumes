import React from 'react';
import CartVar from '../component/Cart';

const Home=({items,searchValue,
    onChangeSearcheInput,onAddToFavorite,OnAddToCart,
    cartItems,isLoading })=>{

      // const {isItemAdded}=React.useContext(AppContext);

      const renderItems=()=>{
        const filtredItems=items.filter(item => item.title.toLowerCase().includes(searchValue));
          return (isLoading ? 
            [...Array(8)] 
            : filtredItems)
          .map((item,index)=>{
             return (
                <CartVar 
                 //  noChek={item.imgNoChek}
                 //  Chek={item.imgChek}

                onFavorite={(obj)=>onAddToFavorite(obj)}
                onPlus={(obj)=>OnAddToCart(item)}
                key={index}
                // added={isItemAdded(item && item.id)}
                Loading={isLoading}
                {...item}
                 />
              )
            })  
      }

    return(
        <div className="content p-40">

        <div className='h1_search d-flex align-center mb-40 justify-between'>
          <h1 className='h1'>{searchValue ? `Поиск по запросу '${searchValue}'`: 'Все костюмы'}</h1>
          <div className="search-block ">
            {/* <img width='25px' src="/img/logo.png" alt="search" /> */}
            <input onChange={onChangeSearcheInput} value={searchValue} className='ml-10' type="text" placeholder='поиск...'/>
          </div>
        </div>  

        <div id='divs' className="sneakers d-flex flex-wrap">
          {renderItems()} 
        </div>

      </div>
    )
}

export default Home

// [
//  {
//     "title":"lore",
//     "price":1000,
//     "imageUrl":"/img/sneakers-cross/costume-1.jpg"
//     },{
//     "title":"lore",
//     "price":1000,
//     "imageUrl":"/img/sneakers-cross/costume-2.jpg"
//     },{
//     "title":"lore",
//     "price":1000,
//     "imageUrl":"/img/sneakers-cross/costume-3.jpg"
//     },{
//     "title":"lore",
//     "price":1000,
//     "imageUrl":"/img/sneakers-cross/costume-4.jpg"
// }
// ]