import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "./../../components/UI/Input/Input";
import Button from "./../../components/UI/Button/Button";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  inputChangedHandler = ({ target }, identifier) => {
    const formUpdated = {
      ...this.state.controls,
      [identifier]: {
        ...this.state.controls[identifier],
        value: target.value,
        valid: this.checkValidity(
          target.value,
          this.state.controls[identifier].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: formUpdated });
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) return true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    const form = formElements.map((elem) => (
      <Input
        key={elem.id}
        elementType={elem.config.elementType}
        value={elem.config.value}
        elementConfig={elem.config.elementConfig}
        invalid={!elem.config.valid}
        shouldValidate={elem.config.validation}
        touched={elem.config.touched}
        changed={(event) => this.inputChangedHandler(event, elem.id)}
      />
    ));
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, method) =>
      dispatch(actions.auth(email, pass, method)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
