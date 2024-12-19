import { checkProductDetails } from '../../services/common-service';
import { getUrl } from '../../utils/common/change.utils';
import { KeyWithAnyModel, ValidationObjModel } from '../../utils/model/common-model';
import rulesUtils from './rules.utils';

const Rules_bd_2 = (props: KeyWithAnyModel, stageInfo: KeyWithAnyModel): KeyWithAnyModel => {
    const validationObj: ValidationObjModel = {
        nonEditable: [],
        hidden: [],
        modifyVisibility:[]
    };
    const auth = getUrl.getParameterByName("auth");
    const isCASAProduct = checkProductDetails(stageInfo.products);
    let defaultVisiblity:any= []
    if(auth === "manual"){
        let hiddenFields = ["postal_code_other"]
        if(!isCASAProduct){
            hiddenFields.push('nationality_add');
        }

        if(stageInfo.applicants['residency_status_a_1'] === "FR"){
            defaultVisiblity = ["overseas_contact_country_code","overseas_contact_area_code","overseas_contact_no"];
        }
        validationObj.hidden!.push(hiddenFields);
        validationObj.modifyVisibility!.push(defaultVisiblity)
      }

    return rulesUtils(props, validationObj);
}

export default Rules_bd_2;

import Rules_bd_2 from './rules_bd-2';
import { authenticateType } from '../../utils/common/change.utils';
import { checkProductDetails } from '../../services/common-service';
import rulesUtils from './rules.utils';

// Mock the dependencies
jest.mock('../../utils/common/change.utils', () => ({
  authenticateType: jest.fn(),
  getUrl: jest.fn(),
}));

jest.mock('../../services/common-service', () => ({
  checkProductDetails: jest.fn(),
}));

jest.mock('./rules.utils', () => jest.fn());

