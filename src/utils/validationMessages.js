const getValidationMessages = async (errors) => {
  const missingParams = [];

  errors.forEach((error) => {
    missingParams.push({ [error.context.label]: error.message });
  });

  return missingParams;
};

export default getValidationMessages;
