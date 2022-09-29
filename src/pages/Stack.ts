class Stack<DataType> {
  private data: DataType[] = []

  constructor() {}

  push(item: DataType): void {
    this.data.push(item)
  }

  pop(): DataType {
    return this.data.pop()
  }
}

const stack = new Stack<number>()

stack.push(10)
stack.push('10')

console.log(stack.pop.toFixed())
console.log(stack.pop.toFixed())
