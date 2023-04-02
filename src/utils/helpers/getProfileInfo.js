export const getDoctorInfo = user => {
  // const icons = ['license', 'person', 'phone', 'email', 'id'];

  const data = [
    {
      label: 'Email',
      value: user?.email,
      icon: 'email',
    },
    {
      label: 'Phone',
      value: user?.phone,
      icon: 'phone',
    },
    {
      label: 'PMC ID',
      value: user?.pmc?.id,
      icon: 'id',
    },
    {
      label: 'Speciality',
      value: user?.speciality,
      icon: 'person',
    },
    {
      label: 'License Validity',
      value:
        new Date(user?.pmc?.expiryDate).getDate() +
        '/' +
        new Date(user.pmc.expiryDate).getMonth() +
        '/' +
        new Date(user.pmc.expiryDate).getFullYear(),
      icon: 'license',
    },
  ];

  return data;
};

export const getPatientInfo = user => {
  return [
    {
      label: 'Email',
      value: user?.email,
      icon: 'email',
    },
    {
      label: 'Phone',
      value: user?.phone,
      icon: 'phone',
    },
    {
      label: 'Gender',
      value: user?.gender,
      icon: 'gender',
    },
    {
      label: 'Blood Group',
      value: user?.bloodGroup ? user.bloodGroup : 'Not Specified',
      icon: 'blood',
    },
    {
      label: 'Height',
      value: user?.height ? user.height : 'Not Specified',
      icon: 'height',
    },
    {
      label: 'Weight',
      value: user?.weight ? user.weight : 'Not Specified',
      icon: 'weight',
    },
  ];
};
