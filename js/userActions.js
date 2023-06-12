const users = [
    {
        id : 'customer1',
        username : 'testuser',
        name : 'Test User',
        password : 'password',
        user_type : 'customer'
    },
    {
        id : 'admin1',
        username : 'testadmin',
        name : 'Test Admin',
        password : 'password',
        user_type : 'admin'
    },
];

const items = [
    {
        type: 'food', // eg food, beverage, add-on, package
        id: 'food-1',
        img: 'food-1.jpg',
        name: 'Sizzling Sisig',
        price: '90'
     },
    {
        type: 'food', // eg food, beverage, add-on, package
        id: 'food-2',
        img: 'food-2.jpg',
        name: 'Sizzling Tapa',
        price: '90'
    },
    {
        type: 'food', // eg food, beverage, add-on, package
        id: 'food-3',
        img: 'food-3.webp',
        name: 'Sizzling Pork Belly',
        price: '90'
     },
    {
        type: 'food', // eg food, beverage, add-on, package
        id: 'food-4',
        img: 'food-4.jpg',
        name: 'Sizzling Burger Steak',
        price: '90'
    },
    {
        type: 'food', // eg food, beverage, add-on, package
        id: 'food-5',
        img: 'food-5.jpg',
        name: 'Sizzling T-Bone',
        price: '100'
    },
    {
        type: 'food', // eg food, beverage, add-on, package
        id: 'food-6',
        img: 'food-6.jpg',
        name: 'Beef Pares',
        price: '70'
    },
    {
        type: 'beverage', // eg food, beverage, add-on, package
        id: 'bev-1',
        img: 'bev-1.jpg',
        name: 'San Mig Light',
        price: '45'
    },
    {
        type: 'beverage', // eg food, beverage, add-on, package
        id: 'bev-2',
        img: 'bev-2.jpg',
        name: 'Red Horse',
        price: '45'
    },
    {
        type: 'beverage', // eg food, beverage, add-on, package
        id: 'bev-3',
        img: 'bev-3.jpg',
        name: 'Pale Pilsen',
        price: '45'
    },
    {
        type: 'beverage', // eg food, beverage, add-on, package
        id: 'bev-4',
        img: 'bev-4.jpg',
        name: 'Coke',
        price: '20'
    },
    {
        type: 'beverage', // eg food, beverage, add-on, package
        id: 'bev-5',
        img: 'bev-5.jpg',
        name: 'Blue Lemonade',
        price: '10'
    },
    {
        type: 'package', // eg food, beverage, add-on, package
        id: 'pkg-1',
        img: 'pkg-1.jpg',
        name: '1 Bucket Beer',
        price: '400'
    },
]

$(function(){
    countCart()
    countOrders()
    renderCart()
    renderCheckout()
})

function countCart(){
    if(!localStorage.getItem('cart') || JSON.parse(localStorage.getItem('cart')).length < 1){
        localStorage.setItem('cart', JSON.stringify([]))
    }
    $("#cart-badge").text(JSON.parse(localStorage.getItem('cart')).length)
}

function countOrders(){
    if(!localStorage.getItem('orders') || JSON.parse(localStorage.getItem('orders')).length < 1){
        localStorage.setItem('orders', JSON.stringify([]))
    }
    $("#orders-badge").text(JSON.parse(localStorage.getItem('orders')).length)
}

function renderMenu(){
    items.forEach(function(item){
        let card = $(
            `<div class="col-lg-4 col-md-6 col-sm-12 pb-1 ">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100 h-100" src="img/product-1.jpg" alt="">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 class="text-truncate mb-3 name"></h6>
                        <div class="d-flex justify-content-center">
                            <h6>Php <span class="price"></span></h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border ">
                        <a href="" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                        <a href="" class="btn btn-sm text-dark p-0 add-cart" data-toggle="modal" data-target="#add-cart" ><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                    </div>
                </div>
            </div>`
        )
        card.find('img').attr('src',`img/menu/${item.img}`)
        card.find('.price').text(item.price)
        card.find('.name').text(item.name)
        card.find('.add-cart').attr('onclick', `showCartModal('${item.id}')`)
        $('#menu-container').append(card)
    })
}

