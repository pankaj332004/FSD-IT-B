import React from "react";
import ReactDOM from "react-dom/client";

function Book({book}){
    return(
        <div className="card">
        <img src={book.img} alt="book.title" width="300" height="300" />
        <h3>Title : {book.title} </h3>
        <h4>Price : {book.price} </h4>
        <button>Add To Cart</button>
        </div>
    );
}

function booklist(){
    return(
        <div className="book-list">
            {booklist.map((b , index) =>(
                <Book Key={index} book={b} />
            ))}
        </div>        
    );
}
const books = [
    {
        img: "",
        title: "PhysicsBook",
        price: "₹250"
    },
    {
        img: "",
        title: "ChemistryBook",
        price: "₹300"
    },
    {
        img: "",
        title: "MathsBook",
        price: "₹400"
    }
]

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);
root.render(<booklist book={books}/>)

// ReactDOM.render(<BookList books={books} />, document.getElementById("root"));