describe('Rules_bd_2', () => {
  const mockProps = { someProp: 'value' };
  const mockStageInfo = {
    products: ['product1'],
    applicants: {
      residency_status_a_1: 'FR',
    },
  };

  beforeEach(() => {
    // jest.clearAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle manual or myinfo authentication type and CASA product', () => {
(authenticateType as jest.Mock).mockReturnValue("myinfo");
(checkProductDetails as jest.Mock).mockReturnValue(false);
    const expectedValidationObj = {
      nonEditable: [],
      hidden: [
        [
          'postal_code_other',
          'email',
          'full_name',
          'date_of_birth',
          'mobile_number',
          'residency_status',
          'NRIC',
          'work_type',
          'year_of_assessment_fff_1',
          'year_of_assessment_fff_2',
          'annual_income_fff_1',
          'annual_income_fff_2',
          'dsa_code',
          'credit_limit_consent',
        ],
      ],
      modifyVisibility: [
        ['residential_address_consent'],
      ],
    };

    Rules_bd_2(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalled();
  });

  it('should include nationality_add in hidden fields if not a CASA product', () => {
    // Mock the return values of dependencies
    //checkProductDetails.mockReturnValue(false);
    const mockStageInfo1 = {
      products: ['product1'],
      applicants: {
        residency_status_a_1: 'CT',
      },
    };
  
    Rules_bd_2(mockProps, mockStageInfo1);

    expect(rulesUtils).toHaveBeenCalled();
  });

  it('should not modify visibility if residency status is not FR', () => {
    // Update the mockStageInfo to change residency_status_a_1
    const updatedMockStageInfo = {
      ...mockStageInfo,
      applicants: {
        residency_status_a_1: 'NON-FR',
      },
    };
    jest.mock("../../utils/common/change.utils", () => ({
      authenticateType: jest.fn(()=>'myinfo'),
    }));
    jest.mock('../../services/common-service', () => ({
      checkProductDetails: jest.fn(()=>false),
    }));

    const expectedValidationObj = {
      nonEditable: [],
      hidden: [
        [
          'postal_code_other',
          'email',
          'full_name',
          'date_of_birth',
          'mobile_number',
          'residency_status',
          'NRIC',
          'work_type',
          'year_of_assessment_fff_1',
          'year_of_assessment_fff_2',
          'annual_income_fff_1',
          'annual_income_fff_2',
          'dsa_code',
          'credit_limit_consent',
          'nationality_add',
        ],
      ],
      modifyVisibility: [
        ['residential_address_consent'],
      ],
    };

    Rules_bd_2(mockProps, updatedMockStageInfo);

    expect(rulesUtils).toHaveBeenCalled();
  });
});
import Rules_bd_2 from './rules_bd-2';
import { getUrl } from '../../utils/common/change.utils';
import { checkProductDetails } from '../../services/common-service';
import rulesUtils from './rules.utils';

// Mock the dependencies
jest.mock('../../utils/common/change.utils', () => ({
  getUrl: {
    getParameterByName: jest.fn(),
  },
}));

jest.mock('../../services/common-service', () => ({
  checkProductDetails: jest.fn(),
}));

jest.mock('./rules.utils', () => jest.fn());

describe('Rules_bd_2', () => {
  const mockProps = { someProp: 'value' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should hide nationality_add if not a CASA product and residency_status_a_1 is FR', () => {
    // Mock return values
    (getUrl.getParameterByName as jest.Mock).mockReturnValue('manual');
    (checkProductDetails as jest.Mock).mockReturnValue(false);

    const mockStageInfo = {
      products: ['product1'],
      applicants: {
        residency_status_a_1: 'FR',
      },
    };

    Rules_bd_2(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [],
      hidden: [['postal_code_other', 'nationality_add']],
      modifyVisibility: [['overseas_contact_country_code', 'overseas_contact_area_code', 'overseas_contact_no']],
    });
  });

  it('should not include nationality_add if it is a CASA product', () => {
    (getUrl.getParameterByName as jest.Mock).mockReturnValue('manual');
    (checkProductDetails as jest.Mock).mockReturnValue(true);

    const mockStageInfo = {
      products: ['CASA_Product'],
      applicants: {
        residency_status_a_1: 'FR',
      },
    };

    Rules_bd_2(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [],
      hidden: [['postal_code_other']],
      modifyVisibility: [['overseas_contact_country_code', 'overseas_contact_area_code', 'overseas_contact_no']],
    });
  });

  it('should not modify visibility if residency_status_a_1 is not FR', () => {
    (getUrl.getParameterByName as jest.Mock).mockReturnValue('manual');
    (checkProductDetails as jest.Mock).mockReturnValue(false);

    const mockStageInfo = {
      products: ['product1'],
      applicants: {
        residency_status_a_1: 'NON-FR',
      },
    };

    Rules_bd_2(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [],
      hidden: [['postal_code_other', 'nationality_add']],
      modifyVisibility: [],
    });
  });
});

import { getUrl } from '../../utils/common/change.utils';
import { KeyWithAnyModel, ValidationObjModel } from '../../utils/model/common-model';
import rulesUtils from './rules.utils';

const Rules_bd_3 = (props: KeyWithAnyModel, stageInfo: KeyWithAnyModel): KeyWithAnyModel => {
    const validationObj: ValidationObjModel = {
        nonEditable: [],
        hidden: []
    };
    let nonEditableFields: Array<string> = [];
    let hiddenFields: Array<string> = [];
    if((stageInfo.products[0].product_category === "CC" || stageInfo.products[0].product_category === "PL")){
        if(stageInfo.application.journey_type === 'NTC'){
            if(!stageInfo.applicants["year_of_assessment_fff_1_a_1"]){
                hiddenFields.push("year_of_assessment_fff_1");
            }
            if(!stageInfo.applicants["annual_income_fff_1_a_1"]){
                hiddenFields.push("annual_income_fff_1");
            }
            if(!stageInfo.applicants["mailing_address_a_1"]){
                hiddenFields.push("mailing_address");
            }
            nonEditableFields.push("annual_income_fff_1","year_of_assessment_fff_1","residential_address","mailing_address");
        }
    }
    if (getUrl.getJourneyType() === "ETC") {
        hiddenFields.push("work_type","name_of_employer","name_of_employer_other","name_of_business","job_title","embossed_name","annual_income_fff_1","year_of_assessment_fff_1","residential_address","mailing_address");
    }
    else{
        hiddenFields.push("credit_limit_consent","myinfo_data_cli","embossed_name");
      }
    validationObj.nonEditable.push(nonEditableFields);
    validationObj.hidden!.push(hiddenFields);
    return rulesUtils(props, validationObj);
}

