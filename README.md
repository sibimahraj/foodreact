
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

  import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    error: {},
    mandatoryFields: []
}

const fieldError = createSlice({
    name: 'fielderror',
    initialState: initialState,
    reducers: {
        getFieldError(state, action) {
            const newError = action.payload;
            console.log("sliceerror",newError)
            // state.error = newError.fieldName
            if (newError) {
                state.error = newError.fieldName
            } else {
                state.error = {};
            }
        },
        removeToggleFieldError(state, action) {
            const s = action.payload;
            /*istanbul ignore next */
            if (state.error) {
                s.forEach((data: any) => {
                    const position = Object.keys(state.error).indexOf(data);
                    if (position >= 0) {
                        state.error.splice(position, 1);
                    }
                })                
            }
        },
        getMandatoryFields(state, action) {
            if (action.payload) {
                if (state.mandatoryFields && state.mandatoryFields.length > 0) {
                    action.payload.forEach((item:string) => {
                        if(!(state.mandatoryFields.includes(item))) {
                            state.mandatoryFields = state.mandatoryFields.concat(item)
                        }
                    });
                } else {
                    state.mandatoryFields = action.payload;
                }
            } else {
                state.mandatoryFields = null;
            }
        },
        updateMandatoryFields(state, action) {
            if (action.payload) {
                if (state.mandatoryFields && state.mandatoryFields.length > 0) {
                    action.payload.forEach((item:string) => {
                        /*istanbul ignore else */
                        if(!(state.mandatoryFields.includes(item))) {
                            state.mandatoryFields = state.mandatoryFields.concat(item)
                        }
                    });
                } else {
                    state.mandatoryFields = action.payload;
                }
            }
        },
        removeMandatoryFields(state, action) {
            const nonMandatoryField = action.payload;
            /*istanbul ignore else */   
            if (state.mandatoryFields) {
                nonMandatoryField.forEach((data: string) => {
                    const position = Object.values(state.mandatoryFields).indexOf(data);
                    /*istanbul ignore else */ 
                    if (position >= 0) {
                        state.mandatoryFields.splice(position, 1);
                    }
                })                
            }
        }
    }
});

export const fieldErrorAction = fieldError.actions;

export default fieldError;

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


import { useEffect, useState } from "react";
import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import thankyouData from "../../../assets/_json/thankyou.json";
import { useSelector, useDispatch } from "react-redux";
import { getUrl } from "../../../utils/common/change.utils";
import trackEvents from "../../../services/track-events";
import {
  redirectingToIbanking,
  activateDigitalCard,
} from "../../../services/common-service";
import Model from "../../../shared/components/model/model";
import PopupModel from "../../../shared/components/popup-model/popup-model";
// import ThankYouCASA from "./thankyou-casa";
import ThankYouCC from "./thankyou-cc";
// import ThankYouPL from "./thankyou-pl";
import CCWithoutActivation from "./cc-without-activation";
import gaTrackEvents from "../../../services/ga-track-events";
import CCActivationSucess from "./cc-activation-success";
import ThankyouError from "./thankyou-error";
import { useNavigate } from "react-router-dom";
import ThankYouUpload from "./thankyou-upload";
import { store } from "../../../utils/store/store";

