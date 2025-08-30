import express from "express";
import {
  employerGetAllApplications,
  jobSeekerDeleteApplication,
  jobSeekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

// Post a new application (Job Seeker only)
router.post("/post", isAuthorized,postApplication);

// Employer: get all applications for their jobs
router.get("/employer/getall",isAuthorized, employerGetAllApplications);

// Job Seeker: get all their applications
router.get("/jobseeker/getall",isAuthorized, jobSeekerGetAllApplications);

// Job Seeker: delete an application
router.delete("/delete/:id",isAuthorized, jobSeekerDeleteApplication);

export default router;
