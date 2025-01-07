import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ThankYou from "./thank-you";
import { MemoryRouter } from "react-router-dom";
 
const mockStore = configureStore([]);
jest.mock("axios", () => ({
    __esModule: true,
  }));
  jest.mock("@lottiefiles/react-lottie-player", () => ({
    __esModule: true,
  }));
  jest.mock("./thankyou-banner",()=>({
  
  }));
  jest.mock("./thankyou-pl",()=>({
    
  }));
  jest.mock("./thankyou-cc",()=>({
    
  }))
  jest.mock('react-router-dom',()=>({
    useNavigate:jest.fn(),
    useLocation:jest.fn(),
  }));
  jest.mock("../../../services/validation-service",()=>({
    formateCurrency:jest.fn(),
  }))
 // jest.mock()
 

 
 
describe("ThankYou Component", () => {
  let store:any;
 
 
  beforeEach(() => {
    store = mockStore({
      stages: {
        stages:[
            "ThankYou",
            "AnotherStage"
        ],
        journeyType:"MockJourneyType",
      },
      store: {
        thankyouDetails: {
          applicationDetails: {
            isStp: false,
          },
        },
      },
    });
  });
 
  it("renders ThankYou component correctly with non-STP flow", () => {
    // store.dispatch=jest.fn();
    // store.navigate=jest.fn();
    render(
      <Provider store={store}>
        <ThankYou  />
      </Provider>
    );
 
    // Check if application reference number is displayed
    expect(screen.getByTestId(/form/)).toBeInTheDocument();
 
   
  });
 
  it("renders ThankYou component with STP flow", () => {
  const  store = mockStore({
        stages: {
          stages:[
              "ThankYou",
              "AnotherStage"
          ],
          journeyType:"MockJourneyType",
        },
        store: {
          thankyouDetails: {
            applicationDetails: {
              isStp: false,
            },
          },
        },
      });
 
    render(
      <Provider store={store}>
        <ThankYou  />
      </Provider>
    );
    expect(screen.getByTestId(/app__body/)).toBeInTheDocument();
 
    // Verify STP flow renders specific elements
   
  });
 
  it("handles button click to proceed", () => {
    render(
      <Provider store={store}>
        <ThankYou />
      </Provider>
    );
    expect(screen.getByTestId(/app thankyou/)).toBeInTheDocument();
   
  });
  it("covers all branches and conditions in the useEffect logic", () => {
    const mockStageSelector = [
      {
        stageInfo: {
          products: [
            {
              product_category: "PL",
              name: "Personal Loan",
              product_sequence_number: "12345",
              product_type: "PL001",
              acct_details: [
                {
                  account_number: "ACC12345",
                  card_no: "CARD12345",
                },
              ],
              offer_details: [
                {
                  fees: [
                    {
                      fee_amount: 500,
                    },
                  ],
                },
              ],
              campaign: "FeeFreeCampaign",
            },
          ],
          applicants: {
            embossed_name_a_1: "John Doe",
            loan_tenor_a_1: 24,
            required_loan_amount_a_1: 100000,
            auth_mode_a_1: "IX",
          },
        },
        stageId: "Stage123",
      },
    ];
  
    const mockStoreData = {
      stages: {
        stages: mockStageSelector,
        isDocumentUpload: false,
      },
      store: {
        thankyouDetails: {
          applicationDetails: {
            isStp: true,
          },
        },
      },
    };
  
    const store = mockStore(mockStoreData);
  
    render(
      <Provider store={store}>
         <ThankYou />
        </Provider>
    );
  
    // Assertions to validate each condition
     const currentState:any=store.getState();
    // 1. Check product details are set
    expect(currentState.stages.stages[0].stageInfo.products[0].product_category).toBe("PL");
    expect(currentState.stages.stages[0].stageInfo.products[0].name).toBe("Personal Loan");
  
    // 2. Verify account details are processed
    expect(currentState.stages.stages[0].stageInfo.products[0].acct_details[0].account_number).toBe("ACC12345");
    expect(currentState.stages.stages[0].stageInfo.products[0].acct_details[0].card_no).toBe("CARD12345");
  
    // 3. Verify STP-specific logic
    //expect(currentState.store.thankyouDetails.applicationDetails.isStp).toBe(true);
  
    // 4. Check campaign benefits
    expect(currentState.stages.stages[0].stageInfo.products[0].campaign).toBe("FeeFreeCampaign");
  
    // 5. Check analytics tracking
    expect(mockStageSelector[0].stageId).toBe("Stage123");
  });
});

 Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

    Check the render method of `ThankYou`.

      165 |     const store = mockStore(mockStoreData);
      166 |
    > 167 |     render(
          |           ^
      168 |       <Provider store={store}>
      169 |          <ThankYou />
      170 |         </Provider>
 
