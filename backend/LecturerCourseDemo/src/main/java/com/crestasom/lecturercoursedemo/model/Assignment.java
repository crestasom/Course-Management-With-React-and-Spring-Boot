package com.crestasom.lecturercoursedemo.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Assignment {
	@Id
	@GeneratedValue
	private int id;
	private String name;
	private String description;
	@Column(insertable = false, updatable = false, columnDefinition = " date default CURRENT_TIMESTAMP")
	private Date uploadDate;
	private java.sql.Date dueDate;
	private String filePath;
	@Transient
	private int courseid;
	@ManyToOne
	private Course course;

}