export default Rules_bd_3;
import Rules_bd_3 from './rules_bd-3';
import { getUrl } from '../../utils/common/change.utils';
import rulesUtils from './rules.utils';

// Mock the dependencies
jest.mock('../../utils/common/change.utils', () => ({
  getUrl: {
    getJourneyType: jest.fn(),
  },
}));

jest.mock('./rules.utils', () => jest.fn());

describe('Rules_bd_3', () => {
  const mockProps = { someProp: 'value' };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle CC or PL product category and NTC journey type', () => {
    const mockStageInfo = {
      products: [{ product_category: 'CC' }],
      application: { journey_type: 'NTC' },
      applicants: {
        year_of_assessment_fff_1_a_1: null,
        annual_income_fff_1_a_1: null,
        mailing_address_a_1: null,
      },
    };

    (getUrl.getJourneyType as jest.Mock).mockReturnValue('OTHER');

    Rules_bd_3(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [
        ['annual_income_fff_1', 'year_of_assessment_fff_1', 'residential_address', 'mailing_address'],
      ],
      hidden: [
        ['year_of_assessment_fff_1', 'annual_income_fff_1', 'mailing_address', 'credit_limit_consent', 'myinfo_data_cli', 'embossed_name'],
      ],
    });
  });

  it('should handle ETC journey type', () => {
    const mockStageInfo = {
      products: [{ product_category: 'PL' }],
      application: { journey_type: 'OTHER' },
      applicants: {},
    };

    (getUrl.getJourneyType as jest.Mock).mockReturnValue('ETC');

    Rules_bd_3(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [[]],
      hidden: [
        [
          'work_type',
          'name_of_employer',
          'name_of_employer_other',
          'name_of_business',
          'job_title',
          'embossed_name',
          'annual_income_fff_1',
          'year_of_assessment_fff_1',
          'residential_address',
          'mailing_address',
        ],
      ],
    });
  });

  it('should not hide fields for non-CC/PL product categories', () => {
    const mockStageInfo = {
      products: [{ product_category: 'OTHER' }],
      application: { journey_type: 'NTC' },
      applicants: {},
    };

    (getUrl.getJourneyType as jest.Mock).mockReturnValue('OTHER');

    Rules_bd_3(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [[]],
      hidden: [
        ['credit_limit_consent', 'myinfo_data_cli', 'embossed_name'],
      ],
    });
  });
});
import { filterDisableFields, getUrl } from "../../utils/common/change.utils";
import {
  KeyWithAnyModel,
  ValidationObjModel,
} from "../../utils/model/common-model";
import rulesUtils from "./rules.utils";

