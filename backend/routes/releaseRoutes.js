import { getAllRelease,createRelease,updateRelease,deleteRelease,getReleaseById } from "../controllers/releaseController.js";
import express from "express"

const router = express.Router()

router.route("/").get(getAllRelease).post(createRelease);
router.route("/:id").get(getReleaseById).put(updateRelease).delete(deleteRelease);

export default router