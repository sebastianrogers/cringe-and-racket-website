module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/images");

  return {
    dir: { input: "src", output: "_site" },
    // Set by the deploy workflow, e.g. "/cringe-and-racket-website/"
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
};
