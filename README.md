
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
