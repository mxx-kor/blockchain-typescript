class Human {
    public name: string;
    public age: number;
    public gender: string;
    constructor(name: string, age: number, gender: string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}

const Marien = new Human("Marien", 20, "female");

const sayHi = (person: Human): string => {
    return `hello ${person.name}, you are ${person.age}, you are ${person.gender}!`;
};

console.log(sayHi(Marien));

export {};