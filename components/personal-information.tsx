"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { PhoneInput, phoneSchema, CountryData } from "@/components/ui/phone-input";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

import { Country, CountryDropdown } from "@/components/ui/country-dropdown";
import { GenderDropdown } from "@/components/ui/gender-dropdown";
import { DateInput } from "@/components/ui/date-input";
import { Input } from "./ui/input";

const formSchema = z.object({
  firstName: z.string({
    message: "Please enter your first name",
  }),
  lastName: z.string({
    message: "Please enter your last name",
  }),
  email: z.email({
    message: "Please enter your email",
  }),

  gender: z.enum(["male", "female", "other"], {
    message: "Please select your gender",
  }),

  username: z.string({
    message: "Please enter your username",
  }),


  dateOfBirth: z.date({
    message: "Please enter your date of birth",
  }),
  
  country: z.string({
    message: "Please select a country",
  }),
  phone: phoneSchema,
});

type FormSchema = z.infer<typeof formSchema>;

export const PersonalInformation = () => {
  const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);
  const [countryData, setCountryData] = useState<CountryData>();
  const [selectedGender, setSelectedGender] = React.useState<string | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      phone: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast.success(`${selectedCountry?.name} ${selectedCountry?.emoji} - Gender: ${selectedGender} - Date: ${selectedDate?.toLocaleDateString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <Input
                placeholder="First Name"
                defaultValue={field.value}
                onChange={field.onChange}
              />
              <FormDescription className="text-sm text-muted-foreground mt-1">
                  This is your first name.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholder="Last Name"
                defaultValue={field.value}
                onChange={field.onChange}
              />
              <FormDescription className="text-sm text-muted-foreground mt-1">
                  This is your last name.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                defaultValue={field.value}
                onChange={field.onChange}
              />
              <FormDescription className="text-sm text-muted-foreground mt-1">
                  This is your email.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <GenderDropdown
                placeholder="Select gender"
                defaultValue={field.value}
                onChange={(gender) => {
                  field.onChange(gender.value);
                  setSelectedGender(gender.value);
                }}
              />
              <FormDescription className="text-sm text-muted-foreground mt-1">
                  Please select your gender.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                defaultValue={field.value}
                onChange={field.onChange}
              />
              <FormDescription className="text-sm text-muted-foreground mt-1">
                  This is your username.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth</FormLabel>
              <DateInput
                value={field.value}
                onChange={(date) => {
                  field.onChange(date);
                  setSelectedDate(date);
                }}
                placeholder="MM/DD/YYYY"
                width="w-1/4"
              />
              <FormDescription className="text-sm text-muted-foreground mt-1">
                  Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Country</FormLabel>
              <CountryDropdown
                placeholder="Country"
                defaultValue={field.value}
                onChange={(country) => {
                  field.onChange(country.alpha3);
                  setSelectedCountry(country);
                 // Update PhoneInput
                 setCountryData(country);
                 form.setValue("phone", country.countryCallingCodes[0]);

                }}
              />
              <FormDescription className="text-sm text-muted-foreground mt-1">
                  Include country code (e.g. +44)
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <PhoneInput
                {...field}
                value={field.value}
                placeholder="Enter your number"
                defaultCountry={selectedCountry?.alpha2}
                onCountryChange={setCountryData}
              />
              <FormDescription className="text-sm text-muted-foreground mt-1">
                  This is your country of residence.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex justify-center pt-4">
          <Button type="submit" className="bg-primary text-primary-foreground">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};