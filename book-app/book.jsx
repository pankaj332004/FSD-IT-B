import "./App.css";
function Book({book}){
    return(
        <div className="book-card" >
            <img src={book.img} alt={book.title} width="300" height="300" />
            <h3>Title : {book.title} </h3>
            <h4>Price : {book.price} </h4>
            <button>Add To Cart</button>
        </div>
    );
}

export default Book;
