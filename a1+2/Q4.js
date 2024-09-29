function sum() {
  const format = /^\d+$/;
  let rows = document.querySelectorAll("tr");
  let divs = "";
  let summary = document.querySelector("#summary");
  let total = 0;

  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    let quantity = row.querySelector(".quantity").value;
    if (!format.test(quantity)) {
      alert("Pleast enter a valid number for quantity!");
      return;
    }

    let cost =
      parseFloat(row.querySelector(".price").innerHTML.replace("$", "")) *
      quantity;
    total += cost;

    divs +=
      "<strong>" +
      row.querySelector(".name").innerHTML +
      " (Quantity = " +
      quantity +
      "):</strong> $" +
      cost;
    divs += "<br>";
  }

  divs += "<br>";
  divs += "<strong>Final Total:</strong> $" + total;

  summary.innerHTML = divs;
}
