import TimeSeries, { TimeSeriesObserver } from ".";

export class ConsoleObserver<T> implements TimeSeriesObserver<T> {
  update(timeSeries: TimeSeries<T>): void {
    console.log('Persisting time-series data:', timeSeries.getData());
  }
}

