import { Router } from "express";
const router = Router();

/** import all controllers */
import * as controller from "../controllers/appController.js";
import { registerMail } from "../controllers/mailer.js";
import Auth, { localVariables } from "../middleware/auth.js";

/** POST Methods */
router.route("/register").post(controller.register); // register user
router.route("/registerMail").post(registerMail); // send the email
router
  .route("/authenticate")
  .post(controller.verifyUser, (req, res) => res.end()); // authenticate user
router.route("/login").post(controller.verifyUser, controller.login); // login in app

/** GET Methods */
router.route("/user/:username").get(controller.getUser); // user with username
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route("/verifyOTP").get(controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); // reset all the variables

/** PUT Methods */
router.route("/updateuser").put(Auth, controller.updateUser); // is use to update the user profile
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); // use to reset password

/** POST Methods */
router.post("/post", Auth, controller.createPost); // create a new post

/** GET Methods */
router.get("/post", Auth, controller.getAllPosts); // get all posts
router.get("/post/:postId", Auth, controller.getPostById); // get a post by ID

/** PUT Methods */
router.put("/post/:postId", Auth, controller.updatePost); // update a post by ID

/** DELETE Methods */
router.delete("/post/:postId", Auth, controller.deletePost); // delete a post by ID

export default router;
