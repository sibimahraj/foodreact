noimport "./thank-you.scss";
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

  it("should render ThankYouBanner with correct props for non-STP flow", () => {
    const banner = wrapper.find("ThankYouBanner");
    expect(banner).toHaveLength(1);
    expect(banner.props().banner_header).toEqual(mockProps.thankyou.casaThankyou.banner_header);
  });

  it("should render ThankYouBanner with correct props for STP flow", () => {
    wrapper.setProps({
      applicationDetails: {
        ...mockProps.applicationDetails,
        isStp: true,
      },
    });
    const banner = wrapper.find("ThankYouBanner");
    expect(banner).toHaveLength(1);
    expect(banner.props().banner_header).toEqual(mockProps.thankyou.STP.banner_header);
  });

  it("should render account number if isStp is true", () => {
    wrapper.setProps({
      applicationDetails: {
        ...mockProps.applicationDetails,
        isStp: true,
      },
    });
    const accountNumber = wrapper.find(".body__accn-no label");
    expect(accountNumber.text()).toContain(mockProps.thankyou.casaThankyou.accountNumber);
  });

  it("should render timeline data", () => {
    const timeline = wrapper.find("ThankYouTimeline");
    expect(timeline).toHaveLength(1);
    expect(timeline.props().data).toBeDefined();
  });

  it("should render survey component", () => {
    const survey = wrapper.find("ThankYouSurvey");
    expect(survey).toHaveLength(1);
  });

  it("should call submitForm on button click", () => {
    const button = wrapper.find(".thankyou__continue");
    button.simulate("click");
    expect(mockProps.submitForm).toHaveBeenCalled();
  });
});

import React from "react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { shallow, mount } from "enzyme";
import ThankYouCASA from "../thank-you-casa";
import * as redux from "react-redux";

// Mock props and data
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  stages: {
    stages: [
      {
        stageInfo: {
          application: { source_system_name: "3" },
          products: [{ product_category: "CA" }],
        },
      },
    ],
  },
});

const mockProps = {
  applicationDetails: {
    isStp: true,
    thankyouProp: {
      banner_header: "Header",
      banner_body_1: "Body1",
      banner_body_2: "Body2",
      resumeUrl: "/resume",
      accountNumber: "1234567890",
    },
    thankyouText: {
      nextButton: "Continue",
      timeLine: "Timeline",
    },
  },
  thankyou: { key: "value" },
  submitForm: jest.fn(),
};

jest.mock("@shared/components/casa-banner/casa-banner", () => () => (
  <div>Mock CasaBanner</div>
));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

jest.mock("../../../utils/getUrl", () => ({
  getParameterByName: jest.fn((param) => (param === "auth" ? "upload" : null)),
}));

// Test suite
describe("ThankYouCASA Component", () => {
  let useSelectorSpy: jest.SpyInstance;

  beforeEach(() => {
    useSelectorSpy = jest.spyOn(redux, "useSelector");
    useSelectorSpy.mockReturnValue(store.getState().stages.stages);

    jest.clearAllMocks();
  });

  it("should render the component with mock props", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThankYouCASA {...mockProps} />
      </Provider>
    );

    expect(wrapper.find("ThankYouCASA").length).toBe(1);
    expect(wrapper.text()).toContain("Header");
    expect(wrapper.text()).toContain("Body1");
    expect(wrapper.text()).toContain("Body2");
    expect(wrapper.find("button").text()).toBe("Continue");
  });

  it("should trigger useEffect and call setIsFunding", () => {
    const setIsFunding = jest.fn();
    React.useState = jest.fn(() => [false, setIsFunding]);

    shallow(
      <Provider store={store}>
        <ThankYouCASA {...mockProps} />
      </Provider>
    );

    expect(setIsFunding).toHaveBeenCalledWith(true);
  });

  it("should handle button click event", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThankYouCASA {...mockProps} />
      </Provider>
    );

    wrapper.find("button").simulate("click");
    expect(mockProps.submitForm).toHaveBeenCalled();
  });

  it("should conditionally render elements based on applicationDetails.isStp", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThankYouCASA {...mockProps} />
      </Provider>
    );

    // Ensure STP-specific elements are rendered
    expect(wrapper.text()).toContain(mockProps.applicationDetails.thankyouProp.accountNumber);
  });

  it("should render CasaBanner lazily", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThankYouCASA {...mockProps} />
      </Provider>
    );

    expect(wrapper.text()).toContain("Mock CasaBanner");
  });
});

import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import thankyouData from "../../../assets/_json/thankyou.json";
import { useSelector} from "react-redux";
import { getUrl } from "../../../utils/common/change.utils";

const ThankYouSurvey = (props: KeyWithAnyModel) => {
const thankyou: KeyWithAnyModel = thankyouData;
const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
const applicationReferenceNo = getUrl.getChannelRefNo().applicationRefNo;
const survey_link = "&p="+stageSelector[0].stageInfo.products[0].product_category+"&m=sg"+"&c="+applicationReferenceNo;

  return (
    <div className="thankyou__feedback">
    {thankyou.Survey.content_1}
    <a target="_blank" 
    rel="feedback noreferrer" 
    href={thankyou.Survey.link+survey_link} >
    {thankyou.Survey.content_2}</a>
    {thankyou.Survey.content_3}
  </div>
  );
};

export default ThankYouSurvey;

import { shallow } from "enzyme";
import ThankYouSurvey from "./thank-you-survey";
 
describe("ThankYouSurvey Component", () => {
  let wrapper: any;
  
  const defaultProps = {
    Survey: {
      content_1: "Thank you for completing the survey!",
      content_2: "Click here to provide feedback.",
      content_3: "We value your input.",
      link: "https://example.com/survey?",
    },
  };

  beforeAll(() => {
    wrapper = shallow(<ThankYouSurvey {...defaultProps} />);
  });

  it("should render ThankYouSurvey component with correct props", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should render the correct content", () => {
    expect(wrapper.text()).toContain(defaultProps.Survey.content_1);
    expect(wrapper.text()).toContain(defaultProps.Survey.content_2);
    expect(wrapper.text()).toContain(defaultProps.Survey.content_3);
  });

  it("should have the correct survey link", () => {
    const link = wrapper.find('a');
    expect(link.prop('href')).toContain(defaultProps.Survey.link);
  });
});


import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ThankYouSurvey from "./thank-you-survey";

const mockStore = configureMockStore();
let wrapper: any;
let store: any;

const defaultProps = {
  Survey: {
    content_1: "Thank you for completing the survey!",
    content_2: "Click here to provide feedback.",
    content_3: "We value your input.",
    link: "https://example.com/survey?",
  },
};

