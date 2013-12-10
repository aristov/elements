/**
 * html-from-bemjson
 * =================
 *
 * Собирает *html*-файл с помощью *bemjson* и *bemjst*.
 *
 * **Опции**
 *
 * * *String* **bemjstTarget** — Исходный BEMJST-файл. По умолчанию — `?.jst.js`.
 * * *String* **bemjsonTarget** — Исходный BEMJSON-файл. По умолчанию — `?.bemjson.js`.
 * * *String* **destTarget** — Результирующий HTML-файл. По умолчанию — `?.html`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb/techs/html-from-bemjson'));
 * ```
 */
var requireOrEval = require('enb/lib/fs/require-or-eval');
var asyncRequire = require('enb/lib/fs/async-require');
var dropRequireCache = require('enb/lib/fs/drop-require-cache');

module.exports = require('enb/lib/build-flow').create()
    .name('html-from-bemjson')
    .target('destTarget', '?.html')
    .useSourceFilename('bemjstTarget', '?.jst.js')
    .useSourceFilename('bemjsonTarget', '?.bemjson.js')
    .builder(function (bemjstFilename, bemjsonFilename) {
        dropRequireCache(require, bemjsonFilename);
        return requireOrEval(bemjsonFilename).then(function (json) {
            dropRequireCache(require, bemjstFilename);
            return asyncRequire(bemjstFilename).then(function(bemjst) {
                if (!bemjst.BEMJST && bemjst.lib) {
                    return bemjst.build(json);
                } else {
                    return bemjst.BEMJST.buildHtml(bemjst.BEMJST.build(json));
                }
            });
        });
    })
    .createTech();
