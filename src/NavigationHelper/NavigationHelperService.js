const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const ALBUM = {
    ITEMS_PER_PAGE: 'albunsPerPage',
    OFFSET: 'albunsOffset',
    TOTAL: 100
};
const PHOTO = {
    ITEMS_PER_PAGE: 'photosPerPage',
    OFFSET: 'photosOffset',
    TOTAL: 50
}

const getValueFromURL = (param) => {
    const pathParts = getURLParts();
    const search = pathParts[1];
    const urlParams = new URLSearchParams(search);
    return urlParams.get(param);
};

const getURLParts = () => {
    const hash = window.location.hash;
    return hash.split('?');
}

const applyParamToURL = (param, newValue) => {
    const pathParts = getURLParts();
    const currentPage = pathParts[0];
    const search = pathParts[1];
    const urlParams = new URLSearchParams(search);
    urlParams.set(param, newValue);
    if (param === ALBUM.ITEMS_PER_PAGE) {
        urlParams.delete(ALBUM.OFFSET);
    }
    if (param === PHOTO.ITEMS_PER_PAGE) {
        urlParams.delete(PHOTO.OFFSET);
    }
    window.location.hash = `${currentPage}?${urlParams.toString()}`;
};

const navigateWithParams = (newURL) => {
    const pathParts = getURLParts();
    const search = pathParts[1] ? '?' + pathParts[1] : '';
    window.location.hash = newURL + search;
}

export default { BASE_URL, ALBUM, PHOTO, getValueFromURL, applyParamToURL, navigateWithParams };