import fs from "fs/promises";
import { SitemapStream, streamToPromise } from "sitemap";

const routes = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "monthly", priority: 0.9 },
  { url: "/services", changefreq: "monthly", priority: 0.9 },
  { url: "/menu", changefreq: "weekly", priority: 0.9 },
  { url: "/reservation", changefreq: "monthly", priority: 0.9 },
  { url: "/contact", changefreq: "monthly", priority: 0.9 },
  { url: "/cart", changefreq: "monthly", priority: 0.7 },
  { url: "/order", changefreq: "monthly", priority: 0.7 },
  { url: "/login", changefreq: "monthly", priority: 0.8 },
  { url: "/register", changefreq: "monthly", priority: 0.8 },
];

(async () => {
  try {
    const sitemapStream = new SitemapStream({
      hostname: "https://www.skyhutcafe.com",
    });

    routes.forEach((route) => {
      sitemapStream.write(route);
    });

    sitemapStream.end();

    const sitemap = await streamToPromise(sitemapStream).then((data) =>
      data.toString()
    );

    await fs.writeFile("../frontend/public/sitemap.xml", sitemap);
    console.log("Sitemap generated successfully!");
  } catch (error) {
    console.error("Error generating sitemap:", error);
  }
})();
