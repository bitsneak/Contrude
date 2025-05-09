import paho.mqtt.client as mqtt
import time
import random
import threading
import signal
import sys
import argparse

# Parse command-line arguments
parser = argparse.ArgumentParser(description="MQTT Publisher Script")

# Define mandatory arguments with short flags
parser.add_argument("-ba", "--broker_address", required=True, type=str)
parser.add_argument("-bp", "--broker_port", required=True, type=int)
parser.add_argument("-mu", "--mqtt_username", required=True, type=str, help="Needs to be quoted with ''")
parser.add_argument("-mp", "--mqtt_password", required=True, type=str)

# Parse the arguments
args = parser.parse_args()

# MQTT broker details
broker_address = args.broker_address
broker_port = args.broker_port
mqtt_username = args.mqtt_username
mqtt_password = args.mqtt_password

# Time interval
interval = 30

# Ship and container details
g_n_ships = 4
g_n_containers = 9

# Define MQTT client and connect to broker
client = mqtt.Client()

# Set username and password for the connection
client.username_pw_set(mqtt_username, mqtt_password)

# Connect to the MQTT broker
client.connect(broker_address, broker_port)

# Signal handler function to handle Ctrl+C
def signal_handler(sig, frame):
    # Clean up before exiting
    client.disconnect()
    print("Exiting Script")
    sys.exit(0)
    
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
            print(f"{{\"Message\": \"{val}\", \"Topic\": \"{mqtt_topic}\", \"Host\": \"{broker_address}\"}}")

# Wrapping each data type in a separate thread
def publish_temperature():
    publish_data(
        val=20,
        min_val=5,
        max_val=70,
        mqtt_topic_template="contrude/{}/{}/temperature",
        n_ships=g_n_ships,
        n_containers=g_n_containers
    )

def publish_humidity():
    publish_data(
        val=50,
        min_val=5,
        max_val=100,
        mqtt_topic_template="contrude/{}/{}/humidity",
        n_ships=g_n_ships,
        n_containers=g_n_containers
    )

def publish_air_pressure():
    publish_data(
        val=1,
        min_val=1,
        max_val=10,
        mqtt_topic_template="contrude/{}/{}/pressure",
        n_ships=g_n_ships,
        n_containers=g_n_containers
    )

def publish_vibration():
    publish_data(
        val=20,
        min_val=5,
        max_val=100,
        mqtt_topic_template="contrude/{}/{}/vibration",
        n_ships=g_n_ships,
        n_containers=g_n_containers
    )
    
def publish_longitude():
    publish_data(
        val=0,
        min_val=-180,
        max_val=180,
        mqtt_topic_template="contrude/{}/{}/longitude",
        n_ships=g_n_ships,
        n_containers=g_n_containers
    )

def publish_latitude():
    publish_data(
        val=0,
        min_val=-90,
        max_val=90,
        mqtt_topic_template="contrude/{}/{}/latitude",
        n_ships=g_n_ships,
        n_containers=g_n_containers
    )
    
def publish_altitude():
    publish_data(
        val=100,
        min_val=-10,
        max_val=700,
        mqtt_topic_template="contrude/{}/{}/altitude",
        n_ships=g_n_ships,
        n_containers=g_n_containers
    )


# Main loop to run threads for all sensors simultaneously
while True:        
    # Create threads for each data type
    temp_thread = threading.Thread(target=publish_temperature)
    humidity_thread = threading.Thread(target=publish_humidity)
    pressure_thread = threading.Thread(target=publish_air_pressure)
    vibration_thread = threading.Thread(target=publish_vibration)
    longitude_thread = threading.Thread(target=publish_longitude)
    latitude_thread = threading.Thread(target=publish_latitude)
    altitude_thread = threading.Thread(target=publish_altitude)

    # Start the threads
    temp_thread.start()
    humidity_thread.start()
    pressure_thread.start()
    vibration_thread.start()
    longitude_thread.start()
    latitude_thread.start()
    altitude_thread.start()

    # Wait for all threads to complete
    temp_thread.join()
    humidity_thread.join()
    pressure_thread.join()
    vibration_thread.join()
    longitude_thread.join()
    latitude_thread.join()
    altitude_thread.join()

    # Sleep for the interval between sets of data points (before restarting the loop)
    print("")
    time.sleep(interval)