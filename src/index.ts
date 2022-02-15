import * as CryptoJS from "crypto-js";
//npm install crypto-js 로 설치
class Block {
    //hash를 계산하기 위해 cryptojs를 설치
    //static은 클래스를 생성하지 않아도 사용가능한 method를 만들 때 사용 (static이 아니면 genesis블록처럼 생성후 .과 함께 사용)
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        data: string,
        timestamp: number
    ): string =>
        CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
        //SHA256을 이용하여 해쉬계산
    
    //hash가 유효할 때 타입들을 설정
    static validateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";
    //private 과 public의 차이점 클래스 밖에서도 호출할 수 있느냐 없느냐의 차이 private은 밖에서 호출 불가
    //이를 통해 인자들을 보호할 수 있음
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    //constructor - method로 클래스가 시작할 때 마다 호출됨
    constructor(     
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        //this 사용하는 이유는 이 클래스의 속성의 arguments들이 생성자의 인자들과 같다는 걸 설명
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

//첫번째 블록 생성
const genesisBlock: Block = new Block(0, "2020202020222", "", "Hello", 123456);
//블록체인은 블록만 추가하도록 블록이 아니면 추가 되지 못하도록
let blockchain: Block[] = [genesisBlock];

//블록체인이 얼마나 긴지 알기 위해서 array of block 리턴
const getBlockchain = (): Block[] => blockchain;
//마지막 블록체인을 리턴하게 하여 길이를 알기 위해
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];
// 시간을 리턴
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
//새로운 블럭 형성 새로운 인자들을 설정하여 계산함
const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash, 
        data,
        newTimestamp
    );
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimestamp
    );
    addBlock(newBlock);
    return newBlock;
};//newblock을 리턴하여 변수를 완성
//candidateblock 의 해쉬가 같지 않다면 false를 반환하기 위해
const getHashforBlock = (aBlock: Block): string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.data,
        aBlock.timestamp
    )
//해쉬가 유효한지 확인하는 조건식
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    } 
};//모든게 유효할때 addblock 실행됌

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

//변수에 이름을 선언하기 위해서 일종의 버그 해결법 
export {};