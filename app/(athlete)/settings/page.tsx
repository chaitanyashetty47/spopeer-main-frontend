import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Personal Information</h1>
        <p className="text-gray-600 mt-2">Update your personal details and preferences</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" defaultValue="Racheal" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" defaultValue="Miles" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="racheal_track" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue="rachealmiles@mail.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone No</Label>
          <Input id="phone" defaultValue="+3 999 000 990" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" defaultValue="France" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Input id="gender" defaultValue="Female" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dob">Date of birth</Label>
            <Input id="dob" defaultValue="08/17/2023" />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Edit className="w-4 h-4 mr-2" />
          Edit personal information
        </Button>
      </div>
    </div>
  );
}

