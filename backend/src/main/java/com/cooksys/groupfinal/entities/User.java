package com.cooksys.groupfinal.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.cooksys.groupfinal.embeddables.Credentials;
import com.cooksys.groupfinal.embeddables.Profile;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_table")
@NoArgsConstructor
@Data
public class User {
	
	@Id
	@GeneratedValue
	private Long id;

  @Embedded
  @AttributeOverrides({
		  @AttributeOverride(name = "username", column = @Column(nullable = false, unique = true)),
		  @AttributeOverride(name = "password", column = @Column(nullable = false))
  })
  private Credentials credentials;
	
  @Embedded
  @AttributeOverrides({
		  @AttributeOverride(name = "firstName", column = @Column(name="`firstName`")),
		  @AttributeOverride(name = "lastName", column = @Column(name="`lastName`")),
		  @AttributeOverride(name = "email", column = @Column(nullable = false)),
		  @AttributeOverride(name = "phone", column = @Column(name = "phone"))
  })
  private Profile profile;
	
	private boolean active;
	
	private boolean admin;
	
	private String status = "PENDING";

	private boolean deleted = false;
	
	@OneToMany(mappedBy = "author")
	@EqualsAndHashCode.Exclude
	private Set<Announcement> announcements = new HashSet<>();
	
	@ManyToMany(mappedBy = "employees")
	@EqualsAndHashCode.Exclude
	private Set<Company> companies = new HashSet<>();
	
	@ManyToMany(mappedBy = "teammates")
	@EqualsAndHashCode.Exclude
	private Set<Team> teams = new HashSet<>();

}
