function App() {
  try {
    // STATE TO TRACK CURRENT PAGE ('home', 'products', 'cart', ETC.)
    const [currentPage, setCurrentPage] = React.useState('home');
    // STATE TO STORE ITEMS IN THE SHOPPING CART
    const [cartItems, setCartItems] = React.useState([]);

    // RUN AFTER COMPONENT RENDERS OR currentPage CHANGES TO RENDER ICONS
    React.useEffect(() => {
      lucide.createIcons();
    }, [currentPage]);

    // FUNCTION TO ADD A PRODUCT TO THE CART OR INCREMENT QUANTITY IF ALREADY EXISTS
    const addToCart = (product) => {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          // INCREMENT QUANTITY OF EXISTING ITEM
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // ADD NEW ITEM WITH QUANTITY 1
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    };

    // FUNCTION TO UPDATE QUANTITY OF AN ITEM OR REMOVE IT IF QUANTITY IS ZERO
    const updateQuantity = (id, newQuantity) => {
      if (newQuantity === 0) {
        // REMOVE ITEM FROM CART IF QUANTITY IS ZERO
        setCartItems(cartItems.filter(item => item.id !== id));
      } else {
        // UPDATE ITEM QUANTITY
        setCartItems(cartItems.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        ));
      }
    };

    // FUNCTION TO REMOVE AN ITEM FROM THE CART BY ID
    const removeFromCart = (id) => {
      setCartItems(cartItems.filter(item => item.id !== id));
    };

    // FUNCTION TO RENDER THE CURRENT PAGE BASED ON currentPage STATE
    const renderCurrentPage = () => {
      switch (currentPage) {
        case 'home':
          return <HomePage setCurrentPage={setCurrentPage} addToCart={addToCart} />;
        case 'products':
          return <ProductPage addToCart={addToCart} />;
        case 'cart':
          return <CartPage cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />;
        default:
          return <HomePage setCurrentPage={setCurrentPage} addToCart={addToCart} />;
      }
    };

    // RETURN MAIN APP STRUCTURE WITH HEADER AND CURRENT PAGE CONTENT
    return (
      <div className="min-h-screen">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} cartItems={cartItems} />
        <main>
          {renderCurrentPage()}
        </main>
      </div>
    );
  } catch (error) {
    // LOG ERROR AND REPORT IT IF ANY ERROR OCCURS INSIDE THE COMPONENT
    console.error('App component error:', error);
    reportError(error);
  }
}

// CREATE REACT ROOT AND RENDER App COMPONENT INTO DIV WITH ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
