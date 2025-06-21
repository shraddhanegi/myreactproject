import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const Productlist = () => {

    let [itemList, setItemList] = useState([]);
    let [keyword, setKeyword] = useState("");
    let [porder, setPorder] = useState("asc");

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


    const del = (id) => {
        let url = "http://localhost:1234/products/" + id;
        let postData = { method: "delete" };
        fetch(url, postData)
            .then(response => response.json())
            .then(info => {
                alert(info.Name + "  delete succesfully !");
                getItem();

            })
    }


    const PER_PAGE = 5;
    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(itemList.length / PER_PAGE);

    // itemList.slice(offset, offset + PER_PAGE).map()
    //                 0   , 2
    //                 2,  , 4
    //                 4   , 6

    return (
        <section className="p-4 container">
             <div className="row mb-3">
                <div className="col-xl-9">  <h1 className="text-center">Product List</h1> </div>
                <div className="col-xl-3">
                    <input type="text" className="form-control" placeholder="Search.."
                        onChange={obj => setKeyword(obj.target.value)} />
                </div>
            </div>

            <table className="table table-bordered text-center align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>#ID </th>
                        <th>Product Name</th>
                        <th className="bg-warning" onClick={getItem}> Price </th>
                        <th>Details</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemList.slice(offset, offset + PER_PAGE).map((item, index)=>{
                            if( item.Name.toLowerCase().match( keyword.toLowerCase()) || item.Price.match(keyword) )
                            return(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.Name}</td>
                                    <td>Rs.{item.Price}</td>
                                    <td>{item.Details}</td>
                                    <td>
                                        <img
                                            src={item.Image}
                                            alt={item.Name}
                                            width="50"
                                            height="40"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger btn-sm" onClick={() => del(item.id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div className="mb-4 mt-4 text-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>

        </section>
    );
}
export default Productlist;


/*
    try & catch is used for 
fetch() is asynchronous and can fail for many reasons:

fetch() is asynchronous: It runs in the background and lets the rest of the code keep working.
means even result is not ready though further code is continue.
It allows your program to:
Start a task (like fetching data)

Keep running other code

Handle the result later using .then() or await,that means code ,that means fetch() is non-blocking
,it does not block data like javascript ,even 

❌ File not found (404)

❌ Server not running

❌ Invalid URL

If a.Price = 50, b.Price = 80 → 50 - 80 = -30 → a comes first

Therefore, this sorts the prices from low to high
If the result is negative → a comes before b.
If the result is positive → a comes after b

itemArray.sort((a, b) => a.Price - b.Price)

offset with example
const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const PER_PAGE = 5;
For currentPage = 0:

const offset = 0 * 5 = 0;
const currentItems = items.slice(0, 0 + 5); // items.slice(0, 5)= so 0 to 5 = 0,1,2,3,4 =total 4 ,and frrom 5 it will come on another page
currentItems = ['A', 'B', 'C', 'D','e']

For currentPage = 1:
const offset = 1 * 5 = 5;
const currentItems = items.slice(5, 5 + 5); // items.slice(5, 10) = 5 to 9 =5 items start from 5
currentItems = [ 'F', 'G', 'H','i','j']

For currentPage = 2:
const offset = 2 *5 = 10;
const currentItems = items.slice(10, 10+5); // items.slice(10, 15) =start from 10 to 14 =total 5 element on this page
currentItems = [ 'K', 'L' 'm','n','o']

You use slice() to get just the items for the current page from a larger list:

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

When we say the end index is "not included" in slice(start, end), it means:
The slice includes elements from start up to, but not including end.
So, the element at the end index itself is not part of the returned array.
const part = letters.slice(1, 4); // Extract from index 1 to 3
console.log(part); // Output: ['B', 'C', 'D']


*/