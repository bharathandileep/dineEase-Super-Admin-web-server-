import React from "react";
import { useForm, Resolver, SubmitHandler } from "react-hook-form";
import { FieldValues } from 'react-hook-form';

interface VerticalFormProps<TFormValues extends FieldValues = any> {
  defaultValues?: any;
  resolver?: Resolver<TFormValues>;
  children?: React.ReactNode; // Changed from any to React.ReactNode for better typing
  onSubmit: SubmitHandler<TFormValues>;
  formClass?: string;
}

const VerticalForm = <
  TFormValues extends Record<string, any> = Record<string, any>
>({
  defaultValues,
  resolver,
  children,
  onSubmit,
  formClass,
}: VerticalFormProps<TFormValues>) => {
  /*
   * form methods
   */
  const methods = useForm<TFormValues>({ defaultValues, resolver });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = methods;

  // Return JSX
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formClass} noValidate>
      {React.Children.map(children, child =>
        React.isValidElement(child) &&
          child.props &&
          child.props.name
         ? React.cloneElement(child, {
             ...child.props,
              register,
              errors,
              control,
            })
          : child
      )}
    </form>
  );
};

export default VerticalForm;
