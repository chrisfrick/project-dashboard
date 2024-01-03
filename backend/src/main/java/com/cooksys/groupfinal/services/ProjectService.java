package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

public interface ProjectService {


    ProjectDto getProjectById(Long id);


    ProjectDto updateProjectDescription(Long projectId, ProjectDto projectDto);

    ProjectDto addProject(ProjectDto projectDto);
}
