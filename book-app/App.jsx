import Book from "./book";
function App(){
    const bookjson=[
        {
            img:"https://m.media-amazon.com/images/I/61Y+Yx8eIqL._AC_UF1000,1000_QL80_.jpg",
            title:"historyBook",
            price:"₹500"
        },
        {
            img:"https://m.media-amazon.com/images/I/81BwZHhup9L.jpg",
            title:"geographyBook",
            price:"₹600"    
        },
        {
            img:"https://m.media-amazon.com/images/I/A1n6+s5c4NL._AC_UF1000,1000_QL80_.jpg",
            title:"civicsBook",
            price:"₹700"
        }
    ]
    return(
        <div className="booklist">
            {bookjson.map((b , index) =>(
                <Book key={index} book={b} />
            ))}
        </div>
    );
}
export default App;