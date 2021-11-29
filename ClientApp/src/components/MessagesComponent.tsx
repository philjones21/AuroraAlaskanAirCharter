import React from "react";
import { Constants } from "../code/Constants";

const Messages = (state) => {
    return (
        <section className="message">
            <section className="message_content text_large" id="loading_msg" >
                Loading...
            </section>
            <section className="message_content text_large" id="processing_msg">
                Processing...
            </section>
            <section className="messsage_container message_content" id="error_msg">

                <div className="button1" >Close</div>
            </section>
            <section className="messsage_container message_content" id="confirmation_msg">

                <div className="button1" >Close</div>
            </section>
            <section className="messsage_container message_content" id="validation_msg">

                <div className="button1" >Close</div>
            </section>
        </section>
    )
}

export default Messages;