package com.nocturn.noctrun_taskflow.models;



public class JwtResponse {
    private String token;

    // Constructor
    public JwtResponse(String token) {
        this.token = token;
    }

    // Getter method
    public String getToken() {
        return token;
    }

    // Setter method (optional, in case you want to modify the token)
    public void setToken(String token) {
        this.token = token;
    }
}
