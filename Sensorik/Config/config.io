; PlatformIO Project Configuration File
;
;&nbsp;&nbsp; Build options: build flags, source filter
;&nbsp;&nbsp; Upload options: custom upload port, speed and extra flags
;&nbsp;&nbsp; Library options: dependencies, extra library storages
;&nbsp;&nbsp; Advanced options: extra scripting
;
; Please visit documentation for the other options and examples
; https://docs.platformio.org/page/projectconf.html



[env:wemos_d1_mini32]
platform = espressif32
board = wemos_d1_mini32
board_build.partitions = min_spiffs.csv
framework = arduino
monitor_speed = 115200
lib_deps =&nbsp;
 &nbsp;&nbsp; me-no-dev/AsyncTCP@^1.1.1
 &nbsp;&nbsp; mcxiaoke/ESPDateTime@^1.0.4