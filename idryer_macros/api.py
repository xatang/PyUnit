import argparse
import requests
import json

config = json.load(open('/home/orangepi/PyUnit/config.json'))


def set_status(id, status, preset_id=None, custom_preset=None):
    url = f"http://{config['moonraker_ip']}:{config['app_port']}/status/{id}"
    data = {
        'id': id,
        'status': status,
        'preset_id': preset_id,
        'custom_preset': custom_preset
    }
    headers = {
        'Content-Type': 'application/json'
    }
    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        print('Status updated')
        if not response.ok:
            print(f'HTTP error: {response.status_code}')
    except Exception as error:
        print('Error:', error)


def main():
    parser = argparse.ArgumentParser(description="PyUinit Api Script")
    parser.add_argument('--id', type=int, required=True, help="iDryer ID")
    parser.add_argument('--status', type=int, required=True,
                        help="Status 0 - Pending; 1 - Drying")
    parser.add_argument('--preset_id', type=int,
                        required=False, help="Preset ID")
    parser.add_argument('--temperature', type=float,
                        required=False, help="Temperature")
    parser.add_argument('--max_temperature_delta', type=float,
                        required=False, help="Max temperature delta")
    parser.add_argument('--humidity', type=int,
                        required=False, help="Humidity")
    parser.add_argument('--dry_time', type=int,
                        required=False, help="Dry time")
    parser.add_argument('--storage_temperature', type=int,
                        required=False, help="Storage temperature")
    parser.add_argument('--humidity_storage_dry_time', type=int,
                        required=False, help="Humidity storage dry time")
    parser.add_argument('--humidity_storage_range', type=float,
                        required=False, help="Humidity storage dry time")
    args = parser.parse_args()
    custom_preset = {
        'temperature': args.temperature,
        'max_temperature_delta': args.max_temperature_delta,
        'humidity': args.humidity,
        'dry_time': args.dry_time,
        'storage_temperature': args.storage_temperature,
        'humidity_storage_range': args.humidity_storage_range,
        'humidity_storage_dry_time': args.humidity_storage_dry_time
    }
    all_none = all(value is None for value in custom_preset.values())
    none_none = all(value is not None for value in custom_preset.values())
    if all_none:
        if args.status == 0:
            print('Off')
        else:
            print(f'Set: Preset: {args.preset_id}')
        set_status(id=args.id, status=args.status, preset_id=args.preset_id)
    elif none_none:
        print(f'Set: T: {args.temperature} | Td: {args.max_temperature_delta} | H: {args.humidity} | T: {args.dry_time} | St: {args.storage_temperature} | Hst {args.humidity_storage_dry_time} | Hsr: {args.humidity_storage_range}')
        set_status(id=args.id, status=args.status, custom_preset=custom_preset)
    else:
        print('Args error')


if __name__ == "__main__":
    main()
