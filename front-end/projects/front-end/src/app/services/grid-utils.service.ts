import { Injectable, Inject, LOCALE_ID } from '@angular/core';

import { RowEvent } from 'ag-grid-community';
import { DateTimePipe } from '../pipes/date-time.pipe';

@Injectable()
export class GridUtilitiesService {

    private readonly DATE_PIPE = new DateTimePipe(this.locale);

    constructor(@Inject(LOCALE_ID) private locale: string) { }

    /**
     * Formatta una colonna di tipo data.
     * Esempio: Dato un tipo { patient: { birthDate: '...' } }
     *   -> dateFormatter('shortDate', ['patient', 'birthDate'])
     *
     * @param format Il formato da utilizzare (https://angular.io/api/common/DatePipe#pre-defined-format-options).
     * @param field  I(l) campi/o dell'oggetto da utilizzare.
     */
    dateFormatter(format: string, field: string);
    dateFormatter(format: string, field: string[]);
    dateFormatter(format: string, field: string | string[]) {
        const fields = typeof field === 'string'
            ? [field]
            : field;

        return this.makeFormatter(fields, value => this.DATE_PIPE.transform(value, format));
    }

    dateComparator(date1, date2) {
        if (!date1 && !date2)
            return 0;
        if (!date1)
            return -1;
        if (!date2)
            return 1;

        let d1: any = new Date(date1);
        let d2: any = new Date(date2);
        return d1 - d2;
    }
 
    // C.f. https://github.com/lodash/lodash/blob/4.17.10/lodash.js#L13125
    private makeGetter(fields: string[]) {
        return (obj: any) => {
            let iter = obj;

            for (const field of fields) {
                if (!iter) {
                    return undefined;
                } else {
                    iter = obj[field];
                }
            }

            return iter;
        };
    }

    private makeFormatter(fields: string[], fn: Function) {
        const getter = this.makeGetter(fields);

        return ($event: RowEvent) => {
            const data = getter($event.data);

            return fn(data);
        };
    }
}
