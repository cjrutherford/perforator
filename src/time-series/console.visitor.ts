import { TimeSeries, TimeSeriesVisitor } from ".";

export class ConsoleVisitor<T> implements TimeSeriesVisitor<T> {
    visit(timeSeries: TimeSeries<T>): void {
      console.log('Persisting time-series data:', timeSeries.getData());
    }
  }