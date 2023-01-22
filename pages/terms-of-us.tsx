import React from 'react';
import TermsOfUse from '@components/ui/bodykore/Sections/TermsOfUse';
import TermsOfUse2 from '@components/ui/bodykore/Sections/TermsOfUse2';
import TermsOfUse3 from '@components/ui/bodykore/Sections/TermsOfUse3';
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

interface TermsOfUsePageParams {
  header: HeaderData;
}

const TermsOfUsePage = ({ header }: TermsOfUsePageParams) => {
  return (
    <>
      <SeoHeader seo={seo.terms_use} />

    {/*<Header productCat={header.categories} dynamicPages={header.pages} />*/}
      <main className="w-full">
        <div className="h-4 bg-red-bc2026"></div>
        <div className='pt-20'>
            <TermsOfUse
            title="TERMS OF USE"
            paragraphs={[
                { text: 'Welcome to the BodyKore website (the “Site”). BODYKORE INC dba BodyKore (“BodyKore”) provides services to you subject to the notices, terms, and conditions set forth in this agreement (the “Agreement”). In addition, when you use any of our services (e.g., Customer Reviews), you will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they are incorporated into this Agreement by this reference. We reserve the right to change this Site and these terms and conditions at any time. ACCESSING, BROWSING OR OTHERWISE USING THE SITE INDICATES YOUR AGREEMENT TO ALL THE TERMS AND CONDITIONS IN THIS AGREEMENT, SO PLEASE READ THIS AGREEMENT CAREFULLY BEFORE PROCEEDING.',}
            ]}
            />
        </div>
        
        <div className='pt-3'>
            <TermsOfUse
            title="USE OF SITE"
            paragraphs={[
                { text: 'You represent and warrant that you are at least 18 years old or visiting the Site under the supervision of a parent or guardian. Subject to the terms and conditions of this Agreement, we hereby grant you a limited, revocable, non-transferable and non-exclusive license to access and use the Site by displaying it on your internet browser only for the purpose of shopping for items sold on the Site and not for any commercial use or use on behalf of any third party, except as explicitly permitted by us in advance. Any breach of this Agreement shall result in the immediate revocation of the license granted in this paragraph without notice to you.',},
                { text: 'Except as permitted in the paragraph above, you may not reproduce, distribute, display, sell, lease, transmit, create derivative works from, translate, modify, reverse-engineer, disassemble, decompile or otherwise exploit this Site or any portion of it unless expressly permitted by us in writing. You may not make any commercial use of any of the information provided on the Site or make any use of the Site for the benefit of another business unless explicitly permitted by us in advance. We reserve the right to refuse service, terminate accounts, and/or cancel orders at its discretion, including, without limitation, if we believe that customer conduct violates applicable law or is harmful to our interests.',},
                { text: 'You shall not upload to, distribute, or otherwise publish through this Site any Content, information, or other material that (a) violates or infringes the copyrights, patents, trademarks, service marks, trade secrets, or other proprietary rights of any person; (b) is libelous, threatening, defamatory, obscene, indecent, pornographic, or could give rise to any civil or criminal liability under U.S. or international law; or (c) includes any bugs, viruses, worms, trap doors, Trojan horses or other harmful code or properties.',},
                { text: 'Content provided on this site is solely for informational purposes. It is your sole responsibility to consult a licensed physician or qualified health care professional for advice, diagnosis, and/or treatment of any health related condition or to ensure that you are well enough for physical activities. Submissions or opinions expressed on this Site are that of the individual expressing such Submission or opinion and may not reflect our opinions. Product representations expressed on this Site of products that are not manufactured by BodyKore are that of the vendor and are not made by us.',},
                { text: 'We may assign you a password and account identification to enable you to access and use certain portions of this Site. Each time you use a password or identification, you will be deemed to be authorized to access and use the Site in a manner consistent with the terms and conditions of this Agreement, and we have no obligation to investigate the authorization or source of any such access or use of the Site. YOU WILL BE SOLELY RESPONSIBLE FOR ALL ACCESS TO AND USE OF THIS SITE BY ANYONE USING THE PASSWORD AND IDENTIFICATION ORIGINALLY ASSIGNED TO YOU WHETHER OR NOT SUCH ACCESS TO AND USE OF THIS SITE IS ACTUALLY AUTHORIZED BY YOU, INCLUDING WITHOUT LIMITATION, ALL COMMUNICATIONS AND TRANSMISSIONS AND ALL OBLIGATIONS (INCLUDING WITHOUT LIMITATION FINANCIAL OBLIGATIONS) INCURRED THROUGH SUCH ACCESS OR USE. You are solely responsible for protecting the security and confidentiality of the password and identification assigned to you. You shall immediately notify us of any unauthorized use of your password or identification or any other breach or threatened breach of this Site’s security.',},
            ]}
            />
        </div>

        <div className='pt-3'>
            <TermsOfUse
            title="REVIEWS AND COMMENTS"
            paragraphs={[
                { text: 'Except as otherwise provided elsewhere in this Agreement or on the Site, anything that you submit or post to the Site and/or provide us, including without limitation, ideas, know-how, techniques, questions, reviews, comments, and suggestions (collectively, “Submissions”) is and will be treated as nonconfidential and nonproprietary, and we shall have the royalty-free, worldwide, perpetual, irrevocable and transferable right to use, copy, distribute, display, publish, perform, sell, lease, transmit, adapt, create derivative works from such Submissions by any means and in any form, and to translate, modify, reverse-engineer, disassemble, or decompile such Submissions. All Submissions shall automatically become our sole and exclusive property and shall not be returned to you.',},
                { text: 'In addition to the rights applicable to any Submission, when you post comments or reviews to the Site, you also grant us the right to use the name that you submit with any review, comment, or other Content, if any, in connection with such review, comment, or other content. You represent and warrant that you own or otherwise control all of the rights to the reviews, comments and other Content that you post on this Site and that use of your reviews, comments, or other Content by us will not infringe upon or violate the rights of any third party. You shall not use a false e mail address, pretend to be someone other than yourself or otherwise mislead us or third parties as to the origin of any Submissions or Content. We may, but shall not be obligated to, remove or edit any Submissions (including comments or reviews) for any reason.',},
            ]}
            />
        </div>

        <div className='pt-3'>
            <TermsOfUse
            title="INTELLECTUAL PROPERTY"
            paragraphs={[
                { text: 'All text, graphics, button icons, images, audio clips, and software (collectively, “Content”), belongs exclusively to BodyKore, or its affiliates, or is being used by BodyKore under license. The collection, arrangement, and assembly of all Content on this Site (the “Compilation”) belongs exclusively to BodyKore or its affiliates. All software used on this Site (the “Software”) is the property of BodyKore, its affiliates or its Software suppliers. The Content, the Compilation and the Software are all protected by U.S. and international copyright laws. BodyKore and other logos, slogans, trade names or words are registered trademarks, trademarks or service marks of BodyKore, its affiliates, suppliers, or third parties. The use of any of our trademarks or service marks without our express written consent is strictly prohibited. You may not use our trademarks or service marks in connection with any product or service in any way that is likely to cause confusion. You may not use our trademarks or service marks in any manner that disparages or discredits us. You may not use any of our trademarks or service marks in meta tags without prior explicit consent.',},
            ]}
            />
        </div>

        <div className='pt-3'>
            <TermsOfUse2
            title="PRIVACY POLICY"
            text1='Please review our Privacy Policy, which also governs your visit to this Site, to understand our practices. Read our'
            text2='Privacy Policy'
            link='/privacy-policy'
            />
        </div>

        <div className='pt-3'>
            <TermsOfUse
            title="RISK OF LOSS; USE OF ACCOUNT"
            paragraphs={[
                { text: 'The risk of loss and title for items purchased by you pass to you upon our delivery of the items to the carrier. If you use a BodyKore account, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password. BodyKore does sell products for children, but it sells them to adults, who can purchase with a credit card or other permitted payment method. If you are under 18, you may use the BodyKore services only with involvement of a parent or guardian. BodyKore reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders in its sole discretion.',},
            ]}
            />
        </div>

        <div className='pt-3'>
            <TermsOfUse
            title="TERMINATION & EFFECT OF TERMINATION"
            paragraphs={[
                { text: 'In addition to any other legal or equitable remedies, we may, without prior notice to you, immediately terminate the Agreement or revoke any or all of your rights granted under this Agreement. Upon any termination of this Agreement, you shall immediately cease all access to and use of the Site and we shall, in addition to any other legal or equitable remedies, immediately revoke all password(s) and account identification issued to you and deny your access to and use of this Site in whole or in part. Any termination of this Agreement shall not affect the respective rights and obligations (including without limitation, payment obligations) of the parties arising before the date of termination.',},
            ]}
            />
        </div>
        <div className='pt-3'>
            <TermsOfUse
            title="INTERNATIONAL ACCESS"
            paragraphs={[
                { text: 'This Site may be accessed from countries other than the United States. This Site may contain products or references to products that are not available outside of the United States. Any such references do not imply that such products will be made available outside the United States. If you access and use this Site outside the United States you are responsible for complying with your local laws and regulations.',},
            ]}
            />
        </div>
        <div className='pt-3'>
            <TermsOfUse
            title="DISCLAIMER AND LIMITATION OF LIABILITY"
            paragraphs={[
                { text: 'EXCEPT AS OTHERWISE SET FORTH ON THIS SITE, INCLUDING WITHOUT LIMITATION THE PRODUCT DESCRIPTIONS OF SPECIFIC PRODUCTS, THIS SITE, THE PRODUCTS OFFERED FOR SALE ON IT AND THE TRANSACTIONS CONDUCTED THROUGH IT ARE PROVIDED BY US ON AN “AS IS” BASIS. WE MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE SITE OR THE INFORMATION, CONTENT, MATERIALS, OR PRODUCTS INCLUDED ON THIS SITE. TO THE FULL EXTENT PERMISSIBLE BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, NONINFRINGEMENT, TITLE, QUIET ENJOYMENT, DATA ACCURACY AND SYSTEM INTEGRATION. THIS SITE MAY INCLUDE INACCURACIES, MISTAKES OR TYPOGRAPHICAL ERRORS. WE DO NOT WARRANT THAT THE CONTENT WILL BE UNINTERRUPTED OR ERROR FREE.',},
                { text: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THIS SITE, INCLUDING, BUT NOT LIMITED TO INDIRECT, INCIDENTAL, PUNITIVE, EXEMPLARY, SPECIAL OR CONSEQUENTIAL DAMAGES. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL LIABILITY TO YOU FOR ANY DAMAGES (REGARDLESS OF THE FOUNDATION FOR THE ACTION) SHALL NOT EXCEED IN THE AGGREGATE THE AMOUNT OF FEES ACTUALLY PAID BY YOU TO US DURING THE MONTH IMMEDIATELY PRECEDING THE ACT ALLEGEDLY GIVING RISE TO OUR LIABILITY.',},
            ]}
            />
        </div>
        <div className='pt-3'>
            <TermsOfUse
            title="LINKS"
            paragraphs={[
                { text: 'This site may contain links to other sites on the Internet that are owned and operated by third parties. You acknowledge that we are not responsible for the operation of or content located on or through any such site.',},
            ]}
            />
        </div>
        <div className='pt-3'>
            <TermsOfUse
            title="COPYRIGHT COMPLAINTS"
            paragraphs={[
                { text: 'We respect the intellectual property of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please follow our Notice and Procedure for Making Claims of Copyright Infringement located at the bottom of this page.',},
            ]}
            />
        </div>

        <div className='pt-3'>
            <TermsOfUse
            title="REMEDIES"
            paragraphs={[
                { text: 'You agree that our remedy at law for any actual or threatened breach of this Agreement would be inadequate and that we shall be entitled to specific performance or injunctive relief, or both, in addition to any damages that we may be legally entitled to recover, together with reasonable expenses of any form of dispute resolution, including, without limitation, attorneys’ fees.',},
                { text: 'No right or remedy of ours shall be exclusive of any other, whether at law or in equity, including without limitation damages injunctive relief, attorneys’ fees and expenses.',},
                { text: 'No instance of waiver by us of our rights or remedies under these terms and conditions shall imply any obligation to grant any similar, future or other waiver.',},
            ]}
            />
        </div>

        <div className='pt-3'>
            <TermsOfUse
            title="APPLICABLE LAW"
            paragraphs={[
                { text: 'This site is created and controlled by us in the State of California, USA. As such, the laws of the State of California will govern these disclaimers, terms, and conditions, without giving effect to any principles of conflicts of laws.',},
            ]}
            />
        </div>
        <div className='pt-3'>
            <TermsOfUse
            title="DISPUTES"
            paragraphs={[
                { text: 'Any dispute relating in any way to your visit to the Site or to the products you purchase through the Site shall be submitted to confidential arbitration in Garden Grove, CA except that to the extent you have in any manner violated or threatened to violate our intellectual property rights, we may seek injunctive or other appropriate relief in any state or federal court in the State of California. You hereby consent to, and waive all defenses of lack of personal jurisdiction and forum non conveniens with respect to venue and jurisdiction in the state and federal courts of California. Arbitration under these Terms of Use shall be conducted pursuant to the Commercial Arbitration Rules then prevailing at the American Arbitration Association. The arbitrator’s award shall be final and binding and may be entered as a judgment in any court of competent jurisdiction. To the fullest extent permitted by applicable law, no arbitration under this Agreement shall be joined to an arbitration involving any other party subject to this Agreement, whether through class action proceedings or otherwise. You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of, related to or connected with the use of the Site or this Agreement must be filed within one (1) year after such claim or cause of action arose or be forever banned.',},
            ]}
            />
        </div>
        <div className='pt-3'>
            <TermsOfUse
            title="SERVERABILITY"
            paragraphs={[
                { text: 'If any these provisions shall be deemed invalid, void, or for any reason unenforceable, that condition shall be deemed several and shall not affect the validity and enforceability of any remaining provision.',},
            ]}
            />
        </div>
        <div className='pt-2 pb-3'>
            <TermsOfUse
            title="OUR ADDRESS"
            paragraphs={[
                { text: 'Please send any questions or comments (including all inquiries unrelated to copyright infringement) regarding this Site to:',},
            ]}
            text1='BodyKore'
            text2='7441 Garden Grove Blvd. Unit H'
            text3='Garden Grove, CA 92841'
            />
        </div>
        <div className='pt-5'>
            <TermsOfUse3
            title="NOTICE AND PROCEDURE FOR MAKING CLAIMS OF COPYRIGHT INFRINGEMENT"
            text='If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our copyright agent the written information specified below. Please note that this procedure is exclusively for notifying us and our affiliates and its affiliates that your copyrighted material has been infringed.'
            list={[
                { text: 'An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;',},
                { text: 'A description of the copyrighted work that you claim has been infringed upon;',},
                { text: 'A description of where the material that you claim is infringing is located on the site;',},
                { text: 'Your address, telephone number, and e-mail address;',},
                { text: 'A statement by you that you have a good-faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;',},
                { text: 'A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf.',},
            ]}
            />
        </div>
      </main>
    {/* <Footer productCat={header.categories} />*/}
    </>
  );
};

export default TermsOfUsePage;