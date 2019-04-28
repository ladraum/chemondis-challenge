const ITEMS_PER_PAGE_PARAM = 'itemsPerPage';
const OFFSET_PARAM = 'offset';


const getValueFromURL = (param) => {
    const hash = window.location.hash;
    const search = hash.split('?')[1];
    const urlParams = new URLSearchParams(search);
    return urlParams.get(param);
};

const applyParamToURL = (param, newValue) => {
    const hash = window.location.hash;
    const pathParts = hash.split('?');
    const currentPage = pathParts[0];
    const search = pathParts[1];
    const urlParams = new URLSearchParams(search);
    urlParams.set(param, newValue);
    window.location.hash = `${currentPage}?${urlParams.toString()}`;
};

export default { getValueFromURL, applyParamToURL, ITEMS_PER_PAGE_PARAM, OFFSET_PARAM };