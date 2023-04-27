function generateInput(conditions, element) {
    if (conditions === void 0) { conditions = []; }
    var value = element.value;
    var errorMessages = [];
    function checkValidity(value) {
        var temporaryErrors = [];
        conditions.forEach(function (condition) {
            // console.log("here");
            if (!condition["function"](value)) {
                temporaryErrors.push(condition.errorMessage);
            }
        });
        errorMessages = temporaryErrors;
        console.log(errorMessages);
    }
    function setValue(newValue) {
        value = newValue;
    }
    function onChange(event) {
        // console.log("change");
        checkValidity(event.target.value);
        setValue(event.target.value);
    }
    element.addEventListener("input", onChange);
    return {
        errorMessages: errorMessages,
        value: value
    };
}
var InputC = /** @class */ (function () {
    function InputC(conditions, element) {
        if (conditions === void 0) { conditions = []; }
        this.conditions = conditions;
        this.element = element;
        this.value = element.value;
        // console.log("here")
        element.addEventListener("input", this.onChange.bind(this));
    }
    InputC.prototype.getErrorMessages = function () {
        return this.errorMessages;
    };
    InputC.prototype.getValue = function () {
        return this.value;
    };
    InputC.prototype.checkValidity = function (value) {
        var temporaryErrors = [];
        console.log("here");
        this.conditions.forEach(function (condition) {
            if (!condition["function"](value)) {
                temporaryErrors.push(condition.errorMessage);
            }
        });
        this.errorMessages = temporaryErrors;
        console.log(this.errorMessages);
    };
    InputC.prototype.setValue = function (newValue) {
        this.value = newValue;
    };
    InputC.prototype.onChange = function (event) {
        // console.log("change");
        this.checkValidity(event.target.value);
        // this.setValue(event.target.value);
    };
    return InputC;
}());
// const condition1 = {
//     function: (value: string): boolean => value.length > 8,
//     errorMessage: "too short"
// }
var schema = {
    minLength: function (num, message) {
        if (message === void 0) { message = "too short"; }
        return {
            "function": function (value) { return value.length > num; },
            errorMessage: message
        };
    },
    maxLength: function (num, message) {
        if (message === void 0) { message = "too long"; }
        return {
            "function": function (value) { return value.length < num; },
            errorMessage: message
        };
    },
    reqiured: function (message) {
        if (message === void 0) { message = "is required"; }
        return ({
            "function": function (value) { return !!value; },
            errorMessage: message
        });
    },
    positive: function (num, message) {
        if (message === void 0) { message = "is negative"; }
        return ({
            "function": function (value) { return value > 0; },
            errorMessage: message
        });
    },
    negative: function (num, message) {
        if (message === void 0) { message = "is positive"; }
        return ({
            "function": function (value) { return value < 0; },
            errorMessage: message
        });
    },
    min: function (num, message) { return ({
        "function": function (value) { return value > num; },
        errorMessage: message !== null && message !== void 0 ? message : "is less than ".concat(num)
    }); },
    max: function (num, message) { return ({
        "function": function (value) { return value < num; },
        errorMessage: message !== null && message !== void 0 ? message : "is more than ".concat(num)
    }); },
    length: function (num, message) {
        if (message === void 0) { message = "is too long or too short"; }
        return ({
            "function": function (value) { return value.length === num; },
            errorMessage: message
        });
    },
    // match: (regex: RegExp, message: string = "not match") => ({
    //     function: (value: string): boolean => value.match(regex),
    //     errorMessage: message
    // }),
    minUppercaseCount: function (num, message) { return ({
        "function": function (value) { var _a; return ((_a = value.match(/[A-Z]/g)) !== null && _a !== void 0 ? _a : [""]).join("").length >= num; },
        errorMessage: message !== null && message !== void 0 ? message : "uppercase letter are less than ".concat(num)
    }); },
    minLowercaseCount: function (num, message) { return ({
        "function": function (value) { var _a; return ((_a = value.match(/[a-z]/g)) !== null && _a !== void 0 ? _a : [""]).join("").length >= num; },
        errorMessage: message !== null && message !== void 0 ? message : "lowercase letter are less than ".concat(num)
    }); }
};
// let {errorMessages, value} = generateInput<string>(
//     [
//         schema.minLength(6),
//         schema.maxLength(10),
//         schema.reqiured(),
//         schema.length(9),
//         schema.minLowercaseCount(4),
//         schema.minUppercaseCount(4),
//         // schema.match(/[a-z]+/g)
//     ],
//     iEl)
var e1 = document.getElementById("input");
var instance = new InputC([
    schema.minLength(6),
    schema.maxLength(10),
    schema.reqiured(),
    schema.length(9),
    schema.minLowercaseCount(4),
    schema.minUppercaseCount(4),
], e1);
setInterval(function () {
    console.log(instance.errorMessages);
}, 5000);
// console.log("acac".match("/[A-Z]+/g"));
