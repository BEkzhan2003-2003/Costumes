import React from 'react';
import {Routes,Route,Link} from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import HeaderVar from './component/Header';
import DrawerVar from "./component/Drawer";
import Favorites from './pages/Favorites';

import AppContext  from './context';

function App() {
  const [items,setItems]=React.useState([]);
  const [cartItems,setCartItems]=React.useState([]);
  const [favorites,setFavorites]=React.useState([]);
  const [searchValue,setSearchValue]=React.useState('');
  const [cartOpened, setCartOpened]=React.useState(false); //header
  const [isLoading,setIsLoading]=React.useState(true);


                      // запрос на сервер 1-для основного 
                      // 2-для модального окна наверное :)
                      // const [items,setItems]=React.useState([]);
                      // const [cartItems,setCartItems]=React.useState([]);
React.useEffect(()=>{
  async function fetchData(){

      const itemResponse=await axios.get('https://6441507c792fe886a8a43ee8.mockapi.io/items');
      const cartResponse=await axios.get('https://6441507c792fe886a8a43ee8.mockapi.io/cart');
      const favoriteResponse=await axios.get('https://64450c1f914c816083c4ab5d.mockapi.io/favorites');

      setIsLoading(false)
      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemResponse.data);
  }  
  
  fetchData();
},[]);

                                  // это функция отвечает за появление окна...
const OnAddToCart=(obj)=>{
  if(cartItems.find(item => Number(item.id) === Number(obj.id))){
    // временно поставил / cart / id
    axios.delete(`https://6441507c792fe886a8a43ee8.mockapi.io/cart/${obj.id}`) 
    setCartItems((prev)=>prev.filter((item) =>Number(item.id)!== Number(obj.id)));  
  }else{
    axios.post('https://6441507c792fe886a8a43ee8.mockapi.io/cart',obj);
    setCartItems(prev=>[...prev,obj]);
  }
}
                                        // удаление окна
const onRemoveItem=(id)=>{
  axios.delete(`https://6441507c792fe886a8a43ee8.mockapi.io/cart/${id}`);
  setCartItems((prev)=>prev.filter((item) => item.id != id));
}

const onChangeSearcheInput=(event)=>{
  setSearchValue(event.target.value);
}

const onAddToFavorite= async (obj)=>{
  // try использован для того чтобы отловить ошибку в случае await у не
  //удается нормально предупредить, и catch должен предупредить
  try{//если возникнут проблемы с сердечками то сделай favObj.id обратно без NUmber
    if(favorites.find(favObj => Number(favObj.id) === Number(obj.id))){
      axios.delete(`/favorites/${obj.id}`)
      setFavorites((prev)=> prev.filter((item) => Number(item.id) !== Number(obj.id)));
    }else{
      const {data}=await axios.post('https://64450c1f914c816083c4ab5d.mockapi.io/favorites',obj);
      setFavorites(prev=>[...prev,data]);
    }
  }catch(error){
    // alert('не удалось добавить в фавориты');
  }

}

const isItemAdded=(id)=>{
  return cartItems.some(obj=> Number(obj.id) === Number(id));
} 

return (
    <AppContext.Provider value={{items,cartItems,favorites,isItemAdded,onAddToFavorite,setCartOpened,setCartItems}} >
      <div className="wrapper clear">

      {cartOpened && <DrawerVar items={cartItems} onClose={()=> setCartOpened(false)} onRemove={onRemoveItem}/>}

      <HeaderVar onClickCart={()=> setCartOpened(true)}/>

      <Routes>
      <Route path='/' 
       element={
        <Home items={items} searchValue={searchValue}
        onChangeSearcheInput={onChangeSearcheInput}
        onAddToFavorite={onAddToFavorite} OnAddToCart={OnAddToCart}
        cartItems={cartItems} isLoading={isLoading}
        />
      }
      />       

      <Route path='/favorites' 
        element={<Favorites />}
       />
    </Routes>  

    </div>
    </AppContext.Provider >

  );
}




 {/* <div className="content p-40">

        <div className='d-flex align-center mb-40 justify-between'>
          <h1>{searchValue ? `Поиск по запросу '${searchValue}'`: 'Все костюмы'}</h1>
          <div className="search-block ">
            <input onChange={onChangeSearcheInput} value={searchValue} className='ml-10' type="text" placeholder='поиск...'/>
          </div>
        </div>

        <div id='divs' className="sneakers d-flex flex-wrap">
          {items
          .filter(item => item.titleArr.toLowerCase().includes(searchValue))
          .map((item,index)=>{
             return (
                 <CartVar 
                key={index}
                price={item.priceArr}
                imageUrl={item.imgArr} 
                title={item.titleArr} 
                onFavorite={(obj)=>onAddToFavorite(obj)}
                onPlus={(obj)=>OnAddToCart(item)}
                 />
                 
              )
            })  
          } 
        </div>

      </div> */}

export default App;