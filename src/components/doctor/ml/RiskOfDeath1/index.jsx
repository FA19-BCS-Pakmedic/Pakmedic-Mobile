import {ValidateInputField} from '../../../../components/shared/Input';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import {useForm} from 'react-hook-form';

export const RiskOfDeath1 = props => {
  const {control, handleSubmit, errors} = props;
  const numberRegex = /^\d+(\.\d+)?$/;
  const genderRegex = /^[12]$/;

  return (
    <>
      <ValidateInputField
        placeholder="Enter Patient's Age"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="Age"
        rules={{
          required: {
            value: true,
            message: 'Age is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Age"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Diastolic BP"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="DiastolicBP"
        rules={{
          required: {
            value: true,
            message: 'Diastolic BP is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Diastolic BP"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />

      <ValidateInputField
        placeholder="Enter Patient's Poverty Index"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="PovertyIndex"
        rules={{
          required: {
            value: true,
            message: 'Poverty Index is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Poverty Index"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Race (1 for white and 2 for black)"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="Race"
        rules={{
          required: {
            value: true,
            message: 'Race is required',
          },
          pattern: {value: genderRegex, message: 'Number can only be 1 or 2'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Race"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's RBC's Count"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="RedBloodCells"
        rules={{
          required: {
            value: true,
            message: 'RBC Count is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Red Blood Cells"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Sedimentation Rate"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="SedimentationRate"
        rules={{
          required: {
            value: true,
            message: 'Sedimentation Rate is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Sedimentation Rate"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
    </>
  );
};
