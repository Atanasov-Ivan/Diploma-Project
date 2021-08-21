package com.gospodinovi.service;

import com.gospodinovi.models.Controls;
import com.gospodinovi.models.DeviceControls;
import com.gospodinovi.models.dto.ControlsDto;
import com.gospodinovi.mqtt_engine.EngineTemperatureSensorPub;
import com.gospodinovi.repository.ControlsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ControlsService {

    @Autowired
    private ControlsRepository controlsRepository;
    @Autowired
    private EngineTemperatureSensorPub engineTemperatureSensorPub;

    private ModelMapper modelMapper = new ModelMapper();

    public void addNewControls(final Controls controls){
        this.controlsRepository.save(controls);

    }

    public List<ControlsDto> getAllControls(){
        List<Controls> allControls = this.controlsRepository.findAll();
        return allControls.stream().map(x -> modelMapper.map(x, ControlsDto.class))
               .collect(Collectors.toList());
    }

    public void controlDevice(DeviceControls deviceControls){
        if(deviceControls.getCommand().equals("auto")){
            System.out.println("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
            Controls controls = this.controlsRepository.findFirstByName(deviceControls.getName()).orElse(null);

            if(!Objects.isNull(controls)) {
                controls.setAutoModeEnabled(!controls.getAutoModeEnabled());
                this.controlsRepository.flush();
            }else{
                throw new RuntimeException("Device name not found.");
            }
        }else {

            engineTemperatureSensorPub.publishCommand(deviceControls);
        }

    }


    public boolean isDeviceAutoOn(String device) {
        Controls controls = this.controlsRepository.findFirstByName(device).orElse(null);
        if(controls == null){
            return false;
        }
        return controls.getAutoModeEnabled();

    }
}
