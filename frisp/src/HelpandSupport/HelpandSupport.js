import { useState } from 'react'
import '../MainFilters/SliderPopup.css';

const HelpandSupport = () => {

    const [activeDiv, setActiveDiv] = useState(1);
    const handleItemClick = (divId) => {
        setActiveDiv(divId);
    };
    const Partneritem = [
        {
            title: "I want to partner my restaurant with Frisp",
            content: "Partner with us"
        },
        {
            title: "What are the mandatory documents needed to list my restaurant on Frisp?",
            content: "- Copies of the below documents are mandatory - FSSAI Licence OR FSSAI Acknowledgement -  Pan Card             -  GSTIN Certificate            -  Cancelled Cheque OR bank Passbook            -  Menu "
        },
        {
            title: "After I submit all documents, how long will it take for my restaurant to go live on Frisp?",
            content: "After all mandatory documents have been received and verified it takes upto 7-10 working days for the onboarding to be completed and make your restaurant live on the platform."
        },
        {
            title: "What is this one time Onboarding fees? Do I have to pay for it while registering?",
            content: "This is a one-time fee charged towards the system & admin costs incurred during the onboarding process. It is deducted from the weekly payouts after you start receiving orders from Frisp."
        },
        {
            title: "Who should I contact if I need help & support in getting onboarded?",
            content: "You can connect with Partner Support on 080-67466777/68179777 or write to partnersuport@Frisp.in."
        },
        {
            title: "How much commission will I be charged by Frisp?",
            content: "The commission charges vary for different cities. You will be able to see the commission applicable for you once the preliminary onboarding details have been filled."
        }
        ,
        {
            title: "I dont have an FSSAI licence for my restaurant. Can it still be onboarded?",
            content: "FSSAI licence is a mandatory requirement according to the governments policies. However, if you are yet to receive the licence at the time of onboarding, you can proceed with the acknowledgement number which you will have received from FSSAI for your registration."
        }
    ]
    const items = [
        {
            title: "Terms of Use",
            content: "These terms of use (the Terms of Use) govern your use of our website www.Frisp.in (the Website) and our Frisp application for mobile and handheld devices (the App). The Website and the App are jointly referred to as the Services). Please read these Terms of Use carefully before you download, install or use the Services. If you do not agree to these Terms of Use, you may not install, download or use the Services. By installing, downloading or using the Services, you signify your acceptance to the Terms of Use and Privacy Policy (being hereby incorporated by reference herein) which takes effect on the date on which you download, install or use the Services, and create a legally binding arrangement to abide by the same."
        },
        {
            title: "Privacy Policy",
            content: "We ( Bundl Technologies Private Limited, alias Frisp) are fully committed to respecting your privacy and shall ensure that your personal information is safe with us. This privacy policy sets out the information practices of www.Frisp.com (Website) including the type of information is collected, how the information is collected, how the information is used and with whom it is shared. Reference to you in this Privacy Policy refers to the users of this Website whether or not you access the services available on the Website or consummate a transaction on the Website. By using or accessing this Website, you agree to the terms and conditions of this Privacy Policy. You also expressly consent to our use and disclosure of your Personal Information (as defined below) in any manner as described in this Privacy Policy and further signify your agreement to this Privacy Policy and the Terms of Use (being incorporated by reference herein). If you do not agree with the terms and conditions of this Privacy Policy, please do not proceed further or use or access this Website. "
        },
        {
            title: "Cancellations and Refunds",
            content: "a) As a general rule you shall not be entitled to cancel your order once placed. You may choose to cancel your order only within one-minute of the order being placed by you. However, subject to your previous cancellation history, Frisp reserves the right to deny any refund to you pursuant to a cancellation initiated by you even if the same is within one-minute.  b)If you cancel your order after one minute of placing it, Frisp shall have a right to charge you 100% of the order amount as the cancellation fee , with a right to either not to refund the order value in case your order is prepaid or recover from your subsequent order in case your order is postpaid, to compensate our restaurant/merchants and delivery partners. c)Frisp reserves the right to charge you cancellation fee for the orders constrained to be cancelled by Frisp for reasons not attributable to Frisp, including but not limited to: i)in the event if the address provided by you is either wrong or falls outside the delivery zone; ii) failure to contact you by phone or email at the time of delivering the order booking; iii) failure to deliver your order due to lack of information, direction or authorization from you at the time of delivery; or iv) unavailability of all the items ordered by you at the time of booking the order. However, in the unlikely event of an item on your order being unavailable, Frisp will contact you on the phone number provided to us at the time of placing the order and inform you of such unavailability. In such an event you will be entitled to cancel the entire order and shall be entitled to a refund to an amount upto 100% of the order value. d)In case of cancellations for the reasons attributable to Frisp or the restaurant partner or delivery partners, Frisp shall not charge you any cancellation fee."
        },
        {
            title: "Terms of Use for Frisp ON-TIME / Assured",
            content: "These terms of use (the Terms of Use) that govern your use of our service Frisp ON-TIME / Assured  (ON-TIME / Assured) on our website www.Frisp.in (the Website) and our Frisp application for mobile and handheld devices (the App). The services on ON-TIME / Assured  available on our Website and the App are jointly referred to as the On-Time Delivery. Please read these Terms of Use carefully before you use the Services. If you do not agree to these Terms of Use, you may not use the Services. By using the Services, you signify your acceptance to the Terms of Use and Privacy Policy (incorporated by reference herein) and creates a legally binding arrangement to abide by the same. "
        }
    ]
    const FAQitems = [
        {
            title: "What is Frisp Customer Care Number?",
            content: "We value our customer’s time and hence moved away from a single customer care number to a comprehensive chat-based support system for quick and easy resolution. You no longer have to go through the maze of an IVRS call support. Just search for your issue in the help section on this page and initiate a chat with us. A customer care executive will be assigned to you shortly. You can also email us your issue on support@Frisp.in"
        },
        {
            title: "I want to explore career opportunities with Frisp",
            content: "Join our team"
        },
        {
            title: "Can I edit my order?",
            content: "Your order can be edited before it reaches the restaurant. You could contact customer support team via chat or call to do so. Once order is placed and restaurant starts preparing your food, you may not edit its contents"
        },
        {
            title: "I want to cancel my order",
            content: "We will do our best to accommodate your request if the order is not placed to the restaurant (Customer service number:  080-67466729). Please note that we will have a right to charge a cancellation fee up to full order value to compensate our restaurant and delivery partners if your order has been confirmed."
        },
        {
            title: "Will Frisp be accountable for quality/quantity?",
            content: "Quantity and quality of the food is the restaurants' responsibility. However in case of issues with the quality or quantity, kindly submit your feedback and we will pass it on to the restaurant."
        },
        {
            title: "Is there a minimum order value?",
            content: "We have no minimum order value and you can order for any amount. "
        },
        {
            title: "Do you charge for delivery?",
            content: "Delivery fee varies from city to city and is applicable if order value is below a certain amount. Additionally, certain restaurants might have fixed delivery fees. Delivery fee (if any) is specified on the 'Review Order' page."
        },
        {
            title: "How long do you take to deliver?",
            content: "Standard delivery times vary by the location selected and prevailing conditions. Once you select your location, an estimated delivery time is mentioned for each restaurant."
        },
        {
            title: "What are your delivery hours?",
            content: "Our delivery hours vary for different locations and depends on availability of supply from restaurant partners."
        }
        // ,
        // {
        //     title: "I want to cancel my orderCan I order from any location?",
        //     content: "We will deliver from any restaurant listed on the search results for your location. We recommend enabling your GPS location finder and letting the app auto-detect your location."
        //  }
        // {
        //     title: "Is single order from many restaurants possible?",
        //     content: "We currently do not support this functionality. However, you can place orders for individual items from different restaurants."
        // },
        // {
        //     title: "Do you support bulk orders?",
        //     content: "In order to provide all customers with a great selection and to ensure on time delivery of your meal, we reserve the right to limit the quantities depending on supply."
        // }

    ]
    const [activeIndex, setActiveIndex] = useState(-1);
    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    return (
        <>
            {/* <Header1/> */}
            <div>
                <div className='divmainhelp'>
                    <div>
                        <div className='divhelp'>
                            <h1>Help & Support</h1>
                            <div className='divhelpHeader'>Let's take a step ahead and help you better.</div>

                        </div>
                        <div className='divhelpContiner'>
                            <div className='divhelpContiner1'>
                                <div style={{ display: 'flex' }}>
                                    <div className='divhelpmenu'>
                                        <ul>
                                            <li onClick={() => handleItemClick(1)} className={activeDiv === 1 ? "liitem liactive" : "liitem"}>
                                                Partner Onboarding
                                            </li>
                                            <li onClick={() => handleItemClick(2)} className={activeDiv === 2 ? "liitem liactive" : "liitem"}>
                                                Legal
                                            </li>
                                            <li onClick={() => handleItemClick(3)} className={activeDiv === 3 ? "liitem liactive" : "liitem"}>
                                                FAQs
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='divsubcon'>
                                        {activeDiv === 1 && <div>
                                            <div class="subhear"> Partner Onboarding </div>
                                            {Partneritem.map((Partneritem, index) => (
                                                <div className='divborderbottom' key={Partneritem.title}>
                                                    <button className='subbutn' onClick={() => handleClick(index)}>{Partneritem.title}</button>
                                                    {index === activeIndex && <p className='spanfont'>{Partneritem.content}</p>}

                                                </div>
                                            ))}
                                        </div>}
                                        {activeDiv === 2 && <div>
                                            <div class="subhear"> Legal </div>
                                            {items.map((item, index) => (
                                                <div className='divborderbottom' key={item.title}>
                                                    <button className='subbutn' onClick={() => handleClick(index)}>{item.title}</button>
                                                    {index === activeIndex && <p className='spanfont'>{item.content}</p>}
                                                </div>
                                            ))}

                                        </div>}

                                        {activeDiv === 3 && <div>
                                            <div class="subhear"> FAQs  </div>
                                            {FAQitems.map((item, index) => (
                                                <div className='divborderbottom' key={item.title}>
                                                    <button className='subbutn' onClick={() => handleClick(index)}>{item.title}</button>
                                                    {index === activeIndex && <p className='spanfont'>{item.content}</p>}
                                                </div>
                                            ))}

                                        </div>}



                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>


            </div>
        </>
    )
}
export default HelpandSupport;
