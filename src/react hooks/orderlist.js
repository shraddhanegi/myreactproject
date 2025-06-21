import { useState, useEffect } from 'react';

const Orderlist = () =>{
    let [itemList, setItemList] = useState([]);
    const getItem = async () => {
        try {
            await fetch("http://localhost:1234/order")
                .then(response => response.json())
                .then(itemArray => {
                    setItemList(itemArray.reverse());
                })
        }
        catch (error) {
            alert("Error :" + error);
        }
    }
    useEffect(() => {
        getItem();
    }, []);

    return(
       <div className='container mt-4'>
            <h3 className='text-center mb-4 text-primary'> Order Received : { itemList.length } </h3>
            {
                itemList.map((item, index)=>{
                    return(
                        <div className='row mb-5 bg-light p-4 rounded shadow-lg' key={index}>
                            <div className='col-xl-3'>
                                <h5> Full Name : {item.customer} </h5>
                                <p> Mobile : {item.mobile} </p>
                                <p> Address : {item.address} </p>
                            </div>
                            <div className='col-xl-9'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th> Item Name </th>
                                            <th> Photo </th>
                                            <th> Price </th>
                                            <th> Quantity </th>
                                            <th> Total </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            item.orderitem.map((item, index)=>{
                                                return(
                                                    <tr key={index}>
                                                        <td> {item.Name} </td>
                                                        <td> <img src={item.Image} height={40} width={60} alt={item.Name}/> </td>
                                                        <td> {item.Price} </td>
                                                        <td> {item.qty} </td>
                                                        <td> {item.qty * item.Price} </td>
                                                    </tr>
                                                    )
                                                })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Orderlist;