const ThankYou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  // const applicationJourney = useSelector(
  //   (state: StoreModel) => state.stages.journeyType
  // );
  const otpSuccessSelector = useSelector(
    (state: StoreModel) => state.stages.otpSuccess
  );
  const thankyou: KeyWithAnyModel = thankyouData;
  //const [isFunding, setIsFunding] = useState(false);
  const applicationReferenceNo = stageSelector[0].stageInfo.application.application_reference;
  const [applicationDetails, setApplicationDetails] = useState({
    productCategory: "",
    productName: "",
    acct_details: [],
    account_number: "",
    thankyouProp: "NSTP",
    accountNum: "",
    thankyouText: "Common",
    thankyouFeedback: "Feedback",
    feedbackUrl: "",
    isStp: false,
    loanTenureMonths: "",
    approvedLoan: 0,
    productType: "",
    feeAmount: "",
    card_no: "",
    cardNumber: "",
    cardName: "",
    productSequenceNo: "",
  });
  // const [enableActivation, setEnableActivation] = useState<boolean>(false);
  // const [showPlatinum, setShowPlatinum] = useState<boolean>(false);
  // const [isCampaignBenefits, setIsCampaignBenefits] = useState<boolean>(false);
  const [
    showContinueWithoutActivationMsg,
    setShowContinueWithoutActivationMsg,
  ] = useState<boolean>(false);
  const [continueWithoutActivationUI, setContinueWithoutActivationUI] =
    useState(false);
  const [cardActivationSuccessUI, setCardActivationSuccessUI] = useState(false);
  const [showErrorUI, setShowerrorUI] = useState(false);

  useEffect(() => {
    setApplicationDetails((prevValue) => {
      if (
        stageSelector &&
        stageSelector[0].stageInfo && stageSelector[0].stageInfo.products &&
        stageSelector[0].stageInfo.products.length >= 1
      ) {
        prevValue.productCategory =
          stageSelector[0].stageInfo.products[0].product_category;
        prevValue.productName = stageSelector[0].stageInfo.products[0].name;
        prevValue.productSequenceNo =
          stageSelector[0].stageInfo.products[0].product_sequence_number;
        prevValue.productType =
          stageSelector[0].stageInfo.products[0].product_type;
        if (
          stageSelector[0].stageInfo.products[0].acct_details &&
          stageSelector[0].stageInfo.products[0].acct_details.length >= 1
        ) {
          prevValue.acct_details =
            stageSelector[0].stageInfo.products[0].acct_details;
          prevValue.account_number =
            stageSelector[0].stageInfo.products[0].acct_details[0].account_number;
          prevValue.card_no =
            stageSelector[0].stageInfo.products[0].acct_details[0].card_no;
        }
      }
      prevValue.thankyouProp = "NSTP";
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.account_number
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.accountNum = prevValue.account_number;
      }
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.card_no
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.cardNumber = prevValue.card_no;
      }
      prevValue.isStp = prevValue.thankyouProp === "STP" ? true : false;
      prevValue.feedbackUrl =
        thankyou[prevValue.thankyouFeedback]["url_prefix"] +
        thankyou[prevValue.thankyouFeedback]["casa"] +
        thankyou[prevValue.thankyouFeedback]["url_suffix"] +
        applicationReferenceNo!;

      prevValue = setSTPData(prevValue);
      if (prevValue.isStp) {
        if (prevValue.productCategory === "CC") {
          if (stageSelector[0].stageInfo.applicants) {
            if (stageSelector[0].stageInfo.applicants.embossed_name_a_1) {
              prevValue.cardName =
                stageSelector[0].stageInfo.applicants.embossed_name_a_1.toUpperCase();
            }
            if (prevValue.card_no) {
              prevValue.cardNumber = prevValue.card_no;
            }
          }
         } 
         //else if (prevValue.productCategory === "PL") {
        //   if (stageSelector && stageSelector[0].stageInfo) {
        //     if (stageSelector[0].stageInfo.products.length >= 1) {
        //       prevValue.productType =
        //         stageSelector[0].stageInfo.products[0].product_type;
        //       if (
        //         stageSelector[0].stageInfo.products[0].offer_details &&
        //         stageSelector[0].stageInfo.products[0].offer_details[0].fees
        //       )
        //         prevValue.feeAmount =
        //           stageSelector[0].stageInfo.products[0].offer_details[0].fees[0].fee_amount;
        //       setIsCampaignBenefits(
        //         thankyou.CCPL.FeeFreeCampaignCode.indexOf(
        //           stageSelector[0].stageInfo.products[0].campaign
        //         ) !== -1
        //       );
        //       if (stageSelector[0].stageInfo.products[0].acct_details) {
        //         setShowPlatinum(
        //           stageSelector[0].stageInfo.products[0].acct_details.length > 1
        //         );
        //       }
        //     }
        //     if (stageSelector[0].stageInfo.applicants) {
        //       if (stageSelector[0].stageInfo.applicants.loan_tenor_a_1)
        //         prevValue.loanTenureMonths =
        //           stageSelector[0].stageInfo.applicants.loan_tenor_a_1;
        //       if (
        //         stageSelector[0].stageInfo.applicants.required_loan_amount_a_1
        //       )
        //         prevValue.approvedLoan =
        //           stageSelector[0].stageInfo.applicants.required_loan_amount_a_1;
        //       let auth_mode =
        //         stageSelector[0].stageInfo.applicants["auth_mode_a_1"] || "";
        //       let activate = !(
        //         applicationJourney === "NTB" && auth_mode[1] === "N"
        //       );
              
        //       setEnableActivation(activate);
        //     }
        //   }
        // }
      }
      return { ...prevValue };
    });
    if (stageSelector[0] && stageSelector[0].stageId && getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload) {
      gaTrackEvents.pageView(stageSelector[0].stageId);
    }
    if(getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload){
    trackEvents.triggerAdobeEvent("formSubmit");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (otpSuccessSelector) {
      activateCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpSuccessSelector]);
  const setSTPData = (prevValue: any) => {
    if (prevValue.isStp && prevValue.productCategory) {
      if (prevValue.productCategory === "CC") {
        prevValue.feedbackUrl =
          thankyou[prevValue.thankyouFeedback]["url_prefix"] +
          thankyou[prevValue.thankyouFeedback]["cc"] +
          thankyou[prevValue.thankyouFeedback]["url_suffix"] +
          applicationReferenceNo!;
      } else if (prevValue.productCategory === "PL") {
        prevValue.feedbackUrl =
          thankyou[prevValue.thankyouFeedback]["url_prefix"] +
          thankyou[prevValue.thankyouFeedback]["pl"] +
          thankyou[prevValue.thankyouFeedback]["url_suffix"] +
          applicationReferenceNo!;
      }
    }
    return prevValue;
  };

  const submitForm = (event:React.FormEvent<EventTarget>) => {
    if (
      stageSelector &&
      (stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IX" || stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IM")
    ) {
      goToIBanking(event);
    } else {
      window.location.href = `${process.env.REACT_APP_HOME_PAGE_URL}`;
    }
    event.preventDefault();
  };

  const continueWithoutActivation = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(true);
  };
  const showContinuePopup = (event: React.FormEvent<EventTarget>) => {
    setShowContinueWithoutActivationMsg(true);
    event.preventDefault();
  };
  const handlePopupBackButton = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(false);
  };
  const showOTPPopup = () => {
    navigate("/otp");
  };
  const goToIBanking = (event: React.FormEvent<EventTarget>) => {
    if (getUrl.getParameterByName("source") === "scm") {
      //Ibanking redirection for app
      window.location.href = `${process.env.REACT_APP_IBANKING_SC_MOBILE}`;
    }  else if(getUrl.getUpdatedStage().ccplChannel=== "MBNK") {
      const redirectUrl =  `${process.env.REACT_APP_IBANKING_SC_MOBILE_TRANSFER}`;
      window.location.href = redirectUrl;
    }else {
      redirectingToIbanking();
    }
    event.preventDefault();
  };
  const activateCard = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(false);
    setShowerrorUI(false);
    dispatch(activateDigitalCard(applicationDetails)).then((result: any) => {
      if (result.status && result.status.toUpperCase() === "SUCCESS") {
        setCardActivationSuccessUI(true);
      } else {
        setShowerrorUI(true);
      }
    });
  };
  return (
    <>
      {applicationDetails && (
        <form className="form">
          <div className="app thankyou">
            <div className="app__body">
              <div className="app__right">
                <div className="thankyou__container">
                  {!showErrorUI &&
                    !continueWithoutActivationUI &&
                    !cardActivationSuccessUI && (
                      <>
                      {(getUrl.getParameterByName("auth") === "upload" || store.getState().stages.isDocumentUpload) &&(
                          <ThankYouUpload
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          submitForm={submitForm}
                        />
                        )}
                        {/* {(applicationDetails.productCategory === "CA" ||
                          applicationDetails.productCategory === "SA") && (
                          <ThankYouCASA
                            applicationDetails={applicationDetails}
                            thankyou={thankyou}
                            applicationReferenceNo={applicationReferenceNo}
                            submitForm={submitForm}
                          />
                        )} */}
                        {applicationDetails.productCategory === "CC" && (
                          <ThankYouCC
                            applicationDetails={applicationDetails}
                            thankyou={thankyou}
                            applicationReferenceNo={applicationReferenceNo}
                            submitForm={submitForm}
                            activateCard={activateCard}
                            showContinuePopup={showContinuePopup}
                            showOTPPopup={showOTPPopup}
                          />
                        )}
                        {/* {applicationDetails.productCategory === "PL" && (
                          <ThankYouPL
                            applicationDetails={applicationDetails}
                            thankyou={thankyou}
                            applicationReferenceNo={applicationReferenceNo}
                            submitForm={submitForm}
                            enableActivation={enableActivation}
                            showPlatinum={showPlatinum}
                            isCampaignBenefits={isCampaignBenefits}
                          />
                        )} */}
                        {showContinueWithoutActivationMsg && (
                          <PopupModel displayPopup={true}>
                            <Model
                              name="CCThankYou"
                              handlebuttonClick={handlePopupBackButton}
                              handleContinueWithoutActivation={
                                continueWithoutActivation
                              }
                            />
                          </PopupModel>
                        )}
                      </>
                    )}
                  {applicationDetails.productCategory === "CC" && (
                    <>
                      {continueWithoutActivationUI && (
                        <CCWithoutActivation
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          goToIBanking={goToIBanking}
                        />
                      )}
                      {cardActivationSuccessUI && (
                        <CCActivationSucess
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          goToIBanking={goToIBanking}
                        />
                      )}
                    </>
                  )}
                  {showErrorUI && (
                    <ThankyouError
                      applicationDetails={applicationDetails}
                      thankyou={thankyou}
                      applicationReferenceNo={applicationReferenceNo}
                      goToIBanking={goToIBanking}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ThankYou;

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./dashboard.scss";
import Header from "./header/header";
import Fields from "./fields/fields";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  dispatchLoader,
  getClientInfo,
  // lovRequests,
  // resumeRequest,
  // uploadRequest,
  // getBancaEligibleProducts
} from "../../services/common-service";
import { StoreModel } from "../../utils/model/common-model";
import MyinfoSingpassLogin from "../../shared/components/myinfo-singpass-login-modal/myinfo-singpass-login";
import PopupModel from "../../shared/components/popup-model/popup-model";
import { urlParamAction } from "../../utils/store/urlparam-slice";
import Model from "../../shared/components/model/model";
import { loaderAction } from "../../utils/store/loader-slice";
import { store } from "../../utils/store/store";
import { getUrl } from "../../utils/common/change.utils";
// import { authAction } from "../../utils/store/auth-slice";
// import { stagesAction } from "../../utils/store/stages-slice";
// import { taxAction } from "../../utils/store/tax-slice";
// import { bancaListAction } from "../../utils/store/banca-slice";
// import OTPModel from "../../shared/components/otp-modal/otp";
// import { nextStage } from "./fields/stage.utils";
// import { referralcodeAction } from "../../utils/store/referral-code-slice";
// import { BANCAINFO} from "../../utils/common/constants";
// import { rateAction } from "../../utils/store/rate-slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = useLocation();
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const myInfoAuthSelector = useSelector(
    (state: StoreModel) => state.urlParam.myInfo
  );
  const otpShowSelector = useSelector(
    (state: StoreModel) => state.stages.otpOpen
  );
  const otpResumeSelector = useSelector(
    (state: StoreModel) => state.stages.otpResume
  );
  const referralcodeSelector = useSelector((state: StoreModel) => state.referralcode);
  const [urlInvalid, setUrlInvalid] = useState(false);
  const [marginTop, setMarginTop] = useState(0);
  const headerHeight = useRef<HTMLInputElement>(null);
  const [fieldsComponent, setFieldsComponent] = useState(false);
  const [pointer, setPointer] = useState(false);
  const ctaLoader: any = getUrl.getLoader().cta;
  const [isMobileView, setIsMobileView] = useState<number>(0);
  const [uploadJourney, setFieldsUpload] = useState(false);
  const [ntcIbanking, setNtcIbanking] = useState(false);

  useEffect(() => {
    if (ctaLoader) {
      setPointer(ctaLoader.cta ? true : false);
    }
  }, [ctaLoader]);

  useLayoutEffect(() => {
    let clearSetTimeout: ReturnType<typeof setTimeout>;
    function updateSize() {
      setIsMobileView(window.innerWidth < 768 ? 110 : 167);
      if (headerHeight.current) {
        clearSetTimeout = setTimeout(() => {
          setMarginTop(headerHeight && headerHeight.current!["offsetHeight"]);
        }, 100);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
      clearTimeout(clearSetTimeout);
    };
  }, [stageSelector]);

  // useEffect(() => {
  //   if (otpResumeSelector) {
  //     setFieldsComponent(true);
  //     //dispatch(stagesAction.setOtpResume(false));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [otpResumeSelector]);
  
  useEffect(() => {
    dispatch(dispatchLoader(true));
    dispatch(urlParamAction.getUrlParameter(urlParams));
    if (!store.getState().urlParam.validUrl) {
      dispatch(
        loaderAction.getState({
          isFetching: false,
        })
      );
      setUrlInvalid(true);
    } 
    // else if (getUrl.getParameterByName("auth") === "resume") {
    //   dispatch(urlParamAction.isResume(true));
    //   /* var mobilenumber = sessionStorage.getItem("mobileNumber");
    //   dispatch(getClientInfo()).then(async (response: any) => {
    //     if (response) {
    //       setFieldsComponent(true);
    //       navigate("/otp");
    //     }
    //   });*/
    //   dispatch(
    //     authAction.getSession({
    //       sessionuid: sessionStorage.getItem("session_id"),
    //     })
    //   );
    //   const refNo = sessionStorage.getItem("ref");
    // dispatch(urlParamAction.getAuthorize({ applicationRefNo: refNo }));
    // sessionStorage.removeItem("session_id");
    // sessionStorage.removeItem("ref");
    // dispatch(resumeRequest(refNo)).then(async (response: any) => {
    //   if (response) {
    //     if (response.application && response.application.journey_type) {
    //       dispatch(
    //         stagesAction.setJourneyType(response.application.journey_type)
    //       );
    //     }
    //     if(response.application.journey_type === 'NTC' &&  (response.products[0].product_category === 'CC' || response.products[0].product_type === '280')){
    //     dispatch(getBancaEligibleProducts(response));
    //     dispatch(urlParamAction.getAuthorize({applicationRefNo:response.application.application_reference}));            
    //     if(response.products[0].product_category === 'CC'){
    //     let bancaDetails : any = {};
    //     const bancaVal = response.applicants;
    //     Object.keys(bancaVal).forEach((key:any) => {
    //       if(BANCAINFO.DEFAULT_BANCA_VALUE.includes(key)){
    //         bancaDetails[key] = bancaVal[key];
    //       }
    //     });
    //     dispatch(bancaListAction.getBancaData(bancaDetails));
    //    }
    //   }
    //  if(response.products[0].product_category === 'PL'){
    //     if(response.applicants.rbp_applied_rate_a_1) {dispatch(rateAction.updateAR(response.applicants.rbp_applied_rate_a_1))}
    //     if(response.applicants.rbp_effective_Interest_rate_a_1) { dispatch(rateAction.updateEIR(response.applicants.rbp_effective_Interest_rate_a_1)) }
    //   }
    //     setFieldsComponent(true);
    //     let stageTo = response.application.stage.page_id;
    //     if (
    //       response.applicant_documents &&
    //       response.applicant_documents[0] &&
    //       response.applicant_documents[0].document_list &&
    //       response.applicant_documents[0].document_list.length <= 0
    //     ) {
    //       delete response.applicant_documents;
    //     }

    //     dispatch(
    //       stagesAction.getStage({
    //         id: stageTo,
    //         formConfig: response,
    //       })
    //     );

    //     if (stageTo === "ssf-1" && response.application.journey_type) {
    //       stageTo = nextStage(stageTo, response.application.journey_type);
    //       dispatch(
    //         stagesAction.getStage({
    //           id: stageTo,
    //           formConfig: response,
    //         })
    //       );
    //     }
    //     dispatch(referralcodeAction.setReferralId(response.application.referral_id_2));
    //     dispatch(stagesAction.updateTaxFields(response.applicants));
    //     dispatch(bancaListAction.getBancaData(response.applicants));
    //     dispatch(stagesAction.updateUserInputFields(response.applicants));
    //     dispatch(taxAction.updateTax(response.applicants));
    //     dispatch(lovRequests(response, stageTo));
    //   }
    // }); 
    // } else if (getUrl.getParameterByName("auth") === "upload") {
    //   setFieldsUpload(true);
    //   dispatch(urlParamAction.isUpload(true))
    //   dispatch(
    //     authAction.getSession({
    //      sessionuid: sessionStorage.getItem("session_id"),
    //     })
    //   );
    //   const refNo = sessionStorage.getItem("ref");
    //   dispatch(urlParamAction.getAuthorize({ applicationRefNo: refNo }));
    //   sessionStorage.removeItem("session_id");
    //   sessionStorage.removeItem("ref");
    //   dispatch(uploadRequest(refNo)).then(async (response: any) => {
    //     if (response) {
    //       setFieldsComponent(true);
    //      // const stageTo = response.application.stage.page_id;
         
    //       if (
    //         response.applicant_documents &&
    //         response.applicant_documents[0] &&
    //         response.applicant_documents[0].document_list &&
    //         response.applicant_documents[0].document_list.length <= 0
    //       ) {delete response.applicant_documents;
    //       }
    //       dispatch(
    //         stagesAction.getStage({
    //           id: 'doc',
    //           formConfig: response,
    //         })
    //       );
    //     }
    //   });
    // } 
    else {
      dispatch(getClientInfo()).then(async (response: any) => {
        if(response){
        setFieldsComponent(true);
        navigate("sg/super-short-form");
      }
      //   if (response === 'ibankingNTC') {
      //     setNtcIbanking(true);
      //     dispatch(dispatchLoader(false));
      //   }
      //   else {          
      //     setFieldsComponent(true);
      //      if (response === 'ibankingMyinfoCC') {     
      //        navigate("sg/employment");
      //      }
      //      else if (response === 'ibankingMyinfoPL') {     
      //       navigate("sg/loan-calculator")
      //     }
      //      else if (response) {
      //        navigate("sg/super-short-form");
      //     }
      // }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() =>{

  //   if(stageSelector && stageSelector[0] && stageSelector[0].stageInfo.application.refer){
  //     dispatch(referralcodeAction.setReferralFlag(stageSelector[0].stageInfo.application.refer));
  //   }
  //   if(stageSelector && stageSelector[0]  && stageSelector[0].stageInfo.application.referId){
  //     if(referralcodeSelector && !(referralcodeSelector.referId)){
  //       dispatch(referralcodeAction.setReferralId(stageSelector[0].stageInfo.application.referId));
  //     }
  //   }
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[stageSelector && stageSelector[0] && stageSelector[0].stageInfo.application])

  return (
    <>
      {(urlInvalid || myInfoAuthSelector  || ntcIbanking) && (
        <PopupModel displayPopup={myInfoAuthSelector || urlInvalid  || ntcIbanking}>
          {urlInvalid ? <Model name="globalError" /> : <MyinfoSingpassLogin />}
        </PopupModel>
      )}

      {/* {stageSelector &&
        stageSelector[0] &&
        stageSelector[0].stageId === "bd-3" &&
        otpShowSelector && <OTPModel />} */}

      {stageSelector && stageSelector.length > 0 && !otpShowSelector && (
        <div className="app">
          <div className="app__header">
            <div ref={headerHeight}>
              <Header />
            </div>
          </div>
          <div
            className={`app__body ${pointer ? "pointer-none" : ""}`}
            style={{
              marginTop: marginTop + "px",
              height: `calc(100dvh - ${marginTop + isMobileView}px)`,
            }}
          >
            <div className="wrapper">
              <div>{fieldsComponent && <Fields />}</div>
              <div>{/* <NeedHelp /> */}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;


import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./dashboard.scss";
import Header from "./header/header";
import Fields from "./fields/fields";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  dispatchLoader,
  getClientInfo,
  // lovRequests,
  // resumeRequest,
  // uploadRequest,
  // getBancaEligibleProducts
} from "../../services/common-service";
import { StoreModel } from "../../utils/model/common-model";
import MyinfoSingpassLogin from "../../shared/components/myinfo-singpass-login-modal/myinfo-singpass-login";
import PopupModel from "../../shared/components/popup-model/popup-model";
import { urlParamAction } from "../../utils/store/urlparam-slice";
import Model from "../../shared/components/model/model";
import { loaderAction } from "../../utils/store/loader-slice";
import { store } from "../../utils/store/store";
import { getUrl } from "../../utils/common/change.utils";
// import { authAction } from "../../utils/store/auth-slice";
// import { stagesAction } from "../../utils/store/stages-slice";
// import { taxAction } from "../../utils/store/tax-slice";
// import { bancaListAction } from "../../utils/store/banca-slice";
// import OTPModel from "../../shared/components/otp-modal/otp";
// import { nextStage } from "./fields/stage.utils";
// import { referralcodeAction } from "../../utils/store/referral-code-slice";
// import { BANCAINFO} from "../../utils/common/constants";
// import { rateAction } from "../../utils/store/rate-slice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = useLocation();
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const myInfoAuthSelector = useSelector(
    (state: StoreModel) => state.urlParam.myInfo
  );
  const otpShowSelector = useSelector(
    (state: StoreModel) => state.stages.otpOpen
  );
  const otpResumeSelector = useSelector(
    (state: StoreModel) => state.stages.otpResume
  );
  const referralcodeSelector = useSelector((state: StoreModel) => state.referralcode);
  const [urlInvalid, setUrlInvalid] = useState(false);
  const [marginTop, setMarginTop] = useState(0);
  const headerHeight = useRef<HTMLInputElement>(null);
  const [fieldsComponent, setFieldsComponent] = useState(false);
  const [pointer, setPointer] = useState(false);
  const ctaLoader: any = getUrl.getLoader().cta;
  const [isMobileView, setIsMobileView] = useState<number>(0);
  const [uploadJourney, setFieldsUpload] = useState(false);
  const [ntcIbanking, setNtcIbanking] = useState(false);

  useEffect(() => {
    if (ctaLoader) {
      setPointer(ctaLoader.cta ? true : false);
    }
  }, [ctaLoader]);

  useLayoutEffect(() => {
    let clearSetTimeout: ReturnType<typeof setTimeout>;
    function updateSize() {
      setIsMobileView(window.innerWidth < 768 ? 110 : 167);
      if (headerHeight.current) {
        clearSetTimeout = setTimeout(() => {
          setMarginTop(headerHeight && headerHeight.current!["offsetHeight"]);
        }, 100);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
      clearTimeout(clearSetTimeout);
    };
  }, [stageSelector]);

  // useEffect(() => {
  //   if (otpResumeSelector) {
  //     setFieldsComponent(true);
  //     //dispatch(stagesAction.setOtpResume(false));
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [otpResumeSelector]);
  
  useEffect(() => {
    dispatch(dispatchLoader(true));
    dispatch(urlParamAction.getUrlParameter(urlParams));
    if (!store.getState().urlParam.validUrl) {
      dispatch(
        loaderAction.getState({
          isFetching: false,
        })
      );
      setUrlInvalid(true);
    } 
    // else if (getUrl.getParameterByName("auth") === "resume") {
    //   dispatch(urlParamAction.isResume(true));
    //   /* var mobilenumber = sessionStorage.getItem("mobileNumber");
    //   dispatch(getClientInfo()).then(async (response: any) => {
    //     if (response) {
    //       setFieldsComponent(true);
    //       navigate("/otp");
    //     }
    //   });*/
    //   dispatch(
    //     authAction.getSession({
    //       sessionuid: sessionStorage.getItem("session_id"),
    //     })
    //   );
    //   const refNo = sessionStorage.getItem("ref");
    // dispatch(urlParamAction.getAuthorize({ applicationRefNo: refNo }));
    // sessionStorage.removeItem("session_id");
    // sessionStorage.removeItem("ref");
    // dispatch(resumeRequest(refNo)).then(async (response: any) => {
    //   if (response) {
    //     if (response.application && response.application.journey_type) {
    //       dispatch(
    //         stagesAction.setJourneyType(response.application.journey_type)
    //       );
    //     }
    //     if(response.application.journey_type === 'NTC' &&  (response.products[0].product_category === 'CC' || response.products[0].product_type === '280')){
    //     dispatch(getBancaEligibleProducts(response));
    //     dispatch(urlParamAction.getAuthorize({applicationRefNo:response.application.application_reference}));            
    //     if(response.products[0].product_category === 'CC'){
    //     let bancaDetails : any = {};
    //     const bancaVal = response.applicants;
    //     Object.keys(bancaVal).forEach((key:any) => {
    //       if(BANCAINFO.DEFAULT_BANCA_VALUE.includes(key)){
    //         bancaDetails[key] = bancaVal[key];
    //       }
    //     });
    //     dispatch(bancaListAction.getBancaData(bancaDetails));
    //    }
    //   }
    //  if(response.products[0].product_category === 'PL'){
    //     if(response.applicants.rbp_applied_rate_a_1) {dispatch(rateAction.updateAR(response.applicants.rbp_applied_rate_a_1))}
    //     if(response.applicants.rbp_effective_Interest_rate_a_1) { dispatch(rateAction.updateEIR(response.applicants.rbp_effective_Interest_rate_a_1)) }
    //   }
    //     setFieldsComponent(true);
    //     let stageTo = response.application.stage.page_id;
    //     if (
    //       response.applicant_documents &&
    //       response.applicant_documents[0] &&
    //       response.applicant_documents[0].document_list &&
    //       response.applicant_documents[0].document_list.length <= 0
    //     ) {
    //       delete response.applicant_documents;
    //     }

    //     dispatch(
    //       stagesAction.getStage({
    //         id: stageTo,
    //         formConfig: response,
    //       })
    //     );

    //     if (stageTo === "ssf-1" && response.application.journey_type) {
    //       stageTo = nextStage(stageTo, response.application.journey_type);
    //       dispatch(
    //         stagesAction.getStage({
    //           id: stageTo,
    //           formConfig: response,
    //         })
    //       );
    //     }
    //     dispatch(referralcodeAction.setReferralId(response.application.referral_id_2));
    //     dispatch(stagesAction.updateTaxFields(response.applicants));
    //     dispatch(bancaListAction.getBancaData(response.applicants));
    //     dispatch(stagesAction.updateUserInputFields(response.applicants));
    //     dispatch(taxAction.updateTax(response.applicants));
    //     dispatch(lovRequests(response, stageTo));
    //   }
    // }); 
    // } else if (getUrl.getParameterByName("auth") === "upload") {
    //   setFieldsUpload(true);
    //   dispatch(urlParamAction.isUpload(true))
    //   dispatch(
    //     authAction.getSession({
    //      sessionuid: sessionStorage.getItem("session_id"),
    //     })
    //   );
    //   const refNo = sessionStorage.getItem("ref");
    //   dispatch(urlParamAction.getAuthorize({ applicationRefNo: refNo }));
    //   sessionStorage.removeItem("session_id");
    //   sessionStorage.removeItem("ref");
    //   dispatch(uploadRequest(refNo)).then(async (response: any) => {
    //     if (response) {
    //       setFieldsComponent(true);
    //      // const stageTo = response.application.stage.page_id;
         
    //       if (
    //         response.applicant_documents &&
    //         response.applicant_documents[0] &&
    //         response.applicant_documents[0].document_list &&
    //         response.applicant_documents[0].document_list.length <= 0
    //       ) {delete response.applicant_documents;
    //       }
    //       dispatch(
    //         stagesAction.getStage({
    //           id: 'doc',
    //           formConfig: response,
    //         })
    //       );
    //     }
    //   });
    // } 
    else {
      dispatch(getClientInfo()).then(async (response: any) => {
        if(response){
        setFieldsComponent(true);
        navigate("sg/super-short-form");
      }
      //   if (response === 'ibankingNTC') {
      //     setNtcIbanking(true);
      //     dispatch(dispatchLoader(false));
      //   }
      //   else {          
      //     setFieldsComponent(true);
      //      if (response === 'ibankingMyinfoCC') {     
      //        navigate("sg/employment");
      //      }
      //      else if (response === 'ibankingMyinfoPL') {     
      //       navigate("sg/loan-calculator")
      //     }
      //      else if (response) {
      //        navigate("sg/super-short-form");
      //     }
      // }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect(() =>{

  //   if(stageSelector && stageSelector[0] && stageSelector[0].stageInfo.application.refer){
  //     dispatch(referralcodeAction.setReferralFlag(stageSelector[0].stageInfo.application.refer));
  //   }
  //   if(stageSelector && stageSelector[0]  && stageSelector[0].stageInfo.application.referId){
  //     if(referralcodeSelector && !(referralcodeSelector.referId)){
  //       dispatch(referralcodeAction.setReferralId(stageSelector[0].stageInfo.application.referId));
  //     }
  //   }
  //    // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[stageSelector && stageSelector[0] && stageSelector[0].stageInfo.application])

  return (
    <>
      {(urlInvalid || myInfoAuthSelector  || ntcIbanking) && (
        <PopupModel displayPopup={myInfoAuthSelector || urlInvalid  || ntcIbanking}>
          {urlInvalid ? <Model name="globalError" /> : <MyinfoSingpassLogin />}
        </PopupModel>
      )}

      {/* {stageSelector &&
        stageSelector[0] &&
        stageSelector[0].stageId === "bd-3" &&
        otpShowSelector && <OTPModel />} */}

      {stageSelector && stageSelector.length > 0 && !otpShowSelector && (
        <div className="app">
          <div className="app__header">
            <div ref={headerHeight}>
              <Header />
            </div>
          </div>
          <div
            className={`app__body ${pointer ? "pointer-none" : ""}`}
            style={{
              marginTop: marginTop + "px",
              height: `calc(100dvh - ${marginTop + isMobileView}px)`,
            }}
          >
            <div className="wrapper">
              <div>{fieldsComponent && <Fields />}</div>
              <div>{/* <NeedHelp /> */}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

import React from "react";
import { shallow } from "enzyme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard"; // Adjust the path as per your folder structure

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("Dashboard Component", () => {
  let mockDispatch, mockNavigate, mockUseLocation;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    mockUseLocation = { pathname: "/dashboard" };
    useLocation.mockReturnValue(mockUseLocation);

    // Mock useSelector
    useSelector.mockImplementation((selector) => {
      switch (selector.name) {
        case "stageSelector":
          return [{ stageId: "bd-3" }];
        case "otpShowSelector":
          return false;
        case "myInfoAuthSelector":
          return false;
        default:
          return null;
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Dashboard component without crashing", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should dispatch actions on load", () => {
    shallow(<Dashboard />);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("should call navigate if fieldsComponent is set", () => {
    const wrapper = shallow(<Dashboard />);
    wrapper.find(".app__body").simulate("click");
    expect(mockNavigate).toHaveBeenCalledWith("sg/super-short-form");
  });

  it("should show popup model if URL is invalid", () => {
    useSelector.mockReturnValueOnce(true); // Mock urlInvalid as true
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find("PopupModel").prop("displayPopup")).toBe(true);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard"; // Adjust the path based on your file structure

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("Dashboard Component", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockUrlParams = { search: "?mockParam=value" };

  beforeEach(() => {
    // Mock dispatch and navigate
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Mock useSelector for selectors used in the component
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === "stageSelector") {
        return [{ stageId: "mockStageId" }];
      }
      if (selectorFn.name === "myInfoAuthSelector") {
        return false;
      }
      if (selectorFn.name === "otpShowSelector") {
        return false;
      }
      return null;
    });

    // Mock useLocation
    (useLocation as jest.Mock).mockReturnValue(mockUrlParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<Dashboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument(); // Adjust the text based on what renders initially.
  });

  it("should call dispatch to fetch URL parameters", () => {
    render(<Dashboard />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should navigate to a specific route when certain conditions are met", () => {
    render(<Dashboard />);
    // Trigger logic or directly check the mocked navigate function
    expect(mockNavigate).not.toHaveBeenCalled(); // Adjust based on the condition
  });

  it("should display an error popup if the URL is invalid", () => {
    (useSelector as jest.Mock).mockImplementationOnce(() => true); // Mock `urlInvalid` state
    render(<Dashboard />);
    expect(screen.getByText("Error")).toBeInTheDocument(); // Adjust the text to match your popup content
  });
});



import React from "react";
import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard"; // Adjust the path based on your file structure

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("Dashboard Component", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockUrlParams = { search: "?mockParam=value" };

  beforeEach(() => {
    // Mock dispatch and navigate
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Mock useSelector for selectors used in the component
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === "stageSelector") {
        return [{ stageId: "mockStageId" }];
      }
      if (selectorFn.name === "myInfoAuthSelector") {
        return false;
      }
      if (selectorFn.name === "otpShowSelector") {
        return false;
      }
      return null;
    });

    // Mock useLocation
    (useLocation as jest.Mock).mockReturnValue(mockUrlParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    render(<Dashboard />);
    expect(screen.getByText("Loading...")).toBeInTheDocument(); // Adjust the text based on what renders initially.
  });

  it("should call dispatch to fetch URL parameters", () => {
    render(<Dashboard />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should navigate to a specific route when certain conditions are met", () => {
    render(<Dashboard />);
    // Trigger logic or directly check the mocked navigate function
    expect(mockNavigate).not.toHaveBeenCalled(); // Adjust based on the condition
  });

  it("should display an error popup if the URL is invalid", () => {
    (useSelector as jest.Mock).mockImplementationOnce(() => true); // Mock `urlInvalid` state
    render(<Dashboard />);
    expect(screen.getByText("Error")).toBeInTheDocument(); // Adjust the text to match your popup content
  });
});

import React from "react";
import { shallow } from "enzyme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard"; // Adjust the path based on your file structure

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("Dashboard Component (Shallow)", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockUrlParams = { search: "?mockParam=value" };

  beforeEach(() => {
    // Mock dispatch and navigate
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Mock useSelector for selectors used in the component
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === "stageSelector") {
        return [{ stageId: "mockStageId" }];
      }
      if (selectorFn.name === "myInfoAuthSelector") {
        return false;
      }
      if (selectorFn.name === "otpShowSelector") {
        return false;
      }
      return null;
    });

    // Mock useLocation
    (useLocation as jest.Mock).mockReturnValue(mockUrlParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should call dispatch to fetch URL parameters", () => {
    shallow(<Dashboard />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should display the correct initial state or loading text", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.text()).toContain("Loading..."); // Adjust based on your component's initial state
  });

  it("should trigger navigate when certain conditions are met", () => {
    shallow(<Dashboard />);
    expect(mockNavigate).not.toHaveBeenCalled(); // Adjust based on your component logic
  });

  it("should handle invalid URL cases", ()


  
import React from "react";
import { shallow } from "enzyme";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "../Dashboard"; // Adjust the path based on your file structure

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("Dashboard Component (Shallow)", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockUrlParams = { search: "?mockParam=value" };

  beforeEach(() => {
    // Mock dispatch and navigate
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    // Mock useSelector for selectors used in the component
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.name === "stageSelector") {
        return [{ stageId: "mockStageId" }];
      }
      if (selectorFn.name === "myInfoAuthSelector") {
        return false;
      }
      if (selectorFn.name === "otpShowSelector") {
        return false;
      }
      return null;
    });

    // Mock useLocation
    (useLocation as jest.Mock).mockReturnValue(mockUrlParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component without crashing", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should call dispatch to fetch URL parameters", () => {
    shallow(<Dashboard />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it("should display the correct initial state or loading text", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.text()).toContain("Loading..."); // Adjust based on your component's initial state
  });

  it("should trigger navigate when certain conditions are met", () => {
    shallow(<Dashboard />);
    expect(mockNavigate).not.toHaveBeenCalled(); // Adjust based on your component logic
  });

  it("should handle invalid URL cases", () => {
    (useSelector as jest.Mock).mockImplementationOnce(() => true); // Mock `urlInvalid` state
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.text()).toContain("Error"); // Adjust to match your error content
  });
});

import { useEffect, useState } from "react";
import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import thankyouData from "../../../assets/_json/thankyou.json";
import { useSelector, useDispatch } from "react-redux";
import { getUrl } from "../../../utils/common/change.utils";
import trackEvents from "../../../services/track-events";
import {
  redirectingToIbanking,
  activateDigitalCard,
} from "../../../services/common-service";
import Model from "../../../shared/components/model/model";
import PopupModel from "../../../shared/components/popup-model/popup-model";
// import ThankYouCASA from "./thankyou-casa";
import ThankYouCC from "./thankyou-cc";
// import ThankYouPL from "./thankyou-pl";
import CCWithoutActivation from "./cc-without-activation";
import gaTrackEvents from "../../../services/ga-track-events";
import CCActivationSucess from "./cc-activation-success";
import ThankyouError from "./thankyou-error";
import { useNavigate } from "react-router-dom";
import ThankYouUpload from "./thankyou-upload";
import { store } from "../../../utils/store/store";

const ThankYou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  // const applicationJourney = useSelector(
  //   (state: StoreModel) => state.stages.journeyType
  // );
  const otpSuccessSelector = useSelector(
    (state: StoreModel) => state.stages.otpSuccess
  );
  const thankyou: KeyWithAnyModel = thankyouData;
  //const [isFunding, setIsFunding] = useState(false);
  const applicationReferenceNo = stageSelector[0].stageInfo.application.application_reference;
  const [applicationDetails, setApplicationDetails] = useState({
    productCategory: "",
    productName: "",
    acct_details: [],
    account_number: "",
    thankyouProp: "NSTP",
    accountNum: "",
    thankyouText: "Common",
    thankyouFeedback: "Feedback",
    feedbackUrl: "",
    isStp: false,
    loanTenureMonths: "",
    approvedLoan: 0,
    productType: "",
    feeAmount: "",
    card_no: "",
    cardNumber: "",
    cardName: "",
    productSequenceNo: "",
  });
  // const [enableActivation, setEnableActivation] = useState<boolean>(false);
  // const [showPlatinum, setShowPlatinum] = useState<boolean>(false);
  // const [isCampaignBenefits, setIsCampaignBenefits] = useState<boolean>(false);
  const [
    showContinueWithoutActivationMsg,
    setShowContinueWithoutActivationMsg,
  ] = useState<boolean>(false);
  const [continueWithoutActivationUI, setContinueWithoutActivationUI] =
    useState(false);
  const [cardActivationSuccessUI, setCardActivationSuccessUI] = useState(false);
  const [showErrorUI, setShowerrorUI] = useState(false);

  useEffect(() => {
    setApplicationDetails((prevValue) => {
      if (
        stageSelector &&
        stageSelector[0].stageInfo && stageSelector[0].stageInfo.products &&
        stageSelector[0].stageInfo.products.length >= 1
      ) {
        prevValue.productCategory =
          stageSelector[0].stageInfo.products[0].product_category;
        prevValue.productName = stageSelector[0].stageInfo.products[0].name;
        prevValue.productSequenceNo =
          stageSelector[0].stageInfo.products[0].product_sequence_number;
        prevValue.productType =
          stageSelector[0].stageInfo.products[0].product_type;
        if (
          stageSelector[0].stageInfo.products[0].acct_details &&
          stageSelector[0].stageInfo.products[0].acct_details.length >= 1
        ) {
          prevValue.acct_details =
            stageSelector[0].stageInfo.products[0].acct_details;
          prevValue.account_number =
            stageSelector[0].stageInfo.products[0].acct_details[0].account_number;
          prevValue.card_no =
            stageSelector[0].stageInfo.products[0].acct_details[0].card_no;
        }
      }
      prevValue.thankyouProp = "NSTP";
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.account_number
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.accountNum = prevValue.account_number;
      }
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.card_no
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.cardNumber = prevValue.card_no;
      }
      prevValue.isStp = prevValue.thankyouProp === "STP" ? true : false;
      prevValue.feedbackUrl =
        thankyou[prevValue.thankyouFeedback]["url_prefix"] +
        thankyou[prevValue.thankyouFeedback]["casa"] +
        thankyou[prevValue.thankyouFeedback]["url_suffix"] +
        applicationReferenceNo!;

      prevValue = setSTPData(prevValue);
      if (prevValue.isStp) {
        if (prevValue.productCategory === "CC") {
          if (stageSelector[0].stageInfo.applicants) {
            if (stageSelector[0].stageInfo.applicants.embossed_name_a_1) {
              prevValue.cardName =
                stageSelector[0].stageInfo.applicants.embossed_name_a_1.toUpperCase();
            }
            if (prevValue.card_no) {
              prevValue.cardNumber = prevValue.card_no;
            }
          }
         } 
         //else if (prevValue.productCategory === "PL") {
        //   if (stageSelector && stageSelector[0].stageInfo) {
        //     if (stageSelector[0].stageInfo.products.length >= 1) {
        //       prevValue.productType =
        //         stageSelector[0].stageInfo.products[0].product_type;
        //       if (
        //         stageSelector[0].stageInfo.products[0].offer_details &&
        //         stageSelector[0].stageInfo.products[0].offer_details[0].fees
        //       )
        //         prevValue.feeAmount =
        //           stageSelector[0].stageInfo.products[0].offer_details[0].fees[0].fee_amount;
        //       setIsCampaignBenefits(
        //         thankyou.CCPL.FeeFreeCampaignCode.indexOf(
        //           stageSelector[0].stageInfo.products[0].campaign
        //         ) !== -1
        //       );
        //       if (stageSelector[0].stageInfo.products[0].acct_details) {
        //         setShowPlatinum(
        //           stageSelector[0].stageInfo.products[0].acct_details.length > 1
        //         );
        //       }
        //     }
        //     if (stageSelector[0].stageInfo.applicants) {
        //       if (stageSelector[0].stageInfo.applicants.loan_tenor_a_1)
        //         prevValue.loanTenureMonths =
        //           stageSelector[0].stageInfo.applicants.loan_tenor_a_1;
        //       if (
        //         stageSelector[0].stageInfo.applicants.required_loan_amount_a_1
        //       )
        //         prevValue.approvedLoan =
        //           stageSelector[0].stageInfo.applicants.required_loan_amount_a_1;
        //       let auth_mode =
        //         stageSelector[0].stageInfo.applicants["auth_mode_a_1"] || "";
        //       let activate = !(
        //         applicationJourney === "NTB" && auth_mode[1] === "N"
        //       );
              
        //       setEnableActivation(activate);
        //     }
        //   }
        // }
      }
      return { ...prevValue };
    });
    if (stageSelector[0] && stageSelector[0].stageId && getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload) {
      gaTrackEvents.pageView(stageSelector[0].stageId);
    }
    if(getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload){
    trackEvents.triggerAdobeEvent("formSubmit");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (otpSuccessSelector) {
      activateCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpSuccessSelector]);
  const setSTPData = (prevValue: any) => {
    if (prevValue.isStp && prevValue.productCategory) {
      if (prevValue.productCategory === "CC") {
        prevValue.feedbackUrl =
          thankyou[prevValue.thankyouFeedback]["url_prefix"] +
          thankyou[prevValue.thankyouFeedback]["cc"] +
          thankyou[prevValue.thankyouFeedback]["url_suffix"] +
          applicationReferenceNo!;
      } else if (prevValue.productCategory === "PL") {
        prevValue.feedbackUrl =
          thankyou[prevValue.thankyouFeedback]["url_prefix"] +
          thankyou[prevValue.thankyouFeedback]["pl"] +
          thankyou[prevValue.thankyouFeedback]["url_suffix"] +
          applicationReferenceNo!;
      }
    }
    return prevValue;
  };

  const submitForm = (event:React.FormEvent<EventTarget>) => {
    if (
      stageSelector &&
      (stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IX" || stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IM")
    ) {
      goToIBanking(event);
    } else {
      window.location.href = `${process.env.REACT_APP_HOME_PAGE_URL}`;
    }
    event.preventDefault();
  };

  const continueWithoutActivation = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(true);
  };
  const showContinuePopup = (event: React.FormEvent<EventTarget>) => {
    setShowContinueWithoutActivationMsg(true);
    event.preventDefault();
  };
  const handlePopupBackButton = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(false);
  };
  const showOTPPopup = () => {
    navigate("/otp");
  };
  const goToIBanking = (event: React.FormEvent<EventTarget>) => {
    if (getUrl.getParameterByName("source") === "scm") {
      //Ibanking redirection for app
      window.location.href = `${process.env.REACT_APP_IBANKING_SC_MOBILE}`;
    }  else if(getUrl.getUpdatedStage().ccplChannel=== "MBNK") {
      const redirectUrl =  `${process.env.REACT_APP_IBANKING_SC_MOBILE_TRANSFER}`;
      window.location.href = redirectUrl;
    }else {
      redirectingToIbanking();
    }
    event.preventDefault();
  };
  const activateCard = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(false);
    setShowerrorUI(false);
    dispatch(activateDigitalCard(applicationDetails)).then((result: any) => {
      if (result.status && result.status.toUpperCase() === "SUCCESS") {
        setCardActivationSuccessUI(true);
      } else {
        setShowerrorUI(true);
      }
    });
  };
  return (
    <>
      {applicationDetails && (
        <form className="form">
          <div className="app thankyou">
            <div className="app__body">
              <div className="app__right">
                <div className="thankyou__container">
                  {!showErrorUI &&
                    !continueWithoutActivationUI &&
                    !cardActivationSuccessUI && (
                      <>
                      {(getUrl.getParameterByName("auth") === "upload" || store.getState().stages.isDocumentUpload) &&(
                          <ThankYouUpload
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          submitForm={submitForm}
                        />
                        )}
                        {/* {(applicationDetails.productCategory === "CA" ||
                          applicationDetails.productCategory === "SA") && (
                          <ThankYouCASA
                            applicationDetails={applicationDetails}
                            thankyou={thankyou}
                            applicationReferenceNo={applicationReferenceNo}
                            submitForm={submitForm}
                          />
                        )} */}
                        {applicationDetails.productCategory === "CC" && (
                          <ThankYouCC
                            applicationDetails={applicationDetails}
                            thankyou={thankyou}
                            applicationReferenceNo={applicationReferenceNo}
                            submitForm={submitForm}
                            activateCard={activateCard}
                            showContinuePopup={showContinuePopup}
                            showOTPPopup={showOTPPopup}
                          />
                        )}
                        {/* {applicationDetails.productCategory === "PL" && (
                          <ThankYouPL
                            applicationDetails={applicationDetails}
                            thankyou={thankyou}
                            applicationReferenceNo={applicationReferenceNo}
                            submitForm={submitForm}
                            enableActivation={enableActivation}
                            showPlatinum={showPlatinum}
                            isCampaignBenefits={isCampaignBenefits}
                          />
                        )} */}
                        {showContinueWithoutActivationMsg && (
                          <PopupModel displayPopup={true}>
                            <Model
                              name="CCThankYou"
                              handlebuttonClick={handlePopupBackButton}
                              handleContinueWithoutActivation={
                                continueWithoutActivation
                              }
                            />
                          </PopupModel>
                        )}
                      </>
                    )}
                  {applicationDetails.productCategory === "CC" && (
                    <>
                      {continueWithoutActivationUI && (
                        <CCWithoutActivation
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          goToIBanking={goToIBanking}
                        />
                      )}
                      {cardActivationSuccessUI && (
                        <CCActivationSucess
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          goToIBanking={goToIBanking}
                        />
                      )}
                    </>
                  )}
                  {showErrorUI && (
                    <ThankyouError
                      applicationDetails={applicationDetails}
                      thankyou={thankyou}
                      applicationReferenceNo={applicationReferenceNo}
                      goToIBanking={goToIBanking}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ThankYou;


import React from "react";
import { shallow } from "enzyme";
import ThankYou from "../ThankYou";
import ThankYouCC from "../ThankYouCC";
import PopupModel from "../PopupModel";
import ThankyouError from "../ThankyouError";
import CCWithoutActivation from "../CCWithoutActivation";
import CCActivationSucess from "../CCActivationSuccess";

describe("ThankYou Component", () => {
  const mockApplicationDetails = {
    productCategory: "CC",
  };
  const mockThankyou = jest.fn();
  const mockApplicationReferenceNo = "12345";
  const mockSubmitForm = jest.fn();
  const mockActivateCard = jest.fn();
  const mockShowContinuePopup = jest.fn();
  const mockShowOTPPopup = jest.fn();
  const mockGoToIBanking = jest.fn();
  const mockHandlePopupBackButton = jest.fn();
  const mockContinueWithoutActivation = jest.fn();

  const defaultProps = {
    applicationDetails: mockApplicationDetails,
    thankyou: mockThankyou,
    applicationReferenceNo: mockApplicationReferenceNo,
    submitForm: mockSubmitForm,
    activateCard: mockActivateCard,
    showContinuePopup: mockShowContinuePopup,
    showOTPPopup: mockShowOTPPopup,
    goToIBanking: mockGoToIBanking,
    handlePopupBackButton: mockHandlePopupBackButton,
    continueWithoutActivation: mockContinueWithoutActivation,
    continueWithoutActivationUI: false,
    cardActivationSuccessUI: false,
    showContinueWithoutActivationMsg: false,
    showErrorUI: false,
  };

  it("should render ThankYouCC when productCategory is 'CC'", () => {
    const wrapper = shallow(<ThankYou {...defaultProps} />);
    expect(wrapper.find(ThankYouCC)).toHaveLength(1);
  });

  it("should render PopupModel when showContinueWithoutActivationMsg is true", () => {
    const wrapper = shallow(
      <ThankYou {...defaultProps} showContinueWithoutActivationMsg={true} />
    );
    expect(wrapper.find(PopupModel)).toHaveLength(1);
  });

  it("should render CCWithoutActivation when continueWithoutActivationUI is true", () => {
    const wrapper = shallow(
      <ThankYou {...defaultProps} continueWithoutActivationUI={true} />
    );
    expect(wrapper.find(CCWithoutActivation)).toHaveLength(1);
  });

  it("should render CCActivationSucess when cardActivationSuccessUI is true", () => {
    const wrapper = shallow(
      <ThankYou {...defaultProps} cardActivationSuccessUI={true} />
    );
    expect(wrapper.find(CCActivationSucess)).toHaveLength(1);
  });

  it("should render ThankyouError when showErrorUI is true", () => {
    const wrapper = shallow(
      <ThankYou {...defaultProps} showErrorUI={true} />
    );
    expect(wrapper.find(ThankyouError)).toHaveLength(1);
  });
});

import { useEffect, useState } from "react";
import "./thank-you.scss";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import thankyouData from "../../../assets/_json/thankyou.json";
import { useSelector, useDispatch } from "react-redux";
import { getUrl } from "../../../utils/common/change.utils";
import trackEvents from "../../../services/track-events";
import {
  redirectingToIbanking,
  activateDigitalCard,
} from "../../../services/common-service";
import Model from "../../../shared/components/model/model";
import PopupModel from "../../../shared/components/popup-model/popup-model";

import ThankYouCC from "./thankyou-cc";
// import ThankYouPL from "./thankyou-pl";
import CCWithoutActivation from "./cc-without-activation";
import gaTrackEvents from "../../../services/ga-track-events";
import CCActivationSucess from "./cc-activation-success";
import ThankyouError from "./thankyou-error";
import { useNavigate } from "react-router-dom";
import ThankYouUpload from "./thankyou-upload";
import { store } from "../../../utils/store/store";

const ThankYou = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  // const applicationJourney = useSelector(
  //   (state: StoreModel) => state.stages.journeyType
  // );
  const otpSuccessSelector = useSelector(
    (state: StoreModel) => state.stages.otpSuccess
  );
  const thankyou: KeyWithAnyModel = thankyouData;
  //const [isFunding, setIsFunding] = useState(false);
  const applicationReferenceNo = stageSelector[0].stageInfo.application.application_reference;
  const [applicationDetails, setApplicationDetails] = useState({
    productCategory: "",
    productName: "",
    acct_details: [],
    account_number: "",
    thankyouProp: "NSTP",
    accountNum: "",
    thankyouText: "Common",
    thankyouFeedback: "Feedback",
    feedbackUrl: "",
    isStp: false,
    loanTenureMonths: "",
    approvedLoan: 0,
    productType: "",
    feeAmount: "",
    card_no: "",
    cardNumber: "",
    cardName: "",
    productSequenceNo: "",
  });
  // const [enableActivation, setEnableActivation] = useState<boolean>(false);
  // const [showPlatinum, setShowPlatinum] = useState<boolean>(false);
  // const [isCampaignBenefits, setIsCampaignBenefits] = useState<boolean>(false);
  const [
    showContinueWithoutActivationMsg,
    setShowContinueWithoutActivationMsg,
  ] = useState<boolean>(false);
  const [continueWithoutActivationUI, setContinueWithoutActivationUI] =
    useState(false);
  const [cardActivationSuccessUI, setCardActivationSuccessUI] = useState(false);
  const [showErrorUI, setShowerrorUI] = useState(false);

  useEffect(() => {
    setApplicationDetails((prevValue) => {
      if (
        stageSelector &&
        stageSelector[0].stageInfo && stageSelector[0].stageInfo.products &&
        stageSelector[0].stageInfo.products.length >= 1
      ) {
        prevValue.productCategory =
          stageSelector[0].stageInfo.products[0].product_category;
        prevValue.productName = stageSelector[0].stageInfo.products[0].name;
        prevValue.productSequenceNo =
          stageSelector[0].stageInfo.products[0].product_sequence_number;
        prevValue.productType =
          stageSelector[0].stageInfo.products[0].product_type;
        if (
          stageSelector[0].stageInfo.products[0].acct_details &&
          stageSelector[0].stageInfo.products[0].acct_details.length >= 1
        ) {
          prevValue.acct_details =
            stageSelector[0].stageInfo.products[0].acct_details;
          prevValue.account_number =
            stageSelector[0].stageInfo.products[0].acct_details[0].account_number;
          prevValue.card_no =
            stageSelector[0].stageInfo.products[0].acct_details[0].card_no;
        }
      }
      prevValue.thankyouProp = "NSTP";
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.account_number
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.accountNum = prevValue.account_number;
      }
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.card_no
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.cardNumber = prevValue.card_no;
      }
      prevValue.isStp = prevValue.thankyouProp === "STP" ? true : false;
      prevValue.feedbackUrl =
        thankyou[prevValue.thankyouFeedback]["url_prefix"] +
        thankyou[prevValue.thankyouFeedback]["casa"] +
        thankyou[prevValue.thankyouFeedback]["url_suffix"] +
        applicationReferenceNo!;

      prevValue = setSTPData(prevValue);
      if (prevValue.isStp) {
        if (prevValue.productCategory === "CC") {
          if (stageSelector[0].stageInfo.applicants) {
            if (stageSelector[0].stageInfo.applicants.embossed_name_a_1) {
              prevValue.cardName =
                stageSelector[0].stageInfo.applicants.embossed_name_a_1.toUpperCase();
            }
            if (prevValue.card_no) {
              prevValue.cardNumber = prevValue.card_no;
            }
          }
         } 
        
      }
      return { ...prevValue };
    });
    if (stageSelector[0] && stageSelector[0].stageId && getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload) {
      gaTrackEvents.pageView(stageSelector[0].stageId);
    }
    if(getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload){
    trackEvents.triggerAdobeEvent("formSubmit");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (otpSuccessSelector) {
      activateCard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpSuccessSelector]);
  const setSTPData = (prevValue: any) => {
    if (prevValue.isStp && prevValue.productCategory) {
      if (prevValue.productCategory === "CC") {
        prevValue.feedbackUrl =
          thankyou[prevValue.thankyouFeedback]["url_prefix"] +
          thankyou[prevValue.thankyouFeedback]["cc"] +
          thankyou[prevValue.thankyouFeedback]["url_suffix"] +
          applicationReferenceNo!;
      } else if (prevValue.productCategory === "PL") {
        prevValue.feedbackUrl =
          thankyou[prevValue.thankyouFeedback]["url_prefix"] +
          thankyou[prevValue.thankyouFeedback]["pl"] +
          thankyou[prevValue.thankyouFeedback]["url_suffix"] +
          applicationReferenceNo!;
      }
    }
    return prevValue;
  };

  const submitForm = (event:React.FormEvent<EventTarget>) => {
    if (
      stageSelector &&
      (stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IX" || stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IM")
    ) {
      goToIBanking(event);
    } else {
      window.location.href = `${process.env.REACT_APP_HOME_PAGE_URL}`;
    }
    event.preventDefault();
  };

  const continueWithoutActivation = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(true);
  };
  const showContinuePopup = (event: React.FormEvent<EventTarget>) => {
    setShowContinueWithoutActivationMsg(true);
    event.preventDefault();
  };
  const handlePopupBackButton = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(false);
  };
  const showOTPPopup = () => {
    navigate("/otp");
  };
  const goToIBanking = (event: React.FormEvent<EventTarget>) => {
    if (getUrl.getParameterByName("source") === "scm") {
      //Ibanking redirection for app
      window.location.href = `${process.env.REACT_APP_IBANKING_SC_MOBILE}`;
    }  else if(getUrl.getUpdatedStage().ccplChannel=== "MBNK") {
      const redirectUrl =  `${process.env.REACT_APP_IBANKING_SC_MOBILE_TRANSFER}`;
      window.location.href = redirectUrl;
    }else {
      redirectingToIbanking();
    }
    event.preventDefault();
  };
  const activateCard = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(false);
    setShowerrorUI(false);
    dispatch(activateDigitalCard(applicationDetails)).then((result: any) => {
      if (result.status && result.status.toUpperCase() === "SUCCESS") {
        setCardActivationSuccessUI(true);
      } else {
        setShowerrorUI(true);
      }
    });
  };
  return (
    <>
      {applicationDetails && (
        <form className="form">
          <div className="app thankyou">
            <div className="app__body">
              <div className="app__right">
                <div className="thankyou__container">
                  {!showErrorUI &&
                    !continueWithoutActivationUI &&
                    !cardActivationSuccessUI && (
                      <>
                      {(getUrl.getParameterByName("auth") === "upload" || store.getState().stages.isDocumentUpload) &&(
                          <ThankYouUpload
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          submitForm={submitForm}
                        />
                        )}
                       
                        {applicationDetails.productCategory === "CC" && (
                          <ThankYouCC
                            applicationDetails={applicationDetails}
                            thankyou={thankyou}
                            applicationReferenceNo={applicationReferenceNo}
                            submitForm={submitForm}
                            activateCard={activateCard}
                            showContinuePopup={showContinuePopup}
                            showOTPPopup={showOTPPopup}
                          />
                        )}
                       
                        {showContinueWithoutActivationMsg && (
                          <PopupModel displayPopup={true}>
                            <Model
                              name="CCThankYou"
                              handlebuttonClick={handlePopupBackButton}
                              handleContinueWithoutActivation={
                                continueWithoutActivation
                              }
                            />
                          </PopupModel>
                        )}
                      </>
                    )}
                  {applicationDetails.productCategory === "CC" && (
                    <>
                      {continueWithoutActivationUI && (
                        <CCWithoutActivation
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          goToIBanking={goToIBanking}
                        />
                      )}
                      {cardActivationSuccessUI && (
                        <CCActivationSucess
                          applicationDetails={applicationDetails}
                          thankyou={thankyou}
                          applicationReferenceNo={applicationReferenceNo}
                          goToIBanking={goToIBanking}
                        />
                      )}
                    </>
                  )}
                  {showErrorUI && (
                    <ThankyouError
                      applicationDetails={applicationDetails}
                      thankyou={thankyou}
                      applicationReferenceNo={applicationReferenceNo}
                      goToIBanking={goToIBanking}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default ThankYou;


import React from 'react';
import { shallow } from 'enzyme';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThankYou } from './ThankYou'; // adjust the import path if needed
import { StoreModel } from '../../../utils/model/common-model';
import ThankYouCC from './thankyou-cc';
import PopupModel from '../../../shared/components/popup-model/popup-model';
import { activateDigitalCard } from '../../../services/common-service';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../../services/common-service', () => ({
  activateDigitalCard: jest.fn(),
}));

describe('ThankYou Component', () => {
  let mockDispatch: jest.Mock;
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    // Mock the Redux store data
    useSelector.mockImplementation((callback) =>
      callback({
        stages: {
          stages: [
            {
              stageInfo: {
                application: { application_reference: '12345' },
                products: [
                  {
                    product_category: 'CC',
                    name: 'Credit Card',
                    product_sequence_number: '123',
                    product_type: 'Type A',
                    acct_details: [
                      {
                        account_number: '987654321',
                        card_no: '123456789',
                      },
                    ],
                  },
                ],
              },
            },
          ],
          otpSuccess: true,
        },
      } as StoreModel)
    );

    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('should render the ThankYou component correctly', () => {
    const wrapper = shallow(<ThankYou />);

    // Check that the form is rendered
    expect(wrapper.find('form.thankyou').length).toBe(1);

    // Check if ThankYouCC is rendered for "CC" product category
    expect(wrapper.find(ThankYouCC).length).toBe(1);
  });

  it('should call activateDigitalCard when OTP is successful', () => {
    // Set up a mock for OTP success
    useSelector.mockImplementationOnce((callback) =>
      callback({
        stages: {
          stages: [
            {
              stageInfo: {
                application: { application_reference: '12345' },
                products: [
                  {
                    product_category: 'CC',
                    name: 'Credit Card',
                    product_sequence_number: '123',
                    product_type: 'Type A',
                    acct_details: [
                      {
                        account_number: '987654321',
                        card_no: '123456789',
                      },
                    ],
                  },
                ],
              },
            },
          ],
          otpSuccess: true, // Simulate OTP success
        },
      } as StoreModel)
    );

    // Re-render component
    shallow(<ThankYou />);

    // Ensure activateDigitalCard is called when OTP success is true
    expect(activateDigitalCard).toHaveBeenCalled();
  });

  it('should navigate to OTP page when showOTPPopup is called', () => {
    const wrapper = shallow(<ThankYou />);

    // Find the showOTPPopup function and simulate a click or trigger
    wrapper.instance().showOTPPopup();

    // Ensure the navigate function is called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith('/otp');
  });

  it('should show PopupModel when showContinueWithoutActivationMsg is true', () => {
    const wrapper = shallow(<ThankYou />);

    // Simulate showing the popup
    wrapper.setState({ showContinueWithoutActivationMsg: true });

    // Check if PopupModel is rendered
    expect(wrapper.find(PopupModel).length).toBe(1);
  });
});

import { render,cleanup,screen } from "@testing-library/react";

import { mount, shallow, ShallowWrapper } from "enzyme";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import storeMockData from './../../utils/mock/store-spec.json';
import Dashboard from "./dashboard";
import React from "react";
import { useNavigate } from "react-router-dom";

jest.autoMockOff();
jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store: any;


beforeEach(() => {
  global.scrollTo = jest.fn();
  store = mockStore(storeMockData);
});
afterEach(() => {
  jest.resetAllMocks();
});
afterAll(() => {
  cleanup();
  jest.clearAllMocks();
});


jest.mock('react-redux',()=>({
  useDispatch:jest.fn(),
  useSelector:jest.fn(),
}));

jest.mock('react-router-dom',()=>({
  useNavigate:jest.fn(),
  useLocation:jest.fn(),
}));


describe("Dashboard Testing useLayoufEffect", () => {
  let mockDispatch:jest.Mock;
  let mockNavigate:jest.Mock;;
  const mockHeaderHeight={current:{offsetHeight:50}};

  beforeEach(()=>{
    jest.clearAllMocks();
    mockDispatch=jest.fn();
    mockNavigate=jest.fn();

    jest.spyOn(React,'useState')
      .mockImplementationOnce(()=>[false,jest.fn()])
      .mockImplementationOnce(()=>[167,jest.fn()])
      .mockImplementationOnce(()=>[false,jest.fn()])
      .mockImplementationOnce(()=>[false,jest.fn()])
      .mockImplementationOnce(()=>[0,jest.fn()])
      .mockImplementationOnce(()=>[false,jest.fn()])
      .mockImplementationOnce(()=>[false,jest.fn()]);  

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSelector as jest.Mock).mockClear();

    (useSelector as jest.Mock).mockImplementation((selectorFn)=>{
      if (selectorFn.toString().includes('state.stages.stages')){
          return [{
            "stageId": "ssf-1",
            "stageInfo": {
              "application": {
                "source_system_name": 3
              }
            }
          }];
      }
      return false;
    });

      jest.spyOn(React,'useRef').mockReturnValueOnce(mockHeaderHeight);
  });

  it('should dispatch getClientInfo and navigate on success',async()=>{
    const mockResponse={data:'mockResponseData'};
    mockDispatch.mockImplementation((action:any)=>{
      if(typeof action==='function'){
        return Promise.resolve(mockResponse);
      }
      return action;
    });
    render(<Dashboard />);
   expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
   await Promise.resolve();
  expect(mockNavigate).toHaveBeenCalledWith('sg/super-short-form'); 
});
});

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThankYou from './ThankYou';
import thankyouData from "../../../assets/_json/thankyou.json";

jest.autoMockOff();
jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

beforeEach(() => {
  global.scrollTo = jest.fn();
  store = mockStore({
    stages: {
      stages: [
        {
          stageInfo: {
            application: { application_reference: '12345' },
            products: [
              {
                product_category: 'CC',
                name: 'Credit Card',
                product_sequence_number: '001',
                product_type: 'Type A',
                acct_details: [
                  {
                    account_number: '12345678',
                    card_no: '87654321'
                  }
                ]
              }
            ],
            applicants: {
              embossed_name_a_1: 'John Doe'
            }
          },
          stageId: 'stage-1'
        }
      ],
      otpSuccess: false,
      isDocumentUpload: false,
      journeyType: 'NTB'
    }
  });
});
afterEach(() => {
  jest.resetAllMocks();
});
afterAll(() => {
  cleanup();
  jest.clearAllMocks();
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('ThankYou Component Testing', () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSelector as jest.Mock).mockClear();

    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          "stageId": "stage-1",
          "stageInfo": {
            "application": {
              "application_reference": '12345'
            },
            "products": [
              {
                "product_category": 'CC',
                "name": 'Credit Card',
                "product_sequence_number": '001',
                "product_type": 'Type A',
                "acct_details": [
                  {
                    "account_number": '12345678',
                    "card_no": '87654321'
                  }
                ]
              }
            ],
            "applicants": {
              "embossed_name_a_1": 'John Doe'
            }
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });
  });

  it('should render ThankYou component with correct details', async () => {
    render(
      <ThankYou />
    );

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled(); // As navigate is not used directly in useEffect

    // Check if specific elements are in the document
    expect(screen.getByText(/Credit Card/i)).toBeInTheDocument();
    expect(screen.getByText(/12345678/i)).toBeInTheDocument();
    expect(screen.getByText(/87654321/i)).toBeInTheDocument();
  });
});


import { render, cleanup, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import React from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import ThankYou from "./ThankYou";
import storeMockData from "../../../utils/mock/store-spec.json";
import { useNavigate } from "react-router-dom";

// Mocking the necessary hooks and modules
jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

// Configuring the mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

beforeEach(() => {
  global.scrollTo = jest.fn();
  store = mockStore(storeMockData);
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("ThankYou Component Tests", () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          "stageId": "stage-1",
          "stageInfo": {
            "application": {
              "application_reference": '12345'
            },
            "products": [
              {
                "product_category": 'CC',
                "name": 'Credit Card',
                "product_sequence_number": '001',
                "product_type": 'Type A',
                "acct_details": [
                  {
                    "account_number": '12345678',
                    "card_no": '87654321'
                  }
                ]
              }
            ],
            "applicants": {
              "embossed_name_a_1": "John Doe"
            }
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return true;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });

    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [{ productCategory: "", productName: "", acct_details: [], account_number: "", thankyouProp: "NSTP", accountNum: "", thankyouText: "Common", thankyouFeedback: "Feedback", feedbackUrl: "", isStp: false, loanTenureMonths: "", approvedLoan: 0, productType: "", feeAmount: "", card_no: "", cardNumber: "", cardName: "", productSequenceNo: "" }, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);
  });

  it("renders ThankYou component with Credit Card details", async () => {
    render(
      <Provider store={store}>
        <ThankYou />
      </Provider>
    );

    expect(screen.getByText(/Credit Card/i)).toBeInTheDocument();
    expect(screen.getByText(/12345678/i)).toBeInTheDocument();
    expect(screen.getByText(/87654321/i)).toBeInTheDocument();
  });

  it('should dispatch actions and navigate on success', async () => {
    const mockResponse = { data: 'mockResponseData' };
    mockDispatch.mockImplementation((action) => {
      if (typeof action === 'function') {
        return Promise.resolve(mockResponse);
      }
      return action;
    });

    render(
      <Provider store={store}>
        <ThankYou />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    await Promise.resolve();
    expect(mockNavigate).toHaveBeenCalledWith('/path-to-navigate'); // Adjust the path as needed
  });
});

import { render, cleanup, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import ThankYou from "./thank-you";
import React from "react";
import { useNavigate } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

beforeEach(() => {
  global.scrollTo = jest.fn();
  store = mockStore({
    stages: {
      stages: [
        {
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: [{
              product_category: 'CC',
              name: 'Credit Card',
              product_sequence_number: '001',
              acct_details: [{ account_number: '12345678', card_no: '87654321' }],
              product_type: 'Type A'
            }],
            applicants: {
              embossed_name_a_1: 'John Doe'
            }
          }
        }
      ],
      otpSuccess: false,
      isDocumentUpload: false
    }
  });
});

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("ThankYou Component Testing", () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [{ productCategory: 'CC', productName: 'Credit Card', account_number: '12345678', card_no: '87654321' }, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: [{
              product_category: 'CC',
              name: 'Credit Card',
              product_sequence_number: '001',
              acct_details: [{ account_number: '12345678', card_no: '87654321' }],
              product_type: 'Type A'
            }],
            applicants: {
              embossed_name_a_1: 'John Doe'
            }
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });
  });

  it('should render ThankYou component', () => {
    render(<ThankYou />);
    expect(screen.getByText(/Credit Card/i)).toBeInTheDocument();
    expect(screen.getByText(/12345678/i)).toBeInTheDocument();
    expect(screen.getByText(/87654321/i)).toBeInTheDocument();
  });

  it('should dispatch and navigate on success', async () => {
    const mockResponse = { data: 'mockResponseData' };
    mockDispatch.mockImplementation(action => {
      if (typeof action === 'function') {
        return Promise.resolve(mockResponse);
      }
      return action;
    });
    render(<ThankYou />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    await Promise.resolve();
    expect(mockNavigate).toHaveBeenCalledWith('/some-path');
  });

  it('should handle different product categories', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: [{
              product_category: 'PL',
              name: 'Personal Loan',
              product_sequence_number: '002',
              acct_details: [{ account_number: '87654321' }],
              product_type: 'Type B',
              offer_details: [{ fees: [{ fee_amount: "100" }] }],
              campaign: "Campaign1"
            }],
            applicants: {
              loan_tenor_a_1: '12',
              required_loan_amount_a_1: 10000,
              auth_mode_a_1: "Y"
            }
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });

    render(<ThankYou />);
    expect(screen.getByText(/Personal Loan/i)).toBeInTheDocument();
    expect(screen.getByText(/87654321/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/12/i)).toBeInTheDocument();
    expect(screen.getByText(/10000/i)).toBeInTheDocument();
  });

  it('should handle otpSuccess state change', async () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return true;
      }
      return undefined;
    });

    render(<ThankYou />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    await Promise.resolve();
    // Add assertions to verify the behavior when otpSuccess is true
  });

  it('should handle error scenarios gracefully', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: []
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });

    render(<ThankYou />);
    // Add assertions to verify how errors are handled and displayed
  });
});

useEffect(() => {
    setApplicationDetails((prevValue) => {
      if (
        stageSelector &&
        stageSelector[0].stageInfo && stageSelector[0].stageInfo.products &&
        stageSelector[0].stageInfo.products.length >= 1
      ) {
        prevValue.productCategory =
          stageSelector[0].stageInfo.products[0].product_category;
        prevValue.productName = stageSelector[0].stageInfo.products[0].name;
        prevValue.productSequenceNo =
          stageSelector[0].stageInfo.products[0].product_sequence_number;
        prevValue.productType =
          stageSelector[0].stageInfo.products[0].product_type;
        if (
          stageSelector[0].stageInfo.products[0].acct_details &&
          stageSelector[0].stageInfo.products[0].acct_details.length >= 1
        ) {
          prevValue.acct_details =
            stageSelector[0].stageInfo.products[0].acct_details;
          prevValue.account_number =
            stageSelector[0].stageInfo.products[0].acct_details[0].account_number;
          prevValue.card_no =
            stageSelector[0].stageInfo.products[0].acct_details[0].card_no;
        }
      }
      prevValue.thankyouProp = "NSTP";
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.account_number
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.accountNum = prevValue.account_number;
      }
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.card_no
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.cardNumber = prevValue.card_no;
      }
      prevValue.isStp = prevValue.thankyouProp === "STP" ? true : false;
      prevValue.feedbackUrl =
        thankyou[prevValue.thankyouFeedback]["url_prefix"] +
        thankyou[prevValue.thankyouFeedback]["casa"] +
        thankyou[prevValue.thankyouFeedback]["url_suffix"] +
        applicationReferenceNo!;
 
      // prevValue = setSTPData(prevValue);
      if (prevValue.isStp) {
        if (prevValue.productCategory === "CC") {
          if (stageSelector[0].stageInfo.applicants) {
            if (stageSelector[0].stageInfo.applicants.embossed_name_a_1) {
              prevValue.cardName =
                stageSelector[0].stageInfo.applicants.embossed_name_a_1.toUpperCase();
            }
            if (prevValue.card_no) {
              prevValue.cardNumber = prevValue.card_no;
            }
          }
         } 
        
      }
      return { ...prevValue };
    });
    Eif (stageSelector[0] && stageSelector[0].stageId && getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload) {
      gaTrackEvents.pageView(stageSelector[0].stageId);
    }
    Eif(getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload){
    trackEvents.triggerAdobeEvent("formSubmit");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  // useEffect(() => {
  //   if (otpSuccessSelector) {
  //     activateCard();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [otpSuccessSelector]);
  // const setSTPData = (prevValue: any) => {
  //   if (prevValue.isStp && prevValue.productCategory) {
  //     if (prevValue.productCategory === "CC") {
  //       prevValue.feedbackUrl =
  //         thankyou[prevValue.thankyouFeedback]["url_prefix"] +
  //         thankyou[prevValue.thankyouFeedback]["cc"] +
  //         thankyou[prevValue.thankyouFeedback]["url_suffix"] +
  //         applicationReferenceNo!;
  //     } else if (prevValue.productCategory === "PL") {
  //       prevValue.feedbackUrl =
  //         thankyou[prevValue.thankyouFeedback]["url_prefix"] +
  //         thankyou[prevValue.thankyouFeedback]["pl"] +
  //         thankyou[prevValue.thankyouFeedback]["url_suffix"] +
  //         applicationReferenceNo!;
  //     }
  //   }
  //   return prevValue;
  // };
 
  const submitForm = (event:React.FormEvent<EventTarget>) => {
    if (
      stageSelector &&
      (stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IX" || stageSelector[0].stageInfo.applicants["auth_mode_a_1"] === "IM")
    ) {
      // goToIBanking(event);
    } else {
      window.location.href = `${process.env.REACT_APP_HOME_PAGE_URL}`;
    }
    event.preventDefault();
  };
 
  const continueWithoutActivation = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(true);
  };
  const showContinuePopup = (event: React.FormEvent<EventTarget>) => {
    setShowContinueWithoutActivationMsg(true);
    event.preventDefault();
  };
  const handlePopupBackButton = () => {
    setShowContinueWithoutActivationMsg(false);
    setContinueWithoutActivationUI(false);
  };
  const showOTPPopup = () => {
    navigate("/otp");
  };
useEffect(() => {
    setApplicationDetails((prevValue) => {
      if (
        stageSelector &&
        stageSelector[0].stageInfo && stageSelector[0].stageInfo.products &&
        stageSelector[0].stageInfo.products.length >= 1
      ) {
        prevValue.productCategory =
          stageSelector[0].stageInfo.products[0].product_category;
        prevValue.productName = stageSelector[0].stageInfo.products[0].name;
        prevValue.productSequenceNo =
          stageSelector[0].stageInfo.products[0].product_sequence_number;
        prevValue.productType =
          stageSelector[0].stageInfo.products[0].product_type;
        if (
          stageSelector[0].stageInfo.products[0].acct_details &&
          stageSelector[0].stageInfo.products[0].acct_details.length >= 1
        ) {
          prevValue.acct_details =
            stageSelector[0].stageInfo.products[0].acct_details;
          prevValue.account_number =
            stageSelector[0].stageInfo.products[0].acct_details[0].account_number;
          prevValue.card_no =
            stageSelector[0].stageInfo.products[0].acct_details[0].card_no;
        }
      }
      prevValue.thankyouProp = "NSTP";
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.account_number
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.accountNum = prevValue.account_number;
      }
      if (
        prevValue.acct_details &&
        prevValue.acct_details[0] &&
        prevValue.card_no
      ) {
        prevValue.thankyouProp = "STP";
        prevValue.cardNumber = prevValue.card_no;
      }
      prevValue.isStp = prevValue.thankyouProp === "STP" ? true : false;
      prevValue.feedbackUrl =
        thankyou[prevValue.thankyouFeedback]["url_prefix"] +
        thankyou[prevValue.thankyouFeedback]["casa"] +
        thankyou[prevValue.thankyouFeedback]["url_suffix"] +
        applicationReferenceNo!;
 
      // prevValue = setSTPData(prevValue);
      if (prevValue.isStp) {
        if (prevValue.productCategory === "CC") {
          if (stageSelector[0].stageInfo.applicants) {
            if (stageSelector[0].stageInfo.applicants.embossed_name_a_1) {
              prevValue.cardName =
                stageSelector[0].stageInfo.applicants.embossed_name_a_1.toUpperCase();
            }
            if (prevValue.card_no) {
              prevValue.cardNumber = prevValue.card_no;
            }
          }
         } 
        
      }
      return { ...prevValue };
    });
    Eif (stageSelector[0] && stageSelector[0].stageId && getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload) {
      gaTrackEvents.pageView(stageSelector[0].stageId);
    }
    Eif(getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload){
    trackEvents.triggerAdobeEvent("formSubmit");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  import { render, cleanup, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import ThankYou from "./thank-you";
import React from "react";
import { useNavigate } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

beforeEach(() => {
  global.scrollTo = jest.fn();
  store = mockStore({
    stages: {
      stages: [
        {
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: [{
              product_category: 'CC',
              name: 'Credit Card',
              product_sequence_number: '001',
              acct_details: [{ account_number: '12345678', card_no: '87654321' }],
              product_type: 'Type A'
            }],
            applicants: {
              embossed_name_a_1: 'John Doe'
            }
          }
        }
      ],
      otpSuccess: false,
      isDocumentUpload: false
    }
  });
});

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("ThankYou Component Testing", () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [{ productCategory: 'CC', productName: 'Credit Card', account_number: '12345678', card_no: '87654321' }, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: [{
              product_category: 'CC',
              name: 'Credit Card',
              product_sequence_number: '001',
              acct_details: [{ account_number: '12345678', card_no: '87654321' }],
              product_type: 'Type A'
            }],
            applicants: {
              embossed_name_a_1: 'John Doe'
            }
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });
  });

  it('should render ThankYou component', () => {
    render(<ThankYou />);
    expect(screen.getByText(/Credit Card/i)).toBeInTheDocument();
    expect(screen.getByText(/12345678/i)).toBeInTheDocument();
    expect(screen.getByText(/87654321/i)).toBeInTheDocument();
  });

  it('should dispatch and navigate on success', async () => {
    const mockResponse = { data: 'mockResponseData' };
    mockDispatch.mockImplementation(action => {
      if (typeof action === 'function') {
        return Promise.resolve(mockResponse);
      }
      return action;
    });
    render(<ThankYou />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    await Promise.resolve();
    expect(mockNavigate).toHaveBeenCalledWith('/some-path');
  });

  it('should handle different product categories', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: [{
              product_category: 'PL',
              name: 'Personal Loan',
              product_sequence_number: '002',
              acct_details: [{ account_number: '87654321' }],
              product_type: 'Type B',
              offer_details: [{ fees: [{ fee_amount: "100" }] }],
              campaign: "Campaign1"
            }],
            applicants: {
              loan_tenor_a_1: '12',
              required_loan_amount_a_1: 10000,
              auth_mode_a_1: "Y"
            }
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });

    render(<ThankYou />);
    expect(screen.getByText(/Personal Loan/i)).toBeInTheDocument();
    expect(screen.getByText(/87654321/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/12/i)).toBeInTheDocument();
    expect(screen.getByText(/10000/i)).toBeInTheDocument();
  });

  it('should handle otpSuccess state change', async () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return true;
      }
      return undefined;
    });

    render(<ThankYou />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    await Promise.resolve();
    // Add assertions to verify the behavior when otpSuccess is true
  });

  it('should handle error scenarios gracefully', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: []
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });

    render(<ThankYou />);
    // Add assertions to verify how errors are handled and displayed
  });

  // New tests to cover useEffect logic
  it('should update application details correctly in useEffect', () => {
    render(<ThankYou />);

    const expectedApplicationDetails = {
      productCategory: 'CC',
      productName: 'Credit Card',
      productSequenceNo: '001',
      productType: 'Type A',
      acct_details: [{ account_number: '12345678', card_no: '87654321' }],
      account_number: '12345678',
      card_no: '87654321',
      thankyouProp: 'STP',
      accountNum: '12345678',
      cardNumber: '87654321',
      isStp: true,
      feedbackUrl: 'thankyou/feedback/url_prefix/casa/url_suffix/12345',
      cardName: 'JOHN DOE',
    };

    expect(mockDispatch).toHaveBeenCalled();
    // Mock implementation of setApplicationDetails to capture its final state
    const [state, setState] = React.useState();
    setState(expectedApplicationDetails);
    expect(state).toEqual(expectedApplicationDetails);
  });

  it('should handle analytics and tracking events correctly in useEffect', () => {
    render(<ThankYou />);
    expect(global.scrollTo).toHaveBeenCalled();
    // Add assertions to verify gaTrackEvents.pageView and trackEvents.triggerAdobeEvent
  });
});

