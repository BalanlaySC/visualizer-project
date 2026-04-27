export type PriorityQueueItem<T> = {
  item: T
  priority: number
}

export class MinPriorityQueue<T> {
  private heap: PriorityQueueItem<T>[] = []

  get size(): number {
    return this.heap.length
  }

  push(item: T, priority: number): void {
    this.heap.push({ item, priority })
    this.bubbleUp(this.heap.length - 1)
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined
    const top = this.heap[0]
    const last = this.heap.pop()!
    if (this.heap.length > 0) {
      this.heap[0] = last
      this.bubbleDown(0)
    }
    return top.item
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2)
      if (this.heap[parent].priority <= this.heap[index].priority) return
      ;[this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]]
      index = parent
    }
  }

  private bubbleDown(index: number): void {
    const n = this.heap.length
    while (true) {
      const left = index * 2 + 1
      const right = index * 2 + 2
      let smallest = index

      if (left < n && this.heap[left].priority < this.heap[smallest].priority) smallest = left
      if (right < n && this.heap[right].priority < this.heap[smallest].priority) smallest = right
      if (smallest === index) return

      ;[this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]]
      index = smallest
    }
  }
}

