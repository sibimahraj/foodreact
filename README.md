import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Amount from "./amount";
import validateService from "../../../services/validation-service";
import loanDetailsConst from "../../../assets/_json/loan-details.json";
import { getUrl } from "../../../utils/common/change.utils";

jest.mock("../../../services/validation-service", () => ({
  allowOnlyCharacter: jest.fn(),
}));

jest.mock("../../../utils/common/change.utils", () => ({
  fieldIdAppend: jest.fn((props) => props.data.logical_field_name),
  isFieldUpdate: jest.fn(),
  isFieldValueUpdate: jest.fn(),
  getUrl: {
    getUpdatedStage: jest.fn(() => ({
      updatedStageInputs: [],
    })),
  },
  fieldError: jest.fn(),
}));

const mockStore = configureStore([]);

describe("Amount Component", () => {
  let store: any;
  let mockProps: any;

  beforeEach(() => {
    store = mockStore({
      stages: {
        stages: [
          {
            stageInfo: {
              applicants: {
                required_annual_income_a_1: "50000",
              },
            },
          },
        ],
        userInput: {
          applicants: {
            required_annual_income_a_1: "60000",
          },
        },
      },
      fielderror: {
        error: [],
      },
    });

    mockProps = {
      data: {
        logical_field_name: "required_annual_income",
        rwb_label_name: "Annual Income",
        mandatory: "Yes",
        editable: false,
        type: "text",
        min_length: 1,
        length: 10,
      },
      handleCallback: jest.fn(),
    };
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Amount {...mockProps} />
      </Provider>
    );

  it("should render the component with default value", () => {
    renderComponent();
    expect(screen.getByLabelText("required_annual_income")).toBeInTheDocument();
    expect(screen.getByLabelText("required_annual_income")).toHaveValue("50,000");
  });

  it("should handle input change and dispatch updates", () => {
    renderComponent();

    const input = screen.getByLabelText("required_annual_income");
    fireEvent.change(input, { target: { value: "70000" } });

    expect(mockProps.handleCallback).toHaveBeenCalledWith(
      mockProps.data,
      "70000"
    );
  });

  it("should validate input and display error for values below minimum", () => {
    renderComponent();

    const input = screen.getByLabelText("required_annual_income");
    fireEvent.change(input, { target: { value: "20000" } });

    expect(screen.getByText("Please enter Annual Income")).toBeInTheDocument();
    expect(mockProps.handleCallback).toHaveBeenCalledWith(
      mockProps.data,
      ""
    );
  });

  it("should format the currency value correctly", () => {
    renderComponent();

    const input = screen.getByLabelText("required_annual_income");
    fireEvent.blur(input, { target: { value: "70000" } });

    expect(input).toHaveValue("70,000");
  });

  it("should handle focus and remove formatting", () => {
    renderComponent();

    const input = screen.getByLabelText("required_annual_income");
    fireEvent.focus(input);

    expect(input).toHaveValue("50000"); // Removes commas on focus
  });

  it("should restrict input to numbers only", () => {
    renderComponent();

    const input = screen.getByLabelText("required_annual_income");
    fireEvent.keyPress(input, { key: "a", code: "KeyA", charCode: 65 });

    expect(validateService.allowOnlyCharacter).toHaveBeenCalled();
  });

  it("should update value from store on changes in user input selector", () => {
    renderComponent();

    const input = screen.getByLabelText("required_annual_income");
    expect(input).toHaveValue("60,000"); // Updates value from `userInputSelector`
  });

  it("should display an error if fieldErrorSelector matches the field", () => {
    store = mockStore({
      stages: {
        stages: [],
        userInput: {
          applicants: {},
        },
      },
      fielderror: {
        error: [{ fieldName: "required_annual_income" }],
      },
    });

    renderComponent();
    expect(screen.getByText("Annual Income")).toBeInTheDocument();
  });
});

TypeError: Cannot read properties of undefined (reading 'updatedStageInputs')

      133 |
      134 |       const stageIndex = getUrl
    > 135 |         .getUpdatedStage()
          |                           ^
      136 |         .updatedStageInputs.findIndex(
      137 |           (ref: any) => ref && ref.stageId === stageSelector[0].stageId
      138 |         );

      jest.mock("../../../utils/common/change.utils", () => ({
  getUrl: jest.fn(() => ({
    getUpdatedStage: jest.fn(() => ({
      updatedStageInputs: [],
    })),
  })),
}));
