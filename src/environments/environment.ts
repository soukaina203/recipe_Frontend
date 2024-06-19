// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const URL_DEV = `http://localhost:5228`;

export const environment = {
  production: false,
  apiUrl: `${URL_DEV}/api`,
  url: `${URL_DEV}`,
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


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
