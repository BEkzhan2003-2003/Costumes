import React, {useState} from 'react';
import ContentLoader from "react-content-loader"
import AppContext  from '../../context';

import styles from './Cart.module.scss';


const Cart=({id,onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  favorited = false,
  Loading=false
})=>{
  const {isItemAdded}=React.useContext(AppContext);
  // const [isAded,setIsAded]=React.useState(added);
  const [isFavorite,setIsFavorite]=React.useState(favorited);


  const onClickPlus=()=>{
    onPlus({id,price,imageUrl,title});
    // setIsAded(!isAded);
  }

  const onClickFavorite=()=>{
    onFavorite({price,imageUrl,title,id});
    setIsFavorite(!isFavorite);
  }

  return(

  <div className={styles.card}>
    {
      Loading ? 
       <ContentLoader 
            speed={2}
            width={150}
            height={150}
            viewBox="0 0 150 150"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            // {...props}
          >
            <rect x="81" y="113" rx="0" ry="0" width="0" height="1" /> 
            <rect x="18" y="2" rx="0" ry="0" width="159" height="107" />
          </ContentLoader>  
    : <>
    <div className={styles.favorite} onClick={onClickFavorite}> 
          {/* пока написал onFavorite */}
         <img onClick={onFavorite} src={isFavorite ? 'img/heart-liked.svg' : '/img/heart-unliced.svg'} alt='Unliked'/>
        </div>
          <img className={styles.costumeVremenno} src={imageUrl} />
          <h5 className="text-center">{title}</h5>
          <div className="d-flex justify-between align-center">
            <div>
              <p>цена</p>
              <b>{price}$</b>
            </div>            
              <img className={styles.plus} 
              onClick={onClickPlus}
               src={isItemAdded(id) ? '/img/button-chek.svg':'/img/plus.svg'}/>
          </div>
    </>
    }   
      
        </div> 
    )
}
export default Cart
