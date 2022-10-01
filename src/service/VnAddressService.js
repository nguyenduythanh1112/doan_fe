export function getProvince() {
    var requestOptions = {
        method: 'GET',
    };
    return fetch("https://api.mysupership.vn/v1/partner/areas/province", requestOptions)
}

export function getDistrict(codeProvince) {
    var requestOptions = {
        method: 'GET',
    };
    return fetch(`https://api.mysupership.vn/v1/partner/areas/district?province=${codeProvince}`, requestOptions)
}

export function getCommune(codeDistrict) {
    var requestOptions = {
        method: 'GET',
    };
    return fetch(`https://api.mysupership.vn/v1/partner/areas/commune?district=${codeDistrict}`, requestOptions)
}

