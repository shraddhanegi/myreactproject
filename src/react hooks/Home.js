
import { useState, useEffect } from "react";

const MyHome =()=>{
     let [keyword, setKeyword] = useState("");
    let [porder, setPorder] = useState("asc");
 let [itemList, setItemList] = useState([]);
     const getItem = async () => {
            try {
                await fetch("http://localhost:1234/products")  //returns a Promise that A Promise is like a placeholder for a value that is not available yet, but will be available in the future.
                    .then(response => response.json())          //also a promise
                    .then(itemArray => {
                        
                        if(porder==="asc"){
                            itemArray.sort((a, b)=>{ return a.Price - b.Price }); // asc order by price 
                            setItemList(itemArray);         //works only after Promises are resolved  ,update product list after sort
                            setPorder("desc");
                        }else{
                            itemArray.sort((a, b)=>{ return b.Price - a.Price }); // asc order by price
                            setItemList(itemArray);
                            setPorder("asc");
                        }
    
                    })
            }
            catch (error) {
                alert("Error :" + error);           //if either Promise fails
            }
        }
        useEffect(() => {
            getItem();
        }, []);
    
    /*let[itemlist , setitem]=useState([
    {
      Name: 'Onion',
      Details: 'this is good onion',
      Price:  30,
      Image:'/Onion.png' 
    },
    {
      Name: 'Mango',
      Details: 'Sweet mango',
      Price: 150,
     Image: '/Mango.jpg'
    },
    {
      Name: 'Apple',
      Details: 'Red and juicy',
      Price: 200,
      Image: '/Apple.jpg'
    },
    {
      Name: 'Water Bottle',
      Details: 'Colorful stylish bottle',
      Price: 250,
      Image: '/bottles.jpg'
    }
    ]);*/

   // let[cart , setcart] =useState([]);

    const AddtoCart = (item)=>{
      //  setcart([...cart ,item]);
      item['qty'] = 1;
        
        let url="http://localhost:1234/cart";
        let postData={
            headers:{"content-type":"application/json"},
            method:"post",
            body:JSON.stringify(item),
        };
        fetch(url ,postData)
        .then(response=>response.json())
        .then((data)=>{
            alert("Product Added successfully to cart!")
        })
    }

   /* we can also use filter method for search data 
   let filterdata=itemlist.filter((item)=>
    item.Name.toLowerCase().match(keyword.toLowerCase()) ,if we use this so instead of itemlist.map use filterdata.map
    );*/

    

    return(
        <section className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-xl-4">
                    <div className="input-group">
                    <span className="input-group-text">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input type="text" className="form-control" placeholder="search.."
                    onChange={obj=>setKeyword(obj.target.value)}/>
                    </div>
                 </div>
            </div>
            <div className="row mt-5">
            {
                itemList.map((item , index)=>{
                    if( item.Name.toLowerCase().match( keyword.toLowerCase()) )
                    return(
                        <div className="col-xl-3" key={index}>
                            <div className="card h-100 text-center" style={{border:"none"}}>
                                <img src= {item.Image} alt={item.Name} style={{height:'150px' ,objectFit:'contain'}}/>
                                <div className="card-body">
                                    <h5 className="card-title"> {item.Name} </h5>
                                    <p className="card-text"> {item.Details}</p>
                                    <p> RS.{item.Price} </p>
                                    <button className="btn btn-warning" onClick={()=>AddtoCart(item)}> <i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )


}

export default MyHome;

/*
Method	      Code Example	                                        Purpose	                             Can Replace filter()?	              Readability / Best Use
.filter()  ✅	products.filter(p => p.name.includes(searchTerm))	Filters items based on condition	✅ Yes, this is the correct method	✅ Cleanest, most readable, best practice
.forEach()	let result = []; products.forEach(p => 
     { if (p.name.includes(searchTerm)) result.push(p); });           Manual filtering	                   ✅ Yes, but verbose	                ❌ More code, less clear
.reduce()	products.reduce((acc, p) => 
    { if (p.name.includes(searchTerm)) acc.push(p); return acc; }, [])	Can accumulate based on condition	✅ Yes, but overkill	                ❌ More complex than needed
.map()	products.map(p => p.name.includes(searchTerm) ? p : null)	    Transforms items	                ❌ No — does not remove items	    ❌ Misuse — returns same-length array
.slice()	products.slice(0, 2)	Selects array portion by index	    ❌ No — unrelated	              ❌ Not meant for conditional filtering

for search and filter we can also use this

const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  .filter() is an array method that allows you to keep only the elements that pass a test (i.e., a condition you define). It returns a new array.

  Basic Syntax:

const filteredArray = originalArray.filter((element, index, array) => {
  return condition;
});
const numbers = [5, 12, 8, 130, 44];
const result = numbers.filter(num => num > 10);

console.log(result); // [12, 130, 44]

*/