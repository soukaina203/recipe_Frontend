const URL_PROD = `dish-api.cloud.dev-solus.com`;


export const environment = {
  production: true,
  apiUrl : `${URL_PROD}/api`,
  url : `${URL_PROD}`,
  mobile : false
};
export function displayImage(urlImage: string, url = environment.url) {
    const IMAGE = 'assets/images/detail/yugi-back.jpg';

    if (!urlImage) {
        return IMAGE;
    }

    if (urlImage.startsWith('[') && urlImage.endsWith(']')) {
        try {
            const img: string = (JSON.parse(urlImage) as string[])[0];
            return `${url}/${img}`;
        } catch (error) {
            return IMAGE;
        }
    }

    if (urlImage?.startsWith('http')) {
        return urlImage;
    }
    if (!urlImage.includes('/')) {
        return IMAGE;
    }

    if (urlImage.startsWith('data:')) {
        return urlImage;
    }

    return `${url}/${urlImage}`;
}