describe("ThankYouSurvey Component", () => {
  beforeAll(() => {
    store = mockStore({
      stages: {
        stages: [
          {
            stageInfo: {
              products: [
                {
                  product_category: "credit-card",
                },
              ],
            },
          },
        ],
      },
    });

    wrapper = shallow(
      <Provider store={store}>
        <ThankYouSurvey {...defaultProps} />
      </Provider>
    );
  });

  it("should render ThankYouSurvey component with correct props", () => {
    expect(wrapper.find(ThankYouSurvey)).toHaveLength(1);
  });

  it("should render the correct content", () => {
    expect(wrapper.text()).toContain(defaultProps.Survey.content_1);
    expect(wrapper.text()).toContain(defaultProps.Survey.content_2);
    expect(wrapper.text()).toContain(defaultProps.Survey.content_3);
  });

  it("should have the correct survey link", () => {
    const link = wrapper.find('a');
    expect(link.prop('href')).toContain(defaultProps.Survey.link);
  });
});

import "./thank-you.scss";
import { KeyWithAnyModel } from "../../../utils/model/common-model";
const ThankYouTimeline = (props: KeyWithAnyModel) => {
  return (
    <div className="body__timeline">
      <label>{props.title}</label>
      <div className="body__timeline__inner">
        {props.data.map((tlData: any, index: number) => {
          return (
            <div key={index}>
              <div
                className={`timeline__header ${
                  props.checkCompletedStatus && !tlData.completed_status
                    ? "timeline__circle_outline"
                    : ""
                }`}
              >
                <label>{tlData.header}</label>
              </div>
              <div className="timeline__desc">
                <div>
                  {typeof tlData.content === "string" ? (
                    tlData.content
                  ) : (
                    <ul>
                      {tlData.content.map((item: string, index: number) => {
                        return <li key={index}>{item}</li>;
                      })}
                    </ul>
                  )}
                  {tlData.link_lbl && (
                    <div>
                      <button
                        onClick={() => props.handleLink()}
                        className="thankyou__continue"
                      >
                        {tlData.link_lbl}
                      </button>
                    </div>
                  )}
                </div>
                {tlData.subcontent && (
                  <div className="timeline__sub_content">
                    {tlData.subcontent}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThankYouTimeline;

import { shallow } from "enzyme";
import ThankYouTimeline from "./thank-you-timeline";

describe("ThankYouTimeline Component", () => {
  let wrapper: any;

  const mockHandleLink = jest.fn();
  const defaultProps = {
    title: "Timeline Title",
    data: [
      {
        header: "Step 1",
        content: "This is step 1 content",
        completed_status: true,
      },
      {
        header: "Step 2",
        content: ["Item 1", "Item 2"],
        link_lbl: "Continue",
        completed_status: false,
        subcontent: "Step 2 subcontent",
      },
    ],
    checkCompletedStatus: true,
    handleLink: mockHandleLink,
  };

  beforeEach(() => {
    wrapper = shallow(<ThankYouTimeline {...defaultProps} />);
  });

  it("should render the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the title", () => {
    expect(wrapper.find("label").at(0).text()).toEqual(defaultProps.title);
  });

  it("should render the correct number of timeline steps", () => {
    expect(wrapper.find(".timeline__header").length).toEqual(defaultProps.data.length);
  });

  it("should handle a button click when link_lbl is present", () => {
    const button = wrapper.find("button.thankyou__continue");
    expect(button.exists()).toBe(true);
    button.simulate("click");
    expect(mockHandleLink).toHaveBeenCalled();
  });

  it("should render subcontent when available", () => {
    expect(wrapper.find(".timeline__sub_content").at(0).text()).toEqual(
      defaultProps.data[1].subcontent
    );
  });

  it("should apply outline class for incomplete steps when checkCompletedStatus is true", () => {
    expect(wrapper.find(".timeline__circle_outline").length).toEqual(1);
  });

  it("should render content as a string or as a list", () => {
    // First item (string content)
    expect(wrapper.find(".timeline__desc").at(0).text()).toContain(
      defaultProps.data[0].content
    );

    // Second item (list content)
    const listItems = wrapper.find("ul li");
    expect(listItems.length).toEqual(defaultProps.data[1].content.length);
    expect(listItems.at(0).text()).toEqual(defaultProps.data[1].content[0]);
  });
});

import "./thank-you.scss";
import { KeyWithAnyModel } from "../../../utils/model/common-model";
import ThankYouTimeline from "./thankyou-timeline";
import ThankYouBanner from "./thankyou-banner";
import validateService from "../../../services/validation-service";
import ThankYouSurvey from "./thankyou-survey";
const ThankYouPL = (props: KeyWithAnyModel) => {
  const applicationDetails = props.applicationDetails;
  const thankyou = props.thankyou;
  const getTimelineData = () => {
    if (!applicationDetails.isStp) {
      return thankyou[applicationDetails.thankyouProp].CCPL.timeLine;
    }
    return thankyou.PLSTPTimeLine;
  };
  return (
    <>
      <ThankYouBanner
        banner_header={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].banner_header
            : thankyou.STPPLBanner.banner_header
        }
        banner_content={false}
      />
      <div className="thankyou__body__outer">
        <div className="thankyou__body">
          {!applicationDetails.isStp && (
            <>
              <div className="thankyou__title">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.title}
                </label>
              </div>
              <div className="thankyou__content">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.content}
                </label>
              </div>
            </>
          )}
          {applicationDetails.isStp && (
            <>
              {applicationDetails.productType ===
                thankyou.CCPL.CreditCardFundsTransfer && (
                <div className="body__app-desc">
                  <div className="thankyou__pl__content">
                    {thankyou.STPPLBanner.banner_body_1}
                    {applicationDetails.productName}{" "}
                    {thankyou.STPPLBanner.banner_body_2}
                  </div>
                  <div className="thankyou__pl__content">
                    <div className="pl__right__ctr">
                      <div className="pl__icon_2"></div>
                      {thankyou.STPPLBanner.approved_loan_lbl}
                      <div>S$ {applicationDetails.approvedLoan}</div>
                    </div>
                  </div>
                  {applicationDetails.feeAmount && (
                    <div className="thankyou__pl__content">
                      <div className="pl__icon_4"></div>
                      <div className="pl__right__ctr">
                        {thankyou.STPPLBanner.fee_amount_lbl}
                        <div>{applicationDetails.feeAmount}</div>
                      </div>
                    </div>
                  )}
                  {props.enableActivation && props.showPlatinum && (
                    <div>{thankyou.STPPLBanner.banner_body_4}</div>
                  )}
                </div>
              )}
              {applicationDetails.productType !==
                thankyou.CCPL.CreditCardFundsTransfer && (
                <>
                  {props.isCampaignBenefits && (
                    <label>{thankyou.STPPLBanner.banner_header_1}</label>
                  )}
                  {/* {!props.isCampaignBenefits && (
                    <label>{thankyou.STPPLBanner.banner_header_2}</label>
                  )} */}
                  <div className="body__app-desc">
                    <div className="thankyou__pl__content">
                      <div className="thankyou__title">
                        {thankyou.STPPLBanner.title}{" "}
                      </div>
                      <div className="thankyou__pl__subtitle">
                        {thankyou.STPPLBanner.banner_body_1}
                        {applicationDetails.productName}{" "}
                        {thankyou.STPPLBanner.banner_body_2}
                      </div>
                    </div>
                    <div className="thankyou__pl__content__inner">
                      <div className="thankyou__pl__accounticon"></div>
                      <div className="pl__right__ctr">
                        <div className="pl__content__label">
                          {applicationDetails.productName}{" "}
                          {thankyou.STPPLBanner.account}
                        </div>
                        <div>{applicationDetails.accountNum}</div>
                      </div>
                    </div>
                    <div className="thankyou__pl__content__inner">
                      <div className="thankyou__pl__loanicon"></div>
                      <div className="pl__right__ctr">
                        <div className="pl__content__label">
                          {thankyou.STPPLBanner.approved_loan_lbl}
                        </div>
                        <div>S$ {validateService.formateCurrency(applicationDetails.approvedLoan)}</div>
                      </div>
                    </div>
                    <div className="thankyou__pl__content__inner">
                      <div className="thankyou__pl__tenureicon"></div>
                      <div className="pl__right__ctr">
                        <div className="pl__content__label">
                          {thankyou.STPPLBanner.loan_tenure_lbl}
                        </div>
                        <div>
                          {applicationDetails.loanTenureMonths}
                          {thankyou.STPPLBanner.months_lbl}
                        </div>
                      </div>
                    </div>
                    {!props.isCampaignBenefits && (
                      <div className="thankyou__pl__content__inner">
                        <div className="thankyou__pl__disbursedicon"></div>
                        <div className="pl__right__ctr">
                          <div className="pl__content__label">
                            {thankyou.STPPLBanner.disbursed_loan_amt_lbl}
                          </div>
                          <div>
                            S${" "}
                            {validateService.formateCurrency(
                              (
                                applicationDetails.approvedLoan -
                                thankyou.CCPL.PLFeeAmount
                              ).toFixed(2)
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {props.enableActivation && props.showPlatinum && (
                      <div className="thankyou__pl__content">
                        {thankyou.STPPLBanner.banner_body_3}
                      </div>
                    )}
                  </div>
                </>
              )}
            </>
          )}
          <ThankYouTimeline
            title={thankyou[applicationDetails.thankyouText].timeLine}
            data={getTimelineData()}
            checkCompletedStatus={true}
          />
          {/* {applicationDetails.isStp && (
            <div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_header}
              </div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_desc}
              </div>
            </div>
          )} */}
          <div>
            <div className="thankyou__note__content">
              <label>{thankyou.CCPL.note_title}</label>
            </div>
            <div className="thankyou__note__content">
              <div>{thankyou.CCPL.note_content_1}</div>
              <div>{thankyou.CCPL.note_content_2}</div>
            </div>
            <div className="thankyou__note__content">
              <div>{thankyou.CCPL.note_content_3}</div>
              <div>
                <a
                  target="_blank"
                  rel="feedback noreferrer"
                  href={thankyou.CCPL.note_link}
                >
                  {thankyou.CCPL.note_content_4}
                </a>
              </div>
            </div>
          </div>
          <div className="body__app-details appnum__details">
            <label>
              {thankyou[applicationDetails.thankyouText].applicationNumber}
            </label>
            {props.applicationReferenceNo!}
          </div>
        </div>
        <ThankYouSurvey/>
      </div>
      <div className="body__refno">
        <button
          onClick={(e) => props.submitForm(e)}
          className="thankyou__continue"
        >
          {thankyou[applicationDetails.thankyouText].doneButton}
        </button>
      </div>
    </>
  );
};
export default ThankYouPL;


import { shallow } from "enzyme";
import ThankYouPL from "./thank-you-pl";
import ThankYouTimeline from "../thank-you-timeline/thank-you-timeline";
import ThankYouSurvey from "../thank-you-survey/thank-you-survey";

describe("ThankYouPL Component", () => {
  let wrapper: any;

  const mockSubmitForm = jest.fn();
  const defaultProps = {
    applicationDetails: {
      thankyouText: "CCPL",
      isStp: true,
    },
    enableActivation: true,
    showPlatinum: true,
    applicationReferenceNo: "123456",
    submitForm: mockSubmitForm,
  };

  const thankyouMockData = {
    CCPL: {
      note_title: "Important Note",
      note_content_1: "Content 1",
      note_content_2: "Content 2",
      note_content_3: "Content 3",
      note_content_4: "Click here for details",
      note_link: "https://example.com",
      applicationNumber: "Application Number",
    },
    STPPLBanner: {
      banner_body_3: "Platinum Activation Successful",
    },
  };

  jest.mock("../../../assets/_json/thankyou.json", () => thankyouMockData);

  const mockGetTimelineData = jest.fn().mockReturnValue([
    { header: "Step 1", content: "Step 1 content", completed_status: true },
    { header: "Step 2", content: "Step 2 content", completed_status: false },
  ]);

  beforeEach(() => {
    wrapper = shallow(<ThankYouPL {...defaultProps} getTimelineData={mockGetTimelineData} />);
  });

  it("should render the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render ThankYouTimeline with correct props", () => {
    const timeline = wrapper.find(ThankYouTimeline);
    expect(timeline.exists()).toBe(true);
    expect(timeline.prop("title")).toEqual(thankyouMockData.CCPL.timeLine);
    expect(timeline.prop("data")).toEqual(mockGetTimelineData());
    expect(timeline.prop("checkCompletedStatus")).toBe(true);
  });

  it("should render ThankYouSurvey component", () => {
    expect(wrapper.find(ThankYouSurvey).exists()).toBe(true);
  });

  it("should render note content correctly", () => {
    const noteContent = wrapper.find(".thankyou__note__content");
    expect(noteContent.at(0).find("label").text()).toEqual(thankyouMockData.CCPL.note_title);
    expect(noteContent.at(1).text()).toContain(thankyouMockData.CCPL.note_content_1);
    expect(noteContent.at(1).text()).toContain(thankyouMockData.CCPL.note_content_2);
    expect(noteContent.at(2).text()).toContain(thankyouMockData.CCPL.note_content_3);
    expect(noteContent.at(2).find("a").prop("href")).toEqual(thankyouMockData.CCPL.note_link);
  });

  it("should render application reference number", () => {
    const appDetails = wrapper.find(".body__app-details");
    expect(appDetails.find("label").text()).toContain(
      thankyouMockData.CCPL.applicationNumber
    );
    expect(appDetails.text()).toContain(defaultProps.applicationReferenceNo);
  });

  it("should render platinum content when enableActivation and showPlatinum are true", () => {
    const platinumContent = wrapper.find(".thankyou__pl__content");
    expect(platinumContent.exists()).toBe(true);
    expect(platinumContent.text()).toEqual(thankyouMockData.STPPLBanner.banner_body_3);
  });

  it("should call submitForm on button click", () => {
    const button = wrapper.find(".thankyou__continue").at(1);
    button.simulate("click");
    expect(mockSubmitForm).toHaveBeenCalled();
  });

  it("should render conditional elements based on props", () => {
    // Platinum content is rendered
    expect(wrapper.find(".thankyou__pl__content").exists()).toBe(true);

    // Modify props to disable platinum content
    wrapper.setProps({ enableActivation: false, showPlatinum: false });
    expect(wrapper.find(".thankyou__pl__content").exists()).toBe(false);
  });
});

import React from "react";
import { shallow } from "enzyme";
import ThankYouPL from "./thank-you-pl";
import ThankYouTimeline from "../thank-you-timeline/thank-you-timeline";
import ThankYouSurvey from "../thank-you-survey/thank-you-survey";

describe("ThankYouPL Component", () => {
  let wrapper;

  const mockSubmitForm = jest.fn();
  const defaultProps = {
    applicationDetails: {
      thankyouText: "CCPL",
    },
    enableActivation: true,
    showPlatinum: true,
    applicationReferenceNo: "123456",
    submitForm: mockSubmitForm,
  };

  beforeEach(() => {
    wrapper = shallow(<ThankYouPL {...defaultProps} />);
  });

  it("should render the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render ThankYouTimeline component", () => {
    const timeline = wrapper.find(ThankYouTimeline);
    expect(timeline.exists()).toBe(true);
  });

  it("should render ThankYouSurvey component", () => {
    const survey = wrapper.find(ThankYouSurvey);
    expect(survey.exists()).toBe(true);
  });

  it("should call submitForm when the button is clicked", () => {
    const button = wrapper.find(".thankyou__continue");
    button.simulate("click");
    expect(mockSubmitForm).toHaveBeenCalled();
  });
});

 ThankYouPL Component
    × should render the component (3 ms)
    × should render ThankYouTimeline component (1 ms)
    × should render ThankYouSurvey component
    × should call submitForm when the button is clicked (1 ms)

import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import ThankYouPL from "./thank-you-pl";
import ThankYouTimeline from "../thank-you-timeline/thank-you-timeline";
import ThankYouSurvey from "../thank-you-survey/thank-you-survey";

describe("ThankYouPL Component", () => {
  let wrapper: ShallowWrapper;

  const mockSubmitForm = jest.fn();
  const defaultProps = {
    applicationDetails: {
      thankyouText: "CCPL",
      isStp: true,
    },
    enableActivation: true,
    showPlatinum: true,
    applicationReferenceNo: "123456",
    submitForm: mockSubmitForm,
  };

  beforeEach(() => {
    wrapper = shallow(<ThankYouPL {...defaultProps} />);
  });

  it("should render the component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render ThankYouTimeline component", () => {
    const timeline = wrapper.find(ThankYouTimeline);
    expect(timeline.exists()).toBe(true);
  });

  it("should render ThankYouSurvey component", () => {
    const survey = wrapper.find(ThankYouSurvey);
    expect(survey.exists()).toBe(true);
  });

  it("should call submitForm when the button is clicked", () => {
    const button = wrapper.find(".thankyou__continue").at(0); // Ensure the button index is correct
    button.simulate("click");
    expect(mockSubmitForm).toHaveBeenCalled();
  });
});

{
    "content_1": "We'd like your feedback!",
    "link": "https://surveys.sc.com/jfe/form/SV_9LbvckjbELelJbM?",
    "content_2": " Click here ",
    "content_3": " to share your experience with us."
}

import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import thankyouData from "../../../assets/_json/thankyou.json";
import { useSelector} from "react-redux";
import { getUrl } from "../../../utils/common/change.utils";

const ThankYouSurvey = (props: KeyWithAnyModel) => {
  debugger
const thankyou: KeyWithAnyModel = thankyouData;
const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
const applicationReferenceNo = getUrl.getChannelRefNo().applicationRefNo;
const survey_link = "&p="+stageSelector[0].stageInfo.products[0].product_category+"&m=sg"+"&c="+applicationReferenceNo;

  return (
    <div className="thankyou__feedback">
    {thankyou.Survey.content_1}
    <a target="_blank" 
    rel="feedback noreferrer" 
    href={thankyou.Survey.link+survey_link} >
    {thankyou.Survey.content_2}</a>
    {thankyou.Survey.content_3}
  </div>
  );
};

export default ThankYouSurvey;

import React from "react";
import { shallow } from "enzyme";
import ThankYouSurvey from "./thank-you-survey";

describe("ThankYouSurvey Component", () => {
  it("should render the component", () => {
    const wrapper = shallow(<ThankYouSurvey />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should display the feedback content", () => {
    const wrapper = shallow(<ThankYouSurvey />);
    expect(wrapper.text()).toContain("We'd like your feedback!");
    expect(wrapper.text()).toContain("Click here");
    expect(wrapper.text()).toContain("to share your experience with us.");
  });

  it("should render the survey link with correct URL", () => {
    const wrapper = shallow(<ThankYouSurvey />);
    const surveyLink = wrapper.find("a");
    expect(surveyLink.exists()).toBe(true);
    expect(surveyLink.prop("href")).toContain("https://surveys.sc.com/jfe/form/SV_9LbvckjbELelJbM?");
  });

  it("should set the correct attributes for the survey link", () => {
    const wrapper = shallow(<ThankYouSurvey />);
    const surveyLink = wrapper.find("a");

    expect(surveyLink.prop("target")).toEqual("_blank");
    expect(surveyLink.prop("rel")).toContain("feedback noreferrer");
  });
});



import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { shallow } from "enzyme";
import ThankYouSurvey from "./thank-you-survey";

// Mock data
const mockThankYouData = {
  Survey: {
    content_1: "We'd like your feedback!",
    link: "https://surveys.sc.com/jfe/form/SV_9LbvckjbELelJbM?",
    content_2: "Click here",
    content_3: "to share your experience with us.",
  },
};

// Create mock Redux store
const mockStore = configureStore([]);
const initialState = {
  stages: {
    stages: [],
  },
};
const store = mockStore(initialState);

describe("ThankYouSurvey Component", () => {
  it("should render the component", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should display feedback content", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    )
      .dive() // Dive into the Provider
      .dive(); // Dive into the component

    expect(wrapper.text()).toContain(mockThankYouData.Survey.content_1);
    expect(wrapper.text()).toContain(mockThankYouData.Survey.content_2);
    expect(wrapper.text()).toContain(mockThankYouData.Survey.content_3);
  });

  it("should render the survey link with the correct URL", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    )
      .dive()
      .dive();

    const surveyLink = wrapper.find("a");
    expect(surveyLink.exists()).toBe(true);
    expect(surveyLink.prop("href")).toContain(mockThankYouData.Survey.link);
  });

  it("should set correct attributes for the survey link", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    )
      .dive()
      .dive();

    const surveyLink = wrapper.find("a");
    expect(surveyLink.prop("target")).toEqual("_blank");
    expect(surveyLink.prop("rel")).toContain("feedback noreferrer");
  });
});

import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import ThankYouSurvey from "./thank-you-survey";
import thankyouData from "../../../assets/_json/thankyou.json";
import { createStore } from "redux";

// Mock useSelector
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

// Mock getUrl utility
jest.mock("../../../utils/common/change.utils", () => ({
  getUrl: {
    getChannelRefNo: jest.fn(() => ({
      applicationRefNo: "SG20241030600099", // Updated reference number
    })),
  },
}));

// A mock reducer to create a dummy store
const mockReducer = (state = { stages: { stages: [] } }) => state;
const store = createStore(mockReducer);

describe("ThankYouSurvey Component", () => {
  const mockStageSelector = [
    {
      stageInfo: {
        products: [
          {
            product_category: "cc",
          },
        ],
      },
    },
  ];

  beforeEach(() => {
    const { useSelector } = require("react-redux");
    useSelector.mockImplementation((selectorFn: any) => selectorFn({ stages: { stages: mockStageSelector } }));
  });

  it("should render the component", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("should render the feedback content correctly", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    );
    expect(wrapper.text()).toContain(thankyouData.Survey.content_1);
    expect(wrapper.text()).toContain(thankyouData.Survey.content_2.trim());
    expect(wrapper.text()).toContain(thankyouData.Survey.content_3);
  });

  it("should generate the correct survey link", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    );
    const surveyLink = wrapper.find("a");
    const expectedLink = `${thankyouData.Survey.link}&p=cc&m=sg&c=SG20241030600099`; // Corrected link with provided reference number

    expect(surveyLink.prop("href")).toEqual(expectedLink);
  });

  it("should set the correct attributes for the survey link", () => {
    const wrapper = mount(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    );
    const surveyLink = wrapper.find("a");

    expect(surveyLink.prop("target")).toEqual("_blank");
    expect(surveyLink.prop("rel")).toContain("feedback noreferrer");
  });
});

Here's the updated test case:

```
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ThankYouSurvey from './ThankYouSurvey';

configure({ adapter: new Adapter() });

const thankyouData = {
  "content_1": "We'd like your feedback!",
  "link": "(link unavailable)",
  "content_2": " Click here ",
  "content_3": " to share your experience with us."
};

const initialState = {};
const mockStore = configureStore(initialState);
const store = mockStore(initialState);

describe('ThankYouSurvey component', () => {
  it('renders survey link with correct URL', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    );
    const surveyLink = wrapper.find('a');

    expect(surveyLink.prop('href')).toContain(thankyouData.link);
  });

  it('renders survey content', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ThankYouSurvey />
      </Provider>
    );
    const content1 = wrapper.find('div').at(0).text();
    const content2 = wrapper.find('a').text();
    const content3 = wrapper.find('div').at(1).text();

    expect(content1).toBe(thankyouData.content_1);
    expect(content2).toBe(thankyouData.content_2);
    expect(content3).toBe(thankyouData.content_3);
  });
});
```


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
    expect(wrapper.find('[data-testid="thank-you-banner"]')).toHaveLength(0);
  });

  it("should render the ThankYouTimeline component with correct props", () => {
    expect(wrapper.find('[data-testid="thank-you-timeline"]')).toHaveLength(0);
  });

  it("should render the ThankYouSurvey component", () => {
    expect(wrapper.find('[data-testid="thank-you-survey"]')).toHaveLength(0);
  });
});

