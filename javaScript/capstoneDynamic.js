// Functionality for entire project

$(document).ready(function () {

    // These elements are hidden when page loads. These will display based on user delivery choice

    $("#showPickup").hide();
    $("#deliveryDiv").hide();

    // Constructor function to create all products as objects

    function productDescription(collection, image, item, summary, price, productPage) {

        this.collection = collection;
        this.imageSrc = image;
        this.item = item;
        this.summary = summary;
        this.price = price;
        this.productPage = productPage;
    };

    let item1 = new productDescription(
        "The Tiny Traveller",
        "./Images/forrest-back-pack_540x.webp",
        "Forest Backpack",
        "This backpack will quickly become your little ones favourite companion as they explore the world around them.",
        595.00,
        "./forestBackpack.html",
    );
    let item2 = new productDescription(
        "The Tiny Traveller",
        "./Images/ocean-2_540x.webp",
        "Ocean Backpack",
        "This backpack will quickly become your little ones favourite companion as they explore the world around them.",
        595.00,
        "./oceanBackpack.html",
    );

    let item3 = new productDescription(
        "The Tiny Traveller",
        "./Images/autumn_540x.webp",
        "Autumn Backpack",
        "This backpack will quickly become your little ones favourite companion as they explore the world around them.",
        595.00,
        "./autumnBackpack.html",
    );

    let item4 = new productDescription(
        "The Tiny Traveller",
        "./Images/backpack-in-bloom_540x.webp",
        "Bloom Backpack",
        "This backpack will quickly become your little ones favourite companion as they explore the world around them.",
        595.00,
        "./bloomBackpack.html",
    );

    let item5 = new productDescription(
        "Wall Hanging",
        "./Images/free-as-a-bird-banner-final_540x.webp",
        "Free as a bird",
        "This banner will make the perfect addition to your little one's nursery or playroom, or can even be a decorative piece around the house.",
        320.00,
        "./wallHanging.html",
    );

    //Array of all shopping items
    let arrayOfItems = [item1, item2, item3, item4, item5];

    //Array to contain all items that have been added to the cart
    let cartItems = [];

    let currentPage = window.location.href;

    if (localStorage.getItem("load") == null) {
        localStorage.setItem("load", true);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    }


    let total = 0;

    // get list of cart items from local storage
    JSON.parse(localStorage.getItem("cartItems"))
        .forEach(item => {
            // add each items price to total
            total += item.price;
        });


    // save in local storage
    localStorage.setItem("cartTotal", total);
    console.log(total)

    // All products are dynamically displayed on the catalogue page

    if (currentPage.includes("Catalogue.html")) {
        arrayOfItems.forEach(function (product) {
            let div = document.getElementById("catalogue");

            let productBlock = document.createElement("div");
            productBlock.classList.add("productBlock");
            div.appendChild(productBlock);

            let productName = document.createElement("h3");
            productName.classList.add("productHeading");
            productName.innerHTML = product.collection;
            productBlock.appendChild(productName);
            console.log(div);

            let subHeading = document.createElement("h5");
            subHeading.classList.add("subHeading");
            subHeading.innerHTML = product.item;
            productBlock.appendChild(subHeading)

            let productImage = document.createElement("img");
            productImage.classList.add("productImages");
            productBlock.appendChild(productImage);
            productImage.src = product.imageSrc;
            productImage.alt = product.collection + " " + product.item;
            console.log(div);

            let productSummary = document.createElement("p")
            productSummary.classList.add("productSummary");
            productSummary.innerHTML = product.summary;
            productBlock.appendChild(productSummary);

            let productPrice = document.createElement("p");
            productPrice.classList.add("productPrice");
            productPrice.innerHTML = "R" + product.price;
            productBlock.appendChild(productPrice);
            console.log("productPrice");

            let productPage = document.createElement("a")
            productPage.classList.add("showMoreButton");
            productPage.setAttribute('href', `${product.productPage}`);
            productPage.innerHTML = 'Full Description';
            productBlock.appendChild(productPage);
            console.log(productPage);

            let cartButton = document.createElement("button")
            cartButton.classList.add("cartButton");
            cartButton.innerHTML = "Add to cart";
            productBlock.appendChild(cartButton);


            let i = (arrayOfItems, product);

            // Function for cartButton to add items to cart by storing them on local storage

            cartButton.addEventListener("click", function (add) {


                let cartItems = JSON.parse(localStorage.getItem("cartItems"));
                if (!cartItems) {
                    cartItems.push(i);
                    localStorage.setItem("cartItems", JSON.stringify(cartItems));
                    return
                }
                cartItems.push(i);
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                // Calculate Total
                let total = 0;

                // get list of cart items from local storage
                JSON.parse(localStorage.getItem("cartItems"))
                    .forEach(item => {
                        // add each items price to total
                        total += item.price;
                    });

                localStorage.setItem("cartTotal", total);

            });
        })

        // Items in local storage are dynamically displayed in the cart page

    } else if (currentPage.includes("Cart.html")) {
        let checkout = JSON.parse(localStorage.getItem("cartItems"));

        checkout.forEach(function (cartItem) {
            let div = document.getElementById("cartForm");

            let cartTable = document.createElement("div");
            cartTable.classList.add("cartTable");
            div.appendChild(cartTable);

            let cartHeading = document.createElement("h4")
            cartHeading.classList.add("cartHeading");
            cartHeading.innerHTML = cartItem.collection + " " + cartItem.item;
            cartTable.appendChild(cartHeading)

            let cartItemImage = document.createElement("img");
            cartItemImage.classList.add("cartItemImage");
            cartItemImage.src = cartItem.imageSrc;
            cartItemImage.alt = cartItem.collection + " " + cartItem.item;
            cartTable.appendChild(cartItemImage);

            let cartItemPrice = document.createElement("p");
            cartItemPrice.classList.add("cartItemPrice");
            cartItemPrice.innerHTML = "R" + cartItem.price;
            cartTable.appendChild(cartItemPrice);

            let cartLine = document.createElement("hr")
            cartLine.classList.add("cartLine");
            cartTable.appendChild(cartLine);

        });
    }
    
    // Alert that shows current subtotal when a user adds anything to cart
    $(".cartButton").click(function () {
        alert(JSON.parse(localStorage.getItem("cartTotal")));
    })

    // Animated accordion drop down function in jQuery to display shipping options

    $(".card").hover(function () {
        let index = $(this).index();
        let currCard = $(".card").eq(index);
        let currBody = $(`.card:eq(${index}) .cardBody`);

        if (currBody.css("display") == "block") {
            currBody.slideDown();
        } else {
            $(".cardBody").slideUp();
            currBody.slideDown();
        }
    })

    let shipping = 0;

    // Collection details shown when user selects pick-up option
    // The total price is calculated based on subtotal + VAT, collection is free

    $('input[type="radio"]').click(function () {

        if ($("#pickupChosen").is(":checked")) {

            $("#showPickup").show();
            $("#deliveryDiv").hide();
            $("#shipping").html(0);

            shipping = (parseInt($("#shipping").html()))
            console.log(shipping);

            let finalTotal = total + VAT + shipping;
            console.log(finalTotal);

            $("#finalTotal").html("R " + finalTotal);

            // Discount button will deduct 20% off the current total

            let discount = finalTotal * 0.2;
            console.log(discount)

            $("#discountButton").click(function (e) {
                e.preventDefault();
                $("#finalTotal").html("R " + (finalTotal - discount))
            })

            // If delivery is chosen, collection information is hidden

        }
        if ($("#deliveryChosen").is(":checked")) {

            $("#deliveryDiv").show();
            $("#showPickup").hide();

        }


    });

    // Radio buttons inside accordion to select shipping option

    $('input[type="radio"][name="shipping"]').click(function () {

        if ($("#local").is(":checked")) {
            $("#shipping").html(60);
        }
        if ($("#national").is(":checked")) {
            $("#shipping").html(80);
        }
        if ($("#outlaying").is(":checked")) {
            $("#shipping").html(100);
        }

        // The shipping is determined by the value of the option chosen

        let shipping = (parseInt($("#shipping").html()))
        console.log(shipping);

        // Total price calculated based on shipping option which is added to subtotal and VAT

        let finalTotal = total + VAT + shipping;
        console.log(finalTotal);

        $("#finalTotal").html("R " + finalTotal);

        // Discount button will deduct 20% off the current total

        let discount = finalTotal * 0.2;
        console.log(discount)

        $("#discountButton").click(function (e) {
            e.preventDefault();
            $("#finalTotal").html("R " + (finalTotal - discount))
        })

    })

    let discount = finalTotal * 0.2;
    console.log(discount)

    $("#subTotal").html("R " + JSON.parse(localStorage.getItem("cartTotal")));

    // VAT is currently 15%

    let VAT = (JSON.parse(localStorage.getItem("cartTotal"))) * 0.15;

    $("#VAT").html("R " + VAT);

    // Random reference code is generated when user confirms order

    let result = Math.random().toString(36).substring(2, 7);
    $("#confirmOrder").click(function () {
        alert("Order confirmed: " + "Ref " + result)
    })

});