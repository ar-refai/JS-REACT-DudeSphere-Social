import sanityClient  from '@sanity/client';
import imagUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '40e9rs4v',
    dataset:'production',
    apiVersion:'2024-02-09',
    useCdn:true,
    token: 'sklqfIsu0MjWxWgMaSfxjYb75YTfcYFtDnmbphvr7N1Dj9EhlNazSv84JA6BAzNtfhTNk712pOlH2PYCQ5hU40LzCRDtKuCGWJDBIMRqhmkoAfiwYbgkGrZGMs8VkhYRJQAA1if53XySgcmIbUvOS55DRwESWmmevONqW2tYwrIeyjMMh4pZ',

});
const builder = imagUrlBuilder(client);
export const urlfor = (source) => builder.image(source);