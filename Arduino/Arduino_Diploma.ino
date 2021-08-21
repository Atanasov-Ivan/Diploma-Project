/******************************************************************************
MQTT_Switch_Example.ino
Example for controlling a light using an MQTT switch
by: Alex Wende, SparkFun Electronics

This sketch connects the ESP32 to a MQTT broker and subcribes to the topic
room/light. When the button is pressed, the client will toggle between
publishing "on" and "off".
******************************************************************************/

#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

#define DHTPIN 4
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

const char *ssid =  "*******";   // name of your WiFi network
const char *password =  "******"; // password of the WiFi network

const byte SWITCH_PIN = 0;           // Pin to control the light with
const char *ID = "Example_Switch";  // Name of our device, must be unique
const char *TOPIC = "room";  // Topic to subcribe to
const char *STATE_TOPIC = "room/s";
char msg[50];

IPAddress broker(192,168,0,113); // IP address of your MQTT broker eg. 192.168.1.50
WiFiClient wclient;

PubSubClient client(wclient); // Setup MQTT client

bool state=0;

DHT dht(DHTPIN, DHTTYPE);
const long interval_DHT = 2000;
const int LEDPIN = 19;
const int FANPIN = 17;
const int MOIST_PIN = 33;
const int LIGHT_PIN = 32;
const int GAS_PIN = 34;
unsigned long previousMillis_DHT = 0;

void callback(char* topic, byte* payload, unsigned int length) {
  String response;

  for (int i = 0; i < length; i++) {
    response += (char)payload[i];
  }
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  Serial.println(response);
  if(response == "on")  // Turn the light on
  {
    digitalWrite(LEDPIN, HIGH);
    client.publish(STATE_TOPIC,"on");
  }
  else if(response == "off")  // Turn the light off
  {
    digitalWrite(LEDPIN, LOW);
    client.publish(STATE_TOPIC,"off");
  }
  if(response == "on_fan")  // Turn the light on
  {
    digitalWrite(FANPIN, HIGH);
    client.publish(STATE_TOPIC,"on_fan");
  }
  else if(response == "off_fan")  // Turn the light off
  {
    digitalWrite(FANPIN, LOW);
    client.publish(STATE_TOPIC,"off_fan");
  }
}

void setup_DHT(){
  Serial.println(F("DHTxx test!"));
  dht.begin();
}

void loop_DHT(){

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis_DHT >= interval_DHT) {
    // save the last time you blinked the LED
    previousMillis_DHT = currentMillis;


    int moist_val = 0;
    moist_val = analogRead(MOIST_PIN);
    Serial.println(moist_val);

    if (isnan(moist_val)){
      Serial.println(F("Failed to read moist_val!"));
      return;
    }

    int light_val = 0;
    light_val = analogRead(LIGHT_PIN);
    Serial.println(light_val);

    if (isnan(light_val)){
      Serial.println(F("Failed to read light_val!"));
      return;
    }

    int gas_val = 0;
    gas_val = analogRead(GAS_PIN);
    Serial.println(gas_val);

    if (isnan(gas_val)){
      Serial.println(F("Failed to read gas_val!"));
      return;
    }

    // Reading temperature or humidity takes about 250 milliseconds!
    // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
    float h = dht.readHumidity();
    // Read temperature as Celsius (the default)
    float t = dht.readTemperature();
    // Read temperature as Fahrenheit (isFahrenheit = true)
    float f = dht.readTemperature(true);
    
    // Check if any reads failed and exit early (to try again).
    if (isnan(h) || isnan(t) || isnan(f)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    }
    
    // Compute heat index in Fahrenheit (the default)
    float hif = dht.computeHeatIndex(f, h);
    // Compute heat index in Celsius (isFahreheit = false)
    float hic = dht.computeHeatIndex(t, h, false);
    
    Serial.printf("Humidity: %f Temp: %f Index: %f\n" ,h,t,f);
    String pubString = String(h)+" "+String(t)+" "+String(f)+" "+String(moist_val)+" "+String(light_val)+" "+String(gas_val);
    pubString.toCharArray(msg, pubString.length()+1);
    client.publish(TOPIC, msg);
  }
}

// Connect to WiFi network
void setup_wifi() {
  Serial.print("\nConnecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password); // Connect to network

  while (WiFi.status() != WL_CONNECTED) { // Wait for connection
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

// Reconnect to client
void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(ID)) {
      client.subscribe(TOPIC);
      Serial.println("connected");
      Serial.print("Subcribed to: ");
      Serial.println(TOPIC);
      Serial.println('\n');

    } else {
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200); // Start serial communication at 115200 baud
  setup_DHT();
  //pinMode(SWITCH_PIN,INPUT);  // Configure SWITCH_Pin as an input
  //digitalWrite(SWITCH_PIN,HIGH);  // enable pull-up resistor (active low)
  delay(100);
  setup_wifi(); // Connect to network
  client.setServer(broker, 1883);
  client.setCallback(callback);
  //client.subscribe(subTopic);
  pinMode(LEDPIN, OUTPUT);
  digitalWrite(LEDPIN, LOW);
}

void loop() {
  if (!client.connected())  // Reconnect if connection is lost
  {
    reconnect();
  }
  client.loop();
  loop_DHT();
  // if the switch is being pressed
  //delay(20);
}
