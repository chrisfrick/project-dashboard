package com.cooksys.groupfinal.controllers;

import java.util.Set;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {
	
	private final TeamService teamService;
	
	@GetMapping("/userTeams/{userId}")
	public Set<TeamDto> getUserTeamsByUserId (@PathVariable Long userId) {
		
		return teamService.getUserTeamsByUserId(userId);
		
	}
	
	@PutMapping("/admin/{teamId}")
	public TeamDto updateTeamById (@PathVariable Long teamId, @RequestBody TeamDto teamDto) {
		return teamService.updateTeamById(teamId, teamDto);
	}
	
	@DeleteMapping("/admin/{teamId}")
	public TeamDto deleteTeamById (@PathVariable Long teamId) {
		return teamService.deleteTeamById(teamId);
	}

}
