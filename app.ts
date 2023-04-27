type inputTypes = number | Date | "phone" | "email" | "password" | string

interface Input<T extends inputTypes> {
    element: HTMLInputElement;
    // type: T;
    conditions: {
        function: (value: T) => boolean,
        errorMessage: string
    }[];
}

interface Form {
    formElement: HTMLFormElement;
    onSubmit: Function;
    // inputs:Input<T>[];
}


function generateInput<T extends inputTypes>(
    conditions: Input<T>['conditions'] = [],
    element: Input<T>['element']
) {
    let value = element.value;
    let errorMessages: string[] = []

    function checkValidity(value: T): void {
        let temporaryErrors: string[] = []
        conditions.forEach(condition => {
            // console.log("here");
            if (!condition.function(value)) {
                temporaryErrors.push(condition.errorMessage);
            }
        })
        errorMessages = temporaryErrors;
        console.log(errorMessages);
    }

    function setValue(newValue) {
        value = newValue;
    }

    function onChange(event) {
        // console.log("change");
        checkValidity(event.target.value)
        setValue(event.target.value);
    }

    element.addEventListener("input", onChange)
    return {
        errorMessages,
        value
    }
}

class InputC<T extends inputTypes> {
    value;
    readonly conditions;
    readonly element;
    errorMessages = [];

    hasError(): boolean {
        return this.errorMessages.length === 0;
    }

    constructor(
        conditions: Input<T>['conditions'] = [],
        element: Input<T>['element']
    ) {
        this.conditions = conditions;
        this.element = element;
        this.value = element.value;
        // console.log("here")
        element.addEventListener("input", this.onChange.bind(this))
    }

    getErrorMessages() {
        return this.errorMessages;
    }

    getValue() {
        return this.value;
    }


    checkValidity(value: T): void {
        let temporaryErrors: string[] = []
        console.log("here");
        this.conditions.forEach(condition => {
            if (!condition.function(value)) {
                temporaryErrors.push(condition.errorMessage);
            }
        })
        this.errorMessages = temporaryErrors;
        console.log(this.errorMessages);
    }

    setValue(newValue) {
        this.value = newValue;
    }

    onChange(event) {
        this.checkValidity(event.target.value)
    }
}

// const condition1 = {
//     function: (value: string): boolean => value.length > 8,
//     errorMessage: "too short"
// }
const schema = {
    minLength: (num: number, message: string = "too short") => {
        return {
            function: (value: string): boolean => value.length > num,
            errorMessage: message
        }
    },
    maxLength: (num: number, message: string = "too long") => {
        return {
            function: (value: string): boolean => value.length < num,
            errorMessage: message
        }
    },
    reqiured: (message: string = "is required") => ({
        function: (value: any): boolean => !!value,
        errorMessage: message
    }),
    positive: (num: number, message: string = "is negative") => ({
        function: (value: number): boolean => value > 0,
        errorMessage: message
    }),
    negative: (num: number, message: string = "is positive") => ({
        function: (value: number): boolean => value < 0,
        errorMessage: message
    }),
    min: (num: number, message?: string) => ({
        function: (value: number): boolean => value > num,
        errorMessage: message ?? `is less than ${num}`
    }),
    max: (num: number, message?: string) => ({
        function: (value: number): boolean => value < num,
        errorMessage: message ?? `is more than ${num}`
    }),
    length: (num: number, message: string = "is too long or too short") => ({
        function: (value: string): boolean => value.length === num,
        errorMessage: message
    }),
    // match: (regex: RegExp, message: string = "not match") => ({
    //     function: (value: string): boolean => value.match(regex),
    //     errorMessage: message
    // }),
    minUppercaseCount: (num: number, message?: string) => ({
        function: (value: string): boolean => (value.match(/[A-Z]/g) ?? [""]).join("").length >= num,
        errorMessage: message ?? `uppercase letter are less than ${num}`
    }),
    minLowercaseCount: (num: number, message?: string) => ({
        function: (value: string): boolean => (value.match(/[a-z]/g) ?? [""]).join("").length >= num,
        errorMessage: message ?? `lowercase letter are less than ${num}`
    }),
    // email:(message:string="invalid email")=>({
    //     function: (value: string): boolean => (value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)??[""]).join("").length > num,
    //     errorMessage: message
    //
    // })
}

const instance = new InputC(
    [
        schema.minLength(6),
        schema.maxLength(10),
        schema.reqiured(),
        schema.length(9),
        schema.minLowercaseCount(4),
        schema.minUppercaseCount(4),
    ],
    document.getElementById("input") as HTMLInputElement
)

setInterval(() => {
    console.log(instance.errorMessages);
}, 5000)
