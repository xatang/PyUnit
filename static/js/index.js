const resizer = document.getElementById('resizer');
const left = document.getElementById('left');
const right = document.getElementById('right');
const overlay = document.getElementById('overlay');
const container = document.querySelector('.split-container');

let isResizing = false;

const savedLeftWidth = localStorage.getItem('leftWidth');
if (savedLeftWidth) {
    left.style.flex = `0 0 ${savedLeftWidth}px`;
    right.style.flex = `1 1 calc(100% - ${savedLeftWidth}px)`;
}

resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    overlay.style.display = 'block';
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
    document.addEventListener('mouseleave', stopResize);
});

function resize(e) {
    if (isResizing) {
        const containerRect = container.getBoundingClientRect();
        const leftWidth = e.clientX - containerRect.left;

        const minWidth = 10;
        if (leftWidth >= minWidth && leftWidth <= containerRect.width - minWidth) {
            left.style.flex = `0 0 ${leftWidth}px`;
            right.style.flex = `1 1 calc(100% - ${leftWidth}px)`;
            localStorage.setItem('leftWidth', leftWidth);
        }
    }
}

function stopResize() {
    isResizing = false;
    overlay.style.display = 'none';
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
    document.removeEventListener('mouseleave', stopResize);
}


async function updateData() {
    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network or server error');
            return
        }
        const data = await response.json();
        for (const data_element of data) {
            document.getElementById('status_' + data_element.id).textContent = data_element.status;
            document.getElementById('temperature_' + data_element.id).textContent = data_element.temperature;
            document.getElementById('absolute_humidity_' + data_element.id).textContent = data_element.absolute_humidity;
            document.getElementById('relative_humidity_' + data_element.id).textContent = data_element.relative_humidity;
            document.getElementById('time_' + data_element.id).textContent = data_element.time_left;
        }
    } catch (error) {
        console.error('Error updating data:', error);
        return null;
    }

}

async function controlStatus(id, status, preset_id = null, custom_preset = null) {
    const url = '/status/' + id;
    const data = {
        id: id,
        status: status,
        preset_id: preset_id,
        custom_preset: custom_preset
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function controlForm(id) {
    const formData = {
        temperature: document.getElementById('input_'+id+'_temperature').value,
        max_temperature_delta: document.getElementById('input_'+id+'_max_temperature_delta').value,
        humidity: document.getElementById('input_'+id+'_humidity').value,
        dry_time: document.getElementById('input_'+id+'_dry_time').value,
        storage_temperature: document.getElementById('input_'+id+'_storage_temperature').value,
        humidity_storage_range: document.getElementById('input_'+id+'_humidity_storage_range').value,
        humidity_storage_dry_time: document.getElementById('input_'+id+'_humidity_storage_dry_time').value
    };
    controlStatus(id, 1, null, formData);
}
