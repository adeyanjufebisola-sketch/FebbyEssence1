let cart=[];

function addToCart(name,price){
    let existing=cart.find(item=>item.name===name);

    if(existing){
        existing.quantity++;
        existing.total=existing.quantity*existing.price;
    }else{
        cart.push({
            name:name,
            price:price,
            quantity:1,
            total:price
        });
    }

    updateCartCount();
    alert(name+" added successfully");
}

function updateCartCount(){
    let count=cart.reduce((sum,item)=>sum+item.quantity,0);
    document.querySelector(".cart-indicator")
    .setAttribute("data-count",count);
}

function openCart(){
    const modal = document.getElementById("cartModal");
    modal.style.display = "flex";

    let cartHTML = "";
    let total = 0;

    if (cart.length === 0) {
        document.getElementById("cartItems").innerHTML = "<p>Cart is empty</p>";
        document.getElementById("cartTotal").innerHTML = "Total: ₦0";
        return;
    }

    cart.forEach(item=>{
        cartHTML += `\n            <p>${item.name} (x${item.quantity}) - ₦${item.total.toLocaleString()}</p>`;
        total += item.total;
    });

    document.getElementById("cartItems").innerHTML = cartHTML;
    document.getElementById("cartTotal").innerHTML = "Total: ₦" + total.toLocaleString();
}

function closeCart(){
    document.getElementById("cartModal").style.display="none";
 }

function orderNow(){
    // friendly welcome message + product list encoded for URL
    let message ="I would like to order:"

    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    cart.forEach(item=>{
        message += `${item.name} (x${item.quantity}) - ₦${item.total.toLocaleString()}\n\n`;
    });

    let total = cart.reduce((sum,item)=>sum+item.total,0);

    message += `Total: ₦${total.toLocaleString()}`;

    // close modal and open WhatsApp
    closeCart();
    window.open(`https://wa.me/2349040048467?text=${encodeURIComponent(message)}`, "_blank");
}