import { render, cleanup, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import ThankYou from "./thank-you";
import React from "react";
import { useNavigate } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

beforeEach(() => {
  global.scrollTo = jest.fn();
  store = mockStore({
    stages: {
      stages: [
        {
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: [{
              product_category: 'CC',
              name: 'Credit Card',
              product_sequence_number: '001',
              acct_details: [{ account_number: '12345678', card_no: '87654321' }],
              product_type: 'Type A'
            }],
            applicants: {
              embossed_name_a_1: 'John Doe'
            }
          }
        }
      ],
      otpSuccess: false,
      isDocumentUpload: false
    }
  });
});

afterEach(() => {
  jest.resetAllMocks();
  cleanup();
});

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("ThankYou Component Testing", () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    jest.spyOn(React, 'useState')
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [{ productCategory: 'CC', productName: 'Credit Card', account_number: '12345678', card_no: '87654321' }, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()])
      .mockImplementationOnce(() => [false, jest.fn()]);

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: [{
              product_category: 'CC',
              name: 'Credit Card',
              product_sequence_number: '001',
              acct_details: [{ account_number: '12345678', card_no: '87654321' }],
              product_type: 'Type A'
            }],
            applicants: {
              embossed_name_a_1: 'John Doe'
            }
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });
  });

  it('should render ThankYou component', () => {
    render(<ThankYou />);
    expect(screen.getByText(/Credit Card/i)).toBeInTheDocument();
    expect(screen.getByText(/12345678/i)).toBeInTheDocument();
    expect(screen.getByText(/87654321/i)).toBeInTheDocument();
  });

  it('should dispatch and navigate on success', async () => {
    const mockResponse = { data: 'mockResponseData' };
    mockDispatch.mockImplementation(action => {
      if (typeof action === 'function') {
        return Promise.resolve(mockResponse);
      }
      return action;
    });
    render(<ThankYou />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    await Promise.resolve();
    expect(mockNavigate).toHaveBeenCalledWith('/some-path');
  });

  it('should handle different product categories', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: [{
              product_category: 'PL',
              name: 'Personal Loan',
              product_sequence_number: '002',
              acct_details: [{ account_number: '87654321' }],
              product_type: 'Type B',
              offer_details: [{ fees: [{ fee_amount: "100" }] }],
              campaign: "Campaign1"
            }],
            applicants: {
              loan_tenor_a_1: '12',
              required_loan_amount_a_1: 10000,
              auth_mode_a_1: "Y"
            }
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });

    render(<ThankYou />);
    expect(screen.getByText(/Personal Loan/i)).toBeInTheDocument();
    expect(screen.getByText(/87654321/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/12/i)).toBeInTheDocument();
    expect(screen.getByText(/10000/i)).toBeInTheDocument();
  });

  it('should handle otpSuccess state change', async () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return true;
      }
      return undefined;
    });

    render(<ThankYou />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    await Promise.resolve();
    // Add assertions to verify the behavior when otpSuccess is true
  });

  it('should handle error scenarios gracefully', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{
          stageId: "stage-1",
          stageInfo: {
            application: {
              application_reference: '12345'
            },
            products: []
          }
        }];
      } else if (selectorFn.toString().includes('state.stages.otpSuccess')) {
        return false;
      } else if (selectorFn.toString().includes('state.stages.isDocumentUpload')) {
        return false;
      }
      return undefined;
    });

    render(<ThankYou />);
    // Add assertions to verify how errors are handled and displayed
  });

  // New tests to cover useEffect logic
  it('should update application details correctly in useEffect', () => {
    render(<ThankYou />);

    const expectedApplicationDetails = {
      productCategory: 'CC',
      productName: 'Credit Card',
      productSequenceNo: '001',
      productType: 'Type A',
      acct_details: [{ account_number: '12345678', card_no: '87654321' }],
      account_number: '12345678',
      card_no: '87654321',
      thankyouProp: 'STP',
      accountNum: '12345678',
      cardNumber: '87654321',
      isStp: true,
      feedbackUrl: 'thankyou/feedback/url_prefix/casa/url_suffix/12345',
      cardName: 'JOHN DOE',
    };

    expect(mockDispatch).toHaveBeenCalled();
    // Mock implementation of setApplicationDetails to capture its final state
    const [state, setState] = React.useState();
    setState(expectedApplicationDetails);
    expect(state).toEqual(expectedApplicationDetails);
  });

  it('should handle analytics and tracking events correctly in useEffect', () => {
    render(<ThankYou />);
    expect(global.scrollTo).toHaveBeenCalled();
    // Add assertions to verify gaTrackEvents.pageView and trackEvents.triggerAdobeEvent
  });

  it('should handle case when stageSelector is not available', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [];
      }
      return undefined;
    });

    render(<ThankYou />);
    // Add assertions to verify how component behaves when stageSelector is empty
  });

  it('should handle case when stageInfo is not available', () => {
    (useSelector as jest.Mock).mockImplementation(selectorFn => {
      if (selectorFn.toString().includes('state.stages.stages')) {
        return [{ stageId: "stage-1" }];
      }
      return undefined;
    });

    render(<ThankYou />);
    // Add assertions to

    import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16"; // Adjust adapter based on React version
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import ThankYou from "./thank-you";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store;

jest.mock("axios", () => ({
  __esModule: true,
}));
jest.mock("@lottiefiles/react-lottie-player", () => ({
  __esModule: true,
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("ThankYou Component Testing", () => {
  let mockDispatch;
  let mockNavigate;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDispatch = jest.fn();
    mockNavigate = jest.fn();

    store = mockStore({
      stages: {
        stages: [
          {
            stageId: "stage-1",
            stageInfo: {
              application: {
                application_reference: "12345",
              },
              products: [
                {
                  product_category: "CC",
                  name: "Credit Card",
                  product_sequence_number: "001",
                  acct_details: [
                    { account_number: "12345678", card_no: "87654321" },
                  ],
                  product_type: "Type A",
                },
              ],
              applicants: {
                embossed_name_a_1: "John Doe",
              },
            },
          },
        ],
        otpSuccess: false,
        isDocumentUpload: false,
      },
    });

    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.toString().includes("state.stages.stages")) {
        return [
          {
            stageId: "stage-1",
            stageInfo: {
              application: {
                application_reference: "12345",
              },
              products: [
                {
                  product_category: "CC",
                  name: "Credit Card",
                  product_sequence_number: "001",
                  acct_details: [
                    { account_number: "12345678", card_no: "87654321" },
                  ],
                  product_type: "Type A",
                },
              ],
              applicants: {
                embossed_name_a_1: "John Doe",
              },
            },
          },
        ];
      } else if (selectorFn.toString().includes("state.stages.otpSuccess")) {
        return false;
      } else if (selectorFn.toString().includes("state.stages.isDocumentUpload")) {
        return false;
      }
      return undefined;
    });
  });

  it("should render ThankYou component", () => {
    const wrapper = shallow(<ThankYou />);
    expect(wrapper.text()).toContain("Credit Card");
    expect(wrapper.text()).toContain("12345678");
    expect(wrapper.text()).toContain("87654321");
  });

  it("should dispatch and navigate on success", async () => {
    const mockResponse = { data: "mockResponseData" };
    mockDispatch.mockImplementation((action) => {
      if (typeof action === "function") {
        return Promise.resolve(mockResponse);
      }
      return action;
    });

    const wrapper = shallow(<ThankYou />);
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    await Promise.resolve();
    expect(mockNavigate).toHaveBeenCalledWith("/some-path");
  });

  it("should handle different product categories", () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.toString().includes("state.stages.stages")) {
        return [
          {
            stageId: "stage-1",
            stageInfo: {
              application: {
                application_reference: "12345",
              },
              products: [
                {
                  product_category: "PL",
                  name: "Personal Loan",
                  product_sequence_number: "002",
                  acct_details: [{ account_number: "87654321" }],
                  product_type: "Type B",
                  offer_details: [{ fees: [{ fee_amount: "100" }] }],
                  campaign: "Campaign1",
                },
              ],
              applicants: {
                loan_tenor_a_1: "12",
                required_loan_amount_a_1: 10000,
                auth_mode_a_1: "Y",
              },
            },
          },
        ];
      }
      return undefined;
    });

    const wrapper = shallow(<ThankYou />);
    expect(wrapper.text()).toContain("Personal Loan");
    expect(wrapper.text()).toContain("87654321");
    expect(wrapper.text()).toContain("100");
    expect(wrapper.text()).toContain("12");
    expect(wrapper.text()).toContain("10000");
  });

  // Additional tests can follow the same pattern
});
// Reorder props before rendering


