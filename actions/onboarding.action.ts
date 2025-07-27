"use server";

import { createClient } from "@/utils/supabase/server";

import { getAuthenticatedUserId } from "@/utils/user";
import { role } from "@prisma/client";
import { z } from "zod";
import { actionClient } from "@/lib/action-client";

const onboardingSchema = z.object({
  role: z.enum(role),
});

export const updateUserRole = actionClient
  .inputSchema(onboardingSchema)
  .action(async ({ parsedInput: { role: selectedRole } }) => {
    try {
      const userId = await getAuthenticatedUserId();
      console.log("Updating role for userId:", userId);
      console.log("Selected role:", selectedRole);
      
      if (!userId) {
        throw new Error("No authenticated user found");
      }
      
      const supabase = await createClient();
      
      // Try to update the role directly (this will work if RLS allows it)
      const { data, error } = await supabase
        .from("profiles")
        .update({ role: selectedRole })
        .eq("id", userId)
        .select(); // Add select to see what was updated
        
      console.log("Supabase response - data:", data);
      console.log("Supabase response - error:", error);
        
      if (error) {
        console.error("Supabase error:", error);
        throw new Error(`Failed to update user role: ${error.message}`);
      }
      
      // Verify the update actually happened
      const { data: verifyData, error: verifyError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();
        
      console.log("Verification - data:", verifyData);
      console.log("Verification - error:", verifyError);
      
      return { success: true, data, verifiedRole: verifyData?.role };
    } catch (error) {
      console.error("Action error:", error);
      throw new Error(`Failed to update user role: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });