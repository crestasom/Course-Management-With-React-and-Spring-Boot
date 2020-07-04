package com.crestasom.lecturercoursedemo.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.crestasom.lecturercoursedemo.jwt.JwtUtil;
import com.crestasom.lecturercoursedemo.model.User;
import com.crestasom.lecturercoursedemo.service.UserService;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
	@Autowired
	JwtUtil jUtil;
	@Autowired
	UserService userDetailService;

	private static Logger log = LoggerFactory.getLogger(JwtRequestFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String authHeader = request.getHeader("Authorization");
		String userName = null;
		String jwt = null;
		if (authHeader != null && authHeader.startsWith("Bearer ")) {
			jwt = authHeader.substring(7);

			userName = jUtil.extractUserName(jwt);
		}
		log.info(userName);
		if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			User userDetails = userDetailService.findByUserName(userName);
			log.info(userDetails.toString());
			if (userDetails != null && jUtil.validateToken(jwt, userDetails)) {
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
						.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		filterChain.doFilter(request, response);

	}

}
