// const child = document.createElement('div');
// child.class='container';
// const image=document.createElement('img');
// image.src="https://m.media-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg";
// image.alt="Books";
// image.width="200";
// image.height="200";
// const heading=document.createElement('h1');
// h1.innerText="Price : $250";
// child.appendChild(image);
// child.appendChild(h1);
// const parent=document.getElementById('root');
// // parent.appendChild(child);

function Book(props){
    const image=React.createElement("img",{
        src:props.src,
        width:"200",
        height:"200",
        alt:"Book img"
    },null);
    const h4 = React.createElement("h4",null,`Price : ${props.price}`);
    const h3 = React.createElement("h4",null,`Title : ${props.title}`);
    const child =React.createElement("div",{className:"container"},image,h3,h4);
    return child
}
const parent=document.getElementById("root");
const root = ReactDOM.createRoot(parent);
const image="https://m.media-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg";
const price="$250";
const title="ERIC RIES";
root.render(
  React.createElement(Book, { src: image, price: price, title: title })
);