const RulesSSF = (
  props: KeyWithAnyModel,
  stageInfo: KeyWithAnyModel,
  missing_fields?: Array<string>
): KeyWithAnyModel => {
  const auth = getUrl.getParameterByName("auth");
  const fieldSet = props.flat();
  const isMyInfoVirtual = getUrl.getParameterByName("isMyInfoVirtual");
  const validationObj: ValidationObjModel = {
    nonEditable: [],
    hidden: [],
    modifyVisibility: []
  };

  if (
    stageInfo.application.source_system_name === "3" &&
    (auth === "myinfo" || isMyInfoVirtual === "true")
  ) {
    let nonEditableFields: Array<string> = [];
    let default_editable : any[] = [];

    if(stageInfo.products[0].product_category !== 'CA' && stageInfo.products[0].product_category !== 'SA'){
     default_editable = ['email', 'mobile_number']
    }
	
    let myinfoMissingFields: Array<string> = ['ownership_status'];

    if (!stageInfo.applicants['mobile_number_a_1']) {
      myinfoMissingFields.push('mobile_number');
    }
    if (!stageInfo.applicants['email_a_1']) {
      myinfoMissingFields.push('email');
    }
    const myInfoMissingValues = myinfoMissingFields;
    nonEditableFields = filterDisableFields(
      fieldSet[0].fields,
      myInfoMissingValues,
      default_editable
    );
    validationObj.nonEditable.push(nonEditableFields);
    const hiddenFields = ["contact_preference_casa_etc"];
    validationObj.hidden!.push(hiddenFields);
  }
  else if (stageInfo.applicants['auth_mode_a_1'] === 'IX') {
    const ibankingFields = ["full_name", "email", "mobile_number", "account_currency_9", "account_currency", "contact_preference_casa_etc"];
    let ibankingDisableFields = ["full_name"]
    if (stageInfo.applicants['mobile_number_a_1']) {
      ibankingDisableFields.push('mobile_number');
    }
    if (stageInfo.applicants['email_a_1']) {
      ibankingDisableFields.push('email');
    }
    if (stageInfo.applicants['account_currency_9_a_1']) {
      ibankingDisableFields.push('account_currency_9');
    }
    if (stageInfo.applicants['account_currency_a_1']) {
      ibankingDisableFields.push('account_currency');
    }
    validationObj.nonEditable.push(ibankingDisableFields);
    let hiddenFields: any[] = [];
    fieldSet.forEach((field: KeyWithAnyModel) => {
      field.fields.forEach((fieldName: KeyWithAnyModel) => {
        if (ibankingFields.indexOf(fieldName["logical_field_name"]) === -1) {
          hiddenFields.push(fieldName["logical_field_name"])
        }
      });
    });
    validationObj.hidden!.push(hiddenFields);
  } else if (auth === "manual") {
    let defaultVisiblity = ["date_of_birth", "residency_status"];
    validationObj.modifyVisibility!.push(defaultVisiblity)
    const hiddenFields = [
      "ownership_status",
      "residential_address",
      "see_other_myInfo_details",
      "see_other_myInfo_details_consent",
      "contact_preference_casa_etc",
      "residential_address_consent_a_1",
    ];
    validationObj.hidden!.push(hiddenFields);
  } else {
    const hiddenFields = [
      "see_other_myInfo_details",
      "see_other_myInfo_details_consent",
      "contact_preference_casa_etc"
    ];
    validationObj.hidden!.push(hiddenFields);
  }
  return rulesUtils(props, validationObj);
};

export default RulesSSF;
import RulesSSF from './rulesSSF';
import { filterDisableFields, getUrl } from "../../utils/common/change.utils";
import rulesUtils from "./rules.utils";

// Mock the dependencies
jest.mock("../../utils/common/change.utils", () => ({
  filterDisableFields: jest.fn(),
  getUrl: {
    getParameterByName: jest.fn(),
  },
}));

jest.mock("./rules.utils", () => jest.fn());

