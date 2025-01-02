
// 將所有商品提前建成all-products.json
let allProduct = [];

function getRandomProducts(products, amount) {
    // 複製products來避免改動到商品清單 
    let shuffled = [...products];
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled.slice(0, amount);
}

function restockShelf(shelfId, contentId, label) {
    const container = document.getElementById(shelfId);
    const randomProducts = getRandomProducts(allProduct, 6);

    let newHTML = `
        <div class="product-shelf__item--label">${label}</div>
        <button class="product-shelf__item--button-left" onclick="moveContent('${contentId}', 0)">&lt</button>

        <div class="product-shelf__container">
            <div class="product-shelf__content" id="${contentId}">
                <div class="flex--centered">
    `;

    randomProducts.slice(0, 3).forEach((product) => {
        newHTML += `
                    <a class="product" href="${product.page}">
                        <img class="product__item--image" src="${product.image}" alt="">
                        <div class="product__item--text">
                            ${product.name}<br>$${product.price}
                        </div>
                    </a>
        `;
    });

    newHTML += `
                </div>
                <div class="flex--centered">
    `;

    randomProducts.slice(3, 6).forEach((product) => {
        newHTML += `
                    <a class="product">
                        <img class="product__item--image" src="${product.image}" alt="">
                        <div class="product__item--text">
                            ${product.name}<br>$${product.price}
                        </div>
                    </a>
        `;
    });

    newHTML += `
                </div>
            </div>
            <button class="product-shelf__item--button-right" onclick="moveContent('${contentId}', 1)">&gt</button>
        </div>
    `;

    container.innerHTML = newHTML;
}

function moveContent(id, amount) {
    const content = document.getElementById(id);
    content.style.transform = `translateX(calc((-80vw + 120px) * ${amount}))`;
}

// 頁面加載時執行
document.addEventListener("DOMContentLoaded", function() {
    fetch('other/all-products.json')
        .then(response => response.json())
        .then(data => {
            allProduct = data;
            restockShelf('product-shelf--recommended', 'product-shelf__content--recommended', '推薦商品');
        });

});