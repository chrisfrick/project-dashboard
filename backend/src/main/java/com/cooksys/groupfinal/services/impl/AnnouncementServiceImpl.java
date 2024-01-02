package com.cooksys.groupfinal.services.impl;

import java.util.Optional;
import org.springframework.stereotype.Service;
import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.services.AnnouncementService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {
    
    private final AnnouncementMapper announcementMapper;
    private final AnnouncementRepository announcementRepository;
    
    
    private Announcement getNotDeletedAnnouncement(Long id) {

        Optional<Announcement> optionalAnnouncement = announcementRepository.findByIdAndDeletedFalse(id);

        if (optionalAnnouncement.isEmpty()) {
            throw new NotFoundException("No Tweet found with id: " + id);
        }

        return optionalAnnouncement.get();
    }
    
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
    
    @Override
    public AnnouncementDto updateAnnouncement(
        Long id,
        AnnouncementDto announcementDto) {

        Optional<Announcement> optionalAnnouncement = announcementRepository.findById(id);
        if (optionalAnnouncement.isEmpty()) {
            throw new NotFoundException("No Announcement with that id found.");
        }
        
        Announcement announcementToUpdate = optionalAnnouncement.get();
        
        if (announcementDto.getMessage() != null) {
            announcementToUpdate.setMessage(announcementDto.getMessage());
        }
        if (announcementDto.getTitle() != null) {
            announcementToUpdate.setTitle(announcementDto.getTitle());
        }
        //May need to update more?
        
        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcementToUpdate));
    }

    @Override
    public AnnouncementDto deleteAnnouncement(Long id) {

        Announcement announcementToDelete = getNotDeletedAnnouncement(id);
        
        announcementToDelete.setDeleted(true);
        
        return announcementMapper.entityToDto(announcementRepository.saveAndFlush(announcementToDelete));
    }
    
    

}