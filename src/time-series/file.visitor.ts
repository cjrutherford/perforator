import TimeSeries, { TimeSeriesVisitor } from ".";
import { statSync, writeFileSync, readFile, writeFile } from 'fs';

export class FileVisitor<T> implements TimeSeriesVisitor<T> {
    private filePath: string;
  
    constructor(filePath: string) {
      this.filePath = filePath;
    try {
        statSync(this.filePath);
    } catch (err: any) {
        if (err.code === 'ENOENT') {
            writeFileSync(this.filePath, '');
        } else {
            throw err;
        }
    }
    }
  
    visit(timeSeries: TimeSeries<T>): void {
        readFile(this.filePath, 'utf8', (err, data) => {
            if (err) throw err;

            const currentData = data ? JSON.parse(data) : [];
            currentData.push(timeSeries);

            writeFile(this.filePath, JSON.stringify(currentData), 'utf8', (err) => {
                if (err) throw err;
            });
        });
    }
  }
