import { ArraySomePipe } from './array-some.pipe';

describe('ArraySomePipe', () => {
    it('create an instance', () => {
        const pipe = new ArraySomePipe();
        expect(pipe).toBeTruthy();
    });
    it('should return true if array has element', () => {
        const array = [
            { name: 'Country', },
            { name: 'Operator Name', },
            { name: 'Operator Id', }
        ]
        const item = 'Country'
        const pipe = new ArraySomePipe();
        const includes = pipe.transform(array, item)
        expect(includes).toBeTruthy();
    });


    it('should return false if array does not have element', () => {
        const array = [
            { name: 'Country', },
            { name: 'Operator Name', },
            { name: 'Operator Id', }
        ]
        const item = 'Provider Name'
        const pipe = new ArraySomePipe();
        const includes = pipe.transform(array, item)
        expect(includes).toBeFalsy();
    });

});
