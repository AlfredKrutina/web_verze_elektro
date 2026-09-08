(() => {
  const hub = document.body.dataset.hub || "../index.html";
  if (document.querySelector(".back-chip")) return;
  const a = document.createElement("a");
  a.className = "back-chip";
  a.href = hub;
  a.textContent = "← Zpět k výběru designu";
  document.body.appendChild(a);
})();
