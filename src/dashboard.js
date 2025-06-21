import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

const Mydashboard =()=>{
    let [itemList, setItemList] = useState( [] );

        const getItem= ()=>{
             fetch("http://localhost:1234/products")
            .then(response=>response.json())
            .then(itemArray=>{
            setItemList(itemArray);
          })
        }

    let [orderList, setOrderList] = useState([]);
    const getOrder = async () => {
        try {
            await fetch("http://localhost:1234/order")
                .then(response => response.json())
                .then(itemArray => {
                    setOrderList(itemArray.reverse());
                })
        }
        catch (error) {
            alert("Error :" + error);
        }
    }

        useEffect(()=>{
          getItem();
          getOrder();
        },[]);

     return (
        <section>
            <h1 className="heading mt-4">Seller Dashboard</h1>
            {
            <div className="container2">
                <div className="text-primary">
                    <Link className="text-decoration-none" to="/productlist">
                        <i className='fa fa-suitcase text-primary bg-white p-3 rounded'></i>
                        <br/>Total Product({itemList.length})
                    </Link>
                </div>

                <div className="text-warning">
                    <Link className="text-decoration-none" to="/orderlist">
                        <i className='fa fa-headset text-warning bg-white p-3 rounded'></i><br/>
                        Order Received ({ orderList.length }) 
                    </Link>
                </div>

                <div className="text-success">
                    <Link className="text-decoration-none"  to="/newproduct">
                        <i className='fa fa-plus text-success bg-white p-3 rounded'></i><br/>
                        Add New Product
                    </Link>
                </div>
            </div>
            }
        </section>
     )
}
export default Mydashboard;
