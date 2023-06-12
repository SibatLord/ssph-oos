$(function(){
    renderOrders()
})

function renderOrders(){
    let orders = JSON.parse(localStorage.getItem('orders'))
    orders.forEach(order => {
        let $order = $(`
            <div class="container-fluid pt-5">
                ${ renderOrderDetails(order.details) }
                <div class="row px-xl-5">
                    <div class="col-lg-8 table-responsive mb-5">
                        <table class="table table-bordered text-center mb-0">
                            <thead class="bg-secondary text-dark">
                                <tr>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody class="align-middle" id="cart-container">
                            ${renderProductList(order.checkout)}
                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-4">
                        <div class="card border-secondary mb-5">
                            <div class="card-header bg-secondary border-0">
                                <h4 class="font-weight-semi-bold m-0">Order Summary</h4>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-3 pt-1">
                                    <h6 class="font-weight-medium">Subtotal</h6>
                                    <h6 class="font-weight-medium" >Php <span id="cart-subtotal">${computeOrderTotal(order.checkout) - 25}</span></h6>
                                </div>
                                <div class="d-flex justify-content-between">
                                    <h6 class="font-weight-medium">Shipping</h6>
                                    <h6 class="font-weight-medium">Php 25</h6>
                                </div>
                            </div>
                            <div class="card-footer border-secondary bg-transparent">
                                <div class="d-flex justify-content-between mt-2">
                                    <h5 class="font-weight-bold">Total</h5>
                                    <h5 class="font-weight-bold" >Php <span id="cart-total">${computeOrderTotal(order.checkout) }</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `)
        console.log(order)
        $('#orders-container').append($order)
    });
}

function renderProductList(checkout){
    let output = ''
    checkout.forEach(function(i){
        output += 
        `<tr>
            <td>${i.item.name}</td>
            <td>${i.item.price}</td>
            <td>${i.pcs}</td>
            <td>${i.total}</td>
        </tr>`
    })
    return output;

}
function computeOrderTotal(checkout){
    let output = 0;
    checkout.forEach(function(i){
        output += i.total
    })
    return output + 25;

}

function renderOrderDetails(details){
    let output = ""
    details.forEach(function(det){
        output += `<p><strong>${convertToSentenceCase(det.name)}</strong>: ${det.value}</p>`
    })
    return output;
}

function convertToSentenceCase(str) {
    // Trim leading and trailing spaces
    str = str.trim();
  
    // Convert the first character to uppercase
    const firstChar = str.charAt(0).toUpperCase();
  
    // Convert the remaining characters to lowercase
    const remainingChars = str.slice(1).toLowerCase();
  
    // Concatenate the first character with the remaining characters
    const sentenceCaseStr = firstChar + remainingChars;
  
    return sentenceCaseStr;
  }