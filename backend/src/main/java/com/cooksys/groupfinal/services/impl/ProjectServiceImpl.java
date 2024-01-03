package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import org.springframework.stereotype.Service;
import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.awt.*;
import java.util.Optional;
import com.cooksys.groupfinal.entities.Project;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;

    private Project findProject(Long id) {
        Optional<Project> project = projectRepository.findById(id);
        if(project.isEmpty()) {
            throw new NotFoundException("Project with the provided id does not exist.");
        }
        return project.get();
    }
    @Override
    public ProjectDto updateProjectDescription(Long projectId, ProjectDto projectDto) {
        // validation for null
        if(projectDto == null || projectId == null) {
            throw new BadRequestException("A team id, project id and projectDto are required.");
        }
        // find project by id
        Project  project = findProject(projectDto.getId());

        // validate for active
        if(!project.isActive()) {
            throw new BadRequestException("Project is not active");
        }

        project.setDescription(projectDto.getDescription());
        return projectMapper.entityToDto(projectRepository.save(project));

    }

    @Override
    public ProjectDto addProject(ProjectDto projectDto) {
        // validate for null
        if (projectDto == null || projectDto.getName() == null || projectDto.getDescription() == null) {
            throw new BadRequestException(" Project Name and project description is required in the ProjectDto");
        }
        //default false until team is assigned
        projectDto.setActive(false);

        //will generate id, save with  name,description,setActive
        Project project = projectRepository.saveAndFlush(projectMapper.dtoToEntity(projectDto));
        return projectMapper.entityToDto(project);
    }
}
