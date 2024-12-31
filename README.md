import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validateService from "../../../services/validation-service";
import {
  fieldError,
  isFieldUpdate,
  fieldIdAppend,
} from "../../../utils/common/change.utils";
import { KeyWithAnyModel, StoreModel } from "../../../utils/model/common-model";
import "./dates.scss";
import errorMsg from "../../../assets/_json/error.json";
import { lastAction } from "../../../utils/store/last-accessed-slice";

export const Date = (props: KeyWithAnyModel) => {
  const [date, setDate] = useState({ DD: "", MM: "", YYYY: "" });
  const stageSelector = useSelector((state: StoreModel) => state.stages.stages);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const fieldErrorSelector = useSelector(
    (state: StoreModel) => state.fielderror.error
  );

  const changeHandler = (
    data: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setError("");
    const fieldName = props.data.logical_field_name;
    if (type === "YYYY") {
      date["YYYY"] = data.target.value;
    } else if (type === "MM") {
      date["MM"] = data.target.value;
    } else if (type === "DD") {
      date["DD"] = data.target.value;
    }
    const userValue = date["YYYY"] + "-" + date["MM"] + "-" + date["DD"];
    props.handleCallback(props.data, userValue);
    if (date["DD"] !== "" || date["MM"] !== "" || date["YYYY"] !== "") {
      if (
        date["YYYY"].length > 3 &&
        date["DD"].length > 1 &&
        date["MM"].length > 1
      ) {
        if (validateService.isValidDate(userValue)) {
          const age = validateService.calculateAge(userValue);
          const ageInValid = validateService.validateAge(
            age,
            stageSelector[0].stageInfo.products[0].product_type,
            stageSelector[0].stageInfo.products[0].product_category
          );
          if (ageInValid) {
            let ageInvalidMessage = validateService.getValidationMsg(
              stageSelector[0].stageInfo.products[0].product_type,
              stageSelector[0].stageInfo.products[0].product_category
            );
            setError(`${props.data.rwb_label_name} ${ageInvalidMessage}`);
          } else {
            dispatch(isFieldUpdate(props, userValue, fieldName));
          }
        } else {
          setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`);
        }
      } else {
        setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`);
      }
    } else if (
      props.data.mandatory === "Yes" ||
      props.data.mandatory === "Conditional"
    ) {
      setError(`${errorMsg.emity} ${props.data.rwb_label_name}`);
    }
  };

  const bindHandler = (data: any, type: string) => {
    if (
      (type === "DD" || type === "MM") &&
      data.target.value &&
      parseInt(data.target.value) > 0 &&
      data.target.value.length < 2
    ) {
      date[type] = `0${data.target.value}`;
      data.target.value = date[type];
      changeHandler(data, type);
    }
  };

  useEffect(() => {
    if (
      stageSelector &&
      stageSelector[0] &&
      stageSelector[0].stageInfo &&
      stageSelector[0].stageInfo.applicants
    ) {
      const storeDate =
        stageSelector[0].stageInfo.applicants[
          props.data.logical_field_name + "_a_1"
        ];
      if (storeDate) {
        let splitDate = storeDate.split("-");
        setDate({ DD: splitDate[2], MM: splitDate[1], YYYY: splitDate[0] });
      }
    }
  }, [stageSelector, props.data.logical_field_name]);

  useEffect(() => {
    if (fieldError(fieldErrorSelector, props)) {
      setError(`${errorMsg.patterns} ${props.data.rwb_label_name}`);
    } else {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldErrorSelector]);

  const allowOnlyCharacter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    validateService.allowOnlyCharacter(event, fieldName);
  };
  const focusHandler = (
    fieldName: string,
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    dispatch(lastAction.getField(fieldName));
  };
  return (
    <>
      <div className="date">
        <label htmlFor={props.data.logical_field_name}>
          {props.data.rwb_label_name}
        </label>
        <div className={`date__inputs ${props.data.editable ? 'date__inputs--disabled':''}`} id={fieldIdAppend(props)}>
          <input
            placeholder="DD"
            minLength={2}
            maxLength={2}
            type="tel"
            value={date.DD}
            required={
              props.data.mandatory === "Yes" || "Conditional" ? true : false
            }
            onChange={(event) => changeHandler(event, "DD")}
            onKeyPress={(event) =>
              allowOnlyCharacter(event, props.data.logical_field_name)
            }
            onBlur={(event) => bindHandler(event, "DD")}
            disabled={props.data.editable}
            onFocus={focusHandler.bind(this, props.data.logical_field_name)}
          /><span className="date__seperator"></span>
          <input
            placeholder="MM"
            minLength={2}
            maxLength={2}
            type="tel"
            value={date.MM}
            required={
              props.data.mandatory === "Yes" || "Conditional" ? true : false
            }
            onChange={(event) => changeHandler(event, "MM")}
            onKeyPress={(event) =>
              allowOnlyCharacter(event, props.data.logical_field_name)
            }
            onBlur={(event) => bindHandler(event, "MM")}
            disabled={props.data.editable}
            onFocus={focusHandler.bind(this, props.data.logical_field_name)}
          /><span className="date__seperator"></span>
          <input
            placeholder="YYYY"
            minLength={4}
            maxLength={4}
            type="tel"
            value={date.YYYY}
            required={
              props.data.mandatory === "Yes" || "Conditional" ? true : false
            }
            onChange={(event) => changeHandler(event, "YYYY")}
            onKeyPress={(event) =>
              allowOnlyCharacter(event, props.data.logical_field_name)
            }
            disabled={props.data.editable}
            onFocus={focusHandler.bind(this, props.data.logical_field_name)}
          />
        </div>
      </div>
      {error && <span className="error-msg">{error}</span>}
    </>
  );
};

