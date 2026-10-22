// NCS Gaming — visor de capturas y cabecera. Sin dependencias ni cookies.
(() => {
  const top = document.querySelector(".top");
  const onScroll = () => top && top.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const dialog = document.querySelector("dialog.viewer");
  const items = [...document.querySelectorAll(".gallery button")];
  if (!dialog || !items.length || typeof dialog.showModal !== "function") return;

  const img = dialog.querySelector("img");
  const cap = dialog.querySelector("figcaption");
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const b = items[index];
    img.src = b.dataset.full;
    img.alt = b.querySelector("img").alt;
    cap.textContent = b.querySelector("img").alt + " · " + (index + 1) + "/" + items.length;
  };

  items.forEach((b, i) => b.addEventListener("click", () => { show(i); dialog.showModal(); }));
  dialog.querySelector("[data-prev]").addEventListener("click", () => show(index - 1));
  dialog.querySelector("[data-next]").addEventListener("click", () => show(index + 1));
  dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  dialog.addEventListener("close", () => items[index].focus());

  // Cerrar al tocar fuera de la imagen en navegadores sin closedby (Safari).
  if (!("closedBy" in HTMLDialogElement.prototype)) {
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target.tagName === "FIGURE") dialog.close();
    });
  }
})();
