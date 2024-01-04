package com.cooksys.groupfinal.services.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.CompanyService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

	private final CompanyRepository companyRepository;
	private final TeamRepository teamRepository;
	private final UserRepository userRepository;
	private final FullUserMapper fullUserMapper;
	private final AnnouncementMapper announcementMapper;
	private final TeamMapper teamMapper;
	private final ProjectMapper projectMapper;
	private final ProjectRepository projectRepository;
	
	private Company findCompany(Long id) {
		Optional<Company> company = companyRepository.findById(id);
		if (company.isEmpty()) {
			throw new NotFoundException("A company with the provided id does not exist.");
		}
		return company.get();
	}

	private Team findTeam(Long id) {
    
		Optional<Team> team = teamRepository.findById(id);
		if (team.isEmpty()) {
			throw new NotFoundException("A team with the provided id does not exist.");
		}
		return team.get();
	}

	private User findUser(Long userId) {
		Optional<User> user = userRepository.findById(userId);
		if ( user.isEmpty()) {
			throw new NotFoundException( "User with the provided id does not exist");
		}
		return user.get();
	}
	
	@Override
	public Set<FullUserDto> getAllUsers(Long id) {
		Company company = findCompany(id);
		Set<User> filteredUsers = new HashSet<>();
		company.getEmployees().forEach(filteredUsers::add);
		filteredUsers.removeIf(user -> !user.isActive());
		return fullUserMapper.entitiesToFullUserDtos(filteredUsers);
	}

	@Override
	public Set<AnnouncementDto> getAllAnnouncements(Long id) {
		Company company = findCompany(id);
		List<Announcement> sortedList = new ArrayList<Announcement>(company.getAnnouncements());
		sortedList.sort(Comparator.comparing(Announcement::getDate).reversed());
		Set<Announcement> sortedSet = new HashSet<Announcement>(sortedList);
		return announcementMapper.entitiesToDtos(sortedSet);
	}

	@Override
	public Set<TeamDto> getAllTeams(Long id) {
		Company company = findCompany(id);
		return teamMapper.entitiesToDtos(company.getTeams());
	}

	@Override
	public Set<ProjectDto> getAllProjects(Long companyId, Long teamId) {
		Company company = findCompany(companyId);
		Team team = findTeam(teamId);
		if (!company.getTeams().contains(team)) {
			throw new NotFoundException(
					"A team with id " + teamId + " does not exist at company with id " + companyId + ".");
		}
		Set<Project> filteredProjects = new HashSet<>();
		team.getProjects().forEach(filteredProjects::add);
		filteredProjects.removeIf(project -> !project.isActive());
		return projectMapper.entitiesToDtos(filteredProjects);
	}

	@Override
	public void createNewTeamForCompany(Long id, TeamDto teamDto) {
		Company company = findCompany(id);
		Set<Team> companyTeams = company.getTeams();
		Team newTeam = new Team();
		
		String name = teamDto.getName();
		String description = teamDto.getDescription();
		Set<BasicUserDto> dtoTeammates = teamDto.getTeammates();
		Set<User> teammates  = new HashSet<User>();
		for (BasicUserDto dtoTeammate : dtoTeammates) {
			Optional<User> user = userRepository.findById(dtoTeammate.getId());
			teammates.add(user.get());
		}
		
		newTeam.setName(name);
		newTeam.setDescription(description);
		newTeam.setCompany(company);
		newTeam.setTeammates(teammates);
		teamRepository.saveAndFlush(newTeam);
		
		for (User user : teammates) {
			user.getTeams().add(newTeam);
			userRepository.saveAndFlush(user);
		}
		
		companyTeams.add(newTeam);
		companyRepository.saveAndFlush(company);
}

	public ProjectDto addProject(Long companyId, Long teamId, Long userId, ProjectDto projectDto) {
		// null validation
		if(companyId == null || teamId == null || projectDto == null) {
			throw new BadRequestException("Company id and team id and ProjectDto is required");
		}

		// fetching user,comapnay, team by id
		User user = findUser(userId);
		Company  company = findCompany(companyId);
		Team team = findTeam(teamId);

		//validating team with the company
		if(!company.getTeams().contains(team)) {
			throw new NotFoundException("Team with id "+ teamId + " does not exist at company with id "+ companyId + ".");
		}
		// validating admin rights
		if(!user.isAdmin()) {
			throw new NotAuthorizedException("User does not have admin rights");
		}
		//  generates id and persist project with Project repository
		projectDto.setActive(true);
		projectDto.setTeam(teamMapper.entityToDto(team));
		Project project = projectRepository.save(projectMapper.dtoToEntity(projectDto));

		// persisting with team repository
		team.getProjects().add(project);
		teamRepository.save(team);

		// persisting with company repository
		company.getTeams().add(team);
		companyRepository.save(company);

		return projectMapper.entityToDto(project);
	}
}