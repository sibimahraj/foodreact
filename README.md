useEffect(() => {
    taxSelector.fields.forEach(field => {
        const fieldIndex = field.split("_").pop(); 
        const fieldValue = userInputSelector.applicants[`${field}_a_1`];
        if (fieldValue && fieldValue.length >= 9) {
          debugger
          const reasonField = `crs_reason_code_${fieldIndex}`;
          if (taxSelector.fields.includes(reasonField)) {
            dispatch(taxAction.removeTaxField(reasonField));
            dispatch(
              stagesAction.removeAddToggleField({
                removeFields: [reasonField],
                newFields: [],
              })
            );
          }
        }else if(fieldValue && fieldValue.length === 3){
          const reasonField = `crs_reason_code_${fieldIndex}_a_1`;
          if (userInputSelector.applicants[reasonField]==="B00") {
            const reasonFields = [
              "crs_reason_code_1_a_1",
              "crs_reason_code_2_a_1",
              "crs_reason_code_3_a_1",
              "crs_reason_code_4_a_1",
            ];
            reasonFields.forEach((field) => {
              const reasonValue = userInputSelector.applicants[field];
             if (reasonValue) {
                dispatch(taxAction.updateCrsComments({ [field]: reasonValue }));
              }
            });
            }
           else if(userInputSelector.applicants[reasonField]==="A00"||
           userInputSelector.applicants[reasonField]==="C00"){
            const cmntsFields = `crs_comments_${fieldIndex}_a_1`
            dispatch(taxAction.removeReasonField(cmntsFields));

           }
         else{
             const taxValue= `tax_id_no_${fieldIndex}_a_1`
            if(userInputSelector.applicants[taxValue]){
            dispatch(
              stagesAction.removeAddToggleField({
                removeFields: [`crs_reason_code_${fieldIndex}`],
                newFields: [],
              })
            );
            }else{
              dispatch(
                stagesAction.removeAddToggleField({
                  removeFields: [`tax_id_no_${fieldIndex}`],
                  newFields: [],
                })
              );
            }
          }
        }
    });
  }, [JSON.stringify(taxSelector.fields), JSON.stringify(userInputSelector.applicants)]);
import { createSlice } from "@reduxjs/toolkit";
import {taxStoreModel} from '../model/common-model'
const initialState: taxStoreModel = {
        maxCount: 5,
        count: 0,
        fields: []
};

const tax = createSlice({
        name: "tax",
        initialState,
        reducers: {
                addTaxFiled(state, action) {

                        state.fields.push(action.payload);
                },
                updateCount(state, action) {
                        state.count = action.payload;
                },
                removeTaxField(state, action) {
                       // if (state.count >= 0) {
                           if(action.payload!=="no_of_tax_residency_country"){
                                state.count = --state.count;
                                let findIndex = state.fields.findIndex(
                                        (field: string) => field === action.payload
                                );
                                state.fields.splice(findIndex,1);
                           }
                       // }
                        
                },
                updateTax(state, action) {
                        const updatedFields = [...state.fields]; 
                        const [field, value] = Object.entries(action.payload)[0];
                      
                        const normalizedField = field.replace(/_a_\d+$/, '');
                      
                        const index = updatedFields.findIndex(
                          (item) => item.replace(/_a_\d+$/, '') === normalizedField
                        );
                       const taxField = `tax_id_no_${field.split("_")[4]}`;
                       const reasonField = `crs_reason_code_${field.split("_")[4]}`;
                //        if(field.startsWith('crs_comments')){
                //         debugger
                //         const crsCommentsField = `crs_comments_${field.split("_")[2]}`;
                //         const existCrsComments = updatedFields.includes(crsCommentsField);         
                //         if (!existCrsComments) {
                //                 updatedFields.splice(index + 1, 0, `tax_id_no_${field.split("_")[4]}`, `crs_reason_code_${field.split("_")[4]}`, `crs_comments_${field.split("_")[4]}`);
                //         }  
                //        }
                       const taxAlone = updatedFields.includes(taxField)
                       const alreadyExists = updatedFields.includes(taxField) && updatedFields.includes(reasonField);
                      
                        if (value && index !== -1 &&!alreadyExists &&!taxAlone) {
                          updatedFields.splice(index + 1, 0, `tax_id_no_${field.split("_")[4]}`, `crs_reason_code_${field.split("_")[4]}`);
                        }
                      
                        state.fields = updatedFields; // Update state fields
                      },
                      updateCrsComments(state,action){
                        const updatedFields = [...state.fields];
                        const [field, value] = Object.entries(action.payload)[0];
                        const normalizedField = field.replace(/_a_\d+$/, '');
                        const index = updatedFields.findIndex(
                                (item) => item.replace(/_a_\d+$/, '') === normalizedField
                              );
                              const crsCmnts =`crs_comments_${field.split("_")[3]}`;
                              const crsExist = updatedFields.includes(crsCmnts)
                            if(value &&index!==-1 && !crsExist){
                                updatedFields.splice(index +1,0,`crs_comments_${field.split("_")[3]}`)
                              }  
                              state.fields = updatedFields;
                      },
                      removeReasonField(state, action) {
                        const updatedFields = state.fields.filter(
                          (field) => !action.payload.includes(field)
                        );
                        state.fields = updatedFields;
                      },
                resetTaxField(state, action) {
                        state.maxCount = 4;
                        state.count = 0;
                        state.fields = action.payload;
                }
        }
});
export const taxAction = tax.actions;
export default tax;

