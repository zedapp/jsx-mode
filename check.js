/*global _*/
var transform = require("./transform");
var javaScriptCheck = require("../javascript-mode/check");
module.exports = function(info) {
    var options = _.extend(info.options, {
       globals: {
           React: true
       }
    });
    try {
        var transformedCode = transform.transform(info.inputs.text).code;
        return javaScriptCheck({
            inputs: {
                text: transformedCode
            },
            options: options
        });
    } catch(e) {
        return [{
            row: e.lineNumber - 1,
            text: e.description,
            type: "error"
        }];
    }

};