export default Date;

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Date } from "./Date";
import validateService from "../../../services/validation-service";
import errorMsg from "../../../assets/_json/error.json";

jest.mock("../../../services/validation-service", () => ({
  isValidDate: jest.fn(),
  calculateAge: jest.fn(),
  validateAge: jest.fn(),
  getValidationMsg: jest.fn(),
  allowOnlyCharacter: jest.fn(),
}));

jest.mock("../../../utils/store/last-accessed-slice", () => ({
  lastAction: {
    getField: jest.fn(),
  },
}));

const mockStore = configureStore([]);

describe("Date Component", () => {
  let store: any;
  let mockProps: any;

  beforeEach(() => {
    store = mockStore({
      stages: {
        stages: [
          {
            stageInfo: {
              applicants: {
                sample_field_a_1: "1995-10-15",
              },
              products: [
                {
                  product_type: "type1",
                  product_category: "category1",
                },
              ],
            },
          },
        ],
      },
      fielderror: {
        error: [],
      },
    });

    mockProps = {
      data: {
        logical_field_name: "sample_field",
        rwb_label_name: "Date of Birth",
        mandatory: "Yes",
        editable: false,
      },
      handleCallback: jest.fn(),
    };
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <Date {...mockProps} />
      </Provider>
    );

  it("should render the component with initial values", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("DD")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("YYYY")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("DD")).toHaveValue("15");
    expect(screen.getByPlaceholderText("MM")).toHaveValue("10");
    expect(screen.getByPlaceholderText("YYYY")).toHaveValue("1995");
  });

  it("should call handleCallback when a field changes", () => {
    renderComponent();
    const dayInput = screen.getByPlaceholderText("DD");
    fireEvent.change(dayInput, { target: { value: "16" } });

    expect(mockProps.handleCallback).toHaveBeenCalledWith(
      mockProps.data,
      "1995-10-16"
    );
  });

  it("should validate the date when all fields are filled", () => {
    (validateService.isValidDate as jest.Mock).mockReturnValue(true);
    (validateService.validateAge as jest.Mock).mockReturnValue(false);

    renderComponent();

    const yearInput = screen.getByPlaceholderText("YYYY");
    fireEvent.change(yearInput, { target: { value: "2000" } });

    expect(validateService.isValidDate).toHaveBeenCalledWith("2000-10-15");
    expect(validateService.validateAge).toHaveBeenCalled();
    expect(screen.queryByText(/Date of Birth/)).not.toBeInTheDocument();
  });

  it("should show an error if the date is invalid", () => {
    (validateService.isValidDate as jest.Mock).mockReturnValue(false);

    renderComponent();

    const yearInput = screen.getByPlaceholderText("YYYY");
    fireEvent.change(yearInput, { target: { value: "abcd" } });

    expect(screen.getByText(`${errorMsg.patterns} Date of Birth`)).toBeInTheDocument();
  });

  it("should handle mandatory fields correctly", () => {
    renderComponent();

    const dayInput = screen.getByPlaceholderText("DD");
    fireEvent.change(dayInput, { target: { value: "" } });

    expect(screen.getByText(`${errorMsg.emity} Date of Birth`)).toBeInTheDocument();
  });

  it("should handle focus events", () => {
    renderComponent();

    const dayInput = screen.getByPlaceholderText("DD");
    fireEvent.focus(dayInput);

    expect(validateService.allowOnlyCharacter).toHaveBeenCalled();
  });

  it("should auto-bind a single digit to a two-digit format for DD/MM", () => {
    renderComponent();

    const dayInput = screen.getByPlaceholderText("DD");
    fireEvent.blur(dayInput, { target: { value: "7" } });

    expect(dayInput).toHaveValue("07");
  });

  it("should disable inputs if the field is not editable", () => {
    renderComponent();

    const dayInput = screen.getByPlaceholderText("DD");
    expect(dayInput).toBeDisabled();
  });

  it("should set error based on fieldErrorSelector", () => {
    store = mockStore({
      stages: {
        stages: [
          {
            stageInfo: {
              applicants: {},
              products: [],
            },
          },
        ],
      },
      fielderror: {
        error: [{ fieldName: "sample_field" }],
      },
    });

    renderComponent();
    expect(screen.getByText(`${errorMsg.patterns} Date of Birth`)).toBeInTheDocument();
  });
});

TypeError: props.handleFieldDispatch is not a function

      13 | ): any => {
      14 |   return (_dispatch: AppDispatch) => {
    > 15 |     props.handleFieldDispatch(fieldName, fieldValue);
         |           ^
      16 |   };
      17 | };
      18 |

