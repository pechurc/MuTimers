require('dotenv').config()
import MuTimers from "./MuTimers";

const TOKEN = process.env.TOKEN;

const client = new MuTimers();

client.login(TOKEN);
