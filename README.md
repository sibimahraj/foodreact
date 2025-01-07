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
import ThankYouCASA from "./thankyou-casa";
import ThankYouCC from "./thankyou-cc";
import ThankYouPL from "./thankyou-pl";
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
  /*istanbul ignore next */
  console.log(useSelector((state: StoreModel) => state.stages.stages),"stagesvalue")
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const applicationJourney = useSelector(
    (state: StoreModel) => state.stages.journeyType
  );
  const otpSuccessSelector = useSelector(
    (state: StoreModel) => state.stages.otpSuccess
  );
  const thankyou: KeyWithAnyModel = thankyouData;
  //const [isFunding, setIsFunding] = useState(false);
  const applicationReferenceNo = getUrl.getChannelRefNo().applicationRefNo;
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
  const [enableActivation, setEnableActivation] = useState<boolean>(false);
  const [showPlatinum, setShowPlatinum] = useState<boolean>(false);
  const [isCampaignBenefits, setIsCampaignBenefits] = useState<boolean>(false);
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
        } else if (prevValue.productCategory === "PL") {
          if (stageSelector && stageSelector[0].stageInfo) {
            if (stageSelector[0].stageInfo.products.length >= 1) {
              prevValue.productType =
                stageSelector[0].stageInfo.products[0].product_type;
              if (
                stageSelector[0].stageInfo.products[0].offer_details &&
                stageSelector[0].stageInfo.products[0].offer_details[0].fees
              )
                prevValue.feeAmount =
                  stageSelector[0].stageInfo.products[0].offer_details[0].fees[0].fee_amount;
              setIsCampaignBenefits(
                thankyou.CCPL.FeeFreeCampaignCode.indexOf(
                  stageSelector[0].stageInfo.products[0].campaign
                ) !== -1
              );
              if (stageSelector[0].stageInfo.products[0].acct_details) {
                setShowPlatinum(
                  stageSelector[0].stageInfo.products[0].acct_details.length > 1
                );
              }
            }
            if (stageSelector[0].stageInfo.applicants) {
              if (stageSelector[0].stageInfo.applicants.loan_tenor_a_1)
                prevValue.loanTenureMonths =
                  stageSelector[0].stageInfo.applicants.loan_tenor_a_1;
              if (
                stageSelector[0].stageInfo.applicants.required_loan_amount_a_1
              )
                prevValue.approvedLoan =
                  stageSelector[0].stageInfo.applicants.required_loan_amount_a_1;
              let auth_mode =
                stageSelector[0].stageInfo.applicants["auth_mode_a_1"] || "";
              let activate = !(
                applicationJourney === "NTB" && auth_mode[1] === "N"
              );
              
              setEnableActivation(activate);
            }
          }
        }
      }
      return { ...prevValue };
    });
    /*istanbul ignore next */
    if (stageSelector[0] && stageSelector[0].stageId && getUrl.getParameterByName("auth") !== "upload" && !store.getState().stages.isDocumentUpload) {
      gaTrackEvents.pageView(stageSelector[0].stageId);
    }
    /* istanbul ignore else */
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
    }  else if(getUrl.getUpdatedStage().ccplChannel=== "MBNK" || getUrl.getParameterByName("channel") === "MBNK") {
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
        <form data-testid="form" className="form">
          <div data-testid="app thankyou" className="app thankyou">
            <div  data-testid="app__body" className="app__body">
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
                        {(applicationDetails.productCategory === "CA" ||
                          applicationDetails.productCategory === "SA") && (
                          <ThankYouCASA
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
                        {applicationDetails.productCategory === "PL" && (
                          <ThankYouPL
                            applicationDetails={applicationDetails}
                            thankyou={thankyou}
                            applicationReferenceNo={applicationReferenceNo}
                            submitForm={submitForm}
                            enableActivation={enableActivation}
                            showPlatinum={showPlatinum}
                            isCampaignBenefits={isCampaignBenefits}
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


import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ThankYou from "./ThankYou";
import { MemoryRouter } from "react-router-dom";

// Mock services and utils
jest.mock("../../../services/track-events", () => ({
  triggerAdobeEvent: jest.fn(),
}));
jest.mock("../../../services/common-service", () => ({
  redirectingToIbanking: jest.fn(),
  activateDigitalCard: jest.fn(() =>
    Promise.resolve({ status: "SUCCESS" })
  ),
}));
jest.mock("../../../services/ga-track-events", () => ({
  pageView: jest.fn(),
}));
jest.mock("../../../utils/common/change.utils", () => ({
  getUrl: {
    getChannelRefNo: jest.fn(() => ({ applicationRefNo: "12345" })),
    getParameterByName: jest.fn(() => "authValue"),
    getUpdatedStage: jest.fn(() => ({
      ccplChannel: "MBNK",
    })),
  },
}));

describe("ThankYou Component", () => {
  const mockStore = configureStore([]);
  const initialStore = {
    stages: {
      stages: [
        {
          stageInfo: {
            products: [
              {
                product_category: "CC",
                name: "Credit Card",
                product_sequence_number: "001",
                product_type: "TYPE1",
                acct_details: [
                  {
                    account_number: "ACC123",
                    card_no: "CARD123",
                  },
                ],
                offer_details: [
                  {
                    fees: [{ fee_amount: "100" }],
                  },
                ],
              },
            ],
            applicants: {
              embossed_name_a_1: "USER NAME",
              loan_tenor_a_1: "24",
              required_loan_amount_a_1: 50000,
              auth_mode_a_1: "IX",
            },
          },
        },
      ],
      journeyType: "NTB",
      otpSuccess: false,
      isDocumentUpload: false,
    },
  };

  const renderComponent = (storeData = initialStore) => {
    const store = mockStore(storeData);
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <ThankYou />
        </MemoryRouter>
      </Provider>
    );
  };

  it("should render the ThankYou component without crashing", () => {
    renderComponent();
    expect(screen.getByTestId("form")).toBeInTheDocument();
    expect(screen.getByTestId("app thankyou")).toBeInTheDocument();
  });

  it("should display the ThankYouCC component when productCategory is CC", () => {
    renderComponent();
    expect(screen.getByTestId("app thankyou")).toBeInTheDocument();
    // Assuming ThankYouCC renders a specific element
    expect(screen.getByText("Credit Card")).toBeInTheDocument();
  });

  it("should handle form submission and trigger redirection", () => {
    renderComponent();
    const formElement = screen.getByTestId("form");
    fireEvent.submit(formElement);
    expect(window.location.href).toContain(process.env.REACT_APP_HOME_PAGE_URL);
  });

  it("should trigger Adobe event and GA page view on mount", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("app thankyou")).toBeInTheDocument();
    // Ensure tracking events are triggered
    expect(
      require("../../../services/track-events").triggerAdobeEvent
    ).toHaveBeenCalledWith("formSubmit");
    expect(
      require("../../../services/ga-track-events").pageView
    ).toHaveBeenCalled();
  });

  it("should handle card activation flow and show success UI", async () => {
    const modifiedStore = {
      ...initialStore,
      stages: { ...initialStore.stages, otpSuccess: true },
    };
    renderComponent(modifiedStore);

    // Assuming success UI has specific text
    expect(await screen.findByText("Card Activation Success")).toBeInTheDocument();
  });

  it("should render the ThankYouUpload component for upload flow", () => {
    const modifiedStore = {
      ...initialStore,
      stages: { ...initialStore.stages, isDocumentUpload: true },
    };
    renderComponent(modifiedStore);
    expect(screen.getByText("Upload Documents")).toBeInTheDocument(); // Assuming ThankYouUpload renders specific text
  });

  it("should show error UI on failed card activation", async () => {
    jest.mock("../../../services/common-service", () => ({
      activateDigitalCard: jest.fn(() =>
        Promise.resolve({ status: "FAILURE" })
      ),
    }));
    const modifiedStore = {
      ...initialStore,
      stages: { ...initialStore.stages, otpSuccess: true },
    };
    renderComponent(modifiedStore);
    expect(await screen.findByText("Activation Failed")).toBeInTheDocument(); // Assuming error UI renders specific text
  });
});
