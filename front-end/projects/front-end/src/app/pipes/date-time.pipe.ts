import { Pipe } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
    name: "datetime",
    pure: true
})
export class DateTimePipe extends DatePipe {

    transform(value: any, pattern: string = "medium"): string | null {

        let resultDate;

        if (value) {

            if (value instanceof Date) {

                resultDate = value;
            } else {

                var temp = new Date(value);
                if (value.indexOf('Z') == -1) {
                    temp = new Date(value + 'Z');
                }

                // TODO refactor of timezone offset
                var offset = temp.getTimezoneOffset() / 30;

                resultDate = new Date(Date.UTC(
                    temp.getFullYear(),
                    temp.getMonth(),
                    temp.getDate(),
                    (temp.getHours() + offset),
                    temp.getMinutes()
                ));
            }

            return super.transform(resultDate, pattern);
        }
    }
}
