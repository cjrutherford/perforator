import { performance, PerformanceObserver, PerformanceEntry, PerformanceObserverCallback, EntryType } from 'perf_hooks';


/**
 * A decorator function that measures the performance of the decorated method.
 * It uses the Performance API to mark the start and end of the method execution
 * and then measures the time taken between these marks.
 *
 * @param target - The prototype of the class.
 * @param propertyKey - The name of the method being decorated.
 * @param descriptor - The property descriptor for the method.
 * @returns The updated property descriptor with the performance measurement logic.
 */
function measurePerformance(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    const startMark = `${propertyKey}-start`;
    const endMark = `${propertyKey}-end`;
    const measureName = `${propertyKey}-measure`;

    performance.mark(startMark);
    const result = originalMethod.apply(this, args);
    performance.mark(endMark);

    performance.measure(measureName, startMark, endMark);

    return result;
  };

  return descriptor;
}


/**
 * Creates a PerformanceObserver to observe specified performance entry types.
 * Use this in the bootstrap of your application to start observing performance entries.
 * The Entry types are specified in the PerformanceObserverEntryList type.
 *
 * @param measures - An array of performance entry types to observe.
 * @param observerCallback - The callback function that will be invoked when performance entries are recorded.
 */
const createObserver = (measures: EntryType[], observerCallback: PerformanceObserverCallback) => {
    const obs = new PerformanceObserver(observerCallback);
    obs.observe({ entryTypes: [...measures, 'measure'] });
}

export { measurePerformance, createObserver, PerformanceObserverCallback, PerformanceEntry, EntryType, performance };