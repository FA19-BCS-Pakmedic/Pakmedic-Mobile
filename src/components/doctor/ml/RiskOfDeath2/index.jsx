import {ValidateInputField} from '../../../../components/shared/Input';
import dimensions from '../../../../utils/styles/themes/dimensions';
import colors from '../../../../utils/styles/themes/colors';
import fonts from '../../../../utils/styles/themes/fonts';
import {useForm} from 'react-hook-form';

export const RiskOfDeath2 = props => {
  const {control, handleSubmit, errors} = props;

  const numberRegex = /^\d+(\.\d+)?$/;

  const genderRegex = /^[12]$/;

  return (
    <>
      <ValidateInputField
        placeholder="Enter Patient's Serum Albumin"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="SerumAlbumin"
        rules={{
          required: {
            value: true,
            message: 'Serum Albumin is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Serum Albumin"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Serum Cholesterol"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="SerumCholesterol"
        rules={{
          required: {
            value: true,
            message: 'Serum Cholesterol is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Serum Cholesterol"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Serum Iron"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="SerumIron"
        rules={{
          required: {
            value: true,
            message: 'Serum Iron is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Serum Iron"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Serum Magnesium"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="SerumMagnesium"
        rules={{
          required: {
            value: true,
            message: 'Serum Magnesium is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Serum Magnesium"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Serum Protein"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="SerumProtein"
        rules={{
          required: {
            value: true,
            message: 'Serum Protein is required',
          },
          pattern: {value: numberRegex, message: 'Invalid Number'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Serum Protein"
        type="outlined"
        keyboardType="numeric"
        inputHeight={dimensions.Height * 0.05}
      />
      <ValidateInputField
        placeholder="Enter Patient's Sex (1 for Male 2 for Female)"
        placeholderTextColor={colors.secondary1}
        control={control}
        name="Sex"
        rules={{
          required: {
            value: true,
            message: 'Sex is required',
          },
          pattern: {value: genderRegex, message: 'Number can only be 1 or 2'},
        }}
        containerWidth={dimensions.Width * 0.9}
        fontSize={fonts.size.font14}
        title="Sex"
        type="outlined"
        inputHeight={dimensions.Height * 0.05}
        keyboardType="numeric"
      />
    </>
  );
};