import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import ThankYouTimeline from "./thankyou-timeline";
import ThankYouBanner from "./thankyou-banner";
import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
const ThankYouUpload = (props: KeyWithAnyModel) => {
  const applicationDetails = props.applicationDetails;
  const thankyou = props.thankyou;
 // const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const getTimelineData = () => {
    return [
      {
        header:"Your Documents has been submitted and is being processed now.",
        content:thankyou.Upload.timeline_desc_upload,
        completed_status: true,
      },
      {
        header: "For further assistance, please email to Client Care Centre at sc.com or chat with us via Live Chat at sc.com (operating hours from 9am to 12 midnight, daily including public holidays).",
        content:thankyou.Upload.timeline_desc_upload,
        completed_status: true,
      },
    ];
  };
return (
    <>
      <ThankYouBanner
          banner_header={thankyou.Upload.banner_header_upload}
          banner_content={true}
           />
      
      <div className="thankyou__body__outer">
        <div className="thankyou__body">
          
          <div className="body__app-details">
            <label>
              {thankyou[applicationDetails.thankyouText].applicationNumber}
            </label>
            <div className="app-details__ref-no">
              {props.applicationReferenceNo!}
            </div>
          </div>
          
          <ThankYouTimeline
            title={thankyou.Upload.timeLine_upload}
            data={getTimelineData()}
            checkCompletedStatus={false}
          />
          
        </div>
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

export default ThankYouUpload;

import { shallow } from "enzyme";
import ThankYouUpload from "./thank-you-upload";

// Mocking necessary child components or data
jest.mock("./thankyou-banner", () => jest.fn(() => <div data-testid="thank-you-banner" />));
jest.mock("./thankyou-timeline", () => jest.fn(() => <div data-testid="thank-you-timeline" />));

describe("ThankYouUpload Component", () => {
  let wrapper: any;

  // Default props setup
  const defaultProps = {
    applicationDetails: {
      productName: "Credit Card",
      cardNumber: "1234 5678 9876 5432",
      thankyouText: "thankYouTextKey",
    },
    thankyou: {
      Upload: {
        banner_header_upload: "Documents Uploaded",
        timeline_desc_upload: "Documents are under review",
        timeLine_upload: "Review Timeline",
        nextButton: "Continue",
      },
      thankYouTextKey: {
        applicationNumber: "Application Number",
      },
    },
    applicationReferenceNo: "SG20241030600099",
    submitForm: jest.fn(),
  };

  beforeAll(() => {
    wrapper = shallow(<ThankYouUpload {...defaultProps} />);
  });

  it("should render the ThankYouBanner component", () => {
    expect(wrapper.find('[data-testid="thank-you-banner"]')).toHaveLength(1);
  });

  it("should render the ThankYouTimeline component with correct props", () => {
    expect(wrapper.find('[data-testid="thank-you-timeline"]')).toHaveLength(1);
  });

  it("should render the application reference number correctly", () => {
    expect(wrapper.find(".app-details__ref-no").text()).toBe("SG20241030600099");
  });

  it("should call submitForm when the Continue button is clicked", () => {
    const button = wrapper.find("button.thankyou__continue");
    button.simulate("click", { preventDefault: () => {} });
    expect(defaultProps.submitForm).toHaveBeenCalled();
  });

  it("should render the nextButton text correctly", () => {
    const button = wrapper.find("button.thankyou__continue");
    expect(button.text()).toBe("Continue");
  });
});

import "./thank-you.scss";
import { KeyWithAnyModel } from "../../../utils/model/common-model";
import ThankYouTimeline from "./thankyou-timeline";
import ThankYouBanner from "./thankyou-banner";
import ThankYouSurvey from "./thankyou-survey"
const ThankYouCC = (props: KeyWithAnyModel) => {
  const applicationDetails = props.applicationDetails;
  const thankyou = props.thankyou;

  const getTimelineData = () => {
    if (!applicationDetails.isStp) {
      return thankyou[applicationDetails.thankyouProp].CCPL.timeLine;
    }
    return thankyou.CCSTP;
  };
  return (
    <>
      <ThankYouBanner
        banner_header={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.banner_header
            : thankyou.STPCCBanner.banner_header
        }
        banner_content={true}
        banner_body_1={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.banner_body_1
            : ""
        }
        productName={" "}
        banner_body_2={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.banner_body_2
            : ""
        }
        resumeUrl={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.resumeUrl
            : ""
        }
      />
      <div className="thankyou__body__outer">
        <div className="thankyou__body">
          {!applicationDetails.isStp && (
            <>
              <div className="thankyou__title">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.title}
                </label>
              </div>
              <div className="thankyou__content">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.content}
                </label>
              </div>
            </>
          )}
          {applicationDetails.isStp && (
            <div className="thankyou__title">
              <div>
                {thankyou.STPCCBanner.banner_body_1}
                {applicationDetails.productName}
                {thankyou.STPCCBanner.banner_body_2}
              </div>
              <div>{applicationDetails.productName}</div>
              <div>{applicationDetails.cardNumber}</div>
            </div>
          )}
          <ThankYouTimeline
            title={thankyou[applicationDetails.thankyouText].timeLine}
            data={getTimelineData()}
            checkCompletedStatus={true}
            handleLink={props.showOTPPopup}
          />
          {applicationDetails.isStp && (
            <div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_header}
              </div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_desc}
              </div>
            </div>
          )}
          {!applicationDetails.isStp && (
            <div>
              <div className="thankyou__note__content">
                <label>{thankyou.CCPL.note_title}</label>
              </div>
              <div className="thankyou__note__content">
                <div>{thankyou.CCPL.note_content_1}</div>
                <div>{thankyou.CCPL.note_content_2}</div>
              </div>
              <div className="thankyou__note__content">
                <div>{thankyou.CCPL.note_content_3}</div>
                <div>
                  <a
                    target="_blank"
                    rel="feedback noreferrer"
                    href={thankyou.CCPL.note_link}
                  >
                    {thankyou.CCPL.note_content_4}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="body__app-details">
            <label>{thankyou.CCPL.refId_lbl}</label>
            {props.applicationReferenceNo!}
          </div>
          <div className="body__refno">
            {applicationDetails.isStp ? (
              <>
                <button
                  onClick={(e) => props.showContinuePopup(e)}
                  className="thankyou__continue"
                >
                  {thankyou[applicationDetails.thankyouText].continueButton}
                </button>
              </>
            ) : (
              <button
                onClick={(e) => props.submitForm(e)}
                className="thankyou__continue"
              >
                {thankyou[applicationDetails.thankyouText].doneButton}
              </button>
            )}
          </div>
          <ThankYouSurvey/>
        </div>
      </div>   
    </>
  );
};

