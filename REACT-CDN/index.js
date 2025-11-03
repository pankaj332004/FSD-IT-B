function Book(){
    const image=React.createElement("img",{
        src:"https://booksandyou.in/cdn/shop/files/PhysicsPartITextbookforClassXII_1.webp?v=1713763686",
        width:"200",
        height:"200",
        alt:"Book img"
    },null);
    const h3 = React.createElement("h3",null,"Title : PhysicsBook");
    const h4 = React.createElement("h4",null,"Price : ₹250");
    const btn = React.createElement("button",null,"Add to Cart");
    const child =React.createElement("div",{className:"card"},image,h3,h4,btn);
    return child;
}

const parent=document.getElementById("root");
const root = ReactDOM.createRoot(parent);
root.render(React.createElement(Book));