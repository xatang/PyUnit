import argparse
import requests

def set_status(id, preset_id=None):
    """Send POST request to set dryer preset or reset to PENDING status.
    
    Args:
        id: Dryer ID (path parameter)
        preset_id: Optional preset ID (query parameter). If None, resets dryer to PENDING.
    """
    url = f"http://localhost:5000/api/dashboard/control/set-preset/{id}"
    # preset_id goes as QUERY parameter, not body
    params = {}
    if preset_id is not None:
        params['preset_id'] = preset_id
    
    try:
        response = requests.post(url, params=params)
        if response.ok:
            result = response.json()
            print('Status updated:', result.get('message', ''))
        else:
            print(f'HTTP error {response.status_code}: {response.text}')
    except Exception as error:
        print('Error:', error)


def main():
    parser = argparse.ArgumentParser(description="PyUinit Api Script")
    parser.add_argument('--id', type=int, required=True, help="iDryer ID")
    parser.add_argument('--preset_id', type=int,
                        required=False, help="Preset ID")
    args = parser.parse_args()
    if args.preset_id == None:
        print('Off')
    else:
        print(f'Set: Preset: {args.preset_id}')
    set_status(id=args.id, preset_id=args.preset_id)


if __name__ == "__main__":
    main()