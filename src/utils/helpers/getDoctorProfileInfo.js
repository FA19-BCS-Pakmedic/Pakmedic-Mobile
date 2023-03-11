const getDoctorInfo = user => {
  const icons = ['license', 'person', 'phone', 'email', 'id'];

  const data = [
    {
      label: 'Email',
      value: user.email,
      icon: 'email',
    },
    {
      label: 'Phone',
      value: user.phone,
      icon: 'phone',
    },
    {
      label: 'PMC ID',
      value: user.pmc.id,
      icon: 'id',
    },
    {
      label: 'Speciality',
      value: user.speciality,
      icon: 'person',
    },
    {
      label: 'License Validity',
      value:
        new Date(user.pmc.expiryDate).getDate() +
        '/' +
        new Date(user.pmc.expiryDate).getMonth() +
        '/' +
        new Date(user.pmc.expiryDate).getFullYear(),
      icon: 'license',
    },
  ];

  return data;
};
