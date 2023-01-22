import React from 'react';
import PrivacyPolicy from '@components/ui/bodykore/Sections/PrivacyPolicy';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { GetServerSideProps } from 'next';
import { HeaderData, getHeader } from '@utils/header';
import { DefaultSeo } from 'next-seo';
import seo from "../public/SEO/en.json";
import SeoHeader from '@components/seoHeader';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const header = await getHeader();

  return {
    props: { header },
   // revalidate: 30 * 60,
  };
};

interface PrivacyPolicyPageParams {
  header: HeaderData;
}

const PrivacyPolicyPage = ({ header }: PrivacyPolicyPageParams) => {
  return (
    <>
      <SeoHeader seo={seo.privacy_policy} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <div className="h-4 bg-red-bc2026"></div>
        <div className='pt-20'>
            <PrivacyPolicy
            title="PRIVACY POLICY"
            paragraphs={[
                { text: 'Thank you for accessing the BodyKore.com Website (“Site”) operated by PL Import, LLC dba BodyKore (“BodyKore”). We respect your privacy and want to protect your personal information.',
                pb:'pb-6'},
                { text: 'This Privacy Policy explains how we collect, use and (under certain limited conditions) disclose your personal information. This Privacy Policy also explains the steps we have taken to secure your personal information. Finally, this Privacy Policy explains your options regarding the collection, use and disclosure of your personal information. By visiting the Site directly or through another site, you accept the practices described in this Policy.',
                pb:'pb-6'},
                { text: 'This privacy policy applies to the Site. This privacy policy does not necessarily apply to any offline collection of your personal information. Please see below for details.',
                pb:'pb-6'},
                { text: 'We are not responsible for the content or privacy practices on any web site not operated by BodyKore to which the Site links or that links to the Site.',
                pb:'pb-6'},
            ]}
            />
        </div>
        <div className='pt-3'>
            <PrivacyPolicy
            title="INFORMATION COLLECTION AND USE"
            subTitle='1. Information collection'
            pb='pb-4'
            paragraphs={[
                { text: 'We collect information from you in several different ways on this Site. One goal in collecting personal information from you is to provide an efficient, meaningful, and customized experience. We use your personal information to:',},
                { text: '- Help make the Site easier for you to use by not having to enter information more than once.',},
                { text: '- Help you quickly find information, products, and services.',},
                { text: '- Help us create content that is most relevant to you.',},
                { text: '- Alert you to new information, products, and services that we offer.',},
                { text: '- Tailor ads or other communications to be most relevant to you.',},
                { text: 'Registration and Ordering. Before using certain parts of any Site or ordering products, you must complete an online registration form. During registration, you will be prompted to provide to us certain personal information, including but not limited to your name, shipping and billing address(es), phone number, and email address. In addition, we may also ask you for your country of residence and/or your organization’s country of operation, so we can comply with applicable laws and regulations. These kinds of personal information are used for billing purposes, to fulfill your orders, to communicate with you about your order and the Sites, and for internal marketing purposes. If we encounter a problem when processing your order, your personal information may be used to contact you.',
                pb:'py-6'},
                { text: 'Email Addresses. Several locations of the Site permit you to enter your email address for purposes including but not limited to: to create a gift registry, to request us to notify you of new products; or to sign up for email newsletters and special offers. ',},
                { text: 'Cookies and Other Technology. Like many sites, the Site employs cookies and web beacons (also known as clear GIF technology or “action tags”) to speed your navigation of the Site, recognize you and your access privileges, and track your Site usage.',},
                { text:'Cookies are small pieces of information that are stored as text files by your Internet browser on your computer’s hard drive. Most Internet browsers are initially set to accept cookies. You can set your browser to refuse cookies from web sites or to remove cookies from your hard drive, but if you do, you will not be able to access or use portions of the Site. We have to use cookies to enable you to select products, place them in an online shopping cart, and to purchase those products. If you do this, we keep a record of your browsing activity and purchase. THE SITE’S COOKIES DO NOT AND CANNOT INFILTRATE A USER’S HARD DRIVE TO GATHER A USER’S CONFIDENTIAL INFORMATION. Our cookies are not “spyware.”', 
                pb:'pt-6' },
                { text:'Web beacons assist in delivering cookies and help us determine whether a web page on the Site has been viewed and, if so, how many times. For example, any electronic image on the Site, such as an ad banner, can function as a web beacon.'},
                { text:'We may use third-party advertising companies to help tailor site content to users or to serve ads on our behalf. These companies may employ cookies and web beacons to measure advertising effectiveness (such as which web pages are visited or what products are purchased and in what amount). Any information that these third parties collect via cookies and web beacons is not linked to any personal information collected by us.'},
                { text:'As an example, Facebook collects certain information via cookies and web beacons to determine which web pages are visited or what products are purchased. Please note that any information collected by Facebook via cookies and web beacons is not linked to any customer’s personal information collected by us.', 
                pb:'pb-6' },
                { text:'Log Files. As is true of most web sites, the Site server automatically recognizes the Internet URL from which you access the Site. We may also log your Internet protocol (“IP”) address, Internet service provider, and date/time stamp for system administration, order verification, internal marketing, and system troubleshooting purposes. (An IP address may indicate the location of your computer on the Internet.)'},
                { text:'Age. We respect children’s privacy. We do not knowingly or intentionally collect personal information from children under age 13. If you are under the age of 13, please do not submit any personal information to us, and rely on a parent or guardian to assist you.'},
                { text:'Product Reviews. You may choose to submit a product review. If you post a review, we will ask for your email address. Your email address will be kept private). Also, any personally identifiable information that you submit as part of the review can be read or used by other visitors to the Site. We are not responsible for any personally identifiable information that you choose to submit as part of your review. We believe you can post a helpful review without disclosing any personal information.'},     
            ]}
            />
        </div>
        <div className='pt-8'>
            <PrivacyPolicy
            subTitle='2. Information Use and Disclosure'
            pb='pb-4'
            paragraphs={[
                { text:'Internal Use. We use your personal information to process your order and provide you with customer service. We may internally use your personal information to improve the Sites’ content and layout, to improve outreach and for our own marketing efforts (including marketing our services and products to you), and to determine general marketplace information about visitors to the Site. In order to facilitate such use and the other use described in this Section 2, we may share your information with affiliates under BodyKore’s control.', 
                pb:'pb-6' },
                { text:'Communications with You: We will use your personal information to communicate with you about the Site and your orders and deliveries. Also, we may send you a confirmation email when you register with us. We may send you a service-related announcement on the rare occasions when it is necessary (for example, if we must temporarily suspend our service for maintenance.) Also, you may submit your email address for reasons such as to create a gift registry, to request us to notify you of new products; or to sign up for email newsletters and special offers. If you submit your email address, we use it to deliver the information to you. We always permit you to unsubscribe or opt out of future emails (see the opt out section, below, for more details). Because we have to communicate with you about orders that you choose to place, you cannot opt out of receiving emails related to your orders.'},
                { text:'External Use. We want to provide you with excellent service and to offer you a great selection. We do not sell, rent, trade, license or otherwise disclose your specific personal information or financial information to anyone other than to affiliates under BodyKore’s control, except that: ', 
                pb:'pb-6' },
                { text:'As do most catalog and Internet retailers, we sometimes use others to perform specific functions on our behalf. When we disclose information to these service providers, we disclose information to help them to perform their service. For example, in order to deliver products to you, we must share some information. We partner with third parties (such as the U.S. Postal Service, United Parcel Service, and Federal Express) to ship products, to ensure delivery, and so that we can obtain feedback, improve the quality of our service, and measure and improve the quality of the service of the third party. In the example of shippers, we provide them some personally identifiable information such as your name, shipping address, email, and phone number.', 
                pb:'pb-6' },
                { text:'Similarly, to help you buy products and provide customer service to you, we must provide your credit card number to financial-services corporations such as credit-card processors and issuers. When we submit your credit card number for authorization, we use state-of-the-art data encryption to protect your information. (More on this below in Data Security.)'},
                { text:'We may disclose such information in response to requests from law enforcement officials conducting investigations; subpoenas; a court order; or if we are otherwise required to disclose such information by law. We also will release personal information where disclosure is necessary to protect our legal rights, enforce our Terms of Use or other agreements, or to protect ourselves or others. For example, we may share information to reduce the risk of fraud or if someone uses or attempts to use the Site for illegal reasons or to commit fraud.',},
                { text:'We will not sell (or trade or rent) personally identifiable information to other companies as part of our regular course of business. However, it’s possible that we might acquire or merge with or be acquired by another company or that we might dispose of some or all of our assets. If that happens, your personal information may be disclosed to another company, but that disclosure will be subject to the Privacy Policy in effect.',},
                { text:'We may share non-personal information (such as the number of daily visitors to a particular web page, or the size of an order placed on a certain date) with third parties such as advertising partners. This information does not directly personally identify you or any user.'},

            ]}
            />
        </div>
        <div className='pt-8'>
            <PrivacyPolicy
            subTitle='3. Contests and Other Promotions'
            pb='pb-4'
            paragraphs={[
                { text:'From time to time, we may offer contests, sweepstakes or other promotions. Participation in these promotions may require registration (see 1. Information Collection, above). If you participate in these promotions, we collect contact information such as your name, address, and email address and we may share this information with co-sponsors or other third parties involved in the presentation of the promotion that we identify in the rules or entry materials. We don’t control these third parties’ privacy practices, and our Privacy Policy does not apply to their collection and use of your information. We may also share some of your entry information with third parties or the public in connection with the administration of the promotion, such as winner selection and prize fulfillment, and as permitted by the promotion’s official rules, such as on a winners’ list.' }
            ]}
            />
        </div>

        <div className='pt-8 pb-20'>
            <PrivacyPolicy
            title="DATA SECURITY"
            paragraphs={[
                { text:'The Site incorporates physical, electronic, and administrative procedures to safeguard the confidentiality of your personal information, including Secure Sockets Layer (“SSL”) for all financial transactions through the Site. We use SSL encryption to protect your personal information online, and we also take several steps to protect your personal information in our facilities. Access to your personal information is restricted. Only employees who need access to your personal information to perform a specific job are granted access to your personal information. Finally, we rely on third-party service providers for the physical security of some of our computer hardware. We believe that their security procedures are adequate. For example, when you visit the Site, you access servers that are kept in a secure physical environment, behind a locked cage and an electronic firewall.', 
                pb:'pb-6' },
                { text:'While we use industry-standard precautions to safeguard your personal information, we cannot guarantee complete security. 100% complete security does not presently exist anywhere online or offline.'},
            ]}
            />
        </div>
      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default PrivacyPolicyPage;