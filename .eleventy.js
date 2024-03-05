const moment = require("moment");
const now = new Date();
const rmj = require('render-markdown-js')

module.exports = function (eleventyConfig) {

    eleventyConfig.setTemplateFormats("njk,html,md");
    
    eleventyConfig.addPassthroughCopy('src');
    eleventyConfig.addPassthroughCopy('css');
    eleventyConfig.addPassthroughCopy('js');
    eleventyConfig.addPassthroughCopy('img');
    eleventyConfig.addPassthroughCopy('modal');
    eleventyConfig.addPassthroughCopy('admin');
    
    eleventyConfig.addNunjucksFilter("rmj", function(content) {
        return rmj(content);
    });

    eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    eleventyConfig.addNunjucksFilter("limitPart", function(array, limit1, limit2) {
        return array.slice(limit1, limit2);
    });

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return moment(date).format(format);
    });

    eleventyConfig.addCollection('blogsHighlighted', (collectionApi) => {
        return collectionApi.getFilteredByTag('blogs').filter((item) => {
            return item.data.highlight == true;
        });
    });
}