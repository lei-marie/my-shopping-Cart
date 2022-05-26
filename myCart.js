function NavBar({ stockitems }) {
  const [cart, setCart] = React.useState([]);
  const [stock, setStock] = React.useState(stockitems);
  const { Button } = ReactBootstrap;
  // event apple:2
  const moveToCart = (id, e) => {
    console.log(id)
    let [name, num] = e.target.innerHTML.split(":"); 
    if(num <=0) return;
    // innerHTML should be format name:3
    let item = stock.filter((item) => item.name == name);
    // use newStock = stock.map to find "name" and decrease number in stock by 1
    // only if instock is >=  do we move item to Cart and update stock
    let newStock = stockitems.map((item, index) => {
      if (item.name == name) {
        item.instock--;
      }
      return item;
    });
    setStock([...newStock]);
    setCart([...cart, ...item]);
  };
  const updatedList = stock.map((item, index) => {
    return (
      <Button onClick={(e) => moveToCart({ id: 1}, e)} key={index}>
        {item.name}:{item.instock}
      </Button>
    );
  });
  // note that React needs to have a single Parent
 return (
    <>
      <ul key="stock" style={{ listStyleType: "none" }}>
        {updatedList}
      </ul>
      <h1>Shopping Cart</h1>
      <Cart cartitems={cart}> Cart Items</Cart>
    </>
  );
}
function Cart({ cartitems }) {
  const { Card, Button } = ReactBootstrap;
  console.log("rendering Cart");
  const updatedList = cartitems.map((item, index) => {
    return <Button key={index}>{item.name}</Button>;
  });
  return (
    <ul style={{ listStyleType: "none" }} key="cart">
      {updatedList}
    </ul>
  );
}
const menuItems = [
  { name: "mango", instock: 5 },
  { name: "pineapple", instock: 3 },
  { name: "papaya", instock: 0 },
  { name: "guava", instock: 10 },
  { name: "banana", instock: 8 }
];
ReactDOM.render(
  <NavBar stockitems={menuItems} />,
  document.getElementById("root")
);
