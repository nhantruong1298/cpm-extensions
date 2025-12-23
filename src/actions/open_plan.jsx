export default function openPlan() {
  const links = document.querySelectorAll("a.text-success[href]");
  const openedUrls = new Set();
  let openedCount = 0;
  let skippedCount = 0;

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.includes("id") && !openedUrls.has(href)) {
      window.open(href, "_blank");
      openedUrls.add(href);
      openedCount++;
    } else if (href) {
      skippedCount++;
    }
  });

  console.log(
    `Opened ${openedCount} unique plan links, skipped ${skippedCount} duplicates`
  );
}
