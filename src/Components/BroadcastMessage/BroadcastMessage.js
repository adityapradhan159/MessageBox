import React,{useState,useEffect} from 'react';
import CustomerListCard from '../CustomerList/CustomerListCard';
import "./broadcastMessage.css"

const BroadcastMessage = () => {

    // Toggle tabs
    const [toggleBroadcastState, setToggleBroadcastState] = useState(1);
  
    const toggleTab = (index) => {
      setToggleBroadcastState(index);
    };


    // State to store data from json
  const [customerData,setCustomerData]=useState([]);
  
  // Fetch Data..
  const getCustomerData = () => {
    fetch('customerList.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        setCustomerData(myJson)
      });
  }
  useEffect(()=>{
    getCustomerData()
  },[])
  

  return (
    <div className='BroadcastMessage'>
        <div className="toBroadCast">
            To : <input type="text" />
        </div>

        <div className="customerList">

          {/* ------------Tabs--------------- */}
          <div className="BroadcastBloc-tabs">

          <button className={toggleBroadcastState === 1 ? "broadCastTabs active-tabs" : "broadCastTabs"} onClick={() => toggleTab(1)}>
            All 
          </button>

          <button className={toggleBroadcastState === 2 ? "broadCastTabs active-tabs" : "broadCastTabs"} onClick={() => toggleTab(2)}>
            Clients
          </button>

          <button className={toggleBroadcastState === 3 ? "broadCastTabs active-tabs" : "broadCastTabs"} onClick={() => toggleTab(3)}>
            Drivers
          </button>

          </div>

          {/* ------------Select All Button---------------- */}

          <div className="selectAll">
            <div className="selectAllBtn">
              <img src="./images/selectAll.svg" alt="" />
              <div className="selectAllPara">
                <h3>Select All</h3>
              </div>
            </div>

            <div className="selectCancel">
              <img src="./images/dismiss.svg" alt="" />
            </div>
          </div>

          {/* --------------Content Tabs---------------- */}


          
      <div className="broadCastContent-tabs" >
      {/* ------------All----------------- */}
        <div className={toggleBroadcastState === 1 ? "BroadCastContent  active-content" : "BroadCastContent "}>
        {
          customerData.map((item) =>(
            <CustomerListCard item={item} />
        ))
          
        }
        </div>

      {/* -----------Client--------------- */}
        <div className={toggleBroadcastState === 2 ? "BroadCastContent   active-content" : "BroadCastContent "}>
          
        {
          customerData.filter((value) => value.category == "client").map((item) => (
            <CustomerListCard item={item} />
          ))
        }
        </div>

       {/* -----------Driver--------------- */}
        <div className={toggleBroadcastState === 3 ? "BroadCastContent   active-content" : "BroadCastContent "}>
        {
          customerData.filter((value) => value.category == "driver").map((item) => (
            <CustomerListCard item={item} />
          ))
        }
        </div>
      </div>

      </div>
    </div>
  )
}

export default BroadcastMessage