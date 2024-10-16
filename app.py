from flask import Flask, render_template, request
from datetime import datetime
import pytz

app = Flask(__name__)

# Define a list of timezones
timezones = pytz.all_timezones

@app.route('/', methods=['GET', 'POST'])
def index():
    # Default to Kolkata IST
    kolkata_tz = pytz.timezone('Asia/Kolkata')
    
    if request.method == 'POST':
        selected_timezone = request.form['timezone']
        # Get the current time in the selected timezone
        tz = pytz.timezone(selected_timezone)
        current_time = datetime.now(tz).strftime('%H:%M:%S')
    else:
        # Use Kolkata time by default
        selected_timezone = 'Asia/Kolkata'
        current_time = datetime.now(kolkata_tz).strftime('%H:%M:%S')

    return render_template('clock.html', current_time=current_time, timezones=timezones, selected_timezone=selected_timezone)

if __name__ == '__main__':
    app.run(debug=True)