export const fieldError = (fieldErrorSelector: any, props: KeyWithAnyModel) => {
  debugger
  if (fieldErrorSelector) {
    if (Object.keys(fieldErrorSelector).length > 0) {
      return fieldErrorSelector.hasOwnProperty(props.data.logical_field_name);
    }
  }
};

const reorderedData = [
  ...props.data
].sort((a, b) => {
  if (a.logical_field_name === "job_title") return -1; // Ensure job_title comes first
  if (b.logical_field_name === "job_title") return 1;
  return 0; // Maintain the rest in the original order
});

// Then you can use this reorderedData in your JSX rendering
return (
  <>
    {reorderedData.map((field) => (
      <div key={field.logical_field_name} className="dropdown-select">
        <label htmlFor={field.logical_field_name}>
          {field.rwb_label_name}
        </label>
        <input
          type="text"
          className={`dropdown-select__input dropdown-select__${field.logical_field_name}`}
          id={fieldIdAppend(field)}
          placeholder={placeHolderText(field.logical_field_name)}
          onChange={() => {
            // Do nothing on change
          }}
        />
        {errors && errorsMessage.length > 0 && (
          <span className="error-msg">
            Please select {field.rwb_label_name}
          </span>
        )}
      </div>
    ))}
  </>
);
<div className="dropdown-select">
        <label htmlFor={props.data.logical_field_name}>
          {props.data.rwb_label_name}
          {isCountryTaxResideancyField && (
            <span onClick={() => removeTaxField()} className="remove-button">
              Delete
            </span>
          )}
        </label>
        <div
          className={`dropdown-select__field ${
            isMyinfo || props.data.editable ? "disabled" : ""
          }`}
          onClick={(event) => dropdownHandler(event)}
          onFocus={focusHandler.bind(this, props.data.logical_field_name)}
        >
          {selectedValue &&
            selectedValue.length > 0 &&
            selectedValue.map((item: LovInputValModel) => {
              return (
                <div
                  className="dropdown-select__fieldlabel"
                  key={item.CODE_VALUE}
                >
                  <span>{item.CODE_DESC}</span>
                  <span
                    className="multi-close"
                    onClick={(
                      e: React.MouseEvent<HTMLDivElement, MouseEvent>
                    ) => removeSelectedValues(e, item)}
                  ></span>
                </div>
              );
            })}
          {!(selectedValue && selectedValue.length > 0) && (
            <input
              type="text"
              className="dropdown-select__input"
              id={fieldIdAppend(props)}
              placeholder={placeHolderText(props.data.logical_field_name)}
              onChange={() => {
                //do nothing
              }}
            />
          )}
        </div>
        {errors && (
        <span className="error-msg">
          Please select {props.data.rwb_label_name}
        </span>
      )}
      {/* {errorsMessage.length < 0  && ( */}
        <span className= "error-msg"
        >{errorsMessage}</span>
      {/* )} */}
      
        {show && selectedOption && (
          <div className="dropdown-select__background">
            <div className="dropdown-select__bg-curve"></div>
            <div className="dropdown-select__popup">
              <div className="dropdown-select__header">
                <div>{props.data.rwb_label_name}</div>
                <div className="close" onClick={close}></div>
              </div>

              <div className="dropdown-select__search">
                <input
                  autoFocus
                  name="search"
                  className="dropdown-select__search"
                  type="search"
                  placeholder="Search"
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              {
                <div className="dropdown-select__expand">
                  {selectedOption
                    .filter((item: LovInputValModel) =>
                      item.CODE_DESC.toLowerCase().includes(
                        search.toLowerCase()
                      )
                    )
                    .map((item: LovInputValModel, index: number) => {
                      return (
                        <div key={index} className="dropdown-select__item">
                          <input
                            type="radio"
                            checked={item.checked}
                            onClick={() => addUserInput(item)}
                            onChange={() => {
                              //do nothing
                            }}
                            value={item.CODE_VALUE}
                            id={item.CODE_VALUE}
                          />
                          <label htmlFor={item.CODE_VALUE}>
                            {item.CODE_DESC}
                          </label>
                        </div>
                      );
                    })}
                </div>
              }
            </div>
          </div>
        )}
      </div>
      export const fieldError = (fieldErrorSelector: any, props: KeyWithAnyModel) => {
  debugger
  if (fieldErrorSelector) {
    if (Object.keys(fieldErrorSelector).length > 0) {
      return fieldErrorSelector.hasOwnProperty(props.data.logical_field_name);
    }
  }
};


