import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyCart = () =>{
    const navigate = useNavigate();
    let [itemList, setItemList] = useState([]);
    const getItem = async () => {
        try {
            await fetch("http://localhost:1234/cart")
                .then(response => response.json())
                .then(itemArray => {
                    setItemList(itemArray);
                })
        }
        catch (error) {
            alert("Error :" + error);
        }
    }
    useEffect(() => {
        getItem();
    }, []);

       const del = (id) =>{
        let url = "http://localhost:1234/cart/" + id;
        let postData = { method: "delete" };
        fetch(url, postData)
            .then(response => response.json())
            .then(info => {
                getItem();
            })
    }

    const updateQty = (item, action) =>{
        if( action ==="A" ) item["qty"] = item.qty + 1;
        else item["qty"] = item.qty - 1;

        if(item.qty===0) del(item.id);

        let url = "http://localhost:1234/cart/"+item.id;
        let postData = {
            headers:{'content-type':'application/json'},
            method:"put",
            body:JSON.stringify(item)
        }
        fetch(url, postData)
        .then(response => response.json())
        .then(info => {
            getItem();
        })
    }


    const placeOrder = () =>{
            let url = "http://localhost:1234/order";
            let orderData = {
                customer:fullname,
                mobile:mobile,
                address:address,
                orderitem:itemList
            };

            let postData = {
                headers:{'content-type':'application/json'},
                method:"post",
                body:JSON.stringify(orderData)
            }
            fetch(url, postData)
            .then(response =>response.json())
            .then(info=>{
                alert("Hi , "+ fullname + " We have received your order..");
                setName("");
                setMobile("");
                setAddress("");
                itemList.map((item, index)=>{
                    del(item.id);
                })
            })
        
    }


    let[fullname, setName] = useState("");
    let[mobile, setMobile] = useState("");
    let[address, setAddress] = useState("");
    let total = 0;
    return(
        <section className='container mt-5 mb-5'>
            <div className='row'>
                <div className='col-xl-12'>
                    <h3 className='text-center mb-4'> { itemList.length } : Item in Cart </h3>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th> Item Name </th>
                                <th> Photo </th>
                                <th> Price </th>
                                <th> Quantity </th>
                                <th> Total </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                itemList.map((item, index)=>{
                                    total = total + (item.qty * item.Price);
                                    return(
                                        <tr key={index}>
                                            <td> {item.Name} </td>
                                            <td> <img src={item.Image} height={40} width={60} alt={item.Name}/> </td>
                                            <td> {item.Price} </td>

                                            <td className='input-group'> 
                                                <button className='btn btn-warning btn-sm me-1' onClick={()=>updateQty(item, 'B')}>-</button>
                                                {item.qty} 
                                                <button className='btn btn-info btn-sm ms-1' onClick={()=>updateQty(item, 'A')}>+</button>
                                            </td>

                                            <td> {item.qty * item.Price} </td>
                                            <td> 
                                                <i className='fa fa-trash text-danger fa-lg pe-auto' 
                                                onClick={ ()=>del(item.id) }></i> 
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <p className='text-center'> <b>Total Amount : { total } </b></p>

                        <div className='row p-4 bg-light rounded'>
                            <h3 className='mb-4 text-center text-primary'> Enter Delivery Details </h3>
                            <div className='col-xl-4'> 
                                <label>Full Name</label>
                                <input type="text"className='form-control' value={fullname} onChange={obj=>setName(obj.target.value)}/> 
                            </div>
                            <div className='col-xl-4'> 
                                <label>Mobile No</label>
                                <input type="text"className='form-control' value={mobile} onChange={obj=>setMobile(obj.target.value)}/> 
                            </div>
                            <div className='col-xl-4'> 
                                <label>Delivery Address</label>
                                <textarea className='form-control' value={address} onChange={obj=>setAddress(obj.target.value)}></textarea> 
                            </div>
                        </div>
                    <div className='text-center mt-4 mb-5'>
                        <button className='btn btn-primary me-2 btn-lg' onClick={placeOrder}> Place Order </button>
                    </div>
                </div>  
            </div>
        </section>
    )

}

export default MyCart;