export class Pool<T> {
  private readonly list: T[];
  private next = 0;

  constructor(private readonly Class: {new() : T}, initialSize = 20) {
    this.list = new Array(initialSize);
    for (let i = 0; i < initialSize; i++) this.list[i] = new Class();
  }

  /**
   * Take an item from the pool until the next reset.
   */
  take(): T {
    if (this.next === this.list.length) this.list.push(new this.Class());
    return this.list[this.next++];
  }

  /**
   * Very temporarily borrow an item from the pool.  You must stop using it before you return
   * control to any other code, since the item remains available to take!
   */
  borrow(): T {
    if (this.next === this.list.length) this.list.push(new this.Class());
    return this.list[this.next];
  }

  /**
   * Reset the pool, conceptually returning all the taken items to it.
   */
  reset(): void {
    this.next = 0;
  }
}