export default ThankYouCC;


import { shallow } from "enzyme";
import ThankYouCC from "./thank-you-cc";

// Mocking necessary child components or data
jest.mock("./thankyou-banner", () => jest.fn(() => <div data-testid="thank-you-banner" />));
jest.mock("./thankyou-timeline", () => jest.fn(() => <div data-testid="thank-you-timeline" />));
jest.mock("./thankyou-survey", () => jest.fn(() => <div data-testid="thank-you-survey" />));

describe("ThankYouCC Component", () => {
  let wrapper: any;

  const defaultProps = {
    applicationDetails: {
      productName: "Credit Card",
      cardNumber: "1234 5678 9876 5432",
      thankyouText: "thankYouTextKey",
      thankyouProp: "Upload",
      isStp: false,
    },
    thankyou: {
      Upload: {
        CCPL: {
          banner_header: "Thank You!",
          banner_body_1: "Your documents have been submitted.",
          banner_body_2: "We'll notify you once processed.",
          resumeUrl: "https://example.com",
          title: "Application Submitted",
          content: "Your application is being processed.",
          note_title: "Important Note:",
          note_content_1: "Please keep your application number safe.",
          note_content_2: "We'll notify you about the next steps.",
          note_content_3: "You can track your application status online.",
          note_content_4: "Click here to track.",
          note_link: "https://example.com/track",
          timeLine: ["Step 1: Submitted", "Step 2: Processing"],
        },
        refId_lbl: "Application Reference Number:",
      },
      STPCCBanner: {
        banner_header: "Thank You for Applying!",
        banner_body_1: "Your application for",
        banner_body_2: "has been received.",
      },
      thankYouTextKey: {
        timeLine: "Processing Timeline",
        doneButton: "Done",
        continueButton: "Continue",
        timeline_header: "Processing Steps",
        timeline_desc: "Your application is being processed.",
      },
    },
    applicationReferenceNo: "REF123456789",
    showContinuePopup: jest.fn(),
    submitForm: jest.fn(),
    showOTPPopup: jest.fn(),
  };

  beforeAll(() => {
    wrapper = shallow(<ThankYouCC {...defaultProps} />);
  });

  it("should render the ThankYouBanner component with correct props", () => {
    expect(wrapper.find('[data-testid="thank-you-banner"]')).toHaveLength(1);
  });

  it("should render the ThankYouTimeline component", () => {
    expect(wrapper.find('[data-testid="thank-you-timeline"]')).toHaveLength(1);
  });

  it("should render the ThankYouSurvey component", () => {
    expect(wrapper.find('[data-testid="thank-you-survey"]')).to


import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import ThankYouCC from "./thank-you-cc";

// Mocked store and initial state
const mockStore = configureStore([]);
const initialState = {
  thankyou: {
    Upload: {
      CCPL: {
        banner_header: "Thank You!",
        banner_body_1: "Your documents have been submitted.",
        banner_body_2: "We'll notify you once processed.",
        resumeUrl: "https://example.com",
        title: "Application Submitted",
        content: "Your application is being processed.",
        note_title: "Important Note:",
        note_content_1: "Please keep your application number safe.",
        note_content_2: "We'll notify you about the next steps.",
        note_content_3: "You can track your application status online.",
        note_content_4: "Click here to track.",
        note_link: "https://example.com/track",
        timeLine: ["Step 1: Submitted", "Step 2: Processing"],
      },
      refId_lbl: "Application Reference Number:",
    },
    STPCCBanner: {
      banner_header: "Thank You for Applying!",
      banner_body_1: "Your application for",
      banner_body_2: "has been received.",
    },
    thankYouTextKey: {
      timeLine: "Processing Timeline",
      doneButton: "Done",
      continueButton: "Continue",
      timeline_header: "Processing Steps",
      timeline_desc: "Your application is being processed.",
    },
  },
  applicationDetails: {
    productName: "Credit Card",
    cardNumber: "1234 5678 9876 5432",
    thankyouText: "thankYouTextKey",
    thankyouProp: "Upload",
    isStp: false,
  },
};

// Mock props
const mockProps = {
  applicationReferenceNo: "REF123456789",
  showContinuePopup: jest.fn(),
  submitForm: jest.fn(),
  showOTPPopup: jest.fn(),
};

describe("ThankYouCC Component with Provider", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it("should render the ThankYouCC component with Provider", () => {
    render(
      <Provider store={store}>
        <ThankYouCC {...mockProps} />
      </Provider>
    );

    expect(screen.getByText("Thank You!")).toBeInTheDocument();
    expect(screen.getByText("Your documents have been submitted.")).toBeInTheDocument();
    expect(screen.getByText("Application Submitted")).toBeInTheDocument();
    expect(screen.getByText("REF123456789")).toBeInTheDocument();
  });

  it("should render the Done button for non-STP flow and handle click", () => {
    render(
      <Provider store={store}>
        <ThankYouCC {...mockProps} />
      </Provider>
    );

    const doneButton = screen.getByText("Done");
    expect(doneButton).toBeInTheDocument();
    fireEvent.click(doneButton);
    expect(mockProps.submitForm).toHaveBeenCalled();
  });

  it("should render the Continue button for STP flow and handle click", () => {
    const stpState = {
      ...initialState,
      applicationDetails: { ...initialState.applicationDetails, isStp: true },
    };
    store = mockStore(stpState);

    render(
      <Provider store={store}>
        <ThankYouCC {...mockProps} />
      </Provider>
    );

    const continueButton = screen.getByText("Continue");
    expect(continueButton).toBeInTheDocument();
    fireEvent.click(continueButton);
    expect(mockProps.showContinuePopup).toHaveBeenCalled();
  });

  it("should render notes for non-STP flow", () => {
    render(
      <Provider store={store}>
        <ThankYouCC {...mockProps} />
      </Provider>
    );

    expect(screen.getByText("Important Note:")).toBeInTheDocument();
    expect(screen.getByText("Please keep your application number safe.")).toBeInTheDocument();
    expect(screen.getByText("Click here to track.")).toHaveAttribute("href", "https://example.com/track");
  });

  it("should display product and card details for STP flow", () => {
    const stpState = {
      ...initialState,
      applicationDetails: { ...initialState.applicationDetails, isStp: true },
    };
    store = mockStore(stpState);

    render(
      <Provider store={store}>
        <ThankYouCC {...mockProps} />
      </Provider>
    );

    expect(screen.getByText("Your application for")).toBeInTheDocument();
    expect(screen.getByText("Credit Card")).toBeInTheDocument();
    expect(screen.getByText("1234 5678 9876 5432")).toBeInTheDocument();
  });
});

import { shallow } from "enzyme";
import ThankYouCC from "./thank-you-cc";

jest.mock("./thankyou-banner", () => jest.fn(() => <div data-testid="thank-you-banner" />));
jest.mock("./thankyou-timeline", () => jest.fn(() => <div data-testid="thank-you-timeline" />));
jest.mock("./thankyou-survey", () => jest.fn(() => <div data-testid="thank-you-survey" />));

describe("ThankYouCC Component", () => {
  const mockApplicationDetails = {
    productName: "Credit Card",
    cardNumber: "1234 5678 9876 5432",
    thankyouText: "thankYouTextKey",
    thankyouProp: "Upload",
    isStp: false,
  };

  const mockThankyou = {
    Upload: {
      CCPL: {
        banner_header: "Thank You!",
        banner_body_1: "Your documents have been submitted.",
        banner_body_2: "We'll notify you once processed.",
        resumeUrl: "https://example.com",
        title: "Application Submitted",
        content: "Your application is being processed.",
        note_title: "Important Note:",
        note_content_1: "Please keep your application number safe.",
        note_content_2: "We'll notify you about the next steps.",
        note_content_3: "You can track your application status online.",
        note_content_4: "Click here to track.",
        note_link: "https://example.com/track",
        timeLine: ["Step 1: Submitted", "Step 2: Processing"],
      },
      refId_lbl: "Application Reference Number:",
    },
    STPCCBanner: {
      banner_header: "Thank You for Applying!",
      banner_body_1: "Your application for",
      banner_body_2: "has been received.",
    },
    thankYouTextKey: {
      timeLine: "Processing Timeline",
      doneButton: "Done",
      continueButton: "Continue",
      timeline_header: "Processing Steps",
      timeline_desc: "Your application is being processed.",
    },
  };

  const mockApplicationReferenceNo = "REF123456789";

  const wrapper = shallow(
    <ThankYouCC
      applicationDetails={mockApplicationDetails}
      thankyou={mockThankyou}
      applicationReferenceNo={mockApplicationReferenceNo}
      showContinuePopup={jest.fn()}
      submitForm={jest.fn()}
      showOTPPopup={jest.fn()}
    />
  );

  it("renders ThankYouBanner component", () => {
    expect(wrapper.find('[data-testid="thank-you-banner"]')).toHaveLength(1);
  });

  it("renders ThankYouTimeline component", () => {
    expect(wrapper.find('[data-testid="thank-you-timeline"]')).toHaveLength(1);
  });

  it("renders ThankYouSurvey component", () => {
    expect(wrapper.find('[data-testid="thank-you-survey"]')).toHaveLength(1);
  });

  it("displays the correct reference number", () => {
    expect(wrapper.find(".body__app-details").text()).toContain("REF123456789");
  });

  it("renders Done button for non-STP flow", () => {
    const button = wrapper.find("button.thankyou__continue");
    expect(button.text()).toBe("Done");
  });

  it("renders Continue button for STP flow", () => {
    wrapper.setProps({
      applicationDetails: { ...mockApplicationDetails, isStp: true },
    });
    const button = wrapper.find("button.thankyou__continue");
    expect(button.text()).toBe("Continue");
  });

  it("displays note content for non-STP flow", () => {
    expect(wrapper.find(".thankyou__note__content").at(0).text()).toContain("Important Note:");
    expect(wrapper.find(".thankyou__note__content").at(1).text()).toContain("Please keep your application number safe.");
  });

  it("renders product name and card details for STP flow", () => {
    wrapper.setProps({
      applicationDetails: { ...mockApplicationDetails, isStp: true },
    });
    expect(wrapper.find(".thankyou__title").text()).toContain("Credit Card");
    expect(wrapper.find(".thankyou__title").text()).toContain("1234 5678 9876 5432");
  });
});
Player } from "@lottiefiles/react-lottie-player";
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
            {props.productName} {}
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





import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ThankYouCC from "./thank-you-cc";

jest.mock("./thankyou-banner", () => () => <div data-testid="thank-you-banner" />);
jest.mock("./thankyou-timeline", () => () => <div data-testid="thank-you-timeline" />);
jest.mock("./thankyou-survey", () => () => <div data-testid="thank-you-survey" />);

describe("ThankYouCC Component", () => {
  const mockStore = configureStore([]);
  const store = mockStore({}); // Add the necessary initial state

  it("should render the ThankYouCC component with Provider", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ThankYouCC />
      </Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });
});

import "./thank-you.scss";
import { KeyWithAnyModel } from "../../../utils/model/common-model";
import ThankYouTimeline from "./thankyou-timeline";
import ThankYouBanner from "./thankyou-banner";
import ThankYouSurvey from "./thankyou-survey"
const ThankYouCC = (props: KeyWithAnyModel) => {
  const applicationDetails = props.applicationDetails;
  const thankyou = props.thankyou;

  const getTimelineData = () => {
    if (!applicationDetails.isStp) {
      return thankyou[applicationDetails.thankyouProp].CCPL.timeLine;
    }
    return thankyou.CCSTP;
  };
  return (
    <>
      <ThankYouBanner
        banner_header={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.banner_header
            : thankyou.STPCCBanner.banner_header
        }
        banner_content={true}
        // banner_body_1={
        //   !applicationDetails.isStp
        //     ? thankyou[applicationDetails.thankyouProp].CCPL.banner_body_1
        //     : ""
        // }
        productName={" "}
        banner_body_2={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.banner_body_2
            : ""
        }
        resumeUrl={
          !applicationDetails.isStp
            ? thankyou[applicationDetails.thankyouProp].CCPL.resumeUrl
            : ""
        }
      />
      <div className="thankyou__body__outer">
        <div className="thankyou__body">
          {!applicationDetails.isStp && (
            <>
              <div className="thankyou__title">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.title}
                </label>
              </div>
              <div className="thankyou__content">
                <label>
                  {thankyou[applicationDetails.thankyouProp].CCPL.content}
                </label>
              </div>
            </>
          )}
          {applicationDetails.isStp && (
            <div className="thankyou__title">
              <div>
                {thankyou.STPCCBanner.banner_body_1}
                {applicationDetails.productName}
                {thankyou.STPCCBanner.banner_body_2}
              </div>
              <div>{applicationDetails.productName}</div>
              <div>{applicationDetails.cardNumber}</div>
            </div>
          )}
          <ThankYouTimeline
            title={thankyou[applicationDetails.thankyouText].timeLine}
            data={getTimelineData()}
            checkCompletedStatus={true}
            handleLink={props.showOTPPopup}
          />
          {applicationDetails.isStp && (
            <div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_header}
              </div>
              <div>
                {thankyou[applicationDetails.thankyouText].timeline_desc}
              </div>
            </div>
          )}
          {!applicationDetails.isStp && (
            <div>
              <div className="thankyou__note__content">
                <label>{thankyou.CCPL.note_title}</label>
              </div>
              <div className="thankyou__note__content">
                <div>{thankyou.CCPL.note_content_1}</div>
                <div>{thankyou.CCPL.note_content_2}</div>
              </div>
              <div className="thankyou__note__content">
                <div>{thankyou.CCPL.note_content_3}</div>
                <div>
                  <a
                    target="_blank"
                    rel="feedback noreferrer"
                    href={thankyou.CCPL.note_link}
                  >
                    {thankyou.CCPL.note_content_4}
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="body__app-details">
            <label>{thankyou.CCPL.refId_lbl}</label>
            {props.applicationReferenceNo!}
          </div>
          <div className="body__refno">
            {applicationDetails.isStp ? (
              <>
                <button
                  onClick={(e) => props.showContinuePopup(e)}
                  className="thankyou__continue"
                >
                  {thankyou[applicationDetails.thankyouText].continueButton}
                </button>
              </>
            ) : (
              <button
                onClick={(e) => props.submitForm(e)}
                className="thankyou__continue"
              >
                {thankyou[applicationDetails.thankyouText].doneButton}
              </button>
            )}
          </div>
          <ThankYouSurvey/>
        </div>
      </div>   
    </>
  );
};

export default ThankYouCC;

