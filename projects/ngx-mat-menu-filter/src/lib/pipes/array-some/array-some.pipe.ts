import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arraySome'
})
export class ArraySomePipe implements PipeTransform {

    transform(array: any[], value: any, key?: string): boolean {
        return array.some((item) => item[key || 'name'] === value);
    }

}
