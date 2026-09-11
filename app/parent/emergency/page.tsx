"use client";

import React from "react";
import { DashboardShell } from "@/components/navigation/dashboard-shell";
import { EmergencyRadar } from "@/components/safety/emergency-radar";
import { GeofenceCard } from "@/components/safety/geofence-card";
import { ShieldAlert, PhoneCall, Building2, MapPin } from "lucide-react";

export default function ParentEmergencyPage() {
  return (
    <DashboardShell
      title="Emergency Safety & Geofence Response"
      subtitle="Rapid assistance hotlines, campus gate security desk, and live nearby emergency responders."
    >
      <div className="space-y-6">
        <GeofenceCard studentId="stu-1" />
        <EmergencyRadar />
      </div>
    </DashboardShell>
  );
}
