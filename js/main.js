// crud test in route
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var searchInput = document.getElementById("searchInput");
var currentIndex = 0;
var productList = [];
if (localStorage.getItem("productData") != null) {
  productList = JSON.parse(localStorage.getItem("productData"));
  displayProducts();
}

function addProduct() {
  if (validateName() && validatePrice()) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      decryption: productDescription.value,
    };
    productList.push(product);
    localStorage.setItem("productData", JSON.stringify(productList));
    displayProducts();
    clearForm();
  }
}

function displayProducts() {
  var temp = "";
  for (var i = 0; i < productList.length; i++) {
    temp +=
      `<tr><td>` +
      i +
      `</td>
    <td>` +
      productList[i].name +
      `</td>
    <td>` +
      productList[i].price +
      `</td>
    <td>` +
      productList[i].category +
      `</td>
    <td>` +
      productList[i].decryption +
      `</td>
    <td>
      <button onclick="updateProduct(` +
      i +
      `)" class="btn btn-outline-warning">Update</button>
    </td>
    <td>
      <button onclick="deleteProduct(` +
      i +
      `)" class="btn btn-outline-danger">delete</button>
    </td>
  </tr>`;
  }
  document.getElementById("tableBody").innerHTML = temp;
}

function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productData", JSON.stringify(productList));
  displayProducts();
}

function updateProduct(index) {
  currentIndex = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDescription.value = productList[index].decryption;
  document.getElementById("addProduct").style.display = "none";
  document.getElementById("addEdit").style.display = "inline-block";
}

function addEdit() {
  productList[currentIndex].name = productName.value;
  productList[currentIndex].price = productPrice.value;
  productList[currentIndex].category = productCategory.value;
  productList[currentIndex].decryption = productDescription.value;
  localStorage.setItem("productData", JSON.stringify(productList));
  displayProducts();
  clearForm();
  document.getElementById("addEdit").style.display = "none";
  document.getElementById("addProduct").style.display = "inline-block";
}

function search() {
  var searchValue = searchInput.value.toLowerCase();
  var temp = "";
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchValue)) {
      temp +=
        `<tr><td>` +
        i +
        `</td>
    <td>` +
        productList[i].name +
        `</td>
    <td>` +
        productList[i].price +
        `</td>
    <td>` +
        productList[i].category +
        `</td>
    <td>` +
        productList[i].decryption +
        `</td>
    <td>
      <button onclick="updateProduct(` +
        i +
        `)" class="btn btn-outline-warning">Update</button>
    </td>
    <td>
      <button onclick="deleteProduct(` +
        i +
        `)" class="btn btn-outline-danger">delete</button>
    </td>
  </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = temp;
}

function validateName() {
  var regex = /^[A-Z][a-z]{2,10}[0-9]?$/;
  var validStatus = false;
  if (regex.test(productName.value)) {
    document.getElementById("alertName").style.display = "none";
    validStatus = true;
  } else {
    document.getElementById("alertName").style.display = "block";
    validStatus = false;
  }
  return validStatus;
}

function validatePrice() {
  var regex = /^[1-9][0-9]{2,6}$/;
  var validStatus = false;
  if (regex.test(productPrice.value)) {
    document.getElementById("alertPrice").style.display = "none";
    validStatus = true;
  } else {
    document.getElementById("alertPrice").style.display = "block";
    validStatus = false;
  }
  return validStatus;
}
