package com.gospodinovi;

import com.gospodinovi.models.Controls;
import com.gospodinovi.mqtt_engine.EngineTemperatureSensorPub;
import com.gospodinovi.mqtt_engine.EngineTemperatureSensorSub;
import com.gospodinovi.mqtt_engine.SensorClient;
import com.gospodinovi.service.ControlsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class OnStartUp {



    @Autowired
    private EngineTemperatureSensorSub engineTemperatureSensorSub;
    @Autowired
    private ControlsService controlsService;

    @PostConstruct
    public void init() {
     engineTemperatureSensorSub.call();
     addDefaultControls();
    }

    private void addDefaultControls() {
        final Controls ledControls = new Controls();
        ledControls.setName("Led");
        final Controls fanControls = new Controls();
        fanControls.setName("Fan");
        //TODO remove next line to remove Fan from db
        this.controlsService.addNewControls(ledControls);
        this.controlsService.addNewControls(fanControls);
    }


}