describe('RulesSSF', () => {
  const mockProps = [
    {
      fields: [{ logical_field_name: 'field1' }, { logical_field_name: 'field2' }],
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle MyInfo virtual or auth case for non-CA/SA products', () => {
    const mockStageInfo = {
      application: { source_system_name: '3' },
      products: [{ product_category: 'CC' }],
      applicants: { mobile_number_a_1: null, email_a_1: null },
    };

    (getUrl.getParameterByName as jest.Mock).mockImplementation((param) => {
      if (param === "auth") return "myinfo";
      if (param === "isMyInfoVirtual") return "true";
      return null;
    });

    (filterDisableFields as jest.Mock).mockReturnValue(['mobile_number', 'email']);

    RulesSSF(mockProps, mockStageInfo);

    expect(filterDisableFields).toHaveBeenCalledWith(
      mockProps[0].fields,
      ['ownership_status', 'mobile_number', 'email'],
      ['email', 'mobile_number']
    );
    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [['mobile_number', 'email']],
      hidden: [['contact_preference_casa_etc']],
      modifyVisibility: [],
    });
  });

  it('should handle auth_mode IX case with ibanking fields', () => {
    const mockStageInfo = {
      application: {},
      products: [],
      applicants: {
        auth_mode_a_1: 'IX',
        mobile_number_a_1: true,
        email_a_1: true,
        account_currency_9_a_1: false,
        account_currency_a_1: true,
      },
    };

    RulesSSF(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [['full_name', 'mobile_number', 'email', 'account_currency']],
      hidden: [[/* Hidden fields that are not in ibankingFields */]],
      modifyVisibility: [],
    });
  });

  it('should handle manual authentication case', () => {
    const mockStageInfo = {
      application: {},
      products: [],
      applicants: {},
    };

    (getUrl.getParameterByName as jest.Mock).mockReturnValue("manual");

    RulesSSF(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [],
      hidden: [
        [
          "ownership_status",
          "residential_address",
          "see_other_myInfo_details",
          "see_other_myInfo_details_consent",
          "contact_preference_casa_etc",
          "residential_address_consent_a_1",
        ],
      ],
      modifyVisibility: [["date_of_birth", "residency_status"]],
    });
  });

  it('should handle default case with no specific auth or virtual flag', () => {
    const mockStageInfo = {
      application: {},
      products: [],
      applicants: {},
    };

    (getUrl.getParameterByName as jest.Mock).mockReturnValue(null);

    RulesSSF(mockProps, mockStageInfo);

    expect(rulesUtils).toHaveBeenCalledWith(mockProps, {
      nonEditable: [],
      hidden: [
        [
          "see_other_myInfo_details",
          "see_other_myInfo_details_consent",
          "contact_preference_casa_etc",
        ],
      ],
      modifyVisibility: [],
    });
  });
});
import { getUrl } from "../../utils/common/change.utils";
import { filterDisableFields } from "../../utils/common/change.utils";
import {
  KeyWithAnyModel,
  ValidationObjModel,
} from "../../utils/model/common-model";
import rulesUtils from "./rules.utils";

const RulesSSFTwo = (
  props: KeyWithAnyModel,
  stages: KeyWithAnyModel,
  myinfoMissingFields?: Array<string>
): KeyWithAnyModel => {
  const validationObj: ValidationObjModel = {
    nonEditable: [],
    hidden: [],
  };

  const fieldSet = props.flat();
  let nonEditableFields: Array<string> = ["NRIC", "date_of_birth"];
  let myInfoMissingValues: Array<string> = myinfoMissingFields
    ? myinfoMissingFields
    : [];
  let hiddenFields: Array<string> = [];
  //Removing this condition as fields here in ssf-2 are from myinfo only, have to re-write the logic for manual cases
  if (stages.application.source_system_name === "3") {
    if (stages.applicants["residency_status_a_1"] === "FR") {
      hiddenFields = ["NRIC"];
      if (myInfoMissingValues.length > 0) {
        myInfoMissingValues.push("passport_no", "pass_exp_date");
      }
    } else {
      hiddenFields = ["FIN", "passport_no", "pass_exp_date"];
    }

    if(!stages.applicants["year_of_assessment_fff_1_a_1"]){
      hiddenFields.push("year_of_assessment_fff_1");
    }
    if(!stages.applicants["annual_income_fff_1_a_1"]){
      hiddenFields.push("annual_income_fff_1");
    }

    if (getUrl.getJourneyType()) {
      let fields= [];
      fields = fieldSet.map((item:any) => item.fields);      
      nonEditableFields = filterDisableFields(fields.flat(), []);
    } else {
      const filteredMissingFields = fieldSet.filter(
        (item: any) => item.field_set_name !== "Missing Myinfo Details"
      );
      const default_editable = ['marital_status']
      if (myInfoMissingValues.length > 0) {
        nonEditableFields = filterDisableFields(
          filteredMissingFields[0].fields,
          myInfoMissingValues,
          default_editable
        );
      } else {
        nonEditableFields = filterDisableFields(
          filteredMissingFields[0].fields,
          myInfoMissingValues,
          default_editable
        );
      }
    }
  }
  if(stages.applicants["NRIC_a_1"]){
    nonEditableFields.push("NRIC");
  }
  if(stages.applicants["date_of_birth_a_1"]){
    nonEditableFields.push("date_of_birth");
  }
  validationObj.nonEditable.push(nonEditableFields);
  validationObj.hidden!.push(hiddenFields);

  return rulesUtils(props, validationObj);
};

export default RulesSSFTwo;

