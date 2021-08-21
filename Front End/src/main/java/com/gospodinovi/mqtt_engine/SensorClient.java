package com.gospodinovi.mqtt_engine;

import org.eclipse.paho.client.mqttv3.IMqttClient;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;

import javax.annotation.PostConstruct;
import java.util.UUID;


public class SensorClient {

    private static final String BROKER_IP_AND_PORT = "tcp://192.168.0.113:1883";
    private IMqttClient publisher;
    private IMqttClient subscriber;



    @PostConstruct
    public void createClients(){
        this.publisher = createClient();
        this.subscriber = createClient();
        try {
            publisher.connect(setConnectionOptions());
            subscriber.connect(setConnectionOptions());
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }

    public IMqttClient getPublisher() {
        return publisher;
    }

    public IMqttClient getSubscriber() {
        return subscriber;
    }

    public IMqttClient createClient(){
        final String publisherId = UUID.randomUUID().toString();
        try {
            return new MqttClient(BROKER_IP_AND_PORT, publisherId);
        } catch (MqttException e) {
            throw new RuntimeException(e);
        }
    }

    private MqttConnectOptions setConnectionOptions(){
        final MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);
        options.setConnectionTimeout(50);
        return options;
    }

}
