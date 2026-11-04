const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/images");

  // Relative links so pages also work when opened directly from disk (file://)
  eleventyConfig.addFilter("rel", (target, pageUrl) => {
    const from = path.posix.dirname(pageUrl);
    const to = target.endsWith("/") ? target + "index.html" : target;
    return path.posix.relative(from, to) || "index.html";
  });

  return {
    dir: { input: "src", output: "_site" },
    // Set by the deploy workflow, e.g. "/cringe-and-racket-website/"
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
};
