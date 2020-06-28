import { Stitch, UserPasswordCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

let wasClientLoaded = false;

async function loadClient() {
  if (wasClientLoaded) {
    return;
  }

  // console.log('try to connect to mongo-db');

  const client = await Stitch.initializeDefaultAppClient("cyber-xlqpr");
  const user = await client.auth.loginWithCredential(new UserPasswordCredential('cyberDSystem@gmail.com', 'CyberStitch2020'));

  if (!user) {
    throw new Execption("Failed to connect to mongo-db");
  }

  wasClientLoaded = true;
}

export async function login(userNumber, userPassword) {

  await loadClient();

  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const users = db.collection("ICS_users");
  return await users.findOne({ number: parseInt(userNumber), password: userPassword });
}

//get general data for dashboard
export async function getDashboardData() {
  const mongoClient = Stitch.defaultAppClient.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");
  const db = mongoClient.db("CyberDefence");
  const systems = db.collection("Systems");
  const users = db.collection("users");
  let stage1 = "חישוב רמת סיכון";
  let stage2 = "ביצוע בקרות";
  let stage3 = "סיום";
  let organizations= await users.find().toArray()
  let Systems = await systems.find().toArray()
  let systemsStageOne= await systems.find({  status: stage1 }).toArray()
  let systemsStageTwo= await systems.find({ status:stage2 }).toArray()
  let doneSystems = await systems.find({ status: stage3 }).toArray()
  let results = { organizations: await organizations.length, systems: await Systems.length, systemsStageOne: await systemsStageOne.length, systemsStageTwo: await systemsStageTwo.length, doneSystems: await doneSystems.length }
  return await results
}