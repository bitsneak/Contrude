import paho.mqtt.client as mqtt
import time
import random
import threading
import signal
import sys

# MQTT broker details
broker_address = "mqtt.contrude.eu"  # Replace with your MQTT broker's address
broker_port = 1883                   # Default port for MQTT

# MQTT authentication details
mqtt_username = "contrude"      # Replace with your MQTT username
mqtt_password = "Hg!6V3&62yWv"      # Replace with your MQTT password

# Time interval
interval = 30

# Define MQTT client and connect to broker
client = mqtt.Client()

# Set username and password for the connection
client.username_pw_set(mqtt_username, mqtt_password)

# Connect to the MQTT broker
client.connect(broker_address, broker_port)

keep_running = True

# Signal handler function to handle Ctrl+C
def signal_handler(sig, frame):
    global keep_running
    print("Gracefully exiting...")
    keep_running = False  # Set the flag to False to break the while loop
    
# Register the signal handler for SIGINT (Ctrl+C)
signal.signal(signal.SIGINT, signal_handler)

# Function to send MQTT messages at defined intervals
def publish_data(val, min_val, max_val, mqtt_topic_template, n_ships, n_containers):
    for i in range(n_ships):
        for j in range(n_containers):  # Loop through all containers
            # Update the temperature with the random value and operation
            val += round(random.choice([1, -1]) * round(random.uniform(0, 10), 2), 2)
            
            # Ensure the value stays within the given bounds
            if val >= max_val:
                val = max_val
            elif val <= min_val:
                val = min_val
            
            # Update only the container number in the topic
            mqtt_topic = mqtt_topic_template.format(i + 1, j + 1)
            
            # Publish message to the specified topic
            client.publish(mqtt_topic, val)
            print(f"Message '{val}' sent to topic '{mqtt_topic}' on host '{broker_address}'")

# Wrapping each data type in a separate thread
def publish_temperature():
    publish_data(
        val=20,
        min_val=5,
        max_val=70,
        mqtt_topic_template="contrude/{}/{}/temperature",
        n_ships=2,
        n_containers=2
    )

def publish_humidity():
    publish_data(
        val=50,
        min_val=5,
        max_val=100,
        mqtt_topic_template="contrude/{}/{}/humidity",
        n_ships=2,
        n_containers=2
    )

def publish_air_pressure():
    publish_data(
        val=1,
        min_val=1,
        max_val=10,
        mqtt_topic_template="contrude/{}/{}/pressure",
        n_ships=2,
        n_containers=2
    )

def publish_vibration():
    publish_data(
        val=20,
        min_val=5,
        max_val=100,
        mqtt_topic_template="contrude/{}/{}/vibration",
        n_ships=2,
        n_containers=2
    )


# Main loop to run threads for all sensors simultaneously
while keep_running:
    # Create threads for each data type
    temp_thread = threading.Thread(target=publish_temperature)
    humidity_thread = threading.Thread(target=publish_humidity)
    pressure_thread = threading.Thread(target=publish_air_pressure)
    vibration_thread = threading.Thread(target=publish_vibration)

    # Start the threads
    temp_thread.start()
    humidity_thread.start()
    pressure_thread.start()
    vibration_thread.start()

    # Wait for all threads to complete
    temp_thread.join()
    humidity_thread.join()
    pressure_thread.join()
    vibration_thread.join()

    # Sleep for the interval between sets of data points (before restarting the loop)
    print("")
    time.sleep(interval)

# Clean up before exiting
client.disconnect()
sys.exit(0)