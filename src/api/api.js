import axios from "axios";

const FIREBASE_DOMAIN =
  "https://lego-store-reactjs-default-rtdb.firebaseio.com/";

export async function fetchAllProduct() {
  return axios
    .get(
      `${FIREBASE_DOMAIN}/products.json?auth=${localStorage.getItem("token")}`
    )
    .catch((err) => {
      console.log(err);
    });
}

export async function fetchSingleProduct(productId) {
  return axios
    .get(
      `${FIREBASE_DOMAIN}/products/${productId}.json?auth=${localStorage.getItem(
        "token"
      )}`
    )
    .catch((err) => {
      console.log(err);
    });
}

export default function getTempCart() {
  const email = localStorage.getItem("loginEmail");
  return axios
    .get(
      `${FIREBASE_DOMAIN}/tempCarts.json?auth=${localStorage.getItem(
        "token"
      )}&orderBy="loginEmail"&startAt="${email}"&endAt="${email}"`
    )
    .catch((err) => {
      console.log(err);
    });
}

export async function upsertTempCart(cartData) {
  const loginEmail = localStorage.getItem("loginEmail");
  let method = "POST";
  let url = `${FIREBASE_DOMAIN}/tempCarts.json?auth=${localStorage.getItem(
    "token"
  )}`;
  let bodyRequest = {
    loginEmail: loginEmail,
    orderedItems: cartData.items,
    totalAmount: cartData.totalAmount,
  };

  if (cartData.id) {
    method = "PATCH";
    url = `${FIREBASE_DOMAIN}/tempCarts/.json?auth=${localStorage.getItem(
      "token"
    )}`;
    bodyRequest = { [cartData.id]: bodyRequest };
  }
  if (loginEmail && cartData.items && cartData.totalAmount > 0) {
    await fetch(url, {
      method: method,
      body: JSON.stringify(bodyRequest),
    });
  }
}

export async function deleteTempCart(tempCartId) {
  axios
    .delete(
      `${FIREBASE_DOMAIN}/tempCarts/${tempCartId}.json?auth=${localStorage.getItem(
        "token"
      )}`
    )
    .catch((err) => {
      console.log(err);
    });
}

export async function checkout(cartData) {
  axios
    .post(
      `${FIREBASE_DOMAIN}/orders.json?auth=${localStorage.getItem("token")}`,
      {
        user: { loginEmail: localStorage.getItem("loginEmail") },
        orderedItems: cartData.items,
        totalAmount: cartData.totalAmount,
      }
    )
    .then((res) => {
      if (res.status === 200 && cartData.id) {
        //delete temp cart After checkout
        deleteTempCart(cartData.id);
      }
    });
}
