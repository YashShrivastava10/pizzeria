const CartLoader = () => {
  return (
    <div className="cart-container">
      <div className="shoppingCart-container">
        <div className="shoppingCart-heading">
          <span className="shoppingCart-text">Shopping Cart</span>
          <hr />
        </div>
        <div className="shoppingCart-details-container">
          <div className="shoppingCart-details">
            {Array.from({ length: 3 }).map((_, index) =>
              <div className="flex justify-between items-center w-full h-[110px] rounded-xl border p-2" key={index}>
                <div className="w-1/5 flex items-center">
                  <span className="h-[100px] w-[100px] skeleton"></span>
                </div>
                {Array.from({length: 3}).map((__, id) => 
                  <div className="w-1/5 flex items-center" key={id}>
                    <span className="h-[20px] w-full skeleton"></span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="orderSummary-container">
        <span className="orderSummary-heading">Order Summary</span>
        <div className="orderSummary-details-container">
          <div className="orderSummary-details">
            <div className="order-summary">
              <span>Total Items</span>
              <span className="orderSummary-items-skeleton skeleton"></span>
            </div>
            <div className="order-summary">
              <span>Sub Total</span>
              <span className="orderSummary-items-skeleton skeleton"></span>
            </div>
            <div className="order-summary">
              <span>Tax</span>
              <span className="orderSummary-items-skeleton skeleton"></span>
            </div>
            <div className="order-summary">
              <b>Total</b>
              <span className="orderSummary-items-skeleton skeleton"></span>
            </div>
          </div>
          <div className="orderSummary-button">
            <span className="h-[20px] w-full skeleton"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartLoader