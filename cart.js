// Sinh viên thực hiện: Nguyễn Minh Tuấn b2012278
// Ngày hoàn thành 30/11/2022

const buy = document.getElementsByClassName("card__buy");
let products = [];

for (let i = 0; i < buy.length; i++) {
  buy[i].addEventListener("click", function (e) {
    if (typeof Storage !== "undefined") {
      let product = {
        img: e.target.previousElementSibling.children[0].src,
        name: e.target.parentElement.nextElementSibling.children[0].textContent,
        price:
          e.target.parentElement.nextElementSibling.children[1].textContent,
        quantity: 1,
      };

      if (JSON.parse(localStorage.getItem("products")) === null) {
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        window.location.reload();
      } else {
        const localItems = JSON.parse(localStorage.getItem("products"));
        localItems.map((data) => {
          if (product.name == data.name) {
            product.quantity = data.quantity + 1;
          } else {
            products.push(data);
          }
        });
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        window.location.reload();
      }
    }
  });
}

const cartMainCard = document.querySelector(".product__li");
const sumInfo = document.querySelector(".info");
const productWrapper = document.querySelector(".main__warpper");

const formatCurrency = (amount, locale = "vi-VN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

function showCart() {
  if (localStorage.products !== undefined) {
    let cartData = "";
    let totalProduct = "";
    var total = 0;

    if (JSON.parse(localStorage.getItem("products")) === null) {
    } else {
      JSON.parse(localStorage.getItem("products")).map((data) => {
        total +=
          Number(data.quantity) * Number(data.price.replace(/[^0-9]/g, ""));
        cartData += `<div class="main__card">
        <img
          src="${data.img}"
          alt="${data.name}"
        />
        <div class="main__text">
          <p><b>${data.name}</b></p>
          <p>Giá: ${formatCurrency(data.price.replace(/[^0-9]/g, ""))}</p>
        </div>
        <div class="exit">
          <i class='bx bx-x-circle' onclick="deleteProduct(this)"></i>
        </div>
        </div>`;
      });
    }

    cartMainCard.innerHTML = cartData;

    totalProduct += `<table>
    <tr>
      <th><p style="font-size: 25px">Tổng chi phí:</p>
      <th><p style="font-size: 20px">${formatCurrency(
        Math.floor(total)
      )}</p></th></th>
    </tr>
    </table>`;

    sumInfo.innerHTML = totalProduct;

    //gia tien
    if (total == 0) {
      productWrapper.classList.add("main__empty");
      alert("Chưa có sản phẩm trong giả hàng\nVui lòng chọn sản phẩm!");
      location.href = "trangchu.html";
    } else {
      productWrapper.classList.remove("main__empty");
    }
  }
}

function deleteProduct(e) {
  let products = [];
  let deleteProduct = JSON.parse(localStorage.getItem("products"));
  deleteProduct.forEach((data) => {
    //kiem tra so luong
    //so luong > 1 -> so luong -1
    //so luong = 1 -> xoa ra khoi ob
    if (
      data.name ==
      e.parentElement.previousElementSibling.children[0].textContent
    ) {
      if (data.quantity > 1) {
        data.quantity = data.quantity - 1;
        products.push(data);
      }
    } else {
      products.push(data);
    }
  });

  localStorage.setItem("products", JSON.stringify(products));
  window.location.reload();
}
