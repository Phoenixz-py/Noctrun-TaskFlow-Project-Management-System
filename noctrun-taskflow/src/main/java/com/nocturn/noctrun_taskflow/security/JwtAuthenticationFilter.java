//package com.nocturn.noctrun_taskflow.security;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//
//import java.io.IOException;
//import java.util.Arrays;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    private final JwtTokenProvider tokenProvider;
//
//    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
//        this.tokenProvider = tokenProvider;
//    }
//
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String token = getJwtFromRequest(request);
//
//        if (token != null && tokenProvider.validateToken(token)) {
//            String username = tokenProvider.getUsernameFromToken(token);
//            String roles = tokenProvider.getRolesFromToken(token); // Extract roles from the token
//
//            // Check if the token is valid and username is extracted
//            if (username != null && roles != null) {
//                // Convert roles to GrantedAuthority objects
//                List<GrantedAuthority> authorities = Arrays.stream(roles.split(","))
//                        .map(SimpleGrantedAuthority::new)
//                        .collect(Collectors.toList());
//
//                // Create an authentication object with username and authorities
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(username, null, authorities);
//
//                // Set the authentication in the context for the current thread
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        }
//
//        // Continue with the next filter in the chain
//        filterChain.doFilter(request, response);
//    }
//
//    private String getJwtFromRequest(HttpServletRequest request) {
//        String header = request.getHeader("Authorization");
//        if (header != null && header.startsWith("Bearer ")) {
//            return header.substring(7);  // Remove "Bearer " from the header value
//        }
//        return null;
//    }
//}

package com.nocturn.noctrun_taskflow.security;

import com.nocturn.noctrun_taskflow.models.Role;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter(JwtTokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String token = getJwtFromRequest(request);
//
//        if (token != null && tokenProvider.validateToken(token)) {
//            String username = tokenProvider.getUsernameFromToken(token);
//            Object rolesClaim = tokenProvider.getRolesFromToken(token); // Extract roles from the token
//
//            // Check if the token is valid and username is extracted
//            if (username != null && rolesClaim != null) {
//                List<GrantedAuthority> authorities = new ArrayList<>();
//
//                // Check if rolesClaim is a String (single role) or List (multiple roles)
//                if (rolesClaim instanceof String) {
//                    authorities.add(new SimpleGrantedAuthority("ROLE_" + rolesClaim)); // Convert single role to GrantedAuthority
//                } else if (rolesClaim instanceof List) {
//                    authorities = ((List<?>) rolesClaim).stream()
//                            .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // Convert each role in the list to GrantedAuthority
//                            .collect(Collectors.toList());
//                }
//
//                // Create an authentication object with username and authorities
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(username, null, authorities);
//
//                // Set the authentication in the context for the current thread
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//        }
//
//        // Continue with the next filter in the chain
//        filterChain.doFilter(request, response);
//    }
//
//

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = getJwtFromRequest(request);

        if (token != null && tokenProvider.validateToken(token)) {
            String username = tokenProvider.getUsernameFromToken(token);
            String role = tokenProvider.getRoleFromToken(token);

            // Log role for debugging
            logger.info("Extracted role from JWT: " + role);

            if (username != null && role != null) {
                GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role); // Ensure ROLE_ prefix is added

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, List.of(authority));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }


    private String getJwtFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);  // Remove "Bearer " from the header value
        }
        return null;
    }
}

