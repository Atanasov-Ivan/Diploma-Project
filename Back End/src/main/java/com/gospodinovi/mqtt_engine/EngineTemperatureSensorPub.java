package com.gospodinovi.mqtt_engine;

import com.gospodinovi.models.DeviceControls;
import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.beans.factory.annotation.Autowired;

public class EngineTemperatureSensorPub{

    @Autowired
    private SensorClient sensorClient;
    private final static String TOPIC = "room";

    public Void publishCommand(final DeviceControls deviceControls) {
        final IMqttClient client = sensorClient.getPublisher();
        if ( !client.isConnected()) {
            return null;
        }
        MqttMessage msg = readEngineTemp(deviceControls);
        msg.setQos(0);
        msg.setRetained(true);
        try {
            client.publish(TOPIC,msg);
        } catch (MqttException e) {
            throw  new RuntimeException(e);
        }
        return null;
    }

    private MqttMessage readEngineTemp(final DeviceControls deviceControls) {

        byte[] payload = deviceControls.getCommand().getBytes();
        return new MqttMessage(payload);
    }
}
