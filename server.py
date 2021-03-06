import os

from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

database_uri = os.environ.get(
    'SQLALCHEMY_DATABASE_URI',
    'sqlite:///faffr.db'
)
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Timesheet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slots = db.Column(db.Text())

    def __init__(self, slots):
        self.slots = slots

# See http://flask.pocoo.org/snippets/57/
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def hello_world(path):
    return render_template(
        'index.html',
        is_production=os.environ.get('FAFFR_ENV') == 'production'
    )


@app.route('/slots', methods=['GET', 'POST'])
def slots():
    if request.method == 'POST':
        _save_slots()
        return 'Ok'
    else:
        return _return_slots(), 200, {'Content-Type': 'application/json'}


def _save_slots():
    timesheets = Timesheet.query.all()
    if not timesheets:
        timesheet = Timesheet(slots=request.data)
        db.session.add(timesheet)
    else:
        timesheet = timesheets[0]
        timesheet.slots = request.data
    db.session.commit()


def _return_slots():
    timesheets = Timesheet.query.all()
    if timesheets:
        return timesheets[0].slots
    return '[]'


if __name__ == '__main__':
    app.run(debug=True)
