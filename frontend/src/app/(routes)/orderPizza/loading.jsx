const OrderLoader = () => {
  return (
    <div className="w-full h-fit py-2 flex justify-center items-start overflow-hidden overflow-y-scroll">
      <div className="orderPizza-container">
        {Array.from({ length: 6 }).map((_, index) =>
          <div key={index} className="orderPizza-details-container">
            <div className="orderPizza-details">
              <div className="orderPizza-details-first">
                <span className="h-[20px] w-full skeleton"></span>
                <span className="h-[20px] w-1/4 skeleton"></span>
                <span className="h-[20px] w-1/2 skeleton"></span>
              </div>
              <div className="orderPizza-details-second">
                <div className="flex flex-col gap-y-1 w-full">
                  <span className="h-[10px] w-11/12 skeleton"></span>
                  <span className="h-[10px] w-1/2 skeleton"></span>
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                  <span className="h-[10px] w-11/12 skeleton"></span>
                  <span className="h-[10px] w-1/2 skeleton"></span>
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                  <span className="h-[10px] w-11/12 skeleton"></span>
                  <span className="h-[10px] w-1/2 skeleton"></span>
                </div>
              </div>
              <div className="orderPizza-details-third">
                <span className="h-[90px] w-11/12 skeleton"></span>
                <span className="h-[20px] w-11/12 skeleton"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}

export default OrderLoader