restoreTaxField: (state) => {
  if (state.hasInteracted && state.taxIdNo.length < 1) {
    const restoredFields = [...state.fields];

    state.removedFields.forEach((removedField) => {
      const index = restoredFields.findIndex((field) =>
        field.startsWith(`tax_id_no_${removedField.split("_")[3]}`)
      );

      if (index !== -1) {
        restoredFields.splice(index + 1, 0, removedField); // Insert right after its tax_id_no
      }
    });

    state.fields = restoredFields;
    state.removedFields = [];
  }
}
className={`${taxIdNo.length > 1 ? props.data.logical_field_name : "dropdown-select"} 
            ${someCondition ? "class-one" : ""} 
            ${anotherCondition ? "class-two" : ""} 
            ${yetAnotherCondition ? "class-three" : ""}`}

            useEffect(()=>{
    debugger
    if (!userInputSelector.applicants.tax_id_no_1_a_1) return;
    if (Object.fromEntries(Object.entries(userInputSelector.applicants).filter(([key]) => key.startsWith('tax_id_no_')))) {
      const taxId = Object.fromEntries(Object.entries(userInputSelector.applicants).filter(([key]) => key.startsWith('tax_id_no_')));
      Object.keys(taxId).forEach((key: any) => {
        const taxIdNoIndex = key.split("_")[3];
        if (props.data.logical_field_name === `crs_reason_code_${taxIdNoIndex}`) {
          setShowCrsReason(false);
        } else {
          setShowCrsReason(true);
        }
      });
    } else {
      setShowCrsReason(true);
    }
  },[userInputSelector.applicants.tax_id_no_1_a_1]);
useEffect(() => {
  debugger;

  // Extract all tax_id_no_ fields
  const taxIdEntries = Object.entries(userInputSelector.applicants)
    .filter(([key]) => key.startsWith('tax_id_no_'));

  // Convert to object
  const taxId = Object.fromEntries(taxIdEntries);

  // If no tax fields have a value, ensure crs_reason_code is shown
  if (taxIdEntries.length === 0 || Object.values(taxId).every(value => !value)) {
    setShowCrsReason(true);
    return;
  }

  // Loop through tax fields to decide visibility
  Object.keys(taxId).forEach((key: any) => {
    const taxIdNoIndex = key.split("_")[3];
    if (props.data.logical_field_name === `crs_reason_code_${taxIdNoIndex}`) {
      setShowCrsReason(false);
    }
  });

}, [userInputSelector.applicants]);

const [showCrsReason, setShowCrsReason] = useState<Record<string, boolean>>({});
useEffect(() => {
  debugger;

  // Extract all tax_id_no_ fields dynamically
  const taxIdEntries = Object.entries(userInputSelector.applicants)
    .filter(([key]) => key.startsWith('tax_id_no_'));

  const taxId = Object.fromEntries(taxIdEntries);

  // New object to store field-specific visibility
  const updatedCrsReasonState: Record<string, boolean> = {};

  // If all tax fields are empty, show all crs_reason_code_X fields
  if (taxIdEntries.length === 0 || Object.values(taxId).every(value => !value)) {
    setShowCrsReason({});
    return;
  }

  // Loop through tax fields to update only specific crs_reason_code_X
  Object.keys(taxId).forEach((key) => {
    const taxIdNoIndex = key.split("_")[3]; // Extract index from key

    updatedCrsReasonState[`crs_reason_code_${taxIdNoIndex}`] = false; // Hide the specific field
  });

  // Update state dynamically
  setShowCrsReason(updatedCrsReasonState);

}, [userInputSelector.applicants]);
