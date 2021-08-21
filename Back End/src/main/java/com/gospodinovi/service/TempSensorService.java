package com.gospodinovi.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gospodinovi.models.TempSensor;
import com.gospodinovi.models.dto.TempSensorDto;
import com.gospodinovi.repository.TempSensorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class TempSensorService {

    @Autowired
    private TempSensorRepository tempSensorRepository;

    private ModelMapper modelMapper = new ModelMapper();

    public void addTempMeasure(final TempSensor tempSensor){
        tempSensorRepository.save(tempSensor);
    }

    public TempSensorDto getLatestTemp(){

       final TempSensor tempSensor = tempSensorRepository.findTopByOrderByIdDesc().orElse(null);
        if (Objects.isNull(tempSensor)) {
            return new TempSensorDto();
        }
       return modelMapper.map(tempSensor, TempSensorDto.class);
    }
}