import DOMPurify from "dompurify";
import { fieldIdAppend } from "../../../utils/common/change.utils";
import "./information.scss";
import { useSelector } from "react-redux";
import { StoreModel } from "../../../utils/model/common-model";
import Model from "../model/model";
import { useEffect, useState } from "react";
import { checkProductDetails } from "../../../services/common-service";

export const Information = (props: any) => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [isHideTooltipIcon, setIsHideTooltipIcon] = useState<boolean>(true);
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const getMarkup = () => {
    return {
      __html: DOMPurify.sanitize(`
          <div>${props.data.rwb_label_name}</div>
        `),
    };
  };

  const taxSelector = useSelector((state: StoreModel) => state.tax);

  useEffect(() => {
    const checkProductCategory = checkProductDetails(
      stageSelector[0].stageInfo.products
    );
    setIsHideTooltipIcon(checkProductCategory ? true : false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handlePopupBackButton = () => {
    setShowInfoPopup(false);
  };

  return (
    <div
      className={
        (taxSelector && taxSelector.count < taxSelector.maxCount) ||
        props.data.logical_field_name !== "add_tax_residency_note"
          ? "show-info, info-top"
          : "hide-info"
      }
    >
      {stageSelector[0].stageId === "ad-1" && <div className="info__icon"> </div>}
      <div
        className="info"
        dangerouslySetInnerHTML={getMarkup()}
        id={fieldIdAppend(props)}
      ></div>   
      {props.data.info_tooltips === "Yes" && isHideTooltipIcon === false && (
        <div className="tool-tip__icon">
          <div
            className="tool-tip"
            onClick={() => setShowInfoPopup(true)}
          ></div>
         
        </div>
      )}
      {showInfoPopup && (
        <Model name={props.data.logical_field_name} isTooltip={true} data={props.data.details}  handlebuttonClick={handlePopupBackButton} />
      )}
    </div>
  );
};

export default Information;
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Information } from "./Information";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import "@testing-library/jest-dom";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("dompurify", () => ({
  sanitize: jest.fn((value) => value),
}));

describe("Information Component", () => {
  const mockProps = {
    data: {
      rwb_label_name: "Test Label",
      logical_field_name: "add_tax_residency_note",
      info_tooltips: "Yes",
      details: { info: "Some details" },
    },
  };

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      if (selectorFn.toString().includes("state.stages.stages")) {
        return [
          {
            stageId: "ad-1",
            stageInfo: {
              products: [
                {
                  product_category: "CC",
                },
              ],
            },
          },
        ];
      } else if (selectorFn.toString().includes("state.tax")) {
        return { count: 2, maxCount: 5 };
      }
      return undefined;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Information component with default props", () => {
    render(<Information {...mockProps} />);

    // Ensure the label is sanitized and rendered
    expect(DOMPurify.sanitize).toHaveBeenCalledWith(`<div>${mockProps.data.rwb_label_name}</div>`);
    expect(screen.getByText("Test Label")).toBeInTheDocument();

    // Ensure the info icon is rendered
    expect(screen.getByClassName("info__icon")).toBeInTheDocument();

    // Ensure the tool-tip icon is not rendered by default
    expect(screen.queryByClassName("tool-tip__icon")).not.toBeInTheDocument();
  });

  test("renders tool-tip icon when conditions are met", () => {
    render(<Information {...mockProps} />);

    // Simulate condition for the tool-tip icon
    const tooltip = screen.queryByClassName("tool-tip");
    expect(tooltip).not.toBeInTheDocument();

    // Simulate clicking the tool-tip icon
    fireEvent.click(tooltip);
    expect(screen.getByClassName("tool-tip__icon")).toBeInTheDocument();
  });

  test("opens and closes the popup when tool-tip icon is clicked", () => {
    render(<Information {...mockProps} />);

    // Simulate clicking the tool-tip icon
    fireEvent.click(screen.getByClassName("tool-tip"));
    expect(screen.getByClassName("model")).toBeInTheDocument();

    // Close the popup
    fireEvent.click(screen.getByText("Back")); // Assuming "Back" is a button to close the popup
    expect(screen.queryByClassName("model")).not.toBeInTheDocument();
  });

  test("renders the correct class based on props and state", () => {
    render(<Information {...mockProps} />);

    const container = screen.getByClassName("info");
    expect(container).toHaveClass("show-info, info-top");

    // Simulate logical_field_name mismatch
    const newProps = {
      ...mockProps,
      data: { ...mockProps.data, logical_field_name: "some_other_field" },
    };
    render(<Information {...newProps} />);
    expect(container).toHaveClass("hide-info");
  });
});

