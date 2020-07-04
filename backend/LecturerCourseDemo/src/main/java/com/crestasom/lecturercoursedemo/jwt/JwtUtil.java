package com.crestasom.lecturercoursedemo.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.stereotype.Service;

import com.crestasom.lecturercoursedemo.model.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtUtil {
	private String SECRET_KEY = "secret";

	public String extractUserName(String token) {
		try {
			return extractClaim(token, Claims::getSubject);
		} catch (Exception ex) {
			return null;
		}
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
		final Claims claims = extractAllClaims(token);
		return claimResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {

		return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();

	}

	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public String generateToken(User userDetails) {
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, userDetails.getUsername());
	}

	private String createToken(Map<String, Object> claims, String subject) {
		return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
				.signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();

	}

	public boolean validateToken(String token, User userDetails) {
		final String userName = extractUserName(token);
		if (userName == null) {
			return false;
		}
		return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
}
