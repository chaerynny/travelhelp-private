import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import '../scss/Cart.scss'; 

function Cart(props) {

  const { history } = props;

  // change language handler
  const { t } = useTranslation();

  // choose the quantity of menu
  const [quantity, setQuantity] = useState('');
  
  // cart information
  const [cart, setCart] = useState('');
  const [orderId, setOrderId] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [sum, setSum] = useState('');

  // delivery Address information
  const [inputPostcalCode, setInputPostalCode] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [confirmAddress, setConfirmAddress] = useState('');

  // get cart information
  useEffect(() => {
    axios.get(`http://localhost:3355/foods/cart/${window.sessionStorage.getItem('id')}`)
    .then(res => {
      setCart(res.data.cart);
      setOrderId(res.data.cart[0].Order.id);
      setRestaurant(res.data.restaurant);
      console.log('restaurant:', res.data.restaurant);
      const menuPrice = res.data.cart.map(menu => menu.quantity * (menu.Menu.price + menu.Option.price));
      const menuPriceSum = menuPrice.reduce((acc, cur) => acc + cur);
      setSum(menuPriceSum);
    })
  },[])

  // go back btn handler
  const goBackHandler = () => {
    history.goBack();
  }

  // address onChange handler
  const addressOnChangeHandler = (e) => {
    if(e.target.name === 'postalCode') {
      setInputPostalCode(e.target.value);
    } else if(e.target.name === 'address') {
      setInputAddress(e.target.value);
    }
  }

  // confirm address btn handler
  const confirmAddressHandler = (e) => {
    e.preventDefault();
    setConfirmAddress(inputPostcalCode + ') ' + ' ' + inputAddress);
  }

  return(
    <div className='background'>

      <div className='header'>
        <button className='backBtn' onClick={goBackHandler}><ArrowBackIcon /></button>
        <h1 className='h1'>{t('cart.myCart')}</h1>
      </div>

      {/* cart table */}
      <div className='cartTable'>

        {/* table head */}
        <div className='tableHead'>
          <div className='menuInfo'>{t('cart.menu')}</div>
          <div className='totalPrice'>{t('cart.price')}</div>
        </div>
        
        {/* chicken cart */}
        <div className='chickenCart'>
          <div className='neneChicken'>{restaurant.name_en} {restaurant.category_en}</div>
          <div className='minPrice'>{t('cart.minimum')}<span>{new Intl.NumberFormat().format(Number(restaurant.minimum_price))}₩</span></div>
        </div>

        {/* chicken menu delivery info */}
        <ul className='eachMenuInfo'>
          { cart && cart.map((menu, index) => {
              console.log('menu:', menu);
              return(
                <li key={index}>
                  <div className='menuImage'><img src={menu.Menu.image} alt='menuImage'/></div>
                  <div className='menuInfo'>
                    <div className='menuName'>
                      {
                        window.localStorage.getItem('i18nextLng') === 'en'
                        ? menu.Menu.name_en
                        :
                        window.localStorage.getItem('i18nextLng') === 'zh'
                        ? menu.Menu.name_zh
                        : menu.Menu.name_ja
                      }
                    </div>
                    <div className={menu.Option.id !== null ? 'menuType' : 'none'}>- 
                      {
                        window.localStorage.getItem('i18nextLng') === 'en'
                        ? menu.Option.name_en
                        :
                        window.localStorage.getItem('i18nextLng') === 'zh'
                        ? menu.Option.name_zh
                        : menu.Option.name_ja
                      } (+{menu.Option.price}₩)
                    </div>
                  </div>
                  <div className='menuPrice'>{new Intl.NumberFormat().format(Number((menu.Menu.price + menu.Option.price)))}</div>
                  <select className='menuQuantity' defaultValue={menu.quantity} onChange={e => {
                    axios.put('http://localhost:3355/foods/cart', {
                      order_id: orderId,
                      menu_id: menu.Menu.id,
                      option_id: menu.Option.id,
                      quantity: e.target.value
                    })
                    .then(() => {
                      setQuantity(e.target.value);
                      window.location = '/user/cart';
                    })
                  }}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                  <div className='menuTotalPrice'>{new Intl.NumberFormat().format(Number(((menu.Menu.price + menu.Option.price) * menu.quantity)))}₩</div>
                  <div className='deleteMenu' onClick={() => {
                    axios.delete('http://localhost:3355/foods/cart', {
                      params: {
                        order_id: orderId,
                        menu_id: menu.Menu.id,
                        option_id: menu.Option.id
                      }
                    })
                    .then(() => window.location = '/user/cart')
                  }}><DeleteForeverIcon /></div>
                </li>
              )
            })
          }
        </ul>

        {/* chicken menu total info */}
        <div className='summaryInfo'>
          <div className='menuTotalPriceSum'>
            <span className='priceSum1'>{t('cart.menuPrice')}</span>
            <span className='priceSum2'>{new Intl.NumberFormat().format(Number(sum))}</span>
          </div>
          <div className='plus'>+</div>
          <div className='deliveryFee'>
            <span className='delivery1'>{t('cart.delivery')}</span>
            <span className='delivery2'>{new Intl.NumberFormat().format(Number(restaurant.delivery_fee))}</span>
          </div>
          <div className='equal'>=</div>
          <div className='totalPrice'>
            <span className='total1'>{t('cart.total')}</span>
            <span className='total2'>{new Intl.NumberFormat().format(Number((sum + restaurant.delivery_fee)))}₩</span>
          </div>
          <div className={sum < restaurant.minimum_price ? 'minimumAlert' : 'none'}>
            <span>↳ {t('cart.minimumAlert')} <strong>{new Intl.NumberFormat().format(Number(restaurant.minimum_price))}₩</strong></span>
          </div>
        </div>

      </div>

      {/* delivery address */}
      <div className='deliveryInfo'>
        <div className='deliveryHeader'>{t('order.deliveryInformation')}</div>
        <div className='addressInput'>
          <div className='address'>{t('order.deliveryAddress')}</div>
          <select className='recentAddress' onChange={e => {
            setConfirmAddress(e.target.value);
          }}>
            <option>{t('order.recentAddress')}</option>
          </select>
          <form>
            <input className='inputaddress postalCode' type='number' name='postalCode' placeholder={t('order.postalCode')} label='Postal Code' onChange={addressOnChangeHandler} />
            <input className='inputaddress deliveryAddress' type='text' name='address' placeholder={t('order.deliveryAddress')} label='Delivery Address' onChange={addressOnChangeHandler} />
          </form>
          <button className='applyAddress' onClick={confirmAddressHandler} >{t('order.confirmAddress')}</button>
        </div>
        
        <div className='confirmAddress'>
          <div className='confirmTitle'>{t('order.confirmDeliveryAddress')}</div>
          <div className='confirmText'>{confirmAddress}</div>
        </div>
        
        <div className='contactInfo'>
          <div className='contactNumber'>{t('order.contact')}</div>
          <form>
            <input className='contact' type='number' name='contact' placeholder={t('order.contact')} label='Contact Number' />
          </form>
        </div>

      </div>

      {/* payment */}
      <button className='paymentBtn'>{t('order.pay')}</button>

    </div>
  )

}

export default withRouter(Cart); 