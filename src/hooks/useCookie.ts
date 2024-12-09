function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, time) {
    document.cookie = `${name}=${value}; path=/; max-age=${time}`
}

function removeCookie(name) {
    document.cookie = `${name}=''; path=/; max-age=-1`
}

const useCookie = () => {
    return {getCookie, setCookie, removeCookie}
}

export default useCookie