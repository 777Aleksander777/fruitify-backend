import { getStrapiURL } from "../lib/utils";
import qs from "qs";

const baseURL = getStrapiURL();

async function fetchData(url: string) {
    // console.log("############################")
    // console.log(url);
    // console.log("############################")
    const authToken = null;
    const headers = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
        },
    };

    try{
        const res = await fetch(url, authToken ? headers: {});
        const data = await res.json();
        return data;
    } catch(error) {
        console.error("Cannot fetch data: " + error);
        throw error;
    }
}


export async function getGlobalData() {
    
    const url = new URL('/api/global', baseURL);
    
    url.search = qs.stringify({
        populate: {
            naglowek: {
                populate: {
                    logo: {
                        populate: {
                            // fields: ["href", "label"], // Don't have to populate simple fields
                            zdjecie: {
                                fields: ["url", "name", "alternativeText", "height", "width"],
                            }
                        },
                    },
                    linki: true,
                    cta: true,
                }
            },
            stopka: {
                populate: {
                    logo: {
                        populate: {
                            zdjecie: {
                                fields: ["url", "name", "alternativeText", "height", "width"],
                            },
                        },
                    },
                    linki: true,
                }
            }
        }
    });
    
    return await fetchData(url.href);
}

export async function getGlobalMetadata() {

    const url = new URL('/api/global', baseURL);
    
    url.search = qs.stringify({
        fields: ["title", "description"],
    })
    
    return await fetchData(url.href);
}
export async function getHomePage() {
    
    const url = new URL('/api/home', baseURL);

    url.search = qs.stringify({
        // fields: ["title", "description"],
        populate: {
            blocks: {
              on: {
                  "elements.video": {
                      populate: {
                          video: {
                        populate: true
                    },
                }
                  },
                  "layout.promowane": {
                      populate: {
                    produkt: {
                        populate: {
                            produkty: {
                                populate: {
                                    zdjecie: {
                                        fields: ["url", "name", "alternativeText", "width", "height"]
                                    }
                                }
                            }
                        }
                    }
                },
            },
            "layout.pytania": {
                populate: {
                    pytaniaIOdpowiedzi: {
                        populate: '*',
                    },
                },
            },
              }
            }
        }
    });

    const data = await fetchData(url.href);

    return data;
}

type Category =  'WSZYSTKO' | 'OWOCE' | 'WARZYWA'


export async function getProducts( category: Category): Promise<any> {

    let productsPath = '/api/produkties';

    const url = new URL(productsPath, baseURL);
    
    if (category !== 'WSZYSTKO') {
        url.search = qs.stringify({
            filters: {
                kategoria: {
                  $eq: `${category}`,
                },
                dostepny: {
                    $eg: true,
                }
            },
            populate: {
              zdjecie: {
                fields: ["url", "name", "alternativeText", "width", "height"]
              }
            }
        })
    } 
    else{
        url.search = qs.stringify({
            filters: {
                dostepny: {
                    $eg: true,
                },
            },
            populate: {
                populate: '*',
                zdjecie: {
                    fields: ["url", "name", "alternativeText", "height", "width"],
                },
            }
        })
    }
    
    return await fetchData(url.href);
}

export async function getProductData( slug: string): Promise<any> {

    const url = new URL(`/api/produkties`, baseURL);

    url.search = qs.stringify({
        filters: {
            slug:{
                $eq: `${slug}`
            }
        },
        populate: {
            zdjecie: {
                fields: ["url", "name", "alternativeText", "height", "width"],
            }
        }
    })

    const data = await fetchData(url.href);
    if (data.data.length !== 1) { return null; }
    return data;
}