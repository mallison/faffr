from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/slots', methods=['GET', 'POST'])
def slots():
    if request.method == 'POST':
        return _save_slots()
    else:
        return _return_slots(), 200, {'Content-Type': 'application/json'}


def _save_slots():
    with open('slots.json', 'w') as f:
        f.write(request.data)
    return 'Ok'


def _return_slots():
    with open('slots.json') as f:
        return f.read()


if __name__ == '__main__':
    app.run(debug=True)
