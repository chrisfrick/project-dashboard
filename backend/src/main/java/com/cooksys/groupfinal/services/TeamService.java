package com.cooksys.groupfinal.services;

import java.util.Set;

import com.cooksys.groupfinal.dtos.TeamDto;

public interface TeamService {

	Set<TeamDto> getUserTeamsByUserId(Long userId);

	TeamDto updateTeamById(Long teamId, TeamDto teamDto);

	TeamDto deleteTeamById(Long teamId);

}
