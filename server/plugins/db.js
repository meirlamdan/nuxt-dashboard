import { connect } from "../db/dbConnect";

export default defineNitroPlugin(async (nitroApp) => {
  await connect();
  console.log('Connected to db');
})