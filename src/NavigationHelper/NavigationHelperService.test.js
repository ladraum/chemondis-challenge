import service from './NavigationHelperService';
import axios from 'axios';
import sinon from 'sinon';

describe('NavigationHelperService', () => {
    let getStub;
    beforeEach(() => {
        getStub = sinon.stub(axios, 'get');
    });

    afterEach(() => {
        getStub.restore();
    });

    it('service should have the right signature', () => {
        expect(service.BASE_URL).toBe('https://jsonplaceholder.typicode.com/');

        expect(service.ALBUM).toBeDefined();
        expect(service.ALBUM.ITEMS_PER_PAGE).toBe('albunsPerPage');
        expect(service.ALBUM.OFFSET).toBe('albunsOffset');
        expect(service.ALBUM.TOTAL).toBe(100);

        expect(service.PHOTO).toBeDefined();
        expect(service.PHOTO.ITEMS_PER_PAGE).toBe('photosPerPage');
        expect(service.PHOTO.OFFSET).toBe('photosOffset');
        expect(service.PHOTO.TOTAL).toBe(50);

        expect(typeof service.getValueFromURL).toBe('function');
        expect(typeof service.applyParamToURL).toBe('function');
        expect(typeof service.navigateWithParams).toBe('function');
    });

    it('getValueFromURL should return empty when there is queryString in URL', () => {
        window.location.hash = '';
        const result = service.getValueFromURL('param');
        expect(result).toBe(null);
    });

    it('getValueFromURL should return empty when there is no value on URL for given parameter', () => {
        window.location.hash = '#/photos/1?albmId=2';
        const result = service.getValueFromURL('param');
        expect(result).toBe(null);
    });

    it('getValueFromURL should return the value when there is param in queryString', () => {
        window.location.hash = '#/photos/1?albmId=2';
        const result = service.getValueFromURL('albmId');
        expect(result).toBe('2');
    });

    it('applyParamToURL should add the param the queryString', () => {
        window.location.hash = '#/photos/1';
        service.applyParamToURL('albmId', 2);
        expect(window.location.hash).toBe('#/photos/1?albmId=2');
    });

    it('applyParamToURL should remove album offset when changing items per page', () => {
        window.location.hash = '#/?albunsOffset=20';
        service.applyParamToURL('albunsPerPage', 30);
        expect(window.location.hash).toBe('#/?albunsPerPage=30');
    });

    it('applyParamToURL should remove photo offset when changing items per page', () => {
        window.location.hash = '#/?photosOffset=20';
        service.applyParamToURL('photosPerPage', 30);
        expect(window.location.hash).toBe('#/?photosPerPage=30');
    });

    it('navigateWithParams should copy queryString to allow return with same params', () => {
        window.location.hash = '#/?albunsPerPage=50';
        service.navigateWithParams('#/photos/1');
        expect(window.location.hash).toBe('#/photos/1?albunsPerPage=50');
    });

    it('navigateWithParams should remove photo params when returnin to album', () => {
        window.location.hash = '#/photos/1?photosPerPage=50&photosOffset=50&albunsPerPage=50';
        service.navigateWithParams('#/');
        expect(window.location.hash).toBe('#/?albunsPerPage=50');
    });
});