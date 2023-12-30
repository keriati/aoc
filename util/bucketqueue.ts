export class BucketQueue<T> {
  buckets: T[][] = [];

  priorityMax = 0;

  priorityMin = 0;

  size = 0;

  push(item: T, priority: number): void {
    if (!this.buckets[priority]) {
      this.buckets[priority] = [];
    }
    this.buckets[priority].push(item);
    if (priority > this.priorityMax) this.priorityMax = priority;
    if (priority < this.priorityMin) this.priorityMin = priority;
    this.size++;
  }

  popMax(): T | undefined {
    if (!this.size) return undefined;
    const bucket = this.buckets[this.priorityMax];
    const item = bucket.pop();
    if (!bucket.length) {
      delete this.buckets[this.priorityMax];
      let bucketKeys = Object.keys(this.buckets).map(Number);
      this.priorityMax = Math.max(...bucketKeys);
      this.priorityMin = Math.min(...bucketKeys);
    }
    this.size--;
    return item;
  }

  popMin(): T | undefined {
    if (!this.size) return undefined;
    const bucket = this.buckets[this.priorityMin];
    const item = bucket.pop();
    if (!bucket.length) {
      delete this.buckets[this.priorityMin];
      let bucketKeys = Object.keys(this.buckets).map(Number);
      this.priorityMax = Math.max(...bucketKeys);
      this.priorityMin = Math.min(...bucketKeys);
    }
    this.size--;
    return item;
  }
}
