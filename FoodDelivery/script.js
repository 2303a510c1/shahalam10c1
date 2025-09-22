// Sample menu data
const menuItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and basil",
        price: 12.99,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        description: "Pepperoni, mozzarella, and tomato sauce",
        price: 14.99,
        category: "pizza",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
    },
    {
        id: 3,
        name: "Classic Burger",
        description: "Beef patty with lettuce, tomato, and special sauce",
        price: 9.99,
        category: "burger",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=862&q=80"
    },
    {
        id: 4,
        name: "Veggie Burger",
        description: "Plant-based patty with fresh vegetables",
        price: 10.99,
        category: "burger",
        image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
        id: 5,
        name: "Spaghetti Carbonara",
        description: "Classic pasta with bacon, eggs, and parmesan cheese",
        price: 11.99,
        category: "pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
    },
    {
        id: 6,
        name: "Caesar Salad",
        description: "Romaine lettuce with croutons, parmesan, and Caesar dressing",
        price: 8.99,
        category: "salad",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    }
];

// Cart array to store added items
let cart = [];

// DOMContentLoaded event to initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Show login page by default
    showPage('login');
    
    // Generate menu items
    generateMenuItems();
    
    // Add event listener to login form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showPage('menu');
    });
});

// Function to show the selected page
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    
    // Show the selected page
    document.getElementById(pageId).classList.add('active-page');
    
    // If cart page is shown, update cart display
    if (pageId === 'cart') {
        updateCartDisplay();
    }
}

// Function to generate menu items
function generateMenuItems() {
    const menuGrid = document.querySelector('.menu-grid');
    menuGrid.innerHTML = '';
    
    menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.dataset.category = item.category;
        
        menuItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-bottom">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        `;
        
        menuGrid.appendChild(menuItemElement);
    });
}

// Function to filter menu by category
function filterCategory(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Show/hide menu items based on category
    document.querySelectorAll('.menu-item').forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Function to add item to cart
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    // Update cart count
    updateCartCount();
    
    // Show confirmation message
    alert(`${item.name} added to cart!`);
}

// Function to update cart count in the header
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    // Clear cart items container
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn" onclick="showPage('menu')">Browse Menu</button>
            </div>
        `;
        
        subtotalElement.textContent = '$0.00';
        taxElement.textContent = '$0.00';
        totalElement.textContent = '$0.00';
        
        return;
    }
    
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + deliveryFee + tax;
    
    // Update summary
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
    
    // Generate cart items
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Function to update item quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(itemId);
        return;
    }
    
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        updateCartDisplay();
        updateCartCount();
    }
}

// Function to remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    updateCartCount();
}