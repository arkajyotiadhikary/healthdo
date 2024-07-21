"use client";
import { Input } from "./ui/input";
import React from "react";
import {
      FormField,
      FormItem,
      FormLabel,
      FormControl,
      FormDescription,
      FormMessage,
} from "./ui/form";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface CustomFormFieldProps {
      control: Control<any>;
      fieldType: FormFieldType;
      name: string;
      label?: string;
      placeholder?: string;
      iconSrc?: string;
      iconAlt?: string;
      disabled?: boolean;
      dateFormat?: boolean;
      showTimeSelect?: boolean;
      children?: React.ReactNode;
      renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
      const { fieldType, placeholder, iconSrc, iconAlt } = props;
      switch (fieldType) {
            case FormFieldType.INPUT: {
                  return (
                        <div className="flex rounded-md border boder-dark-500 bg-dark-400">
                              {iconSrc && (
                                    <Image
                                          className="mx-2"
                                          src={iconSrc}
                                          alt={iconAlt || "icon"}
                                          height={24}
                                          width={24}
                                    />
                              )}
                              <FormControl>
                                    <Input
                                          className="shad-input boder-0"
                                          placeholder={placeholder}
                                          {...field}
                                    />
                              </FormControl>
                        </div>
                  );
            }
            case FormFieldType.PHONE_INPUT: {
                  return (
                        <FormControl>
                              <PhoneInput
                                    defaultCountry="IN"
                                    placeholder={placeholder}
                                    international
                                    withCountryCallingCode
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="input-phone"
                              />
                        </FormControl>
                  );
            }
            default:
                  break;
      }
};

const CustomFormField: React.FC<CustomFormFieldProps> = (props: CustomFormFieldProps) => {
      const { control, name, fieldType, label } = props;

      return (
            <FormField
                  control={control}
                  name={name}
                  render={({ field }) => (
                        <FormItem className="flex-1">
                              {fieldType !== FormFieldType.CHECKBOX && label && (
                                    <FormLabel>{label}</FormLabel>
                              )}
                              <RenderField field={field} props={props} />
                              <FormMessage className="shad-error" />
                        </FormItem>
                  )}
            />
      );
};

export default CustomFormField;