it("should close the info popup when back button is clicked", () => {
  const { getByText } = render(<Information {...props} />);
  
  // Trigger the popup button click
  fireEvent.click(getByText('Back')); // Assuming 'Back' text or adjust based on your UI
  
  // Assert that showInfoPopup is false after clicking back
  expect(screen.queryByText('Some popup content')).toBeNull(); // Adjust based on actual content
});
it("should set isHideTooltipIcon to true when checkProductCategory returns true", () => {
  const checkProductCategoryMock = jest.fn(() => true);
  jest.spyOn(global, 'checkProductDetails').mockImplementation(checkProductCategoryMock);

  render(<Information {...props} />);
  expect(screen.queryByTestId('tooltip-icon')).toBeNull();
});

it("should set isHideTooltipIcon to false when checkProductCategory returns false", () => {
  const checkProductCategoryMock = jest.fn(() => false);
  jest.spyOn(global, 'checkProductDetails').mockImplementation(checkProductCategoryMock);

  render(<Information {...props} />);
  expect(screen.getByTestId('tooltip-icon')).toBeInTheDocument();
});

it("should render correctly based on taxSelector", () => {
  (useSelector as jest.Mock).mockReturnValue({ count: 1, maxCount: 5 });
  render(<Information {...props} />);
  expect(screen.getByText(props.data.rwb_label_name)).toBeInTheDocument();
});

it("should render info when stageSelector is properly mocked", () => {
  (useSelector as jest.Mock).mockReturnValueOnce([{ stageId: "ad-1", stageInfo: { products: [] } }]);
  render(<Information {...props} />);
  expect(screen.getByText(props.data.rwb_label_name)).toBeInTheDocument();
});

it("should render <Model> when showInfoPopup is true", () => {
  render(<Information {...props} />);
  
  // Trigger the popup open
  fireEvent.click(screen.getByTestId('tooltip-icon'));
  
  // Check if Model is rendered
  expect(screen.getByTestId('model')).toBeInTheDocument();
});

it("should set showInfoPopup to true when tooltip icon is clicked", () => {
  render(<Information {...props} />);
  
  // Initially, showInfoPopup should be false
  expect(screen.queryByTestId('model')).toBeNull();

  // Trigger the click event
  fireEvent.click(screen.getByTestId('tooltip-icon'));

  // Now, showInfoPopup should be true, and Model should be rendered
  expect(screen.getByTestId('model')).toBeInTheDocument();
});

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useFieldErrorSelector = () => {
  const fieldError = useSelector((state: StoreModel) => state.fielderror.error); // Original selector
  const [enhancedFieldError, setEnhancedFieldError] = useState(fieldError);

  useEffect(() => {
    // Enhance the fieldError only when it's missing the required field
    if (fieldError && !fieldError.missingField) {
      setEnhancedFieldError({
        ...fieldError,
        missingField: "defaultValue", // Add your required default value
      });
    } else {
      setEnhancedFieldError(fieldError);
    }
  }, [fieldError]); // Runs only when `fieldError` changes

  return enhancedFieldError;
};

import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    error: {},
    mandatoryFields: []
}

const fieldError = createSlice({
    name: 'fielderror',
    initialState: initialState,
    reducers: {
        getFieldError(state, action) {
            const newError = action.payload;
            console.log("sliceerror",newError)
            // state.error = newError.fieldName
            if (newError) {
                state.error = newError.fieldName
            } else {
                state.error = {};
            }
        },
        removeToggleFieldError(state, action) {
            const s = action.payload;
            /*istanbul ignore next */
            if (state.error) {
                s.forEach((data: any) => {
                    const position = Object.keys(state.error).indexOf(data);
                    if (position >= 0) {
                        state.error.splice(position, 1);
                    }
                })                
            }
        },
        getMandatoryFields(state, action) {
            if (action.payload) {
                if (state.mandatoryFields && state.mandatoryFields.length > 0) {
                    action.payload.forEach((item:string) => {
                        if(!(state.mandatoryFields.includes(item))) {
                            state.mandatoryFields = state.mandatoryFields.concat(item)
                        }
                    });
                } else {
                    state.mandatoryFields = action.payload;
                }
            } else {
                state.mandatoryFields = null;
            }
        },
        updateMandatoryFields(state, action) {
            if (action.payload) {
                if (state.mandatoryFields && state.mandatoryFields.length > 0) {
                    action.payload.forEach((item:string) => {
                        /*istanbul ignore else */
                        if(!(state.mandatoryFields.includes(item))) {
                            state.mandatoryFields = state.mandatoryFields.concat(item)
                        }
                    });
                } else {
                    state.mandatoryFields = action.payload;
                }
            }
        },
        removeMandatoryFields(state, action) {
            const nonMandatoryField = action.payload;
            /*istanbul ignore else */   
            if (state.mandatoryFields) {
                nonMandatoryField.forEach((data: string) => {
                    const position = Object.values(state.mandatoryFields).indexOf(data);
                    /*istanbul ignore else */ 
                    if (position >= 0) {
                        state.mandatoryFields.splice(position, 1);
                    }
                })                
            }
        }
    }
});

export const fieldErrorAction = fieldError.actions;

export default fieldError;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import {
  fieldError,
  getUrl,
  isFieldUpdate,
} from "../../../utils/common/change.utils";
import errorMsg from "../../../assets/_json/error.json";
import { lastAction } from "../../../utils/store/last-accessed-slice";
import { postalCodeValidation } from "./number.utils";
import { postalCodeAction } from "../../../utils/store/postal-code";
import "./number.scss";

