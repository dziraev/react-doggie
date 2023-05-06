import { useEffect, useState } from 'react';

interface UseFormParams<Values> {
  initialValues: Values;
  validateSchema?: {
    [K in keyof Values]?: (value: Values[K]) => string | null;
  };
  validateOnChange?: boolean;
  validateOnMount?: boolean;
  onSubmit?: (values: Values) => void;
}

export const useForm = <Values extends object>({
  initialValues,
  validateSchema,
  validateOnMount = false,
  validateOnChange = true,
  onSubmit
}: UseFormParams<Values>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof Values]?: string } | null>(null);

  const setFieldValue = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues({ ...values, [field]: value });

    const validateSchemaExistForField = !!validateSchema && !!validateSchema[field];

    if (!validateSchemaExistForField || !validateOnChange) return;

    const error = validateSchema[field]!(value);
    setErrors({ ...errors, [field]: error });
  };

  const setFieldError = <K extends keyof Values>(field: K, error: Values[K]) =>
    setErrors({ ...errors, [field]: error });

  const validateForm = () => {
    let isErrorExist = false;

    if (!validateSchema) {
      return true;
    }

    let errors = {};
    Object.keys(values).forEach((field) => {
      if (!validateSchema[field as keyof Values]) return;
      const error = validateSchema[field as keyof Values]!(values[field as keyof Values]);
      if (error) isErrorExist = true;
      errors = {
        ...errors,
        [field]: error
      };
    });

    setErrors(errors);
    return !isErrorExist;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const isFormValid = validateForm();
    if (!isFormValid) return;

    setIsSubmitting(true);
    return !!onSubmit && onSubmit(values);
  };

  const resetForm = (values?: Values) => {
    if (values) {
      setValues(values);
    }
    setValues(initialValues);
  };

  useEffect(() => {
    if (validateOnMount) validateForm();
  }, []);

  return {
    values,
    errors,
    setFieldValue,
    setFieldError,
    handleSubmit,
    isSubmitting,
    setIsSubmitting,
    resetForm,
    validateForm
  };
};
