import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";

function startListener(){
    subscribeToQueue("user_created", async(msg)=>{
        const {email, role, fullname:{firstName, lastName}} = msg;

        const template = `
            <h1>Welcome to Moodify </h1>
            <p>Dear ${firstName} </p>
            <p>Thankyou for registering with Moodify</p>
            <span>We hope you enjoy our service </span>
            <br/>
            <p>Best Regard, </p>
            <p>Team Moodify</p>
        `
        await sendEmail(email, "Hi there!", "Thankyou, for registering with Moodify", template)
    })
}

export default startListener;