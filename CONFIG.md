# Configuration Parameters Description

## General Parameters

Name | Description | Type | Default Value
:--- | :--- | :--- | :---
`app_ip` | Generally equal to the default value | `Str` | `0.0.0.0`
`app_port` | Desired port for the application | `Int` | `5000`
`moonraker_api_method` | HTTP method for connecting to Moonraker | `Str` | `http`
`moonraker_ip` | Generally equal to the default value | `Str` | `localhost`
`moonraker_port` | Moonraker port | `Int` | `7125`
`app_log_level` | Logging level for the drying process | `Str` | `INFO`
`web_log_level` | Logging level for the web server | `Str` | `ERROR`
`moonraker_api_key` | API key for Moonraker. [How to get it](https://moonraker.readthedocs.io/en/latest/installation/#:~:text=Retrieving%20the%20API%20Key,-Some%20clients%20may&text=Navigate%20to%20http%3A%2F%2F%7B,API%20Key%20without%20the%20quotes.) | `Str`  | 
`idryers` | List of units connected to the host | `List`

## Idryer

Name | Description | Type | Default Value
:--- | :--- | :--- | :---
`name` | Unit name | `Str` | `U1`
`heater` | Heater name from the unit configuration | `Str` | `heater_generic idryer_u1_heater`
`heater_fan` | Heater fan name from the unit configuration | `Str` | `heater_fan fan_u1`
`temperature_sensor` | Temperature sensor name from the unit configuration | `Str` | `sht3x idryer_u1_air`
`led` | LED panel name from the unit configuration | `Str` | `neopixel sprd`
`led_brightness` | LED panel brightness | `Int` | `100`
`humidity_open_treshold` | Threshold for opening the shutter during drying | `Float` | `0.1`
`humidity_close_treshold` | Threshold for closing the shutter during drying | `Float` | `0.2`
`humidity_plateau_duration` | Number of seconds to evaluate reaching a plateau | `Str` | `30`
`humidity_plateau_window_size` | Window size for evaluating plateau values | `Str` | `5`
`humidity_timer_drying_range` | Allowed humidity fluctuation during Timer Drying | `Float` | `1.0`
`servo`| Servo object | `Dict` |
`name` | Servo name from the unit configuration | `Str` | `servo srv_u1`
`close_angle` | Servo angle in the "closed" position | `Int` | `125`
`open_angle` | Servo angle in the "open" position | `Int` | `30`
`presets` | List of drying presets | `List` |

### Preset

Name | Description | Type | Default Value
:--- | :--- | :--- | :---
`name` | Preset name | `Str` | `default`
`temperature` | Target drying temperature | `Int` | `60`
`max_temperature_delta` | Maximum temperature overshoot delta | `Int` | `20`
`humidity` | Target humidity | `Int` | `10`
`dry_time` | Drying time, in minutes | `Int` | `60`
`storage_temperature` | Storage temperature in Temperature storage mode | `Int` | `0`
`humidity_storage_dry_time` | Drying time in minutes in Humidity storage mode | `Int` | `10`
`humidity_storage_range` | Humidity overshoot threshold to start drying in Humidity storage mode | `Float` | `3`

> It is also important to note that at least one preset must be defined. The first preset in the list is used as the default parameters for the Dry button in the web panel.