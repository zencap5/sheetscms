const main = async () => {
  const templates = Array.from(
    document.querySelectorAll("[data-sheets-cms]")
  ).map((element) => ({
    element,
    parent: element.parentElement,
  }));

  const load = (template) => {
    const [sheetId, tabName] = template.element.dataset.sheetsCms.split(",");

    return fetch(
      `https://g2j.automatedlabs.io/${sheetId}/${tabName}${
        template.element.dataset.sheetsCmsHeaderRow
          ? `?header-row=${template.element.dataset.sheetsCmsHeaderRow}`
          : ""
      }`
    )
      .then((res) => res.json())
      .then((rows) => {
        rows.forEach((row) => {
          const el = template.element.cloneNode(true);
          el.querySelectorAll("[data-sheets-cms-column]").forEach(
            (placeholder) => {
              const value = row[placeholder.dataset.sheetsCmsColumn] ?? "";
              if (placeholder.tagName === "IMG") {
                placeholder.src = value;
              } else {
                placeholder.innerText = value;
              }
            }
          );

          template.parent.appendChild(el);
        });

        template.element.remove();
      })
      .then(() => {
        let refresh = template.element.dataset.sheetsCmsRefresh;
        if (refresh) {
          refresh = refresh.replace(/\s/g, "");
          const number = refresh.slice(0, -1);
          const unit = refresh.slice(-1);

          const ms = number * { s: 1000, m: 60000 }[unit];

          setTimeout(() => load(template), ms);
        }
      });
  };

  await Promise.all(
    templates.map((template) => {
      return load(template);
    })
  );

  document
    .querySelectorAll("[data-sheets-cms-loading]")
    .forEach((el) => (el.style.display = "none"));
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
