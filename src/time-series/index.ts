export default class TimeSeries<T> {
    private data: Array<{ timestamp: number; value: T }> = [];
    private observers: TimeSeriesObserver<T>[] = [];

    /**
     * Adds a data point to the time-series.
     * @param value - The value to add.
     */
    addDataPoint(value: T): void {
        const timestamp = Date.now();
        this.data.push({ timestamp, value });
        this.notifyObservers();
    }

    /**
     * Retrieves the time-series data.
     * @returns An array of data points with timestamps.
     */
    getData(): Array<{ timestamp: number; value: T }> {
        return this.data;
    }

    /**
     * Retrieves the time-series data within a specific time range.
     * @param startTime - The start time of the range (inclusive).
     * @param endTime - The end time of the range (inclusive).
     * @returns An array of data points within the specified time range.
     */
    getDataInRange(startTime: number, endTime: number): Array<{ timestamp: number; value: T }> {
        return this.data.filter(point => point.timestamp >= startTime && point.timestamp <= endTime);
    }

    /**
     * Adds an observer to the time-series.
     * @param observer - The observer to add.
     */

    addObserver(observer: TimeSeriesObserver<T>): void {
        this.observers.push(observer);
    }

    /**
     * Removes an observer from the time-series.
     * @param observer - The observer to remove.
     */
    removeObserver(observer: TimeSeriesObserver<T>): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    /**
     * Notifies all observers of the time-series.
     */

    private notifyObservers(): void {
        this.observers.forEach(observer => observer.update(this));
    }

    /**
     * Accepts a visitor to persist the time-series data.
     * @param visitor - The visitor to accept.
     */
    accept(visitor: TimeSeriesVisitor<T>): void {
        visitor.visit(this);
    }
}
interface TimeSeriesVisitor<T> {
    visit(timeSeries: TimeSeries<T>): void;
}

interface TimeSeriesObserver<T> {
    update(timeSeries: TimeSeries<T>): void;
}

export const createVisitorInterval = <T>(timeSeries: TimeSeries<T>, visitors: TimeSeriesVisitor<T>[], interval: number) => {
    setInterval(() => {
        visitors.forEach(visitor => timeSeries.accept(visitor));
    }, interval);
};

export { TimeSeriesVisitor, TimeSeriesObserver };
export { ConsoleVisitor } from './console.visitor';
export { FileVisitor } from './file.visitor';
export { ConsoleObserver } from './console.observer';
export { FileObserver } from './file.observer';