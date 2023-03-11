import React, { useContext } from 'react'
import Context from './Context'



const CategoriesProducts = (props) => {
    const context = useContext(Context) 
    const {categories,extras,currentProduct,products} = context.state
    const inputRefM = React.useRef('');
    const inputRefL = React.useRef('');
    const modelRef = React.useRef('');



    if(modelRef.current){
        modelRef.current.addEventListener('hidden.bs.modal', ()=>{
            const inputs = modelRef.current.querySelectorAll('input');
            inputs.forEach(input => {
               if (input.type === 'radio' || input.type === 'checkbox') {
                 input.checked = false;
               } else {
                 input.value = '';
               }
             });
        });
    }



  return (
    
    <div className='cateory-details container'>
        {
            categories.map((cat,index)=>{ 

            return( 
                // Products.length > 0 ?
                
            <div id={cat.cat_id} key={cat.cat_id} >
                <div className='d_tblCel_header categ-header border border-light mt-4'>
                    <div className='categImg border' style={{backgroundImage:`url(${`data:image/png;base64,${cat.catimage}`})`}} > </div>
        
                    <div className='categ-header-text'>
                        <h4 className="text-center h4Catdescription" >{cat.prdname}<sub className="text-muted muteTxt" >Alle Pizzen<sup>G,M</sup>  werden mit Tomatensauce,Käse<sup>M</sup> und Oregano zubereitet</sub></h4>
                        <p className='h4Catdescription text-secondary fw-semibold'>{cat.description}</p>
                    </div>
                </div>
                
                {
                    products.map((prd,index)=>(
                        prd.cat_id === cat.cat_id ?

                    <div key={index} className='crd-product border mb-2'>
                        <div className='add' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e)=>{context.actions.showModal(prd)}}> </div>
                        <div className=' px-3 py-4'>
                            <h4 className='mb-1 fs-5 text-dark'>{prd.prdname}</h4>
                            {/* <p className='mb-1 text-dark fw-semibold'>{`description`}</p> */}
                            <p className='mb-1 text-dark '>{ prd.priceM }</p>
                            <p className='mb-1 text-dark '>{ prd.priceL }</p>
                            {/* <p className='mb-1 text-dark '>{ Productsprices && Productsprices.length > 0 ? `Large : GHC ${Productsprices[1].price}` :``}</p> */}
                        </div>

                    </div>
                    :
                    null
                    ))
                }
               
                
            </div>
            // :
            // null
            )
            })
        }

        <div className="modal fade" id="exampleModal" ref={modelRef} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable ">

                <div className="modal-content">
                    <div className="modal-header">
                        {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Title</h1> */}
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                                                
                    <div className="modal-body">
                        <div className='inner-header'>{currentProduct.prdname}</div>

                        <div className='inner-details'>


                            {/* <select id='selectPrice' ref={ref} onChange={(e)=>context.actions.getSeletedPrice(ref)}> */}

                                <div className='d-flex'>
                                    <label className=' priceLabel me-3'>
                                        <input className='priceInput' ref={inputRefM} type={'radio'} value={currentProduct.priceM} name={'checkBPrice'} onChange={e=>context.actions.setPrice(e.target.value)} />
                                        <span className='priceSpan'>{` M: ${currentProduct.priceM}`}</span>
                                    </label>

                                    <label className='priceLabel'>
                                        <input className='priceInput' ref={inputRefL} type={'radio'} value={currentProduct.priceL} name={'checkBPrice'} onChange={e=>context.actions.setPrice(e.target.value)} />
                                        <span className='priceSpan'>{` L: ${currentProduct.priceL}`}</span>
                                    </label>
                                    
                                </div>
                        </div>

                        <div className='inner-extras bg-light mt-3'>
                            <div className='ex-wrap'>
                                {
                                    extras.map(({prdname,extprice},index)=>(
                                        <div key={index} className='d-flex align-items-center mb-2 ms-2'>
                                            <input type={'checkbox'} value={extprice || ``} onChange={e=>context.actions.calcExtras(e)} />
                                            <span className='ms-3'>{`${prdname} : ${extprice}`}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer justify-content-between">
                        <div>
                            <p className='m-0'> { currentProduct.selectedPrice ? currentProduct.selectedPrice : 0} </p>
                            <p className='m-0'> { currentProduct.setSumExtra ? currentProduct.setSumExtra : 0} </p>
                        </div>
                        <button type="button" className="btn btn-primary " data-bs-dismiss="modal" onClick={(e)=>context.actions.addToCart(currentProduct)} >Add</button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default CategoriesProducts