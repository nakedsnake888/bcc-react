import React, { Component } from "react";
import { toast } from "react-toastify";

class AlertDismissible extends Component {
  //notifica conferma
  example() {
    const notify = () => {
      toast("Default Notification !");

      toast.warn("Warning Notification !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    };

    return <button onClick={notify}>Notify</button>;
  }
  render() {
    const { show } = this.props;

    return (
      <div>
        {show && (
          <>
            <div className="alert alert-primary" role="alert">
              This is a primary alert—check it out!
              <hr></hr>
              {() => this.example()}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default AlertDismissible;
