import service from './DataLoaderService';
import axios from 'axios';
import sinon from 'sinon';

describe('DataLoaderService', () => {
    let getStub;
    beforeEach(() => {
        getStub = sinon.stub(axios.default, 'get');
    });

    afterEach(() => {
        getStub.restore();
    });

    it('service should have the right signature', () => {
        expect(typeof service.load).toBe('function');
    });

    it('load should return the response data', () => {
        getStub.resolves({ headers: [], data: 'Sample data Result' });
        return service.load('URL').then(result => {
            expect(result).toBe('Sample data Result');
        });
    });
});