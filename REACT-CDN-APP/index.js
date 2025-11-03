// function Book({book}){
//     const img=React.createElement("img",{
//     src:book.img,
//     width:"200",
//     height:"200",
//     alt:"book - image"
// },null);
// const h3=React.createElement("h3",null,book.title)
// const h4=React.createElement("h4",null,book.price)
// const btn=React.createElement("button",null,"Add to Cart")
// const div=React.createElement("div",{className:"card"},img,h3,h4,btn);
// return div;
// }
// const books=[
//     {
//     img:"https://booksandyou.in/cdn/shop/files/PhysicsPartITextbookforClassXII_1.webp?v=1713763686",
//     title: "Physics",
//     price:"₹300"
// },
// {
//     img:"https://booksandyou.in/cdn/shop/files/PhysicsPartITextbookforClassXII_1.webp?v=1713763686",
//     title: "Physics",
//     price:"₹300"
// },
// {
//     img:"https://booksandyou.in/cdn/shop/files/PhysicsPartITextbookforClassXII_1.webp?v=1713763686",
//     title: "Physics",
//     price:"₹300"
// }
// ]
// const bookele = books.map((b,i)=>{
//     React.createElement(Book,{
//         key:i,
//         img:b.img,
//         title:b.title,
//         price:b.price
//     },null)
// })
// const booklist=React.createElement("div",{className:"booklist"},booklist);
// const parent = document.getElementById("root");
// const root =ReactDOM.createRoot(parent);
// root.render(booklist);

function Book({ book }) {
  const img = React.createElement("img", {
    src: book.img,
    width: "200",
    height: "200",
    alt: "book - image"
  }, null);

  const h3 = React.createElement("h3", null, book.title);
  const h4 = React.createElement("h4", null, book.price);
  const btn = React.createElement("button", null, "Add to Cart");

  return React.createElement("div", { className: "card" }, img, h3, h4, btn);
}

const books = [
  {
    img: "https://booksandyou.in/cdn/shop/files/PhysicsPartITextbookforClassXII_1.webp?v=1713763686",
    title: "Physics",
    price: "₹351"
  },
  {
    img: "https://m.media-amazon.com/images/I/71QENhDe4eL._AC_UF1000,1000_QL80_.jpg",
    title: "Chemistry",
    price: "₹461"
  },
  {
    img: "https://himpub.com/wp-content/uploads/2023/02/BI1118.jpeg",
    title: "Mathematics",
    price: "₹691"
  }
];

const bookele = books.map((b, i) =>
  React.createElement(Book, { key: i, book: b }, null)
);

const booklist = React.createElement("div", { className: "booklist" }, ...bookele);

const parent = document.getElementById("root");
const root = ReactDOM.createRoot(parent);
root.render(booklist);