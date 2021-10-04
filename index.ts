const name = "MINJAE",
    age = 27,
    gender = "male";

const sayHi = (name, age, gender?) => {
    console.log(`hello ${name}, you are ${age}, you are ${gender}`);
};

sayHi(name, age);

export {};