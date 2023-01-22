import { NextSeo } from "next-seo"

interface ISeo {
    seo: {
        title: string,
        description: string,
        noIndex?: boolean,
        nofollow?: boolean,
        image: {
          url: string
        }
    }
}
const SeoHeader = ({seo}: ISeo) => {
    return (
        <NextSeo 
            title={seo?.title}
            description={seo?.description}
            noindex={seo.noIndex || false}
            nofollow={seo.nofollow || false}
            openGraph={{
                title: seo?.title,
                description: seo?.description,
                images: [
                {
                    url: seo?.image?.url,
                    width: 800,
                    height: 600,
                    alt: seo?.title,
                }
                ],
                site_name: seo?.title,
            }}
            twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
            }}
        />
    )
}

export default SeoHeader;