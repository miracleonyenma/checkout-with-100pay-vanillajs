import './style.css';
import {shop100Pay} from "@100pay-hq/checkout"

const paymentForm = document.querySelector('#paymentForm');

paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let firstname = paymentForm.firstName.value
  let lastname = paymentForm.lastName.value
  let emailaddress = paymentForm.emailAddress.value
  let amount = paymentForm.amount.value
  let phone = paymentForm.phone.value

  console.log({firstname, lastname, emailaddress, amount, phone})

  shop100Pay.setup({
    ref_id: `${Math.floor(Math.random() * 1000000000 + 1)}`,
    api_key: "LIVE;PK;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjYyOGQyMDA1N2U0YmQyMDAyZDg5YTk3NyIsInVzZXJJZCI6IjYyOGQxZjEzN2U0YmQyMDAyZDg5YTk1MCIsImlhdCI6MTY1MzQxNTk0MX0.4a9Ov5x5MEmbIIO4ebRYG_9nH4BBxa7Fxo2tcC7BO14",
    customer: {
      user_id: "1", // optional
      name: `${firstname} ${lastname}`,
      phone,
      email: emailaddress
    },
    billing: {
      amount,
      currency: "USD", // or any other currency supported by 100pay
      description: "Test Payment",
      country: "USA",
      vat: 10, //optional
      pricing_type: "fixed_price" // or partial
    },
    metadata: {
      is_approved: "yes",
      order_id: "OR2", // optional
      charge_ref: "REF" // optional, you can add more fields
    },
    call_back_url: "http://localhost:8000/verifyorder/",
    onClose: msg => {
      alert("User closed payment modal.");
    },
    callback: reference => {
      alert(`Transaction successful with id: ${reference}`);
    },
    onError: error => {
        console.log(error)
        alert("Sorry something went wrong pls try again.")
    }

  })

});
