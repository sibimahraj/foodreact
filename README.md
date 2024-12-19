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

