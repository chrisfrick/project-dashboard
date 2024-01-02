package com.cooksys.groupfinal.services.impl;

import org.springframework.stereotype.Service;
import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.services.AnnouncementService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
    
    private final AnnouncementMapper announcementMapper;
    private final AnnouncementRepository announcementRepository;
    @Override
    public void createAnnouncement(AnnouncementDto announcementDto) {

        if(!announcementDto.getAuthor().isAdmin()) {
            throw new NotAuthorizedException("You must be an Admin to create an Announcement"); 
        }
        else if (announcementDto.getMessage() == null || announcementDto.getTitle() == null) {
            throw new BadRequestException("Please provide a message and a title.");
            
        }
        else {
            announcementRepository.saveAndFlush(announcementMapper.dtoToEntity(announcementDto));
        }
        
    }
    
    

}