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
