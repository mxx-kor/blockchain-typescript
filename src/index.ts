const sayHi = (name: string, age: number, gender: string): string => {
    return `hello ${name}, you are ${age}, you are ${gender}!`;
};

console.log(sayHi("MINJAE", 27, "male"));

export {};