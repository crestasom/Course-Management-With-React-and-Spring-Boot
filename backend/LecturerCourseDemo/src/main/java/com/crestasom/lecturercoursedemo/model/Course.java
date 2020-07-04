package com.crestasom.lecturercoursedemo.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "course")
public class Course implements Comparable<Course> {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String description;
	@ManyToOne(optional = true)
	private Lecturer lecturer;
	@Transient
	private boolean isSelected;
	@Transient
	private boolean visible = true;
	@JsonIgnore
	@ManyToMany(mappedBy = "courseList")
	private List<Semester> semList;

	@Override
	public int compareTo(Course o) {
		// TODO Auto-generated method stub

		return (int) (id - o.id);
	}

	public Course(String description) {
		super();
		this.description = description;
	}

}
