from flask import Flask,render_template, redirect, url_for
from flask_wtf import FlaskForm, RecaptchaField
from flask_sqlalchemy import SQLAlchemy
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired,Length,EqualTo,AnyOf,ValidationError
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user,logout_user, current_user
app=Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']= 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'THISISArandomsecerebtssdfh123'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer,primary_key=True)
    email = db.Column(db.String(90), nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"User('{self.email}')"


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8,max=128)])


class RegistrationForm(FlaskForm):
    email = StringField('Email', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired(), Length(min=8, max=128)])
    confirm = PasswordField('Confirm Password',validators=[EqualTo('password'),InputRequired(),Length(min=8,max=128)])

    def validate_email(self,email):
        email = User.query.filter_by(email = email.data).first()
        if email:
            raise ValidationError('Email Already Taken')

@app.route('/')
def home():
    return render_template("home.html")


@app.route('/login', methods=['GET','POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password,form.password.data):
            login_user(user)
            return redirect(url_for('home'))
    return render_template("login.html",form=form)



@app.route('/register', methods=['GET','POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashedpw=bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user=User(email=form.email.data,password=hashedpw)
        db.session.add(user)
        db.session.commit()
        return "Registration Successful"
    return render_template('registration.html',form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))

app.run(debug=True,host='127.0.0.1')