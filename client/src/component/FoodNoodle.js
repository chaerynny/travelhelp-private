import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import noodleImg from '../img/new_banner_bn.png';
import cartWhite from '../img/cart_white.png';
import cartNavy from '../img/cart_navy.png';
import ModalNoodle from './ModalNoodle';
import ModalSignin from './ModalSignin';
import '../scss/FoodNoodle.scss';

function FoodNoodle(props) {
  
  // userId props for modal
  const { userId } = props;

  // menu of restaurant
  const [menu, setMenu] = useState(null);

  // information of restaurant
  const [information, setInformation] = useState(null);

  // open modal
  const [isOpen, setModal] = useState(false);
  const [isSignin, setIsSignin] = useState(false);

  // ModalNoodle information
  const [menuId, setMenuId] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [optionName1, setOptionName1] = useState('');
  const [optionName2, setOptionName2] = useState('');
  const [optionPrice2, setOptionPrice2] = useState('');
  const [optionName3, setOptionName3] = useState('');
  const [optionPrice3, setOptionPrice3] = useState('');

  // change language
  const { t } = useTranslation();

  // get restaurant menus
  useEffect(() => {
    axios.get('http://localhost:3355/foods/menu', 
    {
      params: {
        restaurant_id : 2
      }
    })
    .then(res => {
      console.log("res:", res);
      const menuResult = res.data.menu;
      const restaurantResult = res.data.restaurant;
      console.log("menuResult:", menuResult);
      console.log("restaurantResult:", restaurantResult);
      setMenu(menuResult);
      setInformation(restaurantResult);
    })
  },[])

  // check signin status when user clicked cart icon on Nav bar
  const checkSigninStatus = (e) => {
    if(window.sessionStorage.getItem('id')) {
      window.location = '/user/cart';
    } else {
      e.preventDefault();
      setIsSignin(!isSignin);
    }
  }

  return(
  <div>
    {/* cart icon */}
    <div className='cartIconNoodle'>
      <button className="cartIconBtn" onClick={checkSigninStatus}><img src={cartWhite} alt='cartIconBtn'/></button>
    </div>

    {/* choose restaurants btn */}
    <div className='restaurantNoodle'>
      <div className='chicken'>
        <a href='/help/foodDelivery/chicken'>{t('food.chicken')}</a>
      </div>
      <div className='noodleSelected'>
        <a href='/help/foodDelivery/noodle'>{t('food.noodle')}</a>
      </div>
    </div>
    <div className='menuContent'>

      {/* banner img */}
      <div className='banner'>
        <img src={noodleImg} alt='banner'/>
      </div>

      {/* restaurant information */}
      <div className='restaurantInfo'>
        { information ?
          <div>
            <div className='Info restaurantDes'>
              {
                window.localStorage.getItem('i18nextLng') === 'en'
                ? information.description_en
                : window.localStorage.getItem('i18nextLng') === 'zh'
                ? information.description_zh
                : information.description_ja
              }
            </div>
            <div className='Info restaurantName'>
              <span className='InfoDetailTitle'>{t('food.restaurant')}</span>
              {
                window.localStorage.getItem('i18nextLng') === 'en'
                ? information.name_en
                : window.localStorage.getItem('i18nextLng') === 'zh'
                ? information.name_zh
                : information.name_ja
              }
            </div>
            <div className='Info restaurantHour'>
              <span className='InfoDetailTitle'>{t('food.hour')}</span>
              {information.operation_hour}
            </div>
            <div className='Info restaurantMin'>
              <span className='InfoDetailTitle'>{t('food.minimum')}</span>
              {information.minimum_price}
            </div>
            <div className='Info restaurantDel'>
              <span className='InfoDetailTitle'>{t('food.delivery')}</span>
              {information.delivery_fee}
            </div>
          </div>
          : <div></div>
        }
      </div>

      {/* menu list */}
      <ul>
        {
          menu && menu.map(menu => {
            return(
              <div key={menu.id} className='menuLi' onClick={e => {
                e.preventDefault();
                setModal(!isOpen);
                setMenuId(menu.id);
                setImage(menu.image);
                setName(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.name_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.name_zh
                  : menu.name_ja
                );
                setPrice(menu.price);
                setDescription(
                  window.localStorage.getItem('i18nextLng') === 'en'
                  ? menu.description_en
                  :
                  window.localStorage.getItem('i18nextLng') === 'zh'
                  ? menu.description_zh
                  : menu.description_ja
                );

                menu.Options[0] ? 
                  setOptionName1(
                    window.localStorage.getItem('i18nextLng') === 'en'
                    ? menu.Options[0].name_en
                    :
                    window.localStorage.getItem('i18nextLng') === 'zh'
                    ? menu.Options[0].name_zh
                    : menu.Options[0].name_ja
                  )
                  :
                  setOptionName1('')
                
                menu.Options[1] ? 
                  setOptionName2(
                    window.localStorage.getItem('i18nextLng') === 'en'
                    ? menu.Options[1].name_en
                    :
                    window.localStorage.getItem('i18nextLng') === 'zh'
                    ? menu.Options[1].name_zh
                    : menu.Options[1].name_ja
                  )
                  :
                  setOptionName2('')

                menu.Options[2] ? setOptionPrice2(menu.Options[1].price) : setOptionPrice2('')
                
                menu.Options[2] ? 
                  setOptionName3(
                    window.localStorage.getItem('i18nextLng') === 'en'
                    ? menu.Options[2].name_en
                    :
                    window.localStorage.getItem('i18nextLng') === 'zh'
                    ? menu.Options[2].name_zh
                    : menu.Options[2].name_ja
                  )
                  :
                  setOptionName3('')

                menu.Options[2] ? setOptionPrice3(menu.Options[2].price) : setOptionPrice3('')
              }}>
                <li key={menu.id}>
                  <img src={menu.image} alt='menuImage'/>
                  <div className='menuName'>
                    {
                      window.localStorage.getItem('i18nextLng') === 'en'
                      ? menu.name_en
                      :
                      window.localStorage.getItem('i18nextLng') === 'zh'
                      ? menu.name_zh
                      : menu.name_ja
                    }
                  </div>
                  <div className='menuPrice'>{menu.price}₩</div>
                  <button className='addCartBtn'><img src={cartNavy} alt='cartIcon'/></button>
                </li>
              </div>
            )
          })
        }
      </ul>
      
      {/* chicken modal */}
      <ModalNoodle isOpen={isOpen} setModal={setModal} infoMenuId={menuId} infoImage={image} infoName={name} infoPrice={price} infoDescription={description} infoOptionName1={optionName1} infoOptionName2={optionName2} infoOptionPrice2={optionPrice2} infoOptionName3={optionName3} infoOptionPrice3={optionPrice3}  userId={userId} />

      {/* signin modal */}
      <ModalSignin isSignin={isSignin} setIsSignin={setIsSignin} />
    </div>
  </div>
  )
}

export default withRouter(FoodNoodle); 