"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { optional, z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { GenderOptions } from "@/constants";
import { Label } from "@radix-ui/react-label";

const RegisterForm = ({ user }: { user: User }) => {
      // get the authenticate user
      const router = useRouter();
      const [isLoading, setIsLoading] = useState(false);
      const form = useForm<z.infer<typeof UserFormValidation>>({
            resolver: zodResolver(UserFormValidation),
            defaultValues: {
                  name: "",
                  email: "",
                  phone: "",
            },
      });

      // 2. Define a submit handler.
      const onSubmit = async ({ name, email, phone }: z.infer<typeof UserFormValidation>) => {
            setIsLoading(true);
            try {
                  const userData = {
                        name,
                        email,
                        phone,
                  };
                  // // create a user in database
                  const user = await createUser(userData);
                  if (user) router.push(`/patients/${user.$id}/register`);
                  // app write
            } catch (error) {
                  console.log(error);
            }
      };

      return (
            <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                        <section className="mb-12 space-y-4">
                              <h1 className="header">Hi there 👋</h1>
                              <p className="text-dark-700">Let us know more about you</p>
                        </section>
                        <section className="space-y-6">
                              <div className="mb-9 space-y-1">
                                    <h2 className="sub-header">Personal Information</h2>
                              </div>
                        </section>
                        <CustomFormField
                              name="name"
                              label="Full Name"
                              placeholder="ar-xyz"
                              iconAlt="username"
                              fieldType={FormFieldType.INPUT}
                              control={form.control}
                        />
                        <div className="flex flex-col gap-6 xl:flex-row">
                              <CustomFormField
                                    name="email"
                                    label="Email"
                                    placeholder="ar-xyz"
                                    iconAlt="username"
                                    fieldType={FormFieldType.INPUT}
                                    control={form.control}
                              />
                              <CustomFormField
                                    name="phone"
                                    label="Phone Number"
                                    placeholder="900-000-0000"
                                    iconAlt="phone"
                                    fieldType={FormFieldType.PHONE_INPUT}
                                    control={form.control}
                              />
                        </div>
                        <div className="flex flex-col gap-6 xl:flex-row">
                              <CustomFormField
                                    name="birthdate"
                                    label="Date of Birth"
                                    placeholder="ar-xyz"
                                    iconAlt="username"
                                    fieldType={FormFieldType.DATE_PICKER}
                                    control={form.control}
                              />
                              <CustomFormField
                                    name="gender"
                                    label="Gender"
                                    placeholder="ar-xyz"
                                    iconAlt="username"
                                    fieldType={FormFieldType.SKELETON}
                                    control={form.control}
                                    renderSkeleton={(field) => (
                                          <FormControl>
                                                <RadioGroup
                                                      className="flex h-11 gap-6 xl:justify-between"
                                                      onValueChange={field.onChange}
                                                      defaultValue={field.value}
                                                >
                                                      {GenderOptions.map((gender) => (
                                                            <div
                                                                  key={gender}
                                                                  className="radio-group"
                                                            >
                                                                  <RadioGroupItem
                                                                        id={gender}
                                                                        key={gender}
                                                                        value={gender}
                                                                        className="radio-"
                                                                  />
                                                                  <Label
                                                                        className="cursor-pointer"
                                                                        htmlFor={gender}
                                                                  >
                                                                        {gender}
                                                                  </Label>
                                                            </div>
                                                      ))}
                                                </RadioGroup>
                                          </FormControl>
                                    )}
                              />
                        </div>
                        <div className="flex flex-col gap-6 xl:flex-row"></div>
                        <div className="flex flex-col gap-6 xl:flex-row"></div>
                        <div className="flex flex-col gap-6 xl:flex-row"></div>
                        <div className="flex flex-col gap-6 xl:flex-row"></div>
                        <div className="flex flex-col gap-6 xl:flex-row"></div>
                        <div className="flex flex-col gap-6 xl:flex-row"></div>

                        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
                  </form>
            </Form>
      );
};

export default RegisterForm;
