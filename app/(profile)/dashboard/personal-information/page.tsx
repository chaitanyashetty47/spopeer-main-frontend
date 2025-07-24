import React from 'react';

export default function PersonalInformationPage() {
  return (
    <div className="rounded-lg border bg-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Personal Information</h1>
      
      <form className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* First Name */}
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First name
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="Racheal"
            />
          </div>
          
          {/* Last Name */}
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="Miles"
            />
          </div>
          
          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="racheal_track"
            />
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="rachealmilez@gmail.com"
            />
          </div>
          
          {/* Phone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone No
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="+3 999 000 990"
            />
          </div>
          
          {/* Country */}
          <div className="space-y-2">
            <label htmlFor="country" className="text-sm font-medium">
              Country
            </label>
            <select
              id="country"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="France"
            >
              <option>France</option>
              <option>Germany</option>
              <option>United Kingdom</option>
              <option>United States</option>
            </select>
          </div>
          
          {/* Gender */}
          <div className="space-y-2">
            <label htmlFor="gender" className="text-sm font-medium">
              Gender
            </label>
            <select
              id="gender"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="Female"
            >
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </div>
          
          {/* Date of birth */}
          <div className="space-y-2">
            <label htmlFor="dob" className="text-sm font-medium">
              Date of birth
            </label>
            <input
              id="dob"
              type="date"
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue="2023-08-17"
            />
          </div>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
} 