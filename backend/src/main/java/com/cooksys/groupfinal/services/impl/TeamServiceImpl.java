package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {
	
	private final TeamRepository teamRepository;
	private final UserRepository userRepository;
	private final CompanyRepository companyRepository;
	private final TeamMapper teamMapper;
	
	private User findUser(Long id) {
		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty()) {
			throw new NotFoundException("A user with the provided id does not exist.");
		}
		return user.get();
	}
	
	private Team findTeam(Long id) {
		Optional<Team> team = teamRepository.findById(id);
		if (team.isEmpty()) {
			throw new NotFoundException("A team with the provided id does not exist.");
		}
		return team.get();
	}
	
	private Company findCompany(Long id) {
		Optional<Company> company = companyRepository.findById(id);
		if (company.isEmpty()) {
			throw new NotFoundException("A company with the provided id does not exist.");
		}
		return company.get();
	}

	@Override
	public Set<TeamDto> getUserTeamsByUserId(Long userId) {
		User user = findUser(userId);
		
		return teamMapper.entitiesToDtos(user.getTeams());
	}

	@Override
	public TeamDto updateTeamById(Long teamId, TeamDto teamDto) {
		Team currentTeam = findTeam(teamId);
		
		currentTeam.setName(teamDto.getName());
		currentTeam.setDescription(teamDto.getDescription());
		Set<User> teammates  = new HashSet<User>();
		for (BasicUserDto dtoTeammate : teamDto.getTeammates()) {
			User user = findUser(dtoTeammate.getId());
			teammates.add(user);
		}
		currentTeam.setTeammates(teammates);
		teamRepository.saveAndFlush(currentTeam);
		
		
		return teamMapper.entityToDto(currentTeam);
	}

	@Override
	public TeamDto deleteTeamById(Long teamId) {
		Team team = findTeam(teamId);
		
		Company company = findCompany(team.getCompany().getId());
		company.getTeams().remove(team);
		companyRepository.saveAndFlush(company);
		
		Set<User> teammates = team.getTeammates();
		
		for (User teammate : teammates) {
			teammate.getTeams().remove(team);
			userRepository.saveAndFlush(teammate);
		}
		
		teamRepository.delete(team);
		
		return teamMapper.entityToDto(team);
	}
	
	

}
