export const getReviewsPrivate = async () => {
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    `Basic ${btoa(
      `${process.env.NEXT_PUBLIC_STAMPED_API_KEY_PUBLIC}:${process.env.STAMPED_API_KEY_PRIVATE}`
    )}`
  );
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  fetch(
    `https://stamped.io/api/v2/${process.env.NEXT_PUBLIC_STAMPED_STORE_HASH}/dashboard/reviews`,
    requestOptions as RequestInit
  )
    .then((response) => response.json())
    .then((result) => console.log(JSON.stringify(result)))
    .catch((error) => console.log('error', error));
};

export interface Review {
  id: string;
  author: string;
  reviewTitle: string;
  reviewMessage: string;
  reviewRating: number;
  reviewDate: string;
  reviewUserPhotos: any;
  reviewVerifiedType: number;
  location: string;
  countryIso: string;
  reviewVotesUp: string;
  reviewVotesDown: string;
  productImageLargeUrl:string;
  isRecommend: boolean;
}

export const getReviewsOfProduct = async (
  productId: string
): Promise<Review[] | undefined> => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const params = new URLSearchParams();
  params.append('productId', productId);
  params.append('minRating', '1'); // Without this it only returns 5 stars
  params.append('storeUrl', process.env.NEXT_PUBLIC_STAMPED_STORE_HASH!);
  params.append('apiKey', process.env.NEXT_PUBLIC_STAMPED_API_KEY_PUBLIC!);

  try {
    const res = await fetch(
      `http://stamped.io/api/widget/reviews?${params.toString()}`,
      requestOptions as RequestInit
    );
    const resJson = await res.json();
    // The request also return metadata and more review information than explicit
    // in the interface
    return resJson.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getHomeReviews = async (): Promise<Review[]> => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const params = new URLSearchParams();
  params.append('sortReviews', 'highest-rating');
  params.append('minRating', '1'); // Without this it only returns 5 stars
  params.append('storeUrl', process.env.NEXT_PUBLIC_STAMPED_STORE_HASH!);
  params.append('apiKey', process.env.NEXT_PUBLIC_STAMPED_API_KEY_PUBLIC!);
  params.append('take', '6');

  try {
    const res = await fetch(
      `http://stamped.io/api/widget/reviews?${params.toString()}`,
      requestOptions as RequestInit
    );
    const resJson = await res.json();
    // The request also return metadata and more review information than explicit
    // in the interface
    return resJson.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getReviewsOfUser = async (
  email: string
): Promise<Review[] | undefined> => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const params = new URLSearchParams();
  params.append('email', email);
  params.append('storeUrl', process.env.NEXT_PUBLIC_STAMPED_STORE_HASH!);
  params.append('apiKey', process.env.NEXT_PUBLIC_STAMPED_API_KEY_PUBLIC!);

  try {
    const res = await fetch(
      `http://stamped.io/api/widget/reviews?${params.toString()}`,
      requestOptions as RequestInit
    );
    const resJson = await res.json();
    // The request also return metadata and more review information than explicit
    // in the interface
    return resJson.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export interface ReviewInput {
  productId: string;
  authorName: string;
  authorEmail: string;
  authorLocation?: string;
  reviewRating: number;
  reviewTitle: string;
  reviewMessage: string;
  reviewRecommend?: boolean;
}
/**
 * Use shopify's id for productId so that the elements link on Stamped.
 * When using the Storefront API, shopify returns the id encoded in Base64,
 * decode it and then take the id from the link obtained.
 * @param param0
 * @returns
 */
export const createReview = async ({
  productId,
  authorName,
  authorEmail,
  authorLocation,
  reviewRating,
  reviewTitle,
  reviewMessage,
  reviewRecommend,
}: ReviewInput): Promise<boolean> => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const formdata = new URLSearchParams();
  formdata.append('productId', productId);
  formdata.append('author', authorName);
  formdata.append('email', authorEmail);
  formdata.append('location', authorLocation || '');
  formdata.append('reviewRating', reviewRating.toString());
  formdata.append('reviewTitle', reviewTitle);
  formdata.append('reviewMessage', reviewMessage);
  formdata.append('reviewRecommendProduct', reviewRecommend ? 'true' : 'false');
  // formdata.append('productName', productTitle);
  // formdata.append('productSKU', "Product's Sku");
  // formdata.append(
  //   'productImageUrl',
  //   'https://example.com/image/product-image.png'
  // );
  // formdata.append(
  //   'productUrl',
  //   'https://example.com/products/product-image.png'
  // );
  formdata.append('reviewSource', 'api');
  // formdata.append('photo0', fileInput.files[0], 'file');
  // formdata.append('video0', fileInput.files[0], 'file');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };
  const params = new URLSearchParams();
  params.append('apiKey', process.env.NEXT_PUBLIC_STAMPED_API_KEY_PUBLIC!);
  params.append('sId', process.env.NEXT_PUBLIC_STAMPED_STORE_HASH!);

  try {
    const res = await fetch(
      `https://stamped.io/api/reviews3?${params.toString()}`,
      requestOptions as RequestInit
    );
    // The query also return information about the review if needed
    // console.log(await res.text());
    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const voteReview = async (
  reviewId: string,
  vote: boolean
): Promise<boolean> => {
  const formdata = new URLSearchParams();
  formdata.append('reviewId', reviewId);
  formdata.append('vote', vote ? '1' : '-1');
  formdata.append('apikey', process.env.NEXT_PUBLIC_STAMPED_API_KEY_PUBLIC!);
  formdata.append('sId', process.env.NEXT_PUBLIC_STAMPED_STORE_HASH!);
  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };
  try {
    const res = await fetch(
      'https://stamped.io/api/reviews/vote',
      requestOptions as RequestInit
    );
    return res.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