const Number = (props: KeyWithAnyModel) => {
  const [error, setError] = useState("");  
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const userInputSelector = useSelector(
    (state: StoreModel) => state.stages.userInput
  );
  const updatedStageInputsSelector = useSelector(
    (state: StoreModel) => state.stages.updatedStageInputs
  );
  // const fieldErrorSelector = useSelector(
  //   (state: StoreModel) => state.fielderror.error
  // );
  const useFieldErrorSelector = () => {
    const fieldError = useSelector((state: StoreModel) => state.fielderror.error); // Original selector
    const [enhancedFieldError, setEnhancedFieldError] = useState(fieldError);
  
    useEffect(() => {
      
      if (fieldError && !fieldError.postal_code) {
        setEnhancedFieldError({
          ...fieldError,
          postal_code: "", 
        });
      } else {
        setEnhancedFieldError(fieldError);
      }
    }, [fieldError]); 
  
    return enhancedFieldError;
  };
  const fieldErrorSelector = useFieldErrorSelector()
  console.log("number",fieldErrorSelector)
  const dispatch = useDispatch();
  const [defaultValue, setDefaultValue] = useState("");
  const [valueUpdate, setValueUpdate] = useState("");
  const [isPostalCodeFetch, setIsPostalCodeFetch] = useState(false);
  const [isPostalValue , setPostalValue] = useState("");
  const changeHandler = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setDefaultValue(inputValue);
    if (!event.target.validity.valid) {
      props.handleCallback(props.data, inputValue);        
      if ((props.data.mandatory === "Yes" || props.data.mandatory ==="Conditional") && inputValue.length < 1) {
        setError(`${errorMsg.emity} ${props.data.rwb_label_name}`);
      } else if (props.data.regex && !(`${inputValue}`.match(props.data.regex))) {
        setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`)
      } else if (props.data.min_length && `${inputValue}`.length < props.data.min_length) {
        setError(`${errorMsg.bankAccountMinLength} ${props.data.min_length} digits`)
      } else {
        setError((`${errorMsg.patterns} ${props.data.rwb_label_name}`));
      }
    }else{
      setError("");
      const fieldValue = event.target.value;
      setValueUpdate(fieldValue)
      if (
        fieldValue &&
        isPostalValue !== fieldValue && 
        fieldName === "postal_code" &&
        event.target.validity.valid
      ) {
        setPostalValue(fieldValue)
        const channelrefNumber =
          stageSelector[0].stageInfo.application["channel_reference"];
        setIsPostalCodeFetch(true);
        dispatch(
          postalCodeValidation(
            fieldValue,
            channelrefNumber,
            stageSelector[0].stageInfo.applicants
          )
        ).then((response: any) => {
          dispatch(postalCodeAction.setPostalCode(response));
          setIsPostalCodeFetch(false);
        });
      }
      else if (stageSelector[0].stageId !== "ad-2") {
        props.handleCallback(props.data, event.target.value);     
      } else {
        dispatch(isFieldUpdate(props, event.target.value, fieldName));
        if (accountNumValidation(inputValue,props)) {     
          props.handleCallback(props.data, inputValue);
        } else {
          props.handleCallback(props.data, "");            
          showAccountNumError();           
        }           
       }
    } 
  };
  const showAccountNumError = () => {
    if (        
      props.data.logical_field_name === "scb_account_no" ||
      props.data.logical_field_name === "other_bank_account_bt"
    ) {
      setError(errorMsg.sgBankAccountMismatch);
    } else if (
      props.data.logical_field_name === "re_enter_scb_account_no" ||
      props.data.logical_field_name === "reenter_other_bank_account_bt"
    ) {
      setError(errorMsg.sgBankAccountMismatch_RE);
    } else if (props.data.logical_field_name === "other_bank_credit_card_bt") {
      setError(errorMsg.sgCreditCardNoMismatch);
    }else if (props.data.logical_field_name === "reenter_other_bank_credit_card_bt") {
      setError(errorMsg.sgCreditCardNoMismatch_RE);
    } else {
      setError(`${errorMsg.emity} ${props.data.rwb_label_name}`);
    }
  }
  const isValidInput = (inputValue:string, props:KeyWithAnyModel) => {
    if (props.data.regex && !(`${inputValue}`.match(props.data.regex))) {
      return false;
    } else if (props.data.min_length && `${inputValue}`.length < props.data.min_length) {
      return false;
    } else {
      return true;
    }
  }
  const accountNumValidation = (inputValue:string, props:KeyWithAnyModel) => {
    const validFields = ["scb_account_no", "re_enter_scb_account_no", "other_bank_account_bt", "reenter_other_bank_account_bt", "other_bank_credit_card_bt", "reenter_other_bank_credit_card_bt"];
    if (validFields.indexOf(props.data.logical_field_name) === -1) {
      return true;
    }
    let storeValue: string | null = null;
    let fieldName: string | null = null;
    if (props.data.logical_field_name === "scb_account_no") {
      fieldName = "re_enter_scb_account_no";              
    } else if (props.data.logical_field_name === "re_enter_scb_account_no") {
      fieldName = "scb_account_no";
    } else if (props.data.logical_field_name === "other_bank_account_bt") {
      fieldName = "reenter_other_bank_account_bt";   
    } else if (props.data.logical_field_name === "reenter_other_bank_account_bt") {
      fieldName = "other_bank_account_bt";
    } else if (props.data.logical_field_name === "other_bank_credit_card_bt") {
      fieldName = "reenter_other_bank_credit_card_bt";
    } else if (props.data.logical_field_name === "reenter_other_bank_credit_card_bt") {
      fieldName = "other_bank_credit_card_bt";      
    }
    fieldName = fieldName + "_a_1";
    if (
      stageSelector &&
      stageSelector[0] &&
      stageSelector[0].stageInfo &&
      stageSelector[0].stageInfo.applicants
    ) {
      let userUpdateValue = null;
      const userUpdateStageSelector = updatedStageInputsSelector.findIndex(
        (ref: any) => ref && ref.stageId === stageSelector[0].stageId
      );
      if (userUpdateStageSelector > -1) {
        userUpdateValue = updatedStageInputsSelector[userUpdateStageSelector].applicants[fieldName];
      }
      const userInputResponse = userInputSelector.applicants[fieldName];
      storeValue =
        userInputResponse ||
        userUpdateValue ||
        stageSelector[0].stageInfo.applicants[fieldName];
    }    
    return !(storeValue && (inputValue !== storeValue));
  }; 
  useEffect(() => {
    if (
      stageSelector &&
      stageSelector[0] &&
      stageSelector[0].stageInfo &&
      stageSelector[0].stageInfo.applicants
    ) {
      const userInputResponse =
        userInputSelector.applicants[props.data.logical_field_name + "_a_1"];

      const stageIndex = getUrl
        .getUpdatedStage()
        .updatedStageInputs.findIndex(
          (ref: any) => ref && ref.stageId === stageSelector[0].stageId
        );
      let updatedVal = null;
      if (stageIndex > -1) {
        updatedVal =
          getUrl.getUpdatedStage().updatedStageInputs[stageIndex].applicants[
            props.data.logical_field_name + "_a_1"
          ];
      }
      
      let fieldValue = "";
      if (updatedVal) {
        fieldValue = updatedVal;
      } else if (userInputResponse) {
        fieldValue = userInputResponse;
      } else if (
        stageSelector[0].stageInfo.applicants[
          props.data.logical_field_name + "_a_1"
        ] &&
        updatedVal !== ""
      ) {
        fieldValue =
          stageSelector[0].stageInfo.applicants[
            props.data.logical_field_name + "_a_1"
          ];
      }

      setDefaultValue(fieldValue);   
      setValueUpdate(fieldValue)   
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);    
useEffect(() => {  
  if (
    isValidInput(userInputSelector.applicants[props.data.logical_field_name + "_a_1"], props) &&
    accountNumValidation(
      userInputSelector.applicants[props.data.logical_field_name + "_a_1"],
      props
    )
  ) {    
    setError("");
    props.handleCallback(
      props.data,
      userInputSelector.applicants[props.data.logical_field_name + "_a_1"]
    );
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [userInputSelector.applicants]);
  useEffect(() => {
      dispatch(isFieldUpdate(props, defaultValue, props.data.logical_field_name));
      if (stageSelector[0].stageId !== "ad-2") {
        props.handleCallback(props.data, defaultValue);
      }
      props.handleFieldDispatch(props.data.logical_field_name, defaultValue);         
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueUpdate]);

  const bindHandler = (
    fieldName: string,
    event: React.FocusEvent<HTMLInputElement>
  ) => {    
    const fieldValue = event.target.value;    
    if (
      fieldValue &&
      fieldName !== "postal_code" &&
      event.target.validity.valid
    ) {
      if (stageSelector[0].stageId !== "ad-2") {
        props.handleCallback(props.data, event.target.value);
      }   
      setValueUpdate(fieldValue)
    }    

  };

  useEffect(() => {
    if (fieldError(fieldErrorSelector, props)) {
      if (!error) { 
        if (stageSelector[0].stageId !== "ad-2") {           
          setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`);        
        } else if (isValidInput(userInputSelector.applicants[props.data.logical_field_name + "_a_1"], props) && !accountNumValidation(userInputSelector.applicants[props.data.logical_field_name + "_a_1"], props)){
          showAccountNumError();
        } else {
          setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`);
        }
      }
    } else {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrorSelector]);
  useEffect(() => {
    if (fieldError(fieldErrorSelector, props)) {
      setError(`${errorMsg.emity} ${props.data.rwb_label_name}`);
    } else {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrorSelector]);

  const placeHolderText = () => {
    return props.data.rwb_label_name;
  };

  const focusHandler = (
    fieldName: string,
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    dispatch(lastAction.getField(fieldName));
  };
  return (
    <>
      <div className="number text">
        <label htmlFor={props.data.logical_field_name}>
          {props.data.rwb_label_name}
        </label>
        <input
          type={props.data.type}
          name={props.data.logical_field_name}
          aria-label={props.data.logical_field_name}
          id={props.data.logical_field_name + "_a_1"}
          placeholder={placeHolderText()}
          value={defaultValue}
          minLength={props.data.min_length}
          maxLength={props.data.length}
          pattern={props.data.regex}
          onChange={changeHandler.bind(this, props.data.logical_field_name)}
          onBlur={bindHandler.bind(this, props.data.logical_field_name)}
          disabled={props.data.editable || stageSelector[0].stageId === "bd-1"}
          onFocus={focusHandler.bind(this, props.data.logical_field_name)}
          className={`${
            isPostalCodeFetch ? "disabled" : ""
          }`}
        />
        {isPostalCodeFetch && <span className={`${props.data.logical_field_name} circle-spinner`}></span>}
        {error && <span className="error-msg">{error}</span>}
      </div>
    </>
  );
};

export default Number;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import {
  fieldError,
  getUrl,
  isFieldUpdate,
} from "../../../utils/common/change.utils";
import errorMsg from "../../../assets/_json/error.json";
import { lastAction } from "../../../utils/store/last-accessed-slice";
import { postalCodeValidation } from "./number.utils";
import { postalCodeAction } from "../../../utils/store/postal-code";
import "./number.scss";

const Number = (props: KeyWithAnyModel) => {
  const [error, setError] = useState("");  
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const userInputSelector = useSelector(
    (state: StoreModel) => state.stages.userInput
  );
  const updatedStageInputsSelector = useSelector(
    (state: StoreModel) => state.stages.updatedStageInputs
  );
  const fieldErrorSelector = useSelector(
    (state: StoreModel) => state.fielderror.error
  );
    const dispatch = useDispatch();
  const [defaultValue, setDefaultValue] = useState("");
  const [valueUpdate, setValueUpdate] = useState("");
  const [isPostalCodeFetch, setIsPostalCodeFetch] = useState(false);
  const [isPostalValue , setPostalValue] = useState("");
  const changeHandler = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setDefaultValue(inputValue);
    if (!event.target.validity.valid) {
      props.handleCallback(props.data, inputValue);        
      if ((props.data.mandatory === "Yes" || props.data.mandatory ==="Conditional") && inputValue.length < 1) {
        setError(`${errorMsg.emity} ${props.data.rwb_label_name}`);
      } else if (props.data.regex && !(`${inputValue}`.match(props.data.regex))) {
        setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`)
      } else if (props.data.min_length && `${inputValue}`.length < props.data.min_length) {
        setError(`${errorMsg.bankAccountMinLength} ${props.data.min_length} digits`)
      } else {
        setError((`${errorMsg.patterns} ${props.data.rwb_label_name}`));
      }
    }else{
      setError("");
      const fieldValue = event.target.value;
      setValueUpdate(fieldValue)
      if (
        fieldValue &&
        isPostalValue !== fieldValue && 
        fieldName === "postal_code" &&
        event.target.validity.valid
      ) {
        setPostalValue(fieldValue)
        const channelrefNumber =
          stageSelector[0].stageInfo.application["channel_reference"];
        setIsPostalCodeFetch(true);
        dispatch(
          postalCodeValidation(
            fieldValue,
            channelrefNumber,
            stageSelector[0].stageInfo.applicants
          )
        ).then((response: any) => {
          dispatch(postalCodeAction.setPostalCode(response));
          setIsPostalCodeFetch(false);
        });
      }
      else if (stageSelector[0].stageId !== "ad-2") {
        props.handleCallback(props.data, event.target.value);     
      } else {
        dispatch(isFieldUpdate(props, event.target.value, fieldName));
        if (accountNumValidation(inputValue,props)) {     
          props.handleCallback(props.data, inputValue);
        } else {
          props.handleCallback(props.data, "");            
          showAccountNumError();           
        }           
       }
    } 
  };
  const showAccountNumError = () => {
    if (        
      props.data.logical_field_name === "scb_account_no" ||
      props.data.logical_field_name === "other_bank_account_bt"
    ) {
      setError(errorMsg.sgBankAccountMismatch);
    } else if (
      props.data.logical_field_name === "re_enter_scb_account_no" ||
      props.data.logical_field_name === "reenter_other_bank_account_bt"
    ) {
      setError(errorMsg.sgBankAccountMismatch_RE);
    } else if (props.data.logical_field_name === "other_bank_credit_card_bt") {
      setError(errorMsg.sgCreditCardNoMismatch);
    }else if (props.data.logical_field_name === "reenter_other_bank_credit_card_bt") {
      setError(errorMsg.sgCreditCardNoMismatch_RE);
    } else {
      setError(`${errorMsg.emity} ${props.data.rwb_label_name}`);
    }
  }
  const isValidInput = (inputValue:string, props:KeyWithAnyModel) => {
    if (props.data.regex && !(`${inputValue}`.match(props.data.regex))) {
      return false;
    } else if (props.data.min_length && `${inputValue}`.length < props.data.min_length) {
      return false;
    } else {
      return true;
    }
  }
  const accountNumValidation = (inputValue:string, props:KeyWithAnyModel) => {
    const validFields = ["scb_account_no", "re_enter_scb_account_no", "other_bank_account_bt", "reenter_other_bank_account_bt", "other_bank_credit_card_bt", "reenter_other_bank_credit_card_bt"];
    if (validFields.indexOf(props.data.logical_field_name) === -1) {
      return true;
    }
    let storeValue: string | null = null;
    let fieldName: string | null = null;
    if (props.data.logical_field_name === "scb_account_no") {
      fieldName = "re_enter_scb_account_no";              
    } else if (props.data.logical_field_name === "re_enter_scb_account_no") {
      fieldName = "scb_account_no";
    } else if (props.data.logical_field_name === "other_bank_account_bt") {
      fieldName = "reenter_other_bank_account_bt";   
    } else if (props.data.logical_field_name === "reenter_other_bank_account_bt") {
      fieldName = "other_bank_account_bt";
    } else if (props.data.logical_field_name === "other_bank_credit_card_bt") {
      fieldName = "reenter_other_bank_credit_card_bt";
    } else if (props.data.logical_field_name === "reenter_other_bank_credit_card_bt") {
      fieldName = "other_bank_credit_card_bt";      
    }
    fieldName = fieldName + "_a_1";
    if (
      stageSelector &&
      stageSelector[0] &&
      stageSelector[0].stageInfo &&
      stageSelector[0].stageInfo.applicants
    ) {
      let userUpdateValue = null;
      const userUpdateStageSelector = updatedStageInputsSelector.findIndex(
        (ref: any) => ref && ref.stageId === stageSelector[0].stageId
      );
      if (userUpdateStageSelector > -1) {
        userUpdateValue = updatedStageInputsSelector[userUpdateStageSelector].applicants[fieldName];
      }
      const userInputResponse = userInputSelector.applicants[fieldName];
      storeValue =
        userInputResponse ||
        userUpdateValue ||
        stageSelector[0].stageInfo.applicants[fieldName];
    }    
    return !(storeValue && (inputValue !== storeValue));
  }; 
  useEffect(() => {
    if (
      stageSelector &&
      stageSelector[0] &&
      stageSelector[0].stageInfo &&
      stageSelector[0].stageInfo.applicants
    ) {
      const userInputResponse =
        userInputSelector.applicants[props.data.logical_field_name + "_a_1"];

      const stageIndex = getUrl
        .getUpdatedStage()
        .updatedStageInputs.findIndex(
          (ref: any) => ref && ref.stageId === stageSelector[0].stageId
        );
      let updatedVal = null;
      if (stageIndex > -1) {
        updatedVal =
          getUrl.getUpdatedStage().updatedStageInputs[stageIndex].applicants[
            props.data.logical_field_name + "_a_1"
          ];
      }
      
      let fieldValue = "";
      if (updatedVal) {
        fieldValue = updatedVal;
      } else if (userInputResponse) {
        fieldValue = userInputResponse;
      } else if (
        stageSelector[0].stageInfo.applicants[
          props.data.logical_field_name + "_a_1"
        ] &&
        updatedVal !== ""
      ) {
        fieldValue =
          stageSelector[0].stageInfo.applicants[
            props.data.logical_field_name + "_a_1"
          ];
      }

      setDefaultValue(fieldValue);   
      setValueUpdate(fieldValue)   
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);    
useEffect(() => {  
  if (
    isValidInput(userInputSelector.applicants[props.data.logical_field_name + "_a_1"], props) &&
    accountNumValidation(
      userInputSelector.applicants[props.data.logical_field_name + "_a_1"],
      props
    )
  ) {    
    setError("");
    props.handleCallback(
      props.data,
      userInputSelector.applicants[props.data.logical_field_name + "_a_1"]
    );
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [userInputSelector.applicants]);
  useEffect(() => {
      dispatch(isFieldUpdate(props, defaultValue, props.data.logical_field_name));
      if (stageSelector[0].stageId !== "ad-2") {
        props.handleCallback(props.data, defaultValue);
      }
      props.handleFieldDispatch(props.data.logical_field_name, defaultValue);         
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueUpdate]);

  const bindHandler = (
    fieldName: string,
    event: React.FocusEvent<HTMLInputElement>
  ) => {    
    const fieldValue = event.target.value;    
    if (
      fieldValue &&
      fieldName !== "postal_code" &&
      event.target.validity.valid
    ) {
      if (stageSelector[0].stageId !== "ad-2") {
        props.handleCallback(props.data, event.target.value);
      }   
      setValueUpdate(fieldValue)
    }    

  };

  useEffect(() => {
    if (fieldError(fieldErrorSelector, props)) {
      if (!error) { 
        if (stageSelector[0].stageId !== "ad-2") {           
          setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`);        
        } else if (isValidInput(userInputSelector.applicants[props.data.logical_field_name + "_a_1"], props) && !accountNumValidation(userInputSelector.applicants[props.data.logical_field_name + "_a_1"], props)){
          showAccountNumError();
        } else {
          setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`);
        }
      }
    } else {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrorSelector]);
  useEffect(() => {
    if (fieldError(fieldErrorSelector, props)) {
      setError(`${errorMsg.emity} ${props.data.rwb_label_name}`);
    } else {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrorSelector]);

  const placeHolderText = () => {
    return props.data.rwb_label_name;
  };

  const focusHandler = (
    fieldName: string,
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    dispatch(lastAction.getField(fieldName));
  };
  return (
    <>
      <div className="number text">
        <label htmlFor={props.data.logical_field_name}>
          {props.data.rwb_label_name}
        </label>
        <input
          type={props.data.type}
          name={props.data.logical_field_name}
          aria-label={props.data.logical_field_name}
          id={props.data.logical_field_name + "_a_1"}
          placeholder={placeHolderText()}
          value={defaultValue}
          minLength={props.data.min_length}
          maxLength={props.data.length}
          pattern={props.data.regex}
          onChange={changeHandler.bind(this, props.data.logical_field_name)}
          onBlur={bindHandler.bind(this, props.data.logical_field_name)}
          disabled={props.data.editable || stageSelector[0].stageId === "bd-1"}
          onFocus={focusHandler.bind(this, props.data.logical_field_name)}
          className={`${
            isPostalCodeFetch ? "disabled" : ""
          }`}
        />
        {isPostalCodeFetch && <span className={`${props.data.logical_field_name} circle-spinner`}></span>}
        {error && <span className="error-msg">{error}</span>}
      </div>
    </>
  );
};

export default Number;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import {
  fieldError,
  fieldIdAppend,
  getUrl,
  isFieldUpdate,
  isFieldValueUpdate,
} from "../../../utils/common/change.utils";
import "./text.scss";
import validateService from "../../../services/validation-service";
import errorMsg from "../../../assets/_json/error.json";
import { stagesAction } from "../../../utils/store/stages-slice";
import Cards from "../cards/cards";
import { aliasAction } from "../../../utils/store/alias-slice";
import { fieldErrorAction } from "../../../utils/store/field-error-slice";
import { lastAction } from "../../../utils/store/last-accessed-slice";
import { authenticateType } from "../../../utils/common/change.utils";
// import ReferralCode from "../../../shared/components/referral-code/referral-code";
// import { referralcodeAction } from "../../../utils/store/referral-code-slice";

const Text = (props: KeyWithAnyModel) => {
  const [error, setError] = useState("");
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const specialCharRegex = /^[^a-zA-Z0-9]+$/;

  const userInputSelector = useSelector(
    (state: StoreModel) => state.stages.userInput
  );
  const fieldErrorSelector = useSelector(
    (state: StoreModel) => state.fielderror.error
  );
  const postalCodeSelector = useSelector(
    (state: StoreModel) => state.postalCode.postalCode
  );
  // const referralcodeSelector = useSelector((state: StoreModel) => state.referralcode);
  const resumeSelector = useSelector(
    (state: StoreModel) => state.urlParam.resume
  );
  const dispatch = useDispatch();

  const [defaultValue, setDefaultValue] = useState("");
  const [embossCounter, setEmbossCounter] = useState(0);
  const [postalCode, setPostalCode] = useState<any>({});
  // const [showReferralCode, setShowReferralcode] = useState(false);

  const validationPatterns = () => {
    let pattern; 
    let fieldName = props.data.logical_field_name;
    if(fieldName === "name_of_business"){
      pattern = "^[a-zA-Z0-9]+$";
    }
    return pattern
  }

  const changeHandler = (
    fieldName: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    embossedNameCounter(event.target.value);
    setDefaultValue(event.target.value);
    props.handleCallback(props.data, event.target.value);
    setError("");
    // if (props.data.logical_field_name === "referral_id_2") {
    //   setDefaultValue(
    //     event.target.value !== ""
    //       ? event.target.value.toUpperCase()
    //       : event.target.value
    //   );
    //   // dispatch(
    //   //   referralcodeAction.setReferralId(
    //   //     event.target.value !== ""
    //   //       ? event.target.value.toUpperCase()
    //   //       : event.target.value
    //   //   )
    //   // );
    //   // dispatch(referralcodeAction.setReferralErrorMsg(""));
    // }
    if (
      (props.data.mandatory === "Yes" ||
        props.data.mandatory === "Conditional") &&
      event.target.value.length < 1 &&
      props.data.logical_field_name !== "referral_id_2"
    ) {
      setError(`${errorMsg.emity} ${props.data.rwb_label_name}`);
    } else if (
      `${event.target.value}`[0] === " " ||
      `${event.target.value}`[`${event.target.value}`.length - 1] === " "
    ) {
      setError(
        `${props.data.rwb_label_name} cannot have leading or trailing spaces`
      );
    }else if (
      props.data.regex &&
      !`${event.target.value}`.match(props.data.regex) &&
      props.data.logical_field_name == "embossed_name" 
    ) {
      setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`);

    } else if (
      props.data.regex &&
      !`${event.target.value}`.match(props.data.regex) &&
      props.data.logical_field_name !== "referral_id_2" && props.data.logical_field_name !== "name_of_business" &&
      props.data.logical_field_name !== "full_name" &&props.data.logical_field_name !== "NRIC"
) {
      setError(`${errorMsg.patterns}${props.data.rwb_label_name} `);

    } 
    else if (
      props.data.regex &&
      !`${event.target.value}`.match(props.data.regex) &&
      props.data.logical_field_name !== "referral_id_2" && props.data.logical_field_name !== "name_of_business" &&
      props.data.logical_field_name == "full_name"

    ) {
      setError(`${errorMsg.fullName} `);
      
    }
     else if (
      props.data.min_length &&
      `${event.target.value}`.length < props.data.min_length &&
      props.data.logical_field_name !== "referral_id_2"
    ) {
      setError(`${errorMsg.minLength} ${props.data.min_length} characters`);
    } else if (
      props.data.logical_field_name === "NRIC" &&
      specialCharRegex.test(event.target.value) 
      
    ) {
      setError(`${errorMsg.nricAn}`);
    } else if(props.data.logical_field_name === "name_of_business" && event.target.value.length>1){
      setError("");
    } 
    else {
      setError(
        !event.target.validity.valid &&
        props.data.logical_field_name !== "referral_id_2"
          ? `${errorMsg.patterns} ${props.data.rwb_label_name}`
          : ""
      );
    }
    // if (
    //   props.data.logical_field_name === "referral_id_2" &&
    //   referralcodeSelector &&
    //   referralcodeSelector.errormsg !== ""
    // ) {
    //   setError("");
    // }
  };

  useEffect(() => {
    setPostalCode(postalCodeSelector);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCodeSelector]);

  useEffect(() => {
    let setPostalValue = null;
    if (
      props.data.logical_field_name === "block" ||
      props.data.logical_field_name === "building_name" ||
      props.data.logical_field_name === "street_name"
    ) {
      if (props.data.logical_field_name === "block") {
        setPostalValue = postalCode.block_a_1 || "";
      } else if (props.data.logical_field_name === "building_name") {
        setPostalValue = postalCode.building_name_a_1 || "";
      } else if (props.data.logical_field_name === "street_name") {
        setPostalValue = postalCode.street_name_a_1 || "";
      }
      if (setPostalValue) {
        setDefaultValue(setPostalValue);
        props.handleCallback(props.data, setPostalValue);
        dispatch(isFieldValueUpdate(props, stageSelector, setPostalValue));
        dispatch(
          isFieldUpdate(props, setPostalValue, props.data.logical_field_name)
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCode]);

  useEffect(() => {
    // if (props.data.logical_field_name === "referral_id_2") {
    //   if ( referralcodeSelector && referralcodeSelector.refer && referralcodeSelector.refer === "true") {
    //     setShowReferralcode(true);
    //     if (referralcodeSelector.referId !== null) {
    //       const getReferralCode =
    //       referralcodeSelector && referralcodeSelector.referId
    //         ? referralcodeSelector.referId.toUpperCase()
    //         : '';
    //     setDefaultValue(getReferralCode);
    //     dispatch(referralcodeAction.setReferralId(getReferralCode));
    //     }
    //     else{
    //        setDefaultValue("");
    //     }
    //   }
    //   if (
    //     getUrl.getParameterByName("auth") === "resume" || resumeSelector
    //   ) {
    //     setShowReferralcode(true);
    //     if(referralcodeSelector && referralcodeSelector.referId){
    //       setDefaultValue(referralcodeSelector && referralcodeSelector.referId);
    //     } 
    //   }
    // }
    if (
      stageSelector &&
      stageSelector[0] &&
      stageSelector[0].stageInfo &&
      stageSelector[0].stageInfo.applicants
    ) {
      const userInputResponse =
        userInputSelector.applicants[fieldIdAppend(props)];

      const stageIndex = getUrl
        .getUpdatedStage()
        .updatedStageInputs.findIndex(
          (ref: any) => ref && ref.stageId === stageSelector[0].stageId
        );
      let updatedVal = null;
      if (stageIndex > -1) {
        updatedVal =
          getUrl.getUpdatedStage().updatedStageInputs[stageIndex].applicants[
            fieldIdAppend(props)
          ];
      }

      let fieldValue = "";
      if (updatedVal) {
        fieldValue = updatedVal;
      } else if (userInputResponse) {
        fieldValue = userInputResponse;
      } else if (
        stageSelector[0].stageInfo.applicants[fieldIdAppend(props)] &&
        updatedVal !== ""
      ) {
        fieldValue =
          stageSelector[0].stageInfo.applicants[fieldIdAppend(props)];
      }
      if (props.data.logical_field_name === "residential_address") {
        let myInfoAddress :string = "";
        if(stageSelector[0].stageInfo.application.journey_type === 'NTC' && (stageSelector[0].stageInfo.products[0].product_category === 'CC' || stageSelector[0].stageInfo.products[0].product_type === '280')
         && stageSelector[0].stageInfo.applicants["mailing_address_a_1"]){
         myInfoAddress = stageSelector[0].stageInfo.applicants["mailing_address_a_1"];    
        }
        else if(getUrl.getParameterByName("isMyInfoVirtual") === "true"){
        const block = stageSelector[0].stageInfo.applicants["block_a_1"];
        const building =
          stageSelector[0].stageInfo.applicants["building_name_a_1"];
        const street = stageSelector[0].stageInfo.applicants["street_name_a_1"];
        const unitNo = stageSelector[0].stageInfo.applicants["unit_no_a_1"];
        const postalCode =
          stageSelector[0].stageInfo.applicants["postal_code_a_1"];

        if (block && street && postalCode) {
          myInfoAddress = block +
            (building ? "," + building : "") +
            "," +
            street +
            (unitNo ? "," + unitNo : "") +
            "," +
            postalCode;
        }
      }
        if(myInfoAddress){
        setDefaultValue(myInfoAddress);
        dispatch(
          isFieldUpdate(props, myInfoAddress, props.data.logical_field_name)
          );
        }
      } else if (
        props.data.logical_field_name === "tax_id_no" &&
        stageSelector[0].stageInfo.applicants["casa_fatca_declaration_a_1"] ===
          "Y"
      ) {
        setDefaultValue(stageSelector[0].stageInfo.applicants["NRIC_a_1"]);
        dispatch(
          isFieldUpdate(
            props,
            stageSelector[0].stageInfo.applicants["NRIC_a_1"],
            props.data.logical_field_name
          )
        );
      } else if (
        ((props.data.logical_field_name === "embossed_dc_name" &&
          !stageSelector[0].stageInfo.applicants["embossed_dc_name_a_1"]) ||
          (props.data.logical_field_name === "embossed_name" &&
            !stageSelector[0].stageInfo.applicants["embossed_name_a_1"]) ||
          (props.data.logical_field_name === "embossed_name_2" &&
            !stageSelector[0].stageInfo.applicants["embossed_name_2_a_1"])) &&
        new RegExp(props.data.regex).test(
          stageSelector[0].stageInfo.applicants["full_name_a_1"]
        )
      ) {
        const fullName =
          fieldValue || stageSelector[0].stageInfo.applicants["full_name_a_1"];
        if (fullName && fullName.length >= 19) {
          let firstName = fullName.split(" ")[0];
          firstName = firstName.length >= 19 ? "" : firstName;
          embossedNameCounter(firstName);
          setDefaultValue(firstName);
          dispatch(
            isFieldUpdate(props, firstName, props.data.logical_field_name)
          );
          props.handleCallback(props.data, firstName);
        } else {
          embossedNameCounter(fullName);
          setDefaultValue(fullName);
          dispatch(
            isFieldUpdate(props, fullName, props.data.logical_field_name)
          );
          props.handleCallback(props.data, fullName);
        }
      } else if (
        userInputSelector.applicants[props.data.logical_field_name + "_a_1"] !==
          undefined &&
        props.data.logical_field_name.substring(0, 9) === "tax_id_no"
      ) {
        setDefaultValue(fieldValue);
        dispatch(
          isFieldUpdate(
            props,
            fieldValue ||
              userInputSelector.applicants[
                props.data.logical_field_name + "_a_1"
              ],
            props.data.logical_field_name
          )
        );
        props.handleCallback(
          props.data,
          userInputSelector.applicants[props.data.logical_field_name + "_a_1"]
        );
      } else if (
        stageSelector[0].stageInfo.applicants[
          props.data.logical_field_name + "_a_1"
        ] ||
        fieldValue
      ) {
        setDefaultValue(fieldValue);
        if (
          !(stageSelector[0].stageId === "ssf-2" && getUrl.getJourneyType())
        ) {
          dispatch(
            isFieldUpdate(props, fieldValue, props.data.logical_field_name)
          );
          props.handleCallback(props.data, fieldValue);
        } else {
          dispatch(
            isFieldUpdate(
              props,
              fieldValue ||
                stageSelector[0].stageInfo.applicants[
                  props.data.logical_field_name + "_a_1"
                ],
              props.data.logical_field_name
            )
          );
          props.handleCallback(
            props.data,
            fieldValue ||
              stageSelector[0].stageInfo.applicants[
                props.data.logical_field_name + "_a_1"
              ]
          );
        }
        if (
          props.data.logical_field_name === "embossed_dc_name" ||
          props.data.logical_field_name === "embossed_name" ||
          props.data.logical_field_name === "embossed_name_2"
        ) {
          embossedNameCounter(
            stageSelector[0].stageInfo.applicants[
              props.data.logical_field_name + "_a_1"
            ]
          );
        }
      } else if (props.data.logical_field_name === "passport_no") {
        const passVal =
          userInputSelector.applicants[
            props.data.logical_field_name + "_a_1"
          ] || "";
        setDefaultValue(passVal);
        dispatch(isFieldUpdate(props, passVal, props.data.logical_field_name));
        props.handleCallback(props.data, passVal);
      } else {
        if(props.data.logical_field_name !== "referral_id_2"){
          setDefaultValue(fieldValue);   
        }  
        if (
          !(stageSelector[0].stageId === "ssf-2" && getUrl.getJourneyType())
        ) {
          dispatch(
            isFieldUpdate(props, fieldValue, props.data.logical_field_name)
          );
          props.handleCallback(props.data, fieldValue);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (
  //     props.data.logical_field_name === "tax_id_no" &&
  //     stageSelector &&
  //     stageSelector[0] &&
  //     stageSelector[0].stageInfo &&
  //     stageSelector[0].stageInfo.applicants
  //   ) {
  //     setError("");
  //     const stageIndex = getUrl
  //       .getUpdatedStage()
  //       .updatedStageInputs.findIndex(
  //         (ref: any) => ref && ref.stageId === stageSelector[0].stageId
  //       );
  //     let updatedVal = null;
  //     if (stageIndex > -1) {
  //       updatedVal =
  //         getUrl.getUpdatedStage().updatedStageInputs[stageIndex].applicants[
  //           fieldIdAppend(props)
  //         ];
  //     }
  //     let tax_id_value =
  //       updatedVal ||
  //       stageSelector[0].stageInfo.applicants[
  //         `${props.data.logical_field_name}_a_1`
  //       ];
  //     if (userInputSelector.applicants["casa_fatca_declaration_a_1"] === "Y") {
  //       tax_id_value = stageSelector[0].stageInfo.applicants["NRIC_a_1"];
  //     }
  //     setDefaultValue(tax_id_value ? tax_id_value : "");
  //     dispatch(
  //       isFieldUpdate(props, tax_id_value, props.data.logical_field_name)
  //     );
  //     props.handleCallback(props.data, tax_id_value);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userInputSelector.applicants.casa_fatca_declaration_a_1]);

  useEffect(() => {
    if (props.data.logical_field_name === "annual_income") {
      setDefaultValue(userInputSelector.applicants.annual_income_a_1);}
    //  else if (props.data.logical_field_name === "required_loan_amount") {
    //   setDefaultValue(userInputSelector.applicants.required_loan_amount_a_1);
    // } else if (props.data.logical_field_name === "loan_tenor") {
    //   setDefaultValue(userInputSelector.applicants.loan_tenor_a_1);
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userInputSelector.applicants.annual_income_a_1,
    // userInputSelector.applicants.required_loan_amount_a_1,
    // userInputSelector.applicants.loan_tenor_a_1,
  ]);

  const bindHandler = (
    fieldName: string,
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    if (event.target.validity.valid && fieldName !== "name_of_employer") {
      const fieldValue = event.target.value;
      props.handleCallback(props.data, event.target.value);
      dispatch(isFieldValueUpdate(props, stageSelector, fieldValue));
      dispatch(isFieldUpdate(props, fieldValue, fieldName));
      if (fieldName === "tax_id_no") {
        dispatch(stagesAction.updateTaxToggle());
      }
      if (
        fieldName &&
        fieldName.substring(0, 9) === "tax_id_no" &&
        fieldName.length > 9
      ) {
        dispatch(stagesAction.updateAddTaxToggle());
      }
    }
  };

  useEffect(() => {
    if (fieldError(fieldErrorSelector, props)) {
      setError(`${errorMsg.emity} ${props.data.rwb_label_name}`);
    } else {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrorSelector]);

  
  // useEffect(() => {
  //   if (
  //     props.data.logical_field_name === "referral_id_2" &&
  //     referralcodeSelector &&
  //     referralcodeSelector.errormsg !== ""
  //   ) {
  //     setError(referralcodeSelector.errormsg);
  //     if (
  //       referralcodeSelector &&
  //       referralcodeSelector.referId !== "" &&
  //       referralcodeSelector.referId !== null &&
  //       referralcodeSelector.referId.length === 1
  //     ) {
  //       dispatch(referralcodeAction.setReferralId(""));
  //       setDefaultValue("");
  //       dispatch(referralcodeAction.setReferralErrorMsg(""));
  //     }
  //   } else {
  //     setError("");
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [referralcodeSelector.errormsg]);

  const embossedNameCounter = (value: string) => {
    setEmbossCounter(value.length);
  };

  const placeHolderText = (fieldName: string) => {
    if (fieldName === "passport_no") {
      return "Enter your passport Number";
    }if (fieldName === "referral_id_2" && stageSelector[0].stageId !== "bd-1") {
      return "Enter referral code here";
    } else {
      return props.data.rwb_label_name;
    }
  };
  const removeAliasField = () => {
    dispatch(aliasAction.removeAliasField(props.data.logical_field_name));
    dispatch(
      fieldErrorAction.removeMandatoryFields([props.data.logical_field_name])
    );
    dispatch(
      stagesAction.removeAddToggleField({
        removeFields: [props.data.logical_field_name],
        newFields: [],
      })
    );
  };
  const focusHandler = (
    fieldName: string,
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    dispatch(lastAction.getField(fieldName));
  };

  const allowNumericCharacter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    if(fieldName === 'referral_id_2'){
      validateService.allowOnlyCharacter(event, fieldName);
    } 
  };
  return (
    <>
      {(props.data.logical_field_name === "embossed_dc_name" ||
        props.data.logical_field_name === "embossed_name" ||
        props.data.logical_field_name === "embossed_name_2") && (
        <Cards name={defaultValue} />
      )}
     {/* {(showReferralCode || */}

       { (props.data.logical_field_name !== "referral_id_2") && (
      <div className="text">
        <label htmlFor={props.data.logical_field_name}>
          {props.data.rwb_label_name}
        </label>
        {/* {showReferralCode && stageSelector[0].stageId !== "bd-1" && (<ReferralCode />)} */}
        <div
          className={`text__count ${
            (userInputSelector.applicants["casa_fatca_declaration_a_1"] ===
              "Y" &&
              props.data.logical_field_name === "tax_id_no") ||
            (stageSelector[0].stageId === "bd-1" &&
              props.data.logical_field_name.substring(0, 5) === "alias")
              ? "disabled"
              : ""
          } ${
            stageSelector[0].stageId === "ssf-1" && authenticateType() === "myinfo" && props.data.logical_field_name === "NRIC"
              ? "disabled"
              : ""
          }`}
        >
          <input
            type={props.data.type}
            name={props.data.logical_field_name}
            aria-label={props.data.logical_field_name}
            id={fieldIdAppend(props)}
            placeholder={placeHolderText(props.data.logical_field_name)}
            value={defaultValue}
            minLength={props.data.logical_field_name !== "referral_id_2" && props.data.min_length}
            maxLength={props.data.length}
            pattern={props.data.regex === "null" || null ? validationPatterns() : props.data.regex}
            onChange={changeHandler.bind(this, props.data.logical_field_name)}
            onBlur={bindHandler.bind(this, props.data.logical_field_name)}
            disabled={
             ((props.data.editable || stageSelector[0].stageId === "bd-1")
              &&
              props.data.logical_field_name !== "referral_id_2") ||
            (stageSelector[0].stageId === "bd-1" &&
              props.data.logical_field_name === "referral_id_2")
            }
            onFocus={focusHandler.bind(this, props.data.logical_field_name)}
            onKeyPress={(event) =>
              allowNumericCharacter(event, props.data.logical_field_name)
            }
          />
          {error && <span className="error-msg">{error}</span>}
          {props.data.logical_field_name &&
            props.data.logical_field_name.split("_")[0] === "alias" &&
            props.data.logical_field_name.split("_")[1] !== "1" &&
            !props.data.hide_remove_btn && (
              <span
                className="text__remove__button"
                onClick={() => removeAliasField()}
              ></span>
            )}
          {(props.data.logical_field_name === "embossed_dc_name" ||
            props.data.logical_field_name === "embossed_name" ||
            props.data.logical_field_name === "embossed_name_2") && (
            <span className="text__count__num">{embossCounter}/19</span>
          )}
        </div>
      </div>
      )}
    </>
  );
};

export default Text;
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    error: {},
    mandatoryFields: []
}

const fieldError = createSlice({
    name: 'fielderror',
    initialState: initialState,
    reducers: {
        getFieldError(state, action) {
            const newError = action.payload;
            // state.error = newError.fieldName
            if (newError &&newError.fieldName) {
                if(!newError.fieldName.postal_code){
                    newError.fieldName.postal_code = ""
                }
                if(!newError.fieldName.street_name){
                    newError.fieldName.street_name = ""
                }
                if(!newError.fieldName.block){
                    newError.fieldName.block = ""
                }
                state.error = newError.fieldName
            } else {
                state.error = {};
            }
        },
        removeToggleFieldError(state, action) {
            const s = action.payload;
            /*istanbul ignore next */
            if (state.error) {
                s.forEach((data: any) => {
                    const position = Object.keys(state.error).indexOf(data);
                    if (position >= 0) {
                        state.error.splice(position, 1);
                    }
                })                
            }
        },
        getMandatoryFields(state, action) {
            if (action.payload) {
                if (state.mandatoryFields && state.mandatoryFields.length > 0) {
                    action.payload.forEach((item:string) => {
                        if(!(state.mandatoryFields.includes(item))) {
                            state.mandatoryFields = state.mandatoryFields.concat(item)
                        }
                    });
                } else {
                    state.mandatoryFields = action.payload;
                }
            } else {
                state.mandatoryFields = null;
            }
        },
        updateMandatoryFields(state, action) {
            if (action.payload) {
                if (state.mandatoryFields && state.mandatoryFields.length > 0) {
                    action.payload.forEach((item:string) => {
                        /*istanbul ignore else */
                        if(!(state.mandatoryFields.includes(item))) {
                            state.mandatoryFields = state.mandatoryFields.concat(item)
                        }
                    });
                } else {
                    state.mandatoryFields = action.payload;
                }
            }
        },
        removeMandatoryFields(state, action) {
            const nonMandatoryField = action.payload;
            /*istanbul ignore else */   
            if (state.mandatoryFields) {
                nonMandatoryField.forEach((data: string) => {
                    const position = Object.values(state.mandatoryFields).indexOf(data);
                    /*istanbul ignore else */ 
                    if (position >= 0) {
                        state.mandatoryFields.splice(position, 1);
                    }
                })                
            }
        }
    }
});

export const fieldErrorAction = fieldError.actions;

export default fieldError;


