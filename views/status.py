from aiohttp import web
from idryer.idryer_objects import iDryer_preset


class StatusHandler(web.View):
    async def get(self):
        idryer_id = int(self.request.match_info.get("idryer_id"))
        self.request.app.logger.info(f"Handling GET request for iDryer status (ID={idryer_id}) from {self.request.remote}")
        idryers = self.request.app.idryers
        for idryer in idryers:
            if idryer_id == idryer.id:
                self.request.app.logger.debug(f"Found iDryer with ID {idryer_id}. Returning JSON response")
                return web.json_response(idryer.to_json())
        self.request.app.logger.warning(f"iDryer with ID {idryer_id} not found. Returning 404")
        return web.Response(status=404)

    async def post(self):
        idryer_id = int(self.request.match_info.get("idryer_id"))
        self.request.app.logger.info(f"Handling POST request for iDryer status (ID={idryer_id}) from {self.request.remote}")
        data = await self.request.json()
        id = data.get('id')
        if idryer_id != id:
            self.request.app.logger.warning(f"ID mismatch in request. Expected {idryer_id}, got {id}. Returning 405")
            return web.Response(status=405)
        try:
            status = int(data.get('status'))
            if status < 0 or status > 1:
                raise TypeError
        except TypeError:
            self.request.app.logger.warning(f"Invalid status value: {data.get('status')}. Returning 406")
            return web.Response(status=406)
        
        preset_id = data.get('preset_id')
        if preset_id != None:
            try:
                preset_id = int(preset_id)
            except TypeError:
                self.request.app.logger.warning(f"Invalid preset_id value: {preset_id}. Returning 406")
                return web.Response(status=406)
        
        custom_preset = data.get('custom_preset')
        if custom_preset != None:
            try:
                temperature = float(custom_preset['temperature'])
                max_temperature_delta = float(custom_preset['max_temperature_delta'])
                humidity = float(custom_preset['humidity'])
                dry_time = int(custom_preset['dry_time'])
                storage_temperature = float(custom_preset['storage_temperature'])
                humidity_storage_range = float(custom_preset['humidity_storage_range'])
                humidity_storage_dry_time = float(custom_preset['humidity_storage_dry_time'])
            except TypeError:
                self.request.app.logger.warning(f"Invalid custom_preset data. Returning 406")
                return web.Response(status=406)

            if (temperature < 0 or max_temperature_delta < 0 or humidity < 0 or 
                dry_time < 1 or storage_temperature < 0 or humidity_storage_range < 0 or 
                humidity_storage_dry_time < 1 or humidity > 100):
                self.request.app.logger.warning(f"Invalid custom_preset values. Returning 406")
                return web.Response(status=406)
            
            custom_preset = iDryer_preset(
                id=-100,
                name='Custom',
                temperature=temperature,
                max_temperature_delta=max_temperature_delta,
                humidity=humidity,
                dry_time=dry_time,
                storage_temperature=storage_temperature,
                humidity_storage_range=humidity_storage_range,
                humidity_storage_dry_time=humidity_storage_dry_time
            )
            self.request.app.logger.debug(f"Created custom preset: {custom_preset}")

        if custom_preset == None and preset_id == None and status != 0:
            return web.Response(status=406)

        idryers = self.request.app.idryers
        for idryer in idryers:
            if idryer_id == idryer.id:
                self.request.app.logger.debug(f"Changing status for iDryer (ID={idryer_id}) to {status}")
                await idryer.change_status(new_status=status, preset_id=preset_id, custom_preset=custom_preset)
                return web.Response(status=200)
        
        self.request.app.logger.warning(f"iDryer with ID {idryer_id} not found. Returning 404")
        return web.Response(status=404)