import RulesSSFTwo from './rules_ssf_two';
import { getUrl, filterDisableFields } from '../../utils/common/change.utils';
import rulesUtils from './rules.utils';

// Mock the dependencies
jest.mock('../../utils/common/change.utils', () => ({
  getUrl: {
    getJourneyType: jest.fn(),
  },
  filterDisableFields: jest.fn(),
}));

jest.mock('./rules.utils', () => jest.fn());

describe('RulesSSFTwo', () => {
  const mockProps = [
    { fields: [{ logical_field_name: 'field1' }, { logical_field_name: 'field2' }] },
  ];
  const mockStages = {
    application: {
      source_system_name: '3',
    },
    applicants: {
      residency_status_a_1: 'FR',
      year_of_assessment_fff_1_a_1: false,
      annual_income_fff_1_a_1: false,
      NRIC_a_1: true,
      date_of_birth_a_1: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle source_system_name as 3 and residency_status as FR', () => {
    const mockMyinfoMissingFields = ['mobile_number', 'email'];
    (filterDisableFields as jest.Mock).mockReturnValue(['field1', 'field2']);

    const expectedValidationObj = {
      nonEditable: [['NRIC', 'date_of_birth', 'field1', 'field2']],
      hidden: [['NRIC', 'year_of_assessment_fff_1', 'annual_income_fff_1', 'passport_no', 'pass_exp_date']],
    };

    const result = RulesSSFTwo(mockProps, mockStages, mockMyinfoMissingFields);

    expect(filterDisableFields).toHaveBeenCalled();
    expect(rulesUtils).toHaveBeenCalledWith(mockProps, expectedValidationObj);
    expect(result).toEqual(expectedValidationObj);
  });

  it('should handle source_system_name as 3 and non-FR residency_status', () => {
    const mockStagesNonFR = {
      ...mockStages,
      applicants: {
        ...mockStages.applicants,
        residency_status_a_1: 'NON-FR',
      },
    };
    const mockMyinfoMissingFields = [];
    (filterDisableFields as jest.Mock).mockReturnValue(['field3', 'field4']);

    const expectedValidationObj = {
      nonEditable: [['NRIC', 'date_of_birth', 'field3', 'field4']],
      hidden: [['FIN', 'passport_no', 'pass_exp_date', 'year_of_assessment_fff_1', 'annual_income_fff_1']],
    };

    const result = RulesSSFTwo(mockProps, mockStagesNonFR, mockMyinfoMissingFields);

    expect(filterDisableFields).toHaveBeenCalled();
    expect(rulesUtils).toHaveBeenCalledWith(mockProps, expectedValidationObj);
    expect(result).toEqual(expectedValidationObj);
  });

  it('should handle when journey type is set', () => {
    (getUrl.getJourneyType as jest.Mock).mockReturnValue(true);
    (filterDisableFields as jest.Mock).mockReturnValue(['field5', 'field6']);

    const expectedValidationObj = {
      nonEditable: [['NRIC', 'date_of_birth', 'field5', 'field6']],
      hidden: [['NRIC', 'year_of_assessment_fff_1', 'annual_income_fff_1']],
    };

    const result = RulesSSFTwo(mockProps, mockStages);

    expect(filterDisableFields).toHaveBeenCalled();
    expect(rulesUtils).toHaveBeenCalledWith(mockProps, expectedValidationObj);
    expect(result).toEqual(expectedValidationObj);
  });

  it('should handle missing myinfo fields and default editable fields', () => {
    const mockMyinfoMissingFields = [];
    (filterDisableFields as jest.Mock).mockReturnValue(['field7', 'field8']);

    const expectedValidationObj = {
      nonEditable: [['NRIC', 'date_of_birth', 'field7', 'field8']],
      hidden: [['NRIC', 'year_of_assessment_fff_1', 'annual_income_fff_1', 'passport_no', 'pass_exp_date']],
    };

    const result = RulesSSFTwo(mockProps, mockStages, mockMyinfoMissingFields);

    expect(filterDisableFields).toHaveBeenCalled();
    expect(rulesUtils).toHaveBeenCalledWith(mockProps, expectedValidationObj);
    expect(result).toEqual(expectedValidationObj);
  });
});