function renderCart(){
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.map(function(item){
        const cartItem = $(`
            <tr id="cart-${item.id}">
                <td class="align-middle " ><img class="cart-item-img" src="img/menu/${item.img}" alt="" style="width: 50px;"> <span class="cart-item-name">${item.name}</span></td>
                <td class="align-middle cart-item-price">${item.price}</td>
                <td class="align-middle">
                    <div class="input-group quantity mx-auto" style="width: 100px;">

                        <input type="text" class="form-control form-control-sm bg-secondary text-center " onchange="cartPcs_changed('${item.id}')" id="pcs-${item.id}" value="1">
                   
                    </div>
                </td>
                <td class="align-middle cart-item-total"></td>
                <td class="align-middle"><button class="btn btn-sm btn-primary" onclick="removeFromCart('${item.id}')"><i class="fa fa-times"></i></button></td>
            </tr>
        `)
        cartItem.find(".cart-item-total").text(cartItem.find(`#pcs-${item.id}`).val() * item.price)
        $("#cart-container").append(cartItem)
        
    })
    $("#cart-subtotal").text((computeTotal() - 25))
    $("#cart-total").text(computeTotal())
}

function removeFromCart(id){
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart = cart.filter(function(item){
        return item.id != id;
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    location.href = "cart.html"
}

function renderCheckout(){
    const checkout = JSON.parse(localStorage.getItem('checkout'))
    let total = 0;
    checkout.forEach(function(i){
        total += i.total;
        let $order = $(`
                <div class="d-flex justify-content-between">
                    <p>${i.item.name}</p>
                    <p>Php ${i.total}</p>
                </div>
        `)
        $('#checkout-orders').append($order)
    })
    $('#checkout-subtotal').text(total)
    $('#checkout-total').text(total + 25)
}

function checkOut(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    let checkout = []
    cart.forEach(function(i){
        checkout.push({
            item: i,
            pcs: $(`#cart-${i.id}`).find('input').val(),
            total: (i.price * $(`#cart-${i.id}`).find('input').val())
        })
    })
    localStorage.setItem('checkout', JSON.stringify(checkout))
    localStorage.setItem('cart', JSON.stringify([]))
    location.href = 'checkout.html'
}

function cartPcs_changed(id){
    const cart = JSON.parse(localStorage.getItem('cart'));
    let item = {};
    cart.forEach(function(i){
        if(i.id == id){
            item = i
        }
    })
    $(`#cart-${id}`).find('.cart-item-total').text(item.price * $(`#cart-${id}`).find('input').val())
    $("#cart-subtotal").text((computeTotal() - 25))
    $("#cart-total").text(computeTotal())
}

function computeTotal(){
    const cart = JSON.parse(localStorage.getItem('cart'));
    let subtotal = 0;
    cart.forEach(function(i){
        let $cart_item = $(`#cart-${i.id}`);
        subtotal += $cart_item.find('input').val() * i.price;
    })
    return subtotal + 25;
}

function placeOrder(ev){
    let orders = JSON.parse(localStorage.getItem('orders'))
    ev.preventDefault()
    let order = {
        checkout : JSON.parse(localStorage.getItem('checkout')),
        details : $('#checkout-form').serializeArray()
    }
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders))
    localStorage.setItem('checkout', JSON.stringify([]))
    location.href = 'index.html'
}



function showCartModal(id){
    let item  = {}
    items.forEach(function(i){
        if(i.id == id){
            item = i;
        }
    })
    const cartModal = $("#add-cart")
    cartModal.find("#name").text(item.name)
    cartModal.find("img").attr('src', `./img/menu/${item.img}`)
    $('#btn-add-cart').attr('onclick', `addCart('${item.id}')`)
}

function addCart(id){
    const item = findItem(id)
    if(!localStorage.getItem('cart') || JSON.parse(localStorage.getItem('cart')).length < 1){
        localStorage.setItem('cart', JSON.stringify([]))
    }
    let cart = JSON.parse(localStorage.getItem('cart'))
    let cartItem = {
        item: item
    }
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
    location.href = "cart.html"
}

function findItem(id){
    let item  = {}
    items.forEach(function(i){
        if(i.id == id){
            item = i;
        }
    })
    return item
}

function setUser(name, email, address){
    localStorage.setItem('user', {
        name: name,
        email: email,
        address : address
    })
}

function getUser(){
    return localStorage.getItem('user');
    
}

function serCart(){
    localStorage.setItem('cart', []);
}

function getCart(){
    return localStorage.getItem('cart');
}

