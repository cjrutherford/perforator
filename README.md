# Perforator

Perforator is a TypeScript-based library designed to measure and observe the performance of your application. It leverages the Performance API to provide detailed insights into the execution times of various parts of your code.

## Table of Contents

- [Perforator](#perforator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
- [Perforator](#perforator-1)
  - [Table of Contents](#table-of-contents-1)
  - [Installation](#installation-1)
  - [Usage](#usage)
    - [Performance Measurement](#performance-measurement)
    - [Observers](#observers)
    - [Visitors](#visitors)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To install the dependencies, run:

```sh
npm install
```

# Perforator

Perforator is a TypeScript-based library designed to measure and observe the performance of your application. It leverages the Performance API to provide detailed insights into the execution times of various parts of your code.

## Table of Contents

- [Perforator](#perforator)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
- [Perforator](#perforator-1)
  - [Table of Contents](#table-of-contents-1)
  - [Installation](#installation-1)
  - [Usage](#usage)
    - [Performance Measurement](#performance-measurement)
    - [Observers](#observers)
    - [Visitors](#visitors)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

To install the dependencies, run:

```sh
npm install
```

## Usage

### Performance Measurement

You can use the `measurePerformance` decorator to measure the performance of any method in your application.

```ts
import { measurePerformance } from './src/util';

class Example {
  @measurePerformance
  someMethod() {
    // method logic
  }
}
```

### Observers

Observers are used to monitor and react to performance entries. You can create a custom observer by implementing the `TimeSeriesObserver` interface.

```ts
import { createObserver, PerformanceEntry } from './src/util';
import TimeSeries from './src/time-series';

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
```

### Visitors

Visitors are used to process time series data. You can create a custom visitor by implementing the `TimeSeriesVisitor` interface.

```ts
import { FileVisitor } from './src/time-series';

const fileVisitor = new FileVisitor<PerformanceEntry>('path/to/file.json');
timeSeries.accept(fileVisitor);
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
