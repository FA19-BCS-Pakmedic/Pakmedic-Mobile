import {ValidateInputField} from '../../../../components/shared/Input';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import {useForm} from 'react-hook-form';

export const RiskOfDeath3 = props => {
  const {control, handleSubmit, errors} = props;

  const numberRegex = /^\d+(\.\d+)?$/;

  return (
    <>
      <ValidateInputField
        placeholder="Enter Patient's Systolic Blood Pressure"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="SystolicBP"
        rules={{
          required: {
            value: true,
            message: 'Systolic Blood Pressure is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Systolic Blood Pressure"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's TIBC"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="TIBC"
        rules={{
          required: {
            value: true,
            message: 'TIBC is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="TIBC"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Transferrin Saturation"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="TransferrinSaturation"
        rules={{
          required: {
            value: true,
            message: 'Transferrin Saturation is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Transferrin Saturation"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's White Blood Cells Count"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="WhiteBloodCells"
        rules={{
          required: {
            value: true,
            message: 'White Blood Cells Count is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="White Blood Cells Count"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's BMI"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="BMI"
        rules={{
          required: {
            value: true,
            message: 'BMI is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="BMI"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Pulse Pressure"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="PulsePressure"
        rules={{
          required: {
            value: true,
            message: 'Pulse Pressure is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Pulse Pressure"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
    </>
  );
};
