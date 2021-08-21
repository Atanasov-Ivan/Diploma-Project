package com.gospodinovi.config;

import com.gospodinovi.mqtt_engine.EngineTemperatureSensorPub;
import com.gospodinovi.mqtt_engine.EngineTemperatureSensorSub;
import com.gospodinovi.mqtt_engine.SensorClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**").allowedMethods("GET", "POST", "PUT", "DELETE");
    }


    @Bean
    public SensorClient sensorClient(){
        return new SensorClient();
    }

    @Bean
    public EngineTemperatureSensorSub engineTemperatureSensorSub(){
        return new EngineTemperatureSensorSub();
    }

    @Bean
    public EngineTemperatureSensorPub engineTemperatureSensorPub(){
        return new EngineTemperatureSensorPub();
    }
}
