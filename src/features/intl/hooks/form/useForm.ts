import { useState } from 'react';

interface UseFormParams<Values> {
  initialValues: Values;
  validateSchema?: {
    [K in keyof Values]?: (value: Values[K]) => string | null;
  };
  validateOnChange?: boolean;
  onSubmit?: (values: Values) => void;
}

export const useForm = <Values extends object>({
  initialValues,
  validateSchema,
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
    // @ts-ignore
    const error = validateSchema[field](value);
    setErrors({ ...errors, [field]: error });
  };

  const setFieldError = <K extends keyof Values>(field: K, error: Values[K]) =>
    setErrors({ ...errors, [field]: error });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    return !!onSubmit && onSubmit(values);
  };

  return {
    values,
    errors,
    setFieldValue,
    setFieldError,
    handleSubmit,
    isSubmitting,
    setIsSubmitting
  };
};
