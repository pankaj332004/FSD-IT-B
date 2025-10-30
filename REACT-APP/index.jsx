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

const books = [
    {
        img: "https://raajkart.com/media/catalog/product/cache/378cf9a83101843e5b8b1271b991c285/p/r/pradeep_fundamental_physics_class_11_set_of_12_volum.jpg",
        title: "PhysicsBook",
        price: "₹250"
    },
    {
        img: "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781137610379.jpg",
        title: "ChemistryBook",
        price: "₹300"
    },
    {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQZIDgkFVcrfJhxqJt_BU7wpfro9d5GolwzA&s",
        title: "MathsBook",
        price: "₹400"
    }
]
function Booklist(){
    return(
        <div className="book-list">
            {books.map((b , index) =>(
                <Book key={index} book={b} />
            ))}
        </div>        
    );
}

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);
root.render(<Booklist book={books}/>)

// ReactDOM.render(<BookList books={books} />, document.getElementById("root"));