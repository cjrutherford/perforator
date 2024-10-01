import TimeSeries, { ConsoleObserver } from "./time-series";
import { createObserver, PerformanceEntry } from "./util";

async function main() {
    const perf: TimeSeries<PerformanceEntry> = new TimeSeries<PerformanceEntry>();
    const consoleObserver = new ConsoleObserver<PerformanceEntry>();

    perf.addObserver(consoleObserver);
    createObserver(['node', 'mark', 'http', 'resource'], (list, observer) => {
        list.getEntries().forEach(entry => {
            perf.addDataPoint(entry);
        });
    });

}

export {
    createObserver,
    PerformanceEntry,
} from './util';
export { 
    default as TimeSeries,
    TimeSeriesObserver,
    TimeSeriesVisitor,
    ConsoleObserver,
    ConsoleVisitor,
    FileObserver,
    FileVisitor,  
} from './time-series';

main().then(() => {
    console.log('done');
}).catch((error) => {
    console.error(error);
});