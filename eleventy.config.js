const tailwind = require("tailwindcss");
const tailwindConfig = require("./tailwind.config");
const postCss = require("postcss");
const autoprefixer = require("autoprefixer");

const postcssFilter = (css, done) => {
  postCss([tailwind(tailwindConfig), autoprefixer()])
    .process(css)
    .then(
      (res) => done(null, res.css),
      (err) => done(err, null)
    );
};

module.exports = function (config) {
  config.addNunjucksAsyncFilter("postcss", postcssFilter);
  config.addPassthroughCopy("CNAME");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
