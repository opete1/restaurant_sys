import React, { useEffect, useState } from 'react'

export const Context = React.createContext()

export const Provider = (props) => {
    const [products,setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [extras, setExtras] = useState([])
    const [currentProduct, setCurrentProduct] = useState({})
    const [cart, setCart] = useState([])


    // --------------------------------DYNAMIC FETCH FUNCTION-----------------------------------------------------
    const fetchData = (param,setArr)=>{
      fetch(`http://localhost:8000/ecommerce/public/data.php?${param}`)
      .then(res=>res.json())
      .then(data=>setArr(data))
    }

    // --------------------------------USEEFFECT-----------------------------------------------------
    useEffect(()=>{
      fetchData("categories",setCategories);
      fetchData("products",setProducts);
      fetchData("extras",setExtras)
    },[])
    

    // --------------------------------SHOWMODAL() FUNCTION TO SHOW MODAL WHEN PRODUCT IS TO BE ADDED TO CART-----------------------------------------------------
    const showModal=(prd)=>{
      setCurrentProduct({...prd, setSumExtra:0})
    }
    
  
    // --------------------------------SETPRICE() FUNCTION TO SET SELECTED PRODUCT PRICE-----------------------------------------------------
    const setPrice = (price)=>{
      setCurrentProduct({...currentProduct, selectedPrice:price});
    }

    // --------------------------------CALCEXTRAS() FUNCTION TO CALCULATE TOTAL VAL OF CHECKED EXTRA PRODUCTS IN MODAL-----------------------------
      const calcExtras = (e)=>{
        const value = Number(e.target.value)
        const isChecked = e.target.checked

        if(isChecked){
            setCurrentProduct({...currentProduct, setSumExtra :  Math.round( (currentProduct.setSumExtra+value)  * 1e2 ) / 1e2})
        }
        else{
          setCurrentProduct({...currentProduct, setSumExtra : Math.round( (currentProduct.setSumExtra-value)  * 1e2 ) / 1e2})
        }

    }

      // --------------------------------ADDTOCART() FUNCTION TO ADD PRODUCT TO CART-----------------------------------------------------
      const addToCart = (product)=>{
        const isFound = cart.find(ele=>ele.prd_id === product.prd_id && ele.selectedPrice === product.selectedPrice);
        if(isFound){
          setCart(cart.map(prd=> prd === isFound ? {...isFound, qtn: isFound.qtn + 1} : prd))
        }
        else{
          setCart([...cart, {...product, qtn : 1}])
        }
      }

    // --------------------------------REMOVEFROMCART() FUNCTION TO REMOVE PRODUCT FROM CART---------------------------------------------------
    const removeFromCart = (product) => {
      const found = cart.find(ele => ele.prd_id === product.prd_id && ele.selectedPrice === product.selectedPrice);
    
      if (found.qtn === 1) {
        setCart(cart.filter(prd => prd !== product));
      } else {
        setCart(cart.map(prd => 
          prd.prd_id === product.prd_id && prd.selectedPrice === product.selectedPrice ? { ...prd, qtn: prd.qtn - 1 } : prd
        ));
      }
    };

    // -------------------------------- VARIABLES TO BE ACCESSED IN OTHER COMPONENTS----------------------------------------------
    const value ={
        state:{
            products,
            categories,
            cart,
            currentProduct,
            extras
        },
      
    // --------------------------------FUNCTION TO BE ACCESSED IN OTHER COMPONENTS---------------------------------------------------
        actions:{
            addToCart,
            removeFromCart,
            showModal,
            setPrice,
            setExtras,
            calcExtras
        }
    }

  return (
    <Context.Provider value={value}>
        { props.children}
    </Context.Provider>
  )
}

export default Context