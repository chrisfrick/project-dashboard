package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import org.springframework.stereotype.Service;
import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.awt.*;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.entities.Project;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;

    private Project findProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if(project.isEmpty()) {
            throw new NotFoundException("Project with the provided id does not exist.");
        }
        return project.get();
    }
    private User findUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if ( user.isEmpty()) {
            throw new NotFoundException( "User with the provided id does not exist");
        }
        return user.get();
    }

    @Override
    public ProjectDto getProjectById(Long id) {
        return projectMapper.entityToDto(findProject(id));
    }

    @Override
    public ProjectDto updateProjectDescription(Long projectId, ProjectDto projectDto) {
        // validation for null
        if(projectDto == null || projectId == null) {
            throw new BadRequestException("A team id, project id and projectDto are required.");
        }
        // fetch project by id
        Project  project = findProject(projectDto.getId());

        // validate for active
        if(!project.isActive()) {
            throw new BadRequestException("Project is not active");
        }

        project.setDescription(projectDto.getDescription());
        return projectMapper.entityToDto(projectRepository.save(project));

    }

    @Override
    public ProjectDto deactivateProject(Long projectId, Long userId) {
        // validate for null
        if (projectId == null || userId == null) {
            throw new BadRequestException(" Project id, UserId and ProjectDto are required");
        }

        // fetching Project and User based on id
        Project projectToDelete = findProject(projectId);
        User user = findUser(userId);

        // validating admin rights
        if(!user.isAdmin()) {
            throw new NotAuthorizedException("User does not have admin rights");
        }

        Team teamTodetachProject = projectToDelete.getTeam();

        // deactivate the team from the specfic Project
        Set<Project> filteredProjects = teamTodetachProject.getProjects();
        if(filteredProjects.contains(projectToDelete)) {
            filteredProjects.removeIf((project -> project.getTeam().equals(projectToDelete)));
        }
        teamRepository.save(teamTodetachProject);

        // deactivate the project
        projectToDelete.setTeam(null);
        projectToDelete.setActive(false);
        return projectMapper.entityToDto(projectRepository.save(projectToDelete));
    }
}
