import React, { useContext } from 'react'
import Context from './Context'

const SideCart = () => {

  const context = useContext(Context)
  const {cart} = context.state

  // let itemPrice = 0
  let tax2 = 0

// ---------------------------------------FUNCTION TO CALCULATE TOTAL OF PRODUCTS IN CART--------------------------------------------------
  const itemPrice = cart.reduce(
    (acc,currVal)=> {
      return acc + currVal.selectedPrice * currVal.qtn;
    }, 
    0
  )
  
// ---------------------------------------FUNCTION TO CALCULATE TOTAL OF EXTRA PRODUCTS IN CART--------------------------------------------------
  const extraItems = cart.reduce(
    (acc,currVal)=> {
      return acc + currVal.setSumExtra;
    }, 
    0
  )

// ---------------------------------------CALCULATING TOTAL OF MAIN PRODUCTS AND EXTRA PRODUCTS --------------------------------------------------
  const totalPrice = itemPrice + extraItems

  return (
    <div className='sideCart shadow-lg'>
      <div className='sticky-top '> 
              <h4 className='text-center fw-normal fs-5 px-4 py-4 border-bottom '>Your order</h4>

              <div className='container py-3'>

                {
                  cart.map((prd,index)=>(
                    <div key={index} className='mb-3'>
                      <div className='d-flex justify-content-between '>
                        <div className='quantity fw-semibold'>{prd.qtn}</div>
                        <div className='name px-3 text-secondary fw-semibold'>{prd.prdname}</div>
                        <div className='price text-danger fw-bold '>{(prd.selectedPrice * prd.qtn).toFixed(2)}</div>
                      </div>
                    {/* -----------------------ADD AND REMOVE PRODUCT BUTTONS--------------------------------------------  */}
                      <div className='d-flex justify-content-between mt-2'>
                        <button className='btnAdd bg-primary text-white' onClick={()=>context.actions.addToCart(prd)}>+</button>
                        <button className='btnSub bg-primary text-white' onClick={()=>context.actions.removeFromCart(prd)}>-</button>
                      </div>
                    </div>
                  ))
                }

                

                {
                  cart.length !==0 ?
                  <div className=''>
                    <hr/>
                    <div className='d-flex justify-content-between'><p>subTotal</p> <p>{itemPrice.toFixed(2)}</p></div>
                    <div className='d-flex justify-content-between'><p>extras</p> <p>{extraItems.toFixed(2)}</p></div>

                    <hr/>
                    <div className='d-flex justify-content-between'><p>Total</p> <p>{totalPrice.toFixed(2)}</p></div>
                  </div>
                  :
                  ''
                }

                <div className='orderBtn order mt-3 bg-primary'>
                  <h6 className='text-center m-0 text-light'>{`Order ${cart.length} GHC ${totalPrice.toFixed(2)}`}</h6>
                </div>
              </div>
        </div>
    </div>
  )
}

export default SideCart