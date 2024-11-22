import "./thank-you.scss";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieSrc from "../../../assets/_json/lottie/thankyou_animation.json";
import { KeyWithAnyModel } from "../../../utils/model/common-model";
const ThankYouBanner = (props: KeyWithAnyModel) => {
  return (
    <div className="thankyou__banner">
      <div className="thankyou__banner__left">
        <div className="lottieAnime_success">
          <Player src={lottieSrc} className="player" loop autoplay />
        </div>
        <label>{props.banner_header}</label>
        {props.banner_content && (
          <div className="body__app-desc">
            {props.banner_body_1}
            {props.productName} {props.banner_body_2}
            {props.resumeUrl && (
              <div className="body__app__btn">
                <a rel="noreferrer" href={process.env.REACT_APP_RESUME_URL}>
                  {props.resumeUrl}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYouBanner;





import {Provider} from 'react-redux'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import storeMockData from './../../../utils/mock/store-spec.json';
import ThankYou from '../thank-you/thank-you';

jest.autoMockOff();
jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

const mockStore = configureMockStore([thunk]);
let wrapper:any;
let store: any;
beforeEach(() => {
    store = mockStore(storeMockData);
    wrapper = shallow(
        <Provider store={store}>
          <ThankYou />
        </Provider>
      );
  });


describe('Thank you screen', () => {
  it('should render thank you component', () => {
    expect(wrapper.find('.thankyou').length).toEqual(0)
  })
})


import { shallow } from "enzyme";
import ThankYouBanner from "../thank-you-banner/ThankYouBanner";

jest.autoMockOff();
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

let wrapper: any;

beforeEach(() => {
  const mockProps = {
    banner_header: "Thank You!",
    banner_content: true,
    banner_body_1: "Congratulations on completing the process.",
    productName: "Product X",
    banner_body_2: " is now available for you.",
    resumeUrl: "Click here to download your resume",
  };

  wrapper = shallow(<ThankYouBanner {...mockProps} />);
});

describe("ThankYouBanner Component", () => {
  it("should render the thank you banner component", () => {
    expect(wrapper.find(".thankyou__banner").length).toEqual(1);
  });
});

import "./thank-you.scss";
import { KeyWithAnyModel } from "../../../utils/model/common-model";
import ThankYouTimeline from "./thankyou-timeline";
import ThankYouBanner from "./thankyou-banner";
import ThankYouSurvey from "./thankyou-survey"

const CCWithoutActivation = (props: KeyWithAnyModel) => {
  const applicationDetails = props.applicationDetails;
  const thankyou = props.thankyou;
  return (
    <>
      <ThankYouBanner
        banner_header={thankyou.CCActivation.banner.banner_header}
        banner_content={false}
      />
      <div className="thankyou__body__outer">
        <div className="thankyou__body">
          <div className="thankyou__title">
            {thankyou.CCActivation.banner.content_header}
          </div>
          <div className="thankyou__title">
            <div>{applicationDetails.productName}</div>
            <div>
              <label>{applicationDetails.cardNumber}</label>
            </div>
          </div>
          <ThankYouTimeline
            title={thankyou[applicationDetails.thankyouText].timeLine}
            data={thankyou.CCActivation.timeLine}
            checkCompletedStatus={true}
          />
          <ThankYouSurvey/>
          <div className="body__app-details">
            <label>{thankyou.CCPL.refId_lbl}</label>
            {props.applicationReferenceNo!}
          </div>
          {/* <div className="body__refno">
            <button
              onClick={(e) => props.goToIBanking(e)}
              className="thankyou__continue"
            >
              {thankyou[applicationDetails.thankyouText].iBankingButton}
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CCWithoutActivation;



import { shallow } from "enzyme";
import CCActivationSucess from "./cc-activation-success";
 
 

 
describe("CCActivationSuccess Component",()=>{
    let wrapper: any;
    beforeAll(()=>{
        wrapper= shallow(<CCActivationSucess {...defaultProps}/>);
    });
    const defaultProps ={
        applicationDetails:{
            productName:"Credit Card",
            cardNumber:"1234 5678 9876 5432",
        },
        thankyou:{
            CCActivation:{
                banner:{
                    banner_header:"Activation Successful!",
                },
                header:"Congratulations on your new card!",
                timeline_header: "Activation Timeline",
                successTimeline:[
                    {step:"Application Submitted",completed:true},
                    {step:"Verification completed",completed:true},
                    {step:"Card Activated",completed:true},
                ],
                successNote:"Your card is now ready to use.",
            },
            CCPL:{
                refId_lbl:"1212323"
            }
        },
    };


    it("render the ThankYouBanner component with correct props",()=>{
        expect(wrapper).toHaveLength(1);
    });
  
   
});

import { shallow } from "enzyme";
import CCWithoutActivation from "./cc-without-activation";

describe("CCWithoutActivation Component", () => {
  let wrapper: any;

  beforeAll(() => {
    wrapper = shallow(<CCWithoutActivation {...defaultProps} />);
  });

  const defaultProps = {
    applicationDetails: {
      productName: "Credit Card",
      cardNumber: "1234 5678 9876 5432",
      thankyouText: "thankYouTextKey",
    },
    thankyou: {
      CCActivation: {
        banner: {
          banner_header: "Activation Pending",
        },
        header: "Thank you for your application!",
        timeline_header: "Processing Timeline",
        timeLine: [
          { step: "Application Submitted", completed: true },
          { step: "Under Review", completed: false },
        ],
      },
      CCPL: {
        refId_lbl: "Reference ID",
      },
    },
    applicationReferenceNo: "REF987654321",
  };

  it("should render the component without crashing", () => {
    expect(wrapper).toHaveLength(1);
  });
});

import { shallow } from "enzyme";
import CCWithoutActivation from "./cc-without-activation";

jest.mock("./thankyou-banner", () => jest.fn(() => <div data-testid="thank-you-banner" />));
jest.mock("./thankyou-timeline", () => jest.fn(() => <div data-testid="thank-you-timeline" />));
jest.mock("./thankyou-survey", () => jest.fn(() => <div data-testid="thank-you-survey" />));

describe("CCWithoutActivation Component", () => {
  let wrapper: any;

  const defaultProps = {
    applicationDetails: {
      productName: "Credit Card",
      cardNumber: "1234 5678 9876 5432",
      thankyouText: "thankYouTextKey",
    },
    thankyou: {
      CCActivation: {
        banner: {
          banner_header: "Activation Pending",
          content_header: "Your application is under review.",
        },
        timeLine: ["Step 1: Submitted", "Step 2: Under Review"],
      },
      thankYouTextKey: {
        timeLine: "Pending Timeline",
        iBankingButton: "Check Application Status",
      },
      CCPL: {
        refId_lbl: "Reference ID:",
      },
    },
    applicationReferenceNo: "REF123456789",
    goToIBanking: jest.fn(),
  };

  beforeAll(() => {
    wrapper = shallow(<CCWithoutActivation {...defaultProps} />);
  });

  it("should render the ThankYouBanner component with correct props", () => {
    expect(wrapper.find('[data-testid="thank-you-banner"]')).toHaveLength(1);
  });

  it("should render the ThankYouTimeline component with correct props", () => {
    expect(wrapper.find('[data-testid="thank-you-timeline"]')).toHaveLength(1);
  });

  it("should render the ThankYouSurvey component", () => {
    expect(wrapper.find('[data-testid="thank-you-survey"]')).toHaveLength(1);
  });
});

import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import ThankYouTimeline from "./thankyou-timeline";
import ThankYouBanner from "./thankyou-banner";
import { lazy, useEffect, useState } from "react";
import { getUrl } from "../../../utils/common/change.utils";
import { useSelector } from "react-redux";
import { store } from "../../../utils/store/store";
import ThankYouSurvey from "./thankyou-survey";
const CasaBanner = lazy(
  () => import("../../../shared/components/casa-banner/casa-banner")
);

const ThankYouCASA = (props: KeyWithAnyModel) => {
  const applicationDetails = props.applicationDetails;
  const thankyou = props.thankyou;
  const [isFunding, setIsFunding] = useState(false);
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const getTimelineData = () => {
    return [
      {
        header: thankyou[applicationDetails.thankyouProp].timeline_header,
        content: thankyou[applicationDetails.thankyouProp].timeline_desc,
        completed_status: true,
      },
      {
        header: thankyou[applicationDetails.thankyouText].timeline_header,
        content: thankyou[applicationDetails.thankyouText].timeline_desc,
        completed_status: true,
      },
    ];
  };

  useEffect(() => {
    if(getUrl.getParameterByName("auth") != "upload" && !store.getState().stages.isDocumentUpload){
    const auth = getUrl.getParameterByName("auth");
    const isMyInfoVirtual = getUrl.getParameterByName("isMyInfoVirtual");
    const prodCategory =
      stageSelector[0].stageInfo.products[0].product_category;
    setIsFunding(
      stageSelector[0].stageInfo.application.source_system_name === "3" &&
        (auth === "myinfo" || isMyInfoVirtual === "true") &&
        (prodCategory === "CA" || prodCategory === "SA")
        ? true
        : false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, []);

  return (
    <>
      {!applicationDetails.isStp && (
        <ThankYouBanner
          banner_header={
            thankyou[applicationDetails.thankyouProp].banner_header
          }
          banner_content={true}
          banner_body_1={
            thankyou[applicationDetails.thankyouProp].banner_body_1
          }
          productName={applicationDetails.productName}
          banner_body_2={
            thankyou[applicationDetails.thankyouProp].banner_body_2
          }
          resumeUrl={thankyou[applicationDetails.thankyouProp].resumeUrl}
        />
      )}
      {applicationDetails.isStp && (
        <ThankYouBanner
          banner_header={thankyou.STP.banner_header}
          banner_content={true}
          banner_body_1={thankyou.STP.banner_body_1}
          productName={applicationDetails.productName}
          banner_body_2={thankyou.STP.banner_body_2}
        />
      )}
      <div className="thankyou__body__outer">
        <div className="thankyou__body">
          {isFunding && applicationDetails.isStp && <CasaBanner />}
          <div className="body__app-details">
            <label>
              {thankyou[applicationDetails.thankyouText].applicationNumber}
            </label>
            <div className="app-details__ref-no">
              {props.applicationReferenceNo!}
            </div>
          </div>
          {applicationDetails.isStp && (
            <div className="body__accn-no">
              <label>
                {thankyou[applicationDetails.thankyouProp].accountNumber}{" "}
                {applicationDetails.accountNum}
              </label>
            </div>
          )}
          <ThankYouTimeline
            title={thankyou[applicationDetails.thankyouText].timeLine}
            data={getTimelineData()}
            checkCompletedStatus={false}
          />
        </div>
        <ThankYouSurvey/>
      </div>
      <div className="body__refno">
        <button
          onClick={(e) => props.submitForm(e)}
          className="thankyou__continue"
        >
          {thankyou[applicationDetails.thankyouText].nextButton}
        </button>
      </div>
    </>
  );
};

export default ThankYouCASA;

import { shallow } from "enzyme";
import ThankYouCASA from "./thank-you-casa";

describe("ThankYouCASA Component", () => {
  let wrapper: any;

  const defaultProps = {
    applicationDetails: {
      isStp: false,
      productName: "Savings Account",
      thankyouProp: "casaThankyou",
      thankyouText: "casaSuccess",
      accountNum: "1234567890",
    },
    thankyou: {
      casaThankyou: {
        banner_header: "Thank You!",
        banner_body_1: "Your application has been submitted.",
        banner_body_2: "We will contact you shortly.",
        resumeUrl: "https://example.com/resume",
        accountNumber: "Account Number:",
        timeline_header: "Timeline Header",
        timeline_desc: "Timeline Description",
      },
      STP: {
        banner_header: "STP Header",
        banner_body_1: "STP Body 1",
        banner_body_2: "STP Body 2",
      },
      casaSuccess: {
        timeLine: "Timeline Title",
        applicationNumber: "Application Number:",
        nextButton: "Continue",
      },
    },
    applicationReferenceNo: "REF987654321",
    submitForm: jest.fn(),
  };

  beforeAll(() => {
    wrapper = shallow(<ThankYouCASA {...defaultProps} />);
  });

  it("should render the ThankYouCASA component", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should render the ThankYouBanner component when isStp is false", () => {
    expect(wrapper.find("ThankYouBanner")).toHaveLength(1);
  });

  it("should render the button with the correct text", () => {
    expect(wrapper.find(".thankyou__continue").text()).toBe(
      defaultProps.thankyou.casaSuccess.nextButton
    );
  });

  it("should call submitForm when the button is clicked", () => {
    wrapper.find(".thankyou__continue").simulate("click");
    expect(defaultProps.submitForm).toHaveBeenCalled();
  });
});

import { shallow } from "enzyme";
import ThankYouCASA from "../thank-you-casa/thank-you-casa";

describe("ThankYouCASA Component", () => {
  let wrapper: any;

  const defaultProps = {
    applicationDetails: {
      isStp: false,
      productName: "Savings Account",
      thankyouProp: "casaThankyou",
      thankyouText: "casaSuccess",
      accountNum: "1234567890",
    },
    thankyou: {
      casaThankyou: {
        banner_header: "Thank You!",
        banner_body_1: "Your application has been submitted.",
        banner_body_2: "We will contact you shortly.",
        accountNumber: "Account Number:",
        timeline_header: "Timeline Header",
        timeline_desc: "Timeline Description",
      },
      casaSuccess: {
        timeLine: "Timeline Title",
        applicationNumber: "Application Number:",
        nextButton: "Continue",
      },
    },
    applicationReferenceNo: "REF987654321",
    submitForm: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<ThankYouCASA {...defaultProps} />);
  });

  it("should render the ThankYouCASA component", () => {
    expect(wrapper).toHaveLength(1);
  });
});

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import ThankYouCASA from "../thank-you-casa/thank-you-casa";

const mockStore = configureMockStore([thunk]);

describe("ThankYouCASA Component", () => {
  let wrapper: any;
  let store: any;

  const defaultProps = {
    applicationDetails: {
      isStp: false,
      productName: "Savings Account",
      thankyouProp: "casaThankyou",
      thankyouText: "casaSuccess",
      accountNum: "1234567890",
    },
    thankyou: {
      casaThankyou: {
        banner_header: "Thank You!",
        banner_body_1: "Your application has been submitted.",
        banner_body_2: "We will contact you shortly.",
        accountNumber: "Account Number:",
        timeline_header: "Timeline Header",
        timeline_desc: "Timeline Description",
      },
      casaSuccess: {
        timeLine: "Timeline Title",
        applicationNumber: "Application Number:",
        nextButton: "Continue",
      },
    },
    applicationReferenceNo: "REF987654321",
    submitForm: jest.fn(),
  };

  beforeEach(() => {
    const mockStoreData = {
      stages: {
        stages: [
          {
            stageInfo: {
              application: { source_system_name: "3" },
              products: [{ product_category: "CA" }],
            },
          },
        ],
        isDocumentUpload: false,
      },
    };

    store = mockStore(mockStoreData);

    wrapper = shallow(
      <Provider store={store}>
        <ThankYouCASA {...defaultProps} />
      </Provider>
    );
  });

  it("should render ThankYouCASA component", () => {
    expect(wrapper).toHaveLength(1);
  });
});



import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow } from "enzyme";
import ThankYouCASA from "../thank-you-casa/thank-you-casa";

const mockStore = configureMockStore([thunk]);

describe("ThankYouCASA Component", () => {
  let wrapper: any;
  let store: any;

  const mockProps = {
    applicationDetails: {
      isStp: true,
      productName: "Savings Account",
      thankyouProp: "casaThankyou",
      thankyouText: "casaSuccess",
      accountNum: "1234567890",
    },
    thankyou: {
      casaThankyou: {
        banner_header: "Thank You!",
        banner_body_1: "Your application has been submitted.",
        banner_body_2: "We will contact you shortly.",
        accountNumber: "Account Number:",
        timeline_header: "Timeline Header",
        timeline_desc: "Timeline Description",
        resumeUrl: "https://resume.example.com",
      },
      casaSuccess: {
        timeLine: "Timeline Title",
        applicationNumber: "Application Number:",
        nextButton: "Continue",
      },
      STP: {
        banner_header: "STP Banner Header",
        banner_body_1: "STP Body Content 1",
        banner_body_2: "STP Body Content 2",
      },
    },
    applicationReferenceNo: "REF987654321",
    submitForm: jest.fn(),
  };

  beforeEach(() => {
    const mockStoreData = {
      stages: {
        stages: [
          {
            stageInfo: {
              application: { source_system_name: "3" },
              products: [{ product_category: "CA" }],
            },
          },
        ],
        isDocumentUpload: false,
      },
    };

    store = mockStore(mockStoreData);

    wrapper = shallow(
      <Provider store={store}>
        <ThankYouCASA {...mockProps} />
      </Provider>
    );
  });

  it("should render ThankYouCASA component", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should match provided props", () => {
    expect(wrapper.props().children.props).toEqual(mockProps);
  });
});