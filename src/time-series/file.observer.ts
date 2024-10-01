import { readFile, statSync, writeFile, writeFileSync } from "fs";
import TimeSeries, { TimeSeriesObserver } from ".";

export class FileObserver<T> implements TimeSeriesObserver<T> {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    try{
        statSync(this.filePath);
    } catch(e: any) {
        if (e.code === 'ENOENT') {
            writeFileSync(this.filePath, '');
        } else {
            throw e;
        }
    } 
  }

  update(timeSeries: TimeSeries<T>): void {
    readFile(this.filePath, 'utf8', (err, data) => {
        if (err) throw err;
    
        const currentData = data ? JSON.parse(data) : [];
        currentData.push(timeSeries.getData());
    
        writeFile(this.filePath, JSON.stringify(currentData), 'utf8', (err) => {
            if (err) throw err;
        });
    });
  }
}