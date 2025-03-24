from idryer.idryer_objects import iDryer, iDryer_preset
from idryer.moonraker_api import Moonraker_api
import asyncio
from misc.logs import logger
import traceback


async def moonraker_data_updater(app):
    try:
        logger.info("Starting moonraker_data_updater")
        idryers = []
        moonraker_api = Moonraker_api(ip=app.config["moonraker_ip"], port=app.config["moonraker_port"],
                                      api_key=app.config["moonraker_api_key"], api_method=app.config["moonraker_api_method"])
        logger.debug(
            f"Initialized Moonraker_api with IP: {app.config['moonraker_ip']}, Port: {app.config['moonraker_port']}, API Method: {app.config['moonraker_api_method']}")

        idryers_counter = 0
        moonraker_api_data_flag = True
        while moonraker_api_data_flag:
            try:
                iDryer_settings = await moonraker_api.get_idryer_settings()
                heater_max_temp = iDryer_settings[app.config["idryers"]
                                                  [0]['heater']]['max_temp']
            except:
                logger.error('Cannot connect to Moonraker API')
                await asyncio.sleep(3)
            else:
                moonraker_api_data_flag = False
        logger.info(f"Found {len(app.config['idryers'])} iDryers in config")
        for idryer in app.config["idryers"]:
            presets = []
            presets_counter = 0
            logger.debug(
                f"Processing iDryer '{idryer['name']}' with {len(idryer['presets'])} presets")
            for preset in idryer['presets']:
                preset = iDryer_preset(
                    id=presets_counter,
                    name=preset['name'],
                    temperature=preset['temperature'],
                    max_temperature_delta=preset['max_temperature_delta'],
                    humidity=preset['humidity'],
                    dry_time=preset['dry_time'],
                    storage_temperature=preset['storage_temperature'],
                    humidity_storage_dry_time=preset['humidity_storage_dry_time'],
                    humidity_storage_range=preset['humidity_storage_range']
                )
                presets.append(preset)
                presets_counter += 1
                logger.debug(
                    f"Added preset '{preset.name}' to iDryer '{idryer['name']}'")

            idryer = await iDryer(
                id=idryers_counter,
                name=idryer['name'],
                moonraker_api=moonraker_api,
                heater=idryer['heater'],
                heater_fan_name=idryer['heater_fan'],
                heater_max_temperature=iDryer_settings[idryer['heater']]['max_temp'],
                temperature_sensor=idryer['temperature_sensor'],
                led=idryer['led'],
                led_brightness=idryer['led_brightness'],
                servo_name=idryer['servo']['name'],
                servo_open_angle=idryer['servo']['open_angle'],
                servo_close_angle=idryer['servo']['close_angle'],
                presets=presets,
                humidity_open_treshold=idryer['humidity_open_treshold'],
                humidity_close_treshold=idryer['humidity_close_treshold'],
                humidity_plateau_duration=idryer['humidity_plateau_duration'],
                humidity_plateau_window_size=idryer['humidity_plateau_window_size'],
                humidity_timer_drying_range=idryer['humidity_timer_drying_range']
            ).create()
            idryers.append(idryer)
            idryers_counter += 1
            logger.info(f"Successfully created iDryer '{idryer.name}'")

        app.idryers = idryers
        logger.info(f"Total iDryers initialized: {len(idryers)}")
    except Exception as e:
        logger.error(
            f"Error during moonraker_data_updater initialization: {e}")
        logger.error(traceback.format_exc())

    while True:
        try:
            logger.debug("Updating all iDryers")
            for idryer in app.idryers:
                await idryer.update_all()
        except Exception as e:
            logger.error(f"Error during iDryer update: {e}")
        else:
            logger.debug(f"Sleeping for {app.config['update_rate']} seconds")
            await asyncio.sleep(app.config['update_rate'])
