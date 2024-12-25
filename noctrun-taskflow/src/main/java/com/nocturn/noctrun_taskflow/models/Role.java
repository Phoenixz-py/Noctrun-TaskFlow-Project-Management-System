package com.nocturn.noctrun_taskflow.models;

public enum Role {
    USER,
    TEAM_LEAD,
    ADMIN;

    // Check if a role is valid
    public static boolean isValidRole(String role) {
        for (Role r : Role.values()) {
            if (r.name().equalsIgnoreCase(role)) {
                return true;
            }
        }
        return false;